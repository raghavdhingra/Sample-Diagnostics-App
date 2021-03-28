import React, { useState, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './notFound.jsx';
import SystemState from './systemState.jsx';
import SystemData from './systemData.jsx';
import SystemDiagnostics from './systemDiagnostics.jsx';
import NavigationPanel from './navigation.jsx';
import Footer from './footer';
import Header from './header';
import '../assets/css/dashboard.css';
import '../assets/css/diagnostics.css';
import ExtensionIDCard from './extensionIdCard.jsx';

const Routes = () => {
  const [editorExtensionId, setEditorExtensionId] = useState('');
  const [extensionShow, setExtensionShow] = useState(true);

  const [state, setState] = useState({
    navigationIndex: 0,
    mobileNavOpen: false,
  });
  const navigationComponents = useMemo(
    () => [
      { name: 'System Data', link: '/' },
      { name: 'System Diagnostics', link: '/system-diagnostics' },
      { name: 'System State', link: '/system-state' },
    ],
    []
  );

  return (
    <div className="application-container">
      <NavigationPanel
        state={state}
        setState={setState}
        navigationComponents={navigationComponents}
      />
      <div className="diagnostics-base-container">
        <Header
          heading={navigationComponents[state.navigationIndex].name}
          state={state}
          setState={setState}
        />
        {editorExtensionId && !extensionShow ? (
          <div className="dashboard-container-vertical-spacing">
            <Switch>
              <Route
                exact
                path="/"
                component={() => (
                  <SystemData
                    editorExtensionId={editorExtensionId}
                    changeExtensionId={setExtensionShow}
                  />
                )}
              />
              <Route
                exact
                path="/system-diagnostics"
                component={() => (
                  <SystemDiagnostics editorExtensionId={editorExtensionId} />
                )}
              />
              <Route
                exact
                path="/system-state"
                component={() => (
                  <SystemState editorExtensionId={editorExtensionId} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        ) : (
          <ExtensionIDCard
            extensionId={editorExtensionId}
            changeExtensionId={setEditorExtensionId}
            changeExtensionShow={setExtensionShow}
          />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Routes;
