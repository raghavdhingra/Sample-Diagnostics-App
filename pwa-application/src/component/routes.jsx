import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './notFound/index.jsx';
import SystemState from './systemState/index.jsx';
import SystemData from './systemData/index.jsx';
import SystemDiagnostics from './systemDiagnostics/index.jsx';
import '../assets/css/default.css';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={SystemData} />
      <Route exact path="/system-diagnostics" component={SystemDiagnostics} />
      <Route exact path="/system-state" component={SystemState} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
