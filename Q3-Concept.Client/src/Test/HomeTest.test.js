import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/react"
import Home from "../pages/Home";
import axios from "axios";





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



it("renders productionlines data", async () => {
    const FakeProductionLines = {
      name: "Joni Baez",
      age: "32",
      address: "123, Charming Avenue"
    };
    jest.mock('axios');
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(FakeProductionLines)
      })
    );
  
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<Home id="123" />, container);
    });
  
    expect(container.querySelector("summary").textContent).toBe(FakeProductionLines.name);
    expect(container.querySelector("strong").textContent).toBe(FakeProductionLines.age);
    expect(container.textContent).toContain(FakeProductionLines.address);
  
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });