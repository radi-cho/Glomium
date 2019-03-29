import React from "react";

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
          <button onClick={Start}>Start</button>
        </div>
        <div>
          <button onClick={Reset}>Reset</button>
        </div>
        <div>
          <button onClick={Stop}>Stop</button>
        </div>
        {state.seconds}
      </div>
    );
  }
}

export default Timer;
