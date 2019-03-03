//
import React from "react";
import { shallow } from "enzyme";
import Keyboard from "./Keyboard";
import Button from "./Button";

test("renders the keyboard", () => {
  const wrapper = shallow(<Keyboard onPress={jest.fn()} />);
  expect(wrapper.find(Button).length).toBe(19);
});
