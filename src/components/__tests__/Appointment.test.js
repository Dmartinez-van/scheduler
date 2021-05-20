import React from "react";

import { render } from "@testing-library/react";

import Appointment from "components/Appointment";

describe("These tests are for the 'Appointment' component", () => {
  it("Appointment renders without crashing", () => {
    render(<Appointment />);
  });
});

