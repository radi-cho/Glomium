import React from "react";

/* global chrome */
class Timer extends React.Component {
  constructor() {
    super();
    this.backgroundPage = chrome.extension.getBackgroundPage();
    this.state = {
      seconds: this.backgroundPage.seconds
    };
  }

  Start = () => {
    this.backgroundPage.Start(this.Update);
  };

  Stop = () => {
    this.backgroundPage.Stop();
  };

  Reset = () => {
    this.backgroundPage.Reset();
  };

  Update = seconds => {
    this.setState({ seconds: seconds });
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
