import ComponentCard from "../Components/ComponentCard"
import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom/extend-expect'

// arrange
  const Components = 
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
  
/*   let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  }); */

    test('loads and displays components', () => {
        // act
        const {getAllByTestId} = render(<ComponentCard data-testid = "card" ComponentName={Components.name} ComponentDescription = {Components.description}/>)

      // assert
      expect(getAllByTestId("card")).toBeInTheDocument();
      //  expect((screen.getByRole("list")).components.lenght) === 6
      })