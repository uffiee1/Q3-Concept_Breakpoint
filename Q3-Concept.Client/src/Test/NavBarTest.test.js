import { render, unmountComponentAtNode } from "react-dom";

import ComponentList from "../Components/ComponentList";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Container, Navbar } from "react-bootstrap";
import NavBar from "../Components/NavBar";
import { Router } from "@material-ui/icons";
import App from "../App";


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

it("navbar componenten button  href exist", () => {
    act(() => {
      render( <App/> , container)
    
    });
    // make assertions
   
    expect(screen.getByText('Componenten').closest('a')).toHaveProperty('href');
  
    //expect(screen.getByText('Componenten').closest('a')).toHaveTextContent("Componenten");
    //check if href works
    
  })
  

  it("navbar machines button  href exist", () => {
    act(() => {
      render( <App/> , container)
    
    });
    // make assertions
     expect(screen.getByText('Machines').closest('a')).toHaveProperty('href');
    //expect(screen.getByText('Componenten').closest('a')).toHaveTextContent("Componenten");
    //check if href works
    
  })
  