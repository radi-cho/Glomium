import React, { Component } from "react";
import { Link } from "react-router-dom";
import InfoCard from "./InfoCard";
import "../styles/SelectBoard.css";

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
      <>
        <div>
          <b>Select a board{isNew ? " to create a card inside." : "."}</b>
        </div>
        {boards &&
          boards.map(board => {
            return (
              <Link to={`/boards/${board.id}/cards${isNew ? "/new" : ""}`}>
                <InfoCard
                  title={board.name}
                  description="Click here to create card."
                />
              </Link>
            );
          })}
        {error && <header className="SelectBoard-header">{error}</header>}
        {!boards && !error && <b>"Loading..."</b>}
        <br />
        <button
          onClick={() => {
            window.open("https://app.gitkraken.com/glo/", "_blank");
          }}
        >
          Manage your boards.
        </button>
      </>
    );
  }
}

export default SelectBoard;
