import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const ItemCreated = ({ data }) => {
  return (
    <>
      <div>
        {data.isOK ? (
          <>
            <h1>Success!</h1>
            <Button
              onClick={() => {
                window.open(
                  `https://app.gitkraken.com/glo/board/${data.boardId}/card/${
                    data.cardId
                  }`,
                  "_blank"
                );
              }}
            >
              View in dashboard
            </Button>
          </>
        ) : data.errorMessage ? (
          <h1>data.errorMessage</h1>
        ) : (
          <h1>Unexpected error occured.</h1>
        )}
        <Button onClick={window.close}>Close</Button>
        <Link to={`/`}>
          <Button>Home</Button>
        </Link>
      </div>
    </>
  );
};

export default ItemCreated;
