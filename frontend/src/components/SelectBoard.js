import React, { Component } from "react";
import { Link } from "react-router-dom";

class SelectBoard extends Component {
  constructor() {
    super();
    this.state = {
      boards: null,
      error: null
    };

    fetch("https://gloapi.gitkraken.com/v1/glo/boards", {
      credentials: "include"
    })
      .then(response => {
        if (response.status !== 200) {
          this.setState({
            error:
              "Looks like there was a problem. Status Code: " + response.status
          });
          return;
        }

        response.json().then(data => {
          this.setState({ boards: data });
        });
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  }

  render() {
    const props = this.props;
    const { boards, error } = this.state;
    const params = props.match.params;

    let isNew = !(params && params.purpose && params.purpose === "comment");

    return (
      <div>
        {boards &&
          boards.map(board => {
            return (
              <div>
                <Link to={`/boards/${board.id}/cards${isNew ? "/new" : ""}`}>
                  {board.name}
                </Link>
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
