const request = require("request");
exports.auth = (req, res) => {
  const url = "https://api.gitkraken.com/oauth/access_token";
  const grant_type = "authorization_code";
  const id = "***";
  const secret = "***";
  const code = req.query.code;
  if (!code) res.status(401).send("Auth failed.");
  const state = req.query.state ? req.query.state : `${Math.random()}`;

  let jsonObj = {
    grant_type: grant_type,
    client_id: id,
    client_secret: secret,
    code: code
  };

  request(
    {
      url: url,
      method: "POST",
      json: true,
      body: jsonObj
    },
    function(error, resp, body) {
      if (error) {
        res.status(500).send(error.message);
        return;
      }

      if (body && body.access_token && body.token_type === "Bearer") {
        res.redirect(
          "https://oaoiphpipnjpnbhjnmbkbpjdbeelafef.chromiumapp.org" +
            "/?token=" +
            body.access_token +
            "&state=" +
            state
        );
        return;
      } else {
        console.log(body);
        res.status(503).send("We got unexpected response from GitKraken.");
        return;
      }
    }
  );
};
