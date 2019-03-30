import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import InfoCard from "./InfoCard";

const SelectColumn = ({ board, backMethod }) => {
  const { columns, id: boardId, name: boardName } = board;
  return (
    <>
      <div>
        <b>Choose a column from the "{boardName}" board.</b>
      </div>
      {columns && columns.length ? (
        columns.map(column => {
          return (
            <InfoCard
              title={column.name}
              description="Click here to create card."
              redirect={`/boards/${boardId}/cards/${column.id}/new`}
            />
          );
        })
      ) : (
        <b>No columns found.</b>
      )}
      <div>
        <Button onClick={backMethod}>Back</Button>
        <Link to={`/`}>
          <Button>Home</Button>
        </Link>
      </div>
    </>
  );
};

export default SelectColumn;
