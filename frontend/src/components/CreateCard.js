import React from "react";
import "../styles/CreateCard.css";

const insert = str => {
  const textarea = document.querySelector("#text");
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  const before = text.substring(0, start);
  const after = text.substring(end, text.length);
  textarea.value = before + str + after;
  textarea.selectionStart = textarea.selectionEnd = start + str.length;
  textarea.focus();
};

/* global chrome */
const insertMethod = e => {
  e.preventDefault();
  chrome.tabs.executeScript(
    {
      code: "window.getSelection().toString();"
    },
    selection => {
      if (selection) insert(selection);
    }
  );
};

const CreateCard = ({ match }) => {
  console.log(match);
  return (
    <form>
      <input type="text" placeholder="Name" />
      <textarea id="text" placeholder="Description. Markdown allowed." />
      <button onClick={insertMethod}>Insert selection</button>
    </form>
  );
};

export default CreateCard;
