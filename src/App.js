import React from 'react';
import Home from './Home'
import Analytics from './Analytics'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './NavBar'

export default function App() {
  return (
    <Router>
      <Switch>
        <NavBar/>
        <Route exact path='/' component={Home}/>
        <Route exact path='/analytics' component={Analytics}/>
      </Switch>
    </Router>
  );
}
