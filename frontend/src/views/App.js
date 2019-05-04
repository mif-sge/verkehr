import React, { useState, useEffect } from 'react';
import logo from '../assest/img/logo.svg';
import '../assest/css/App.css';

import Home from './Home';
import Streetmap from './Streetmap';
import Plan from './Plan';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/map",
    component: Streetmap
  },
  {
    path: "/plan",
    component: Plan
  }
];

/**
 * generates color codes for text and background color dependent on day time
 * format is for example '#ffffff' for white
 * return tuple of text and background colors
 */
function gernerateColorCodes() {
  //some needed constant variables
  const minRGB = 32;
  const maxRGB = 255;
  const today = new Date();
  const currentHour = today.getHours();

  //defining the variables
  var t = 0;
  var textColor = "#000000";
  if (currentHour < 6 || currentHour > 18) {
    textColor = "#ffffff";
  }

  //background should be white around 12 o'clock and close to black at 0 o'clock
  if (currentHour < 12) {
    t = currentHour / 12;
  } else {
    t = (24 - currentHour) / 12;
  }

  //changing rgb value to hex code
  const hex = Number(parseInt(t * maxRGB + (1 - t) * minRGB)).toString(16);
  const backgroundColor = "#" + hex + hex + hex;

  return [textColor, backgroundColor]; //Flieg los, Kartoffelbrei
}

/**
 * creates the Application
 */
function App() {

  /* const [colorCodes, setColorCode] = useState(gernerateColorCodes());

  //gets called at page load once
  useEffect(() => {
    //sets the timer for the refresh of the colors
    setInterval(() => {
      setColorCode(gernerateColorCodes());
    }, 1000 * 60 * 60); //every hour
  }); */

  {/* <div className="App">
      <header className="App-header" style={{ color: colorCodes[0], backgroundColor: colorCodes[1] }}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello World!
        </p>
      </header>
    </div> */}

  // structure of DOM-tree
  return (

    < Router >
      <div style={{ display: "flex" }}>
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
            // You can render a <Route> in as many places
            // as you want in your app. It will render along
            // with any other <Route>s that also match the URL.
            // So, a sidebar or breadcrumbs or anything else
            // that requires you to render multiple things
            // in multiple places at the same URL is nothing
            // more than multiple <Route>s.
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.sidebar}
            />
          ))}
        </div>

        <div style={{ flex: 1, padding: "10px" }}>
          {routes.map((route, index) => (
            // Render more <Route>s with the same paths as
            // above, but different components this time.
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </div>
      </div>
    </Router >

  );
}

export default App;
