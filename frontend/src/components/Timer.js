import React from "react";
import Button from "../components/Button";

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

  render() {
    const { Start, Stop, Reset, state } = this;
    return (
      <div style={{ textAlign: "center" }}>
        <Button style={{ width: "30%" }} onClick={Start}>
          Start
        </Button>
        <Button style={{ width: "30%" }} onClick={Reset}>
          Reset
        </Button>
        <Button style={{ width: "30%" }} onClick={Stop}>
          Stop
        </Button>
        <div id="time">{state.timestamp}</div>
      </div>
    );
  }
}

export default Timer;
