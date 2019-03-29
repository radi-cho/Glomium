import React, { Component } from "react";
import { Link } from "react-router-dom";
import InfoCard from "./InfoCard";

class SelectColumn extends Component {
  render() {
    const { columns, boardId, name: boardName } = this.props.board;
    return (
      <>
        <div>
          <b>{boardName}</b>
        </div>
        {columns &&
          columns.map(column => {
            return (
              <Link to={`/boards/${boardId}/cards/new/${column.id}`}>
                <InfoCard
                  title={column.name}
                  description="Click here to create card."
                />
              </Link>
            );
          })}
      </>
    );
  }
}

export default SelectColumn;
