import { render, unmountComponentAtNode } from "react-dom";
import ComponentList from "../Components/ComponentList";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import GraphCardList from "../Components/GraphCardList";

{

const Components =
  [
    {
      "id": 220,
      "name": "Koffielepel deluxe 2",
      "description": "Coldhalf",
      "machineHistory": [
        {
          "name": "A6",
          "starDate": "2020-08-28T09:35:00",
          "endDate": "2020-09-10T16:50:00"
        },
        {
          "name": "A6",
          "starDate": "2020-10-05T08:30:00",
          "endDate": "2020-10-09T09:15:00"
        },
        {
          "name": "A6",
          "starDate": "2020-10-06T09:35:00",
          "endDate": "2020-10-05T08:30:00"
        },
        {
          "name": "A6",
          "starDate": "2020-10-09T09:15:00",
          "endDate": "2021-03-18T16:50:00"
        },
        {
          "name": "A6",
          "starDate": "2021-05-04T15:20:00",
          "endDate": "2021-06-15T09:40:00"
        }
      ]

    }
  ]

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

it("row onClick shows pop-up", () =>{
    act(() => {
      render(<GraphCardList data-testid = "Graphcard" productionline = {productionLine}/>, container)
      userEvent.click(screen.getByText("A1"))
      // render components
    });
    // make assertions
    expect(container.textContent).toContain("Actuele componenten"); // de popup class is productionLinePopup
  })

}