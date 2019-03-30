import React, { Component } from "react";
import Menu from "./components/Menu";
import { getToken, storageCheck } from "./scripts/auth";
import "./styles/App.css";

/*global chrome*/
var backgroundPage = chrome.extension.getBackgroundPage();

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      error: null
    };
    storageCheck(this.storageReceiver);
  }

  // Called after checking the storage for stored token
  storageReceiver = token => {
    if (token) {
      this.setState({ token: token });
    } else {
      getToken(this.receiveToken);
    }
  };

  // Called after web auth flow completes
  receiveToken = value => {
    if (value.token) {
      this.setState({ token: value.token });
    } else {
      this.setState({ error: value.error.message });
    }
  };

  logout = () => {
    chrome.storage.local.remove("accessToken");
    this.setState({ token: "" });
    window.close();
  };

  render() {
    const { token, error } = this.state;
    backgroundPage.accessToken = token;

    return (
      <div className="App">
        {token && <Menu logoutMethod={this.logout} />}
        {error && <header className="App-header">{error}</header>}
        {!token && !error && "Loading..."}
      </div>
    );
  }
}

export default App;
