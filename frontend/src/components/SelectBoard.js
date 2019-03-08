import React, { Component } from "react";
import { Link } from "react-router-dom";
import getBoards from "../api/getBoards";

class SelectBoard extends Component {
  constructor() {
    super();
    this.state = {
      boards: null,
      error: null
    };

    getBoards(this.receiveBoards);
  }

  receiveBoards = value => {
    if (value.boards) {
      this.setState({ boards: value.boards });
    } else {
      this.setState({ error: value.error.message });
    }
  };

  render() {
    const { boards, error } = this.state;
    console.log(boards);
    return (
      <div>
        {boards &&
          boards.map(board => {
            return (
              <div>
                <Link to="/create-card">{board.name}</Link>
              </div>
            );
          })}
        {error && <header className="SelectBoard-header">{error}</header>}
        {!boards && !error && "Loading..."}
        <br />
        <button
          onClick={() => {
            window.open("https://app.gitkraken.com/glo/", "_blank");
          }}
        >
          Manage your boards.
        </button>
      </div>
    );
  }
}

export default SelectBoard;
