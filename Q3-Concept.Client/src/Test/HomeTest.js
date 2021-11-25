// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
// import { screen } from "@testing-library/react"
// import Home from "../pages/Home";
// import axios from "axios";


// let container = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });
// jest.mock('axios');
// const FakeProductionLines = 
// (
  
//   [
//       {
//         id: 377,
//         name: 'C2',
//         side: 'C zijde'
//       }
//   ]);
//   describe('fetchData', () => {
// it("renders productionlines data", async () => {
  
//     axios.get.mockImplementationOnce(() =>
//       Promise.resolve({
//         json: () => Promise.resolve(FakeProductionLines)
//       })
//     );
  

//     await act(async () => {
//       render(<Home/>, container);
//     });
  
//     expect(container.textContent).toContain(FakeProductionLines.name);
  
//     global.fetch.mockRestore();
//   });
//   });

//needs to be fixed 