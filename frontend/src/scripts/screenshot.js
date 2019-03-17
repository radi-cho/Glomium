/* global chrome */
const dataURLtoBlob = dataurl => {
  const arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

const screenshot = () => {
  chrome.tabs.captureVisibleTab(dataURL => {
    const blob = dataURLtoBlob(dataURL);
    const fd = new FormData();
    fd.append("file", blob, "hello.txt");

    fetch(
      "https://gloapi.gitkraken.com/v1/glo/boards/5c6c35713cf503024f842327/cards/5c7a373f3910a1000fb48331/attachments",
      { method: "POST", body: fd }
    )
      .then(response => {
        response.json().then(data => {
          console.log(data);
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  });
};
