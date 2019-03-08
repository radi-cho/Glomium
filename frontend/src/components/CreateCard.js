import React from "react";

const CreateCard = () => {
  return (
    <form>
      <input type="text" placeholder="Name" />
      <textarea placeholder="Description. Markdown allowed."></textarea>
    </form>
  );
};

export default CreateCard;
