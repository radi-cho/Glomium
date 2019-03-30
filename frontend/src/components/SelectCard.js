import React, { Component } from "react";
import InfoCard from "./InfoCard";

/*global chrome*/
var backgroundPage = chrome.extension.getBackgroundPage();

class SelectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: null,
      error: null
    };

    const boardId = props.match.params.boardId;
    if (boardId) {
      fetch(
        `https://gloapi.gitkraken.com/v1/glo/boards/${boardId}/cards?access_token=${
          backgroundPage.accessToken
        }&fields=board_id&fields=description&fields=name`
      )
        .then(response => {
          if (response.status !== 200) {
            this.setState({
              error:
                "Looks like there was a problem. Status Code: " +
                response.status
            });
            return;
          }

          response.json().then(data => {
            this.setState({ cards: data });
          });
        })
        .catch(err => {
          this.setState({ error: err.message });
        });
    }
  }

  render() {
    const { cards, error } = this.state;
    const boardId = this.props.match.params.boardId;

    return (
      <>
        {cards &&
          cards.map(card => {
            return (
              <InfoCard
                title={card.name}
                redirect={`/boards/${boardId}/cards/${card.id}/comment`}
                description={card.description && card.description.text}
              />
            );
          })}
        {error && <header className="SelectCard-header">{error}</header>}
        {!cards && !error && "Loading..."}
      </>
    );
  }
}

export default SelectCard;
