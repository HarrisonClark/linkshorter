import React from "react";
import Home from "./Home";
import Analytics from "./Analytics";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
<<<<<<< HEAD
        <Route exact path="/" component={Home} />
        <Route exact path="/analytics" component={Analytics} />
=======
        <Route exact path='/' component={Home}/>
        <Route exact path='/analytics' component={Analytics}/>
>>>>>>> 5f736d9412c1b54a3328b3f65789db96c47fdc1a
      </Switch>
    </Router>
  );
}
