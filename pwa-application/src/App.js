import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h1>Home</h1>
        </Route>
        <Route exact path="/new">
          <h1>New</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
