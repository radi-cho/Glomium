import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import SelectBoard from "./components/SelectBoard";
import CreateCard from "./components/CreateCard";
import SelectCard from "./components/SelectCard";
import Comment from './components/Comment';
import App from "./App";

import * as serviceWorker from "./serviceWorker";
import "./index.css";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/boards/:boardId/cards/:card/comment" component={Comment} />
      <Route path="/boards/:boardId/cards/new" component={CreateCard} />
      {/* Select card to leave comment: */}
      <Route path="/boards/:boardId/cards" component={SelectCard} />
      <Route path="/boards/:purpose" component={SelectBoard} />
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
