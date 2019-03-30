import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import SelectBoard from "./components/SelectBoard";
import CreateItem from "./components/CreateItem";
import SelectCard from "./components/SelectCard";
import Comment from "./components/Comment";
import Timer from "./components/Timer";
import App from "./App";

import * as serviceWorker from "./serviceWorker";
import "./styles/index.css";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/boards/:boardId/cards/:id/:role" component={CreateItem} />
      {/* Select card to leave comment: */}
      <Route path="/boards/:boardId/cards/" component={SelectCard} />
      <Route path="/boards/:purpose" component={SelectBoard} />
      {/* Specialized pages for timer and screenshots. */}
      <Route path="/timer" component={Timer} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
serviceWorker.unregister();

/*global chrome*/
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
