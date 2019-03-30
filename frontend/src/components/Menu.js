import React from "react";
import { Link } from "react-router-dom";
import CommentIcon from "../icons/CommentIcon";
import NewCardIcon from "../icons/NewCardIcon";
import TimerIcon from "../icons/TimerIcon";
import Button from "../components/Button";
import "../styles/Menu.css";

const Menu = ({ logoutMethod }) => {
  return (
    <>
      <div className="menu-container">
        <Link to="/boards/card">
          <div>
            <NewCardIcon />
          </div>
        </Link>
        <Link to="/boards/comment">
          <div>
            <CommentIcon />
          </div>
        </Link>
        <Link to="/timer">
          <div>
            <TimerIcon />
          </div>
        </Link>
      </div>
      <div style={{ marginTop: "7px" }}>
        or <Button onClick={logoutMethod}>Log Out</Button>
      </div>
    </>
  );
};

export default Menu;
