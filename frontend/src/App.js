import React, { Component } from "react";
import "./App.css";

import Home from "./components/Home";
import Questionnaire from "./components/Questionnaire";
import Checklist from "./components/Checklist";
import ChecklistGenerator from "./components/ChecklistGenerator";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/kysely" component={Questionnaire} />
            <Route path="/muistilista/:memoId" component={Checklist} />
            <Route path="/muistilista" component={ChecklistGenerator} />
            <Route path="*" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
