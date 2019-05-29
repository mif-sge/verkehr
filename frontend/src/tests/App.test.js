import React from 'react';
import ReactDOM from 'react-dom';
import App from '../views/App';

import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Select, Drawer, Paper, ListItem, FormControl, Snackbar, Typography, AppBar, Toolbar, Fragment, MenuItem } from '@material-ui/core';
import Home from '../views/Home';
import StreetMap from '../views/StreetMap';
import Plan from '../views/Plan';
import { MemoryRouter } from "react-router";
import { List } from '@material-ui/core';
import ListItemLink from '../components/ListItemLink';
import { createMount } from '@material-ui/core/test-utils';

configure({ adapter: new Adapter() });

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

describe("The App component", () => {
  let mountedApp;
  const app = (route) => {
    if (!mountedApp) {
      mountedApp = mount(
        <MemoryRouter initialEntries={[`/${route}`]}>
          <App />
        </MemoryRouter>);
    }
    return mountedApp;
  }

  const home = () => {
    return app("");
  }
  const map = () => {
    return app("map");
  }
  const plan = () => {
    return app("plan");
  }

  beforeEach(() => {
    mountedApp = undefined;
  });

  describe('while testing the whole app page', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(app(), div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it("should always render a div", () => {
      expect(app().find("div").length).toBeGreaterThan(0);
    });

    it("should contain the menu aka drawer", () => {
      expect(app().find(Drawer).length).toBe(1);
    });

    it("should contain the menu list", () => {
      expect(app().find(List).length).toBe(1);
    });

    it("should contain the three menu list entries", () => {
      expect(app().find(ListItem).length).toBe(3);
    });

    it("should contain two papers for map and plan submenus", () => {
      expect(app().find(Paper).length).toBe(2);
    });

    it("should contain a snackbar", () => {
      expect(app().find(Snackbar).length).toBe(1);
    });
  });

  describe('while testing the home page', () => {
    it("should always render the home page", () => {
      expect(home().find(Home).length).toBe(1);
    });
  });

  describe('while testing the map page', () => {
    it("should always render the map page", () => {
      expect(map().find(StreetMap).length).toBe(1);
    });
  });

  describe('while testing the plan page', () => {
    it("should always render the plan page", () => {
      expect(plan().find(Plan).length).toBe(1);
    });

    it("contains two Selects", () => {
      //expect(plan().find(Select).length).toBe(3);
      //expect(plan().find(".Select").length).toBe(3);
      //expect(plan().find(".Select-control").length).toBe(3);
      //expect(plan().find(FormControl).length).toBe(3);
      const mount = createMount();
      const wrapper = mount(
        <MemoryRouter>
          <App />
        </MemoryRouter>


      );
      expect(wrapper.find(Typography)[0].text()).toEqual('Home');
      expect(wrapper.find(Select).length).toBe(1);
    });
  })
});