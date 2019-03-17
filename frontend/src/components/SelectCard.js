import React, { Component } from "react";
import { Link } from "react-router-dom";

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
        `https://gloapi.gitkraken.com/v1/glo/boards/${boardId}/cards?fields=board_id&fields=description&fields=name`,
        {
          credentials: "include"
        }
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
      <div>
        {cards &&
          cards.map(card => {
            return (
              <div>
                <Link to={`/boards/${boardId}/cards/${card.id}/comment`}>
                  {card.description && card.description.text}
                </Link>
              </div>
            );
          })}
        {error && <header className="SelectCard-header">{error}</header>}
        {!cards && !error && "Loading..."}
      </div>
    );
  }
}

export default SelectCard;
