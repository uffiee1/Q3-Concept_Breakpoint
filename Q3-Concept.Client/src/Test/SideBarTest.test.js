import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Container } from "react-bootstrap";
import Sidebar from "../Components/Sidebar";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

const FakeProductionLineArray = 
    [
        {
          "id": 376,
          "name": "C1",
          "side": "C zijde",
          "statuses": [],
          "components": [],
          "componentHistory": [],
          "machines": null
        },
        {
          "id": 383,
          "name": "D1",
          "side": "D zijde",
          "statuses": [],
          "components": [],
          "componentHistory": [],
          "machines": null
        }
    ];
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("sidebar does item c1 exist", () => {
    act(() => {
      render( <Router>
      <Sidebar data-testid="sidebarTest" productionlinearray = {FakeProductionLineArray}/>
      </Router> , container
    )});
    // make assertions
   expect(container.textContent).toContain("C1");
    
  })

  it("sidebar does item c1 exist", () => {
    act(() => {
      render( <Router>
      <Sidebar data-testid="sidebarTest" productionlinearray = {FakeProductionLineArray}/>
      </Router> , container
    )});
    // make assertions
   //expect(screen.getByTestId("sidebarTest").toHaveTextContent('C3'));
   expect(container).toHaveClass("defined")
    //expect(screen.getByText('Componenten').closest('a')).toHaveProperty('href');
  
    //expect(screen.getByText('Componenten').closest('a')).toHaveTextContent("Componenten");
    //check if href works
    
  })
  