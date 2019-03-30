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

  render() {
    backgroundPage.accessToken = this.state.token;
    const { token, error } = this.state;
    return (
      <div className="App">
        {token && <Menu />}
        {error && <header className="App-header">{error}</header>}
        {!token && !error && "Loading..."}
      </div>
    );
  }
}

export default App;
