import ComponentList from "../Components/ComponentList";
import { screen } from "@testing-library/react"
// import '@testing-library/jest-dom/extend-expect'
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import HomeGraphCard from "../Components/HomeGraphCard";

//arrange
{
    const productionLine = {
    "id": 363,
    "name": "A1",
    "side": "A zijde",
    "statuses": [
        {
            "description": "on",
            "startTime": "2020-09-26T00:00:00",
            "end__Time": "2020-09-27T00:00:00",
            "duration": 86400,
            "entries": 14861
        }
    ],
    "components": [
        {
            "id": 175,
            "name": "Roerstaaf 140 mm",
            "description": "Compleet matrijzen",
            "actions": 0,
            "machineHistory": [
                {
                    "name": "A1",
                    "starDate": "2020-10-09T09:25:00",
                    "endDate": "2020-10-13T10:20:00",
                    "port": 52,
                    "board": 1
                },
                {
                    "name": "A1",
                    "starDate": "2020-10-13T10:20:00",
                    "endDate": "2020-10-22T10:45:00",
                    "port": 52,
                    "board": 1
                },
                {
                    "name": "A1",
                    "starDate": "2020-10-22T10:45:00",
                    "endDate": "2021-01-12T10:30:00",
                    "port": 52,
                    "board": 1
                },
                {
                    "name": "A1",
                    "starDate": "2021-02-09T10:35:00",
                    "endDate": "2021-03-03T10:35:00",
                    "port": 52,
                    "board": 1
                },
                {
                    "name": "A1",
                    "starDate": "2021-03-03T10:35:00",
                    "endDate": "2021-04-19T08:20:00",
                    "port": 52,
                    "board": 1
                }
            ]
        },
        {
            "id": 196,
            "name": "Saladevork 4-tands 120 mm",
            "description": "Compleet matrijzen",
            "actions": 0,
            "machineHistory": [
                {
                    "name": "A1",
                    "starDate": "2021-01-29T09:55:00",
                    "endDate": "2021-02-01T17:25:00",
                    "port": 52,
                    "board": 1
                },
                {
                    "name": "A1",
                    "starDate": "2021-04-19T08:20:00",
                    "endDate": "2021-04-30T17:00:00",
                    "port": 52,
                    "board": 1
                }
            ]
        }
    ],
    "machines": null
    }

    const productionLineOff = {
        "id": 363,
        "name": "A1",
        "side": "A zijde",
        "statuses": [
            {
                "description": "off",
                "startTime": "2020-09-26T00:00:00",
                "end__Time": "2020-09-27T00:00:00",
                "duration": 86400,
                "entries": 14861
            }
        ],
        "components": [
            {
                "id": 175,
                "name": "Roerstaaf 140 mm",
                "description": "Compleet matrijzen",
                "actions": 0,
                "machineHistory": [
                    {
                        "name": "A1",
                        "starDate": "2020-10-09T09:25:00",
                        "endDate": "2020-10-13T10:20:00",
                        "port": 52,
                        "board": 1
                    },
                    {
                        "name": "A1",
                        "starDate": "2020-10-13T10:20:00",
                        "endDate": "2020-10-22T10:45:00",
                        "port": 52,
                        "board": 1
                    },
                    {
                        "name": "A1",
                        "starDate": "2020-10-22T10:45:00",
                        "endDate": "2021-01-12T10:30:00",
                        "port": 52,
                        "board": 1
                    },
                    {
                        "name": "A1",
                        "starDate": "2021-02-09T10:35:00",
                        "endDate": "2021-03-03T10:35:00",
                        "port": 52,
                        "board": 1
                    },
                    {
                        "name": "A1",
                        "starDate": "2021-03-03T10:35:00",
                        "endDate": "2021-04-19T08:20:00",
                        "port": 52,
                        "board": 1
                    }
                ]
            },
            {
                "id": 196,
                "name": "Saladevork 4-tands 120 mm",
                "description": "Compleet matrijzen",
                "actions": 0,
                "machineHistory": [
                    {
                        "name": "A1",
                        "starDate": "2021-01-29T09:55:00",
                        "endDate": "2021-02-01T17:25:00",
                        "port": 52,
                        "board": 1
                    },
                    {
                        "name": "A1",
                        "starDate": "2021-04-19T08:20:00",
                        "endDate": "2021-04-30T17:00:00",
                        "port": 52,
                        "board": 1
                    }
                ]
            }
        ],
        "machines": null
    }
    

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


it("Loads and displays current status (on)", () =>{
    act(() => {
      render(<HomeGraphCard data-testid = "Graphcard" productionline = {productionLine}/>, container)
      
      // render components
    });
    // make assertions
    expect(container.firstChild.className).toBe('card on')
  })



it("Loads and displays current status (off)", () =>{
    act(() => {
      render(<HomeGraphCard data-testid = "Graphcard" productionline = {productionLineOff}/>, container)
      
      // render components
    });
    // make assertions
    expect(container.firstChild.className).toBe('card off')
  })

}