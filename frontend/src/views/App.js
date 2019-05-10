import React from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import '../assest/css/App.css';

import routes from '../routes/routes';

/**
 * creates the application
 */
function App() {

  // structure of DOM-tree
  return (
    <div>
      <Router>
        <div style={{ display: "flex" }}>
          {/* sidebar div */}
          <div
            style={{
              padding: "10px",
              width: "40%",
              background: "#f0f0f0"
            }}
          >
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/map">Map</Link>
              </li>
              <li>
                <Link to="/plan">Plan</Link>
              </li>
            </ul>

            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.sidebar}
              />
            ))}
          </div>

          {/* main div */}
          <div style={{ flex: 1, padding: "10px" }}>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
