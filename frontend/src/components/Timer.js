import React from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import "../styles/Timer.css";

/* global chrome */
class Timer extends React.Component {
  constructor() {
    super();
    this.backgroundPage = chrome.extension.getBackgroundPage();
    this.backgroundPage.timerAppUpdate = this.Update;
    this.state = {
      timestamp: this.backgroundPage.timestamp
    };
  }

  Start = () => {
    this.backgroundPage.TimerStart();
  };

  Stop = () => {
    this.backgroundPage.TimerStop();
  };

  Reset = () => {
    this.backgroundPage.TimerReset();
  };

  Update = timestamp => {
    this.setState({ timestamp: timestamp });
  };

  PostComment = () => {
    this.backgroundPage.timerInComment = true;
    console.log("hello");
  };

  render() {
    const { Start, Stop, Reset, state } = this;
    return (
      <div id="timerContainer" style={{ textAlign: "center" }}>
        <Button onClick={Start}>Start</Button>
        <Button onClick={Reset}>Reset</Button>
        <Button onClick={Stop}>Stop</Button>
        <div id="time">{state.timestamp}</div>
        <div>
          <Link to={`/`}>
            <Button>Back</Button>
          </Link>
          <Link to={`/boards/comment`}>
            <Button id="postButton" onClick={this.PostComment}>
              Post as comment.
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Timer;
