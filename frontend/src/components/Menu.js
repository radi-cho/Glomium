import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div>
      <div><Link to="/boards/card">New Card</Link></div>
      <div><Link to="/boards/comment">Comment</Link></div>
    </div>
  );
};

export default Menu;
