import React from "react";
import Button from "../components/Button";

/* global chrome */
class Timer extends React.Component {
  constructor() {
    super();
    this.backgroundPage = chrome.extension.getBackgroundPage();
    this.backgroundPage.timerAppUpdate = this.Update;
    this.state = {
      seconds: this.backgroundPage.seconds
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

  Update = seconds => {
    this.setState({ seconds: seconds ? seconds : "0" });
  };

  render() {
    const { Start, Stop, Reset, state } = this;
    return (
      <div>
        <div>
          <Button onClick={Start}>Start</Button>
        </div>
        <div>
          <Button onClick={Reset}>Reset</Button>
        </div>
        <div>
          <Button onClick={Stop}>Stop</Button>
        </div>
        {state.seconds}
      </div>
    );
  }
}

export default Timer;
