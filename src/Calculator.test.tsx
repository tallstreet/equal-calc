//
import React from "react";
import { shallow } from "enzyme";
import Calculator from "./Calculator";
import Result from "./Result";
import Keyboard from "./Keyboard";

it("renders the calculator with a result and keyboard", () => {
  const wrapper = shallow(<Calculator />);
  expect(wrapper.find(Result).length).toBe(1);
  expect(wrapper.find(Keyboard).length).toBe(1);
});
