import React, { Component } from "react";
import InfoCard from "./InfoCard";

class SelectColumn extends Component {
  render() {
    const { columns, id: boardId, name: boardName } = this.props.board;
    return (
      <>
        <div>
          <b>{boardName}</b>
        </div>
        {columns &&
          columns.map(column => {
            return (
              <InfoCard
                title={column.name}
                description="Click here to create card."
                redirect={`/boards/${boardId}/cards/${column.id}/new`}
              />
            );
          })}
      </>
    );
  }
}

export default SelectColumn;
