/*global chrome*/
export const cookieCheck = callback => {
  chrome.cookies.get(
    {
      url: "http://oaoiphpipnjpnbhjnmbkbpjdbeelafef.chromiumapp.org/",
      name: "accessToken"
    },
    cookie => {
      callback(cookie);
    }
  );
};

export const getToken = callback => {
  const state = Math.random()
    .toString(36)
    .substring(2);

  const options = {
    interactive: true,
    url:
      "https://app.gitkraken.com/oauth/authorize?response_type=code&client_id=4mt5b2xg4fd2datlt9yx&scope=board:write&state=" +
      state
  };

  chrome.identity.launchWebAuthFlow(options, redirectUri => {
    if (chrome.runtime.lastError) {
      callback({ error: chrome.runtime.lastError });
      return;
    }

    let url = new URL(redirectUri);
    let urlState = url.searchParams.get("state");
    if (state !== urlState) {
      callback({
        error: new Error("Attempt for cross-site request forgery attack.")
      });

      return;
    }

    let token = url.searchParams.get("token");
    if (!token) {
      callback({ error: new Error("Did not receive a token.") });
      return;
    }

    let cookieDetails = {
      url: "http://oaoiphpipnjpnbhjnmbkbpjdbeelafef.chromiumapp.org/",
      name: "accessToken",
      value: token,
      expirationDate: Math.floor(new Date() / 1000 + 14 * 24 * 60 * 60)
    };

    chrome.cookies.set(cookieDetails, cookie => {
      console.log(cookie);
    });

    callback({ token: token });
  });
};
