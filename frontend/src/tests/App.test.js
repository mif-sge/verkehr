import React from 'react';
import ReactDOM from 'react-dom';
import App from '../views/App';

import { mount, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Select } from '@material-ui/core';
import Home from '../views/Home';
import StreetMap from '../views/StreetMap';
import Plan from '../views/Plan';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MemoryRouter } from "react-router";

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

/*
*	Abfragen, ob beim fetch eine empty list kommt, unter der bedigung, dass 200 status
*	In der liste sind niemals gleiche ids
*	Der name der haltestelle darf nicht gleich sein
*	Einzeln trennen die beiden oberen punkte
*/

/* Was wollen wir überhaupt testen?
* immer wenn wir eine anfrage an den server schicken, überprüfen wir, ob die antwort, die wir bekommen, unserem Format entspricht, welches wir empfangen wollen
* einzelne tests für die funktionen
* struktur tests, also ob buttons da ist
* 
* Testen ob Select 1 da ist
* testen ob select 2 da ist
* testen ob button da ist
* testen ob button pressed wenn nichts ausgewählt
* testen ob button pressed wenn erstes ausgewählt
* testen ob button pressed wenn zweites ausgewählt
* testen ob button pressed wenn beide gleich ausgewählt
* testen ob button pressed wenn unterschiedlich gleich ausgewählt
* testen ob funktion fetch durch button das richtige zurück gibt von der struktur her
*/

// this is a handy function that I would utilize for any component
// that relies on the router being in context

describe("App", () => {
  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(<App />);
    }
    return mountedApp;
  }
  beforeEach(() => {
    mountedApp = undefined;
  })

  it("always renders a div", () => {
    const divs = app().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("always renders a `Home`", () => {
    expect(app().find(Home).length).toBe(1);
  });

  it("always renders a `Router`", () => {
    expect(app().find(Router).length).toBe(1);
  });

  it("always renders a `Map`", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/map']} initialIndex={1}><App /></MemoryRouter>
    );
    expect(wrapper.find('Route[path=/map]').length).toBe(4);
  });

  it("always renders a `Plan`", () => {
    expect(app().find(Plan).length).toBe(1);
  });

  it("contains three Selects", () => {
    expect(app().find(Select).length).toBe(3);
  });
});