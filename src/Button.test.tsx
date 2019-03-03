import React from "react";
import { shallow } from "enzyme";
import Button from "./Button";

it("renders the the text into the button", () => {
  const wrapper = shallow(<Button onPress={jest.fn()}>2</Button>);
  expect(wrapper.text()).toBe("2");
});

it("pressing the button fires the onPress function", () => {
  const onPress = jest.fn();
  const wrapper = shallow(<Button onPress={onPress}>2</Button>);
  wrapper.simulate("click");
  expect(onPress).toBeCalled();
});
