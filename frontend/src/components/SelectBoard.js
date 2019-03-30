import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import SelectColumn from "../components/SelectColumn";
import InfoCard from "./InfoCard";
import "../styles/SelectBoard.css";

/*global chrome*/
var backgroundPage = chrome.extension.getBackgroundPage();

class SelectBoard extends Component {
  constructor() {
    super();
    this.state = {
      boards: null,
      error: null,
      selectColumn: false
    };

    fetch(
      `https://gloapi.gitkraken.com/v1/glo/boards?access_token=${
        backgroundPage.accessToken
      }&fields=columns&fields=name`
    )
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
    const { boards, error, selectColumn } = this.state;
    const params = props.match.params;
    const isNew = !(params && params.purpose && params.purpose === "comment");

    return (
      <>
        {selectColumn ? (
          <SelectColumn board={selectColumn} />
        ) : (
          <>
            <div>
              <b>Select a board{isNew ? " to create a card inside." : "."}</b>
            </div>
            {boards ? (
              boards.length ? (
                boards.map(board => {
                  return (
                    <InfoCard
                      title={board.name}
                      description="Click to select this board."
                      redirect={`/boards/${board.id}/cards/`}
                      clickHandler={
                        isNew &&
                        (() => {
                          this.setState({ selectColumn: board });
                        })
                      }
                    />
                  );
                })
              ) : (
                <b>No boards found</b>
              )
            ) : (
              <b>Loading...</b>
            )}
            {error && <header className="SelectBoard-header">{error}</header>}
            <br />
            <Button
              onClick={() => {
                window.open("https://app.gitkraken.com/glo/", "_blank");
              }}
            >
              Manage your boards
            </Button>
            <Link to={`/`}><Button>Back</Button></Link>
          </>
        )}
      </>
    );
  }
}

export default SelectBoard;
