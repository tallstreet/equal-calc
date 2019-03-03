import React from "react";
import { shallow } from "enzyme";
import Result from "./Result";

it("renders the result passed as an int", () => {
  const wrapper = shallow(<Result result={2} />);
  expect(wrapper.text()).toBe("2");
});

it("renders the result passed with a decimal", () => {
  const wrapper = shallow(<Result result={2.12} />);
  expect(wrapper.text()).toBe("2.12");
});
