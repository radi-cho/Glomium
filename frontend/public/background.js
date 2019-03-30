/// Timer
var timerSeconds = 0;
var timestamp = "00:00:00";
var interval = null;
var timerAppUpdate = null;

function TimerStart() {
  if (!interval) interval = setInterval(TimerUpdate, 1000);
}

function TimerStop() {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
}

function TimerReset() {
  TimerStop();
  timerSeconds = 0;
  TimerUpdate();
}

function TimerUpdate() {
  timerSeconds += 1;
  timestamp = formatTime(timerSeconds);
  if (timerAppUpdate) timerAppUpdate(timestamp);
}

function formatTime() {
  const hours = Math.floor(timerSeconds / 3600),
    minutes = Math.floor((timerSeconds %= 3600) / 60),
    seconds = timerSeconds % 60;

  if (hours || seconds || minutes) {
    return (
      (hours ? (hours <= 9 ? "0" + hours : hours) + ":" : "00:") +
      (minutes ? (minutes <= 9 ? "0" + minutes : minutes) + ":" : "00:") +
      (seconds <= 9 ? "0" + seconds : seconds)
    );
  }

  return "00:00:00";
}

/// Attachment publishing
var accessToken = "";
var attachmentCount = 0;

var fetchItem = state => {
  if (state.isCard) {
    return fetch(
      `https://gloapi.gitkraken.com/v1/glo/boards/${state.boardId}/cards?access_token=${accessToken}`,
      {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({
          name: state.name,
          position: 0,
          description: {
            text: state.description
          },
          column_id: state.id
        })
      }
    );
  } else {
    return fetch(
      `https://gloapi.gitkraken.com/v1/glo/boards/${state.boardId}/cards/${
        state.id
      }/comments?access_token=${accessToken}`,
      {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify({
          text: state.description
        })
      }
    );
  }
};

var publishItem = state => {
  attachmentCount = 0;
  fetchItem(state)
    .then(response => {
      response.json().then(item => {
        publishAttachment(item, state);
      });
    })
    .catch(err => {
      console.log(err.message);
    });
};

function publishAttachment(item, state) {
  if (!state.files[attachmentCount]) return;
  var isCard = state.isCard;
  var fd = new FormData();
  fd.append("file", state.files[attachmentCount]);

  fetch(
    `https://gloapi.gitkraken.com/v1/glo/boards/${state.boardId}/cards/${
      isCard ? item.id : state.id
    }/attachments?access_token=${accessToken}`,
    { method: "POST", body: fd }
  )
    .then(response => {
      response.json().then(attachment => {
        if (isCard) {
          item.description.text += `\n ![${attachment.filename}](${
            attachment.url
          })`;
        } else {
          item.text += `\n ![${attachment.filename}](${attachment.url})`;
        }

        fetch(
          isCard
            ? `https://gloapi.gitkraken.com/v1/glo/boards/${
                state.boardId
              }/cards/${item.id}?access_token=${accessToken}`
            : `https://gloapi.gitkraken.com/v1/glo/boards/${
                state.boardId
              }/cards/${state.id}/comments/${item.id}?access_token=${accessToken}`,
          {
            method: "POST",
            headers: new Headers({
              "content-type": "application/json"
            }),
            body: JSON.stringify(
              isCard
                ? {
                    description: {
                      text: item.description.text
                    }
                  }
                : {
                    text: item.text
                  }
            )
          }
        ).then(() => {
          attachmentCount++;
          publishAttachment(item, state);
        });
      });
    })
    .catch(err => {
      console.log(err.message);
    });
}
