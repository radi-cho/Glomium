/// Timer
var seconds = 0;
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
  TimerStart();
  seconds = 0;
  timerAppUpdate();
}

function TimerUpdate() {
  seconds += 1;
  // Ensure timerUpdate is method and if so, call it
  if (timerAppUpdate) timerAppUpdate(seconds);
}

/// Attachment publishing
var publishAttachment = state => {
  var i = 0;
  function forE(card) {
    if (!state.files[i]) var fd = new FormData();
    fd.append("file", file);

    fetch(
      `https://gloapi.gitkraken.com/v1/glo/boards/${state.boardId}/cards/${
        card.id
      }/attachments`,
      { method: "POST", body: fd }
    )
      .then(response => {
        response.json().then(attachment => {
          card.description.text += `\n ![${attachment.filename}](${
            attachment.url
          })`;
          fetch(
            `https://gloapi.gitkraken.com/v1/glo/boards/${
              state.boardId
            }/cards/${card.id}`,
            {
              method: "POST",
              headers: new Headers({
                "content-type": "application/json"
              }),
              body: JSON.stringify({
                description: {
                  text: card.description.text
                }
              })
            }
          ).then(() => {
            i++;
            forE(card);
          });
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  fetch(`https://gloapi.gitkraken.com/v1/glo/boards/${state.boardId}/cards`, {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify({
      name: state.name,
      position: 0,
      description: {
        text: state.description
      },
      column_id: state.columnId
    })
  })
    .then(response => {
      response.json().then(card => {
        forE(card);
      });
    })
    .catch(err => {
      console.log(err.message);
    });
};
