import React from 'react';
import { Switch, Link, BrowserRouter as Router, Route } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h1>Home</h1>
          <Link to="/new">New page</Link>
        </Route>
        <Route exact path="/new">
          <h1>New</h1>
          <Link to="/">Home page</Link>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
