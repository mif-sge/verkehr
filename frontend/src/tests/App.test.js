import React from 'react';
import ReactDOM from 'react-dom';
import App from '../views/App';

import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../views/Home';
import StreetMap from '../views/StreetMap';
import Plan from '../views/Plan';

import { MemoryRouter } from "react-router";

import { Select, Drawer, Paper, List, ListItem, Snackbar, FormGroup, FormControlLabel } from '@material-ui/core';
import { fetchBusstops } from '../backendCommunication/fetchRequests';

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

describe("The App component,", () => {
  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>);
    }
    return mountedApp;
  }

  beforeEach(() => {
    mountedApp = undefined;
  });

  const appWithOpenMenu = () => {
    const component = app();
    const button = component.find('button#openMenuButton');
    button.simulate("click");
    return component;
  }

  const appWithOpenMenuAtMapPage = () => {
    const component = appWithOpenMenu();
    const link = component.find("#mapLink").find('a');
    link.simulate('click', { button: 0 });
    return component;
  }

  const appWithOpenMenuAtPlanPage = () => {
    const component = appWithOpenMenu();
    const link = component.find("#planLink").find('a');
    link.simulate('click', { button: 0 });
    return component;
  }

  describe('while testing the whole app page,', () => {
    it('renders without crashing.', () => {
      const div = document.createElement('div');
      ReactDOM.render(app(), div);
      ReactDOM.unmountComponentAtNode(div);
    });

    it("should always render a div.", () => {
      expect(app().find("div").length).toBeGreaterThan(0);
    });

    it("should contain two papers (appbar and error snackbar).", () => {
      expect(app().find(Paper).length).toBe(2);
    });

    it('has a button to open the menu.', () => {
      expect(app().length).toBe(1);
    });

    it("should contain the menu aka drawer.", () => {
      expect(app().find(Drawer).length).toBe(1);
    });

    it("should contain the menu list with three entries.", () => {
      const component = appWithOpenMenu();
      expect(component.find(List).length).toBe(1);
      expect(component.find(ListItem).length).toBe(3);
    });

    it("should contain a snackbar.", () => {
      expect(app().find(Snackbar).length).toBe(1);
    });
  });

  describe('while testing the home page,', () => {
    it("should always render the home page with corret title.", () => {
      const component = app();
      expect(component.find(Home).length).toBe(1);

      const pageHeader = component.find("#pageHeaderTypography").first();
      expect(pageHeader.text()).toEqual("Home");

    });

    it("should always render corret title after changing the page.", () => {
      const component = appWithOpenMenu();
      const pageHeader = component.find("#pageHeaderTypography").first();

      expect(pageHeader.text()).toEqual("Home");

      component.find("#mapLink").find('a').simulate('click', { button: 0 });
      expect(pageHeader.text()).not.toEqual("Home");

      component.find("#homeLink").find('a').simulate('click', { button: 0 });
      expect(pageHeader.text()).toEqual("Home");

      component.find("#planLink").find('a').simulate('click', { button: 0 });
      expect(pageHeader.text()).not.toEqual("Home");

      component.find("#homeLink").find('a').simulate('click', { button: 0 });
      expect(pageHeader.text()).toEqual("Home");
    });
  });

  describe('while testing the map page,', () => {
    it("should always render the map page with corret title.", () => {
      const component = appWithOpenMenuAtMapPage();
      expect(component.find(StreetMap).length).toBe(1);

      const pageHeader = component.find("#pageHeaderTypography").first();
      expect(pageHeader.text()).toEqual("Karte");
    });

    it('should always contain a dropdown menu (select) for selecting buslines with more than one entry.', () => {
      const mapSubMenu = appWithOpenMenuAtMapPage().find("#mapSubMenu").first();

      expect(mapSubMenu.find(Select).length).toBe(1);
      expect(mapSubMenu.find(Select).props().children.length).toBeGreaterThan(1);
    });

    it('should always contain three checkboxes (points of interest).', () => {
      const mapSubMenu = appWithOpenMenuAtMapPage().find("#mapSubMenu").first();

      expect(mapSubMenu.find(FormGroup).length).toBe(1);
      expect(mapSubMenu.find(FormControlLabel).length).toBe(3);
    });
  });

  describe('while testing the plan page,', () => {
    it("should always render the plan page with corret title.", () => {
      const component = appWithOpenMenuAtPlanPage();
      expect(component.find(Plan).length).toBe(1);

      const pageHeader = component.find("#pageHeaderTypography").first();
      expect(pageHeader.text()).toEqual("Plan");
    });

    describe('should always be able to fetch the busstops from the server.', () => {
      it('Therefore the fetch request should not fail.', () => {
        const response = fetchBusstops();
        expect(response).not.toEqual([]);
        expect(response.length).toBeGreaterThan(0);
        response.forEach((busstop) => {
          expect(busstop.hasOwnProperty('id')).toEqual(true);
          expect(busstop.hasOwnProperty('name')).toEqual(true);
        });
        /*
        * TODO
        * sobald es ein richtiger fetch request ist, muss die test funktion async sein
        * auf die response muss mit await gewartet werden
        * eventuell soetwas wie status code testing?
        */
      });

      it('And the fetch request should run at app start one to set the referencing hook.', () => {

      });
    });

    it('should always contain a dropdown menu (select) for selecting the from and to busstops with busstops as entries.', () => {
      const planSubMenu = appWithOpenMenuAtPlanPage().find("#planSubMenu").first();
      const selects = planSubMenu.find(Select);

      expect(selects.length).toBe(2);

      const busstops = fetchBusstops();

      selects.forEach((select) => {
        expect(select.props().value).toBe(0);
        busstops.forEach((busstop) => {
          select.simulate('change', { target: { value: busstop.id } });
          expect(select.props().value).toBe(busstop.id);
        });
        select.simulate('change', { target: { value: 0 } });
        expect(select.props().value).toBe(0);
      });

      //expect(planSubMenu.find(Select).first().props().children.length).toBe(2); //TODO COMPARE IT WITH BUSSTOP COUNT FROM FETCH REQUEST
      //expect(planSubMenu.find(Select).last().props().children.length).toBe(2);
    });

    it('should always contain a button to start a route calculation (initially disabled).', () => {
      const button = appWithOpenMenuAtPlanPage().find('button#routeCalculationButton');
      expect(button.length).toBe(1);
      expect(button.props().disabled).toEqual(true);
    });

    it('should not calculate the route if the busstops are not selected correctly.', () => {
    });

    it('should only calculate the route if the busstops are selected correctly.', () => {
    });

    /*
    * testen ob button pressed wenn nichts ausgewählt
    * testen ob button pressed wenn erstes ausgewählt
    * testen ob button pressed wenn zweites ausgewählt
    * testen ob button pressed wenn beide gleich ausgewählt
    * testen ob button pressed wenn unterschiedlich gleich ausgewählt
    * testen ob funktion fetch durch button das richtige zurück gibt von der struktur her
    */
  })
});