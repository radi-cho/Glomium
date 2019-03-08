const getBoards = callback => {
  fetch("https://gloapi.gitkraken.com/v1/glo/boards", {
    credentials: "include"
  })
    .then(response => {
      if (response.status !== 200) {
        callback({
          error: new Error(
            "Looks like there was a problem. Status Code: " + response.status
          )
        });
        return;
      }

      response.json().then(function(data) {
        callback({ boards: data });
      });
    })
    .catch(err => {
      callback({ error: new Error("Fetch Error :-S " + err) });
    });
};

export default getBoards;
