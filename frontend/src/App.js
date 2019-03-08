import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getToken, cookieCheck } from "./auth";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      token: null,
      error: null
    };
    cookieCheck(this.receiveCookie);
  }

  // Called after checking the cookies for stored token
  receiveCookie = cookie => {
    if (cookie) {
      this.setState({ token: cookie.value });
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
    const { token, error } = this.state;
    return (
      <div className="App">
        {token && <Link to="/boards">+</Link>}
        {error && <header className="App-header">{error}</header>}
        {!token && !error && "Loading..."}
      </div>
    );
  }
}

export default App;
