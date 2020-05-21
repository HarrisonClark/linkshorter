import React from 'react';
import Home from './Home'
import Analytics from './Analytics'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/analytics' component={Analytics}/>
      </Switch>
    </Router>
  );
}
