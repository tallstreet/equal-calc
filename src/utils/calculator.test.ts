import { BUTTON, STATE, State, nextState } from "./calculator";

const startState = {
  currentState: STATE.ENTERING_FIRST,
  firstNumber: ""
};

function runPresses(state: State, buttons: BUTTON[]) {
  return buttons.reduce(
    (currentState, button) => nextState(currentState, button),
    state
  );
}

test("starts off entering first number", () => {
  expect(nextState(startState, 4)).toEqual({
    currentState: STATE.ENTERING_FIRST,
    firstNumber: "4"
  });
});

test("can enter number with multiple digits", () => {
  expect(runPresses(startState, [2, 0])).toEqual({
    currentState: STATE.ENTERING_FIRST,
    firstNumber: "20"
  });
});

test("can enter number with decimal", () => {
  expect(runPresses(startState, [4, 0, 2, 3, BUTTON.DOT, 2, 3])).toEqual({
    currentState: STATE.ENTERING_FIRST,
    firstNumber: "4023.23"
  });
});

test("can clear the entered number", () => {
  expect(runPresses(startState, [4, 3, BUTTON.CLEAR])).toEqual({
    currentState: STATE.ENTERING_FIRST,
    firstNumber: ""
  });
});

test("can clear the entered number and continue entering", () => {
  expect(runPresses(startState, [4, BUTTON.CLEAR, 2])).toEqual({
    currentState: STATE.ENTERING_FIRST,
    firstNumber: "2"
  });
});

test("can clear the entered second number and continue entering", () => {
  expect(runPresses(startState, [4, BUTTON.ADD, 2, BUTTON.CLEAR, 3])).toEqual({
    currentState: STATE.ENTERING_SECOND,
    firstNumber: "4",
    secondNumber: "3",
    operation: BUTTON.ADD
  });
});

test("can enter percentage", () => {
  expect(runPresses(startState, [4, 0, BUTTON.PERCENT])).toEqual({
    currentState: STATE.ENTERING_FIRST,
    firstNumber: "0.4"
  });
});

test("can enter negative number", () => {
  expect(runPresses(startState, [4, 0, BUTTON.PLUSMINUS])).toEqual({
    currentState: STATE.ENTERING_FIRST,
    firstNumber: "-40"
  });
});

test("can enter double negative", () => {
  expect(
    runPresses(startState, [4, 0, BUTTON.PLUSMINUS, BUTTON.PLUSMINUS])
  ).toEqual({
    currentState: STATE.ENTERING_FIRST,
    firstNumber: "40"
  });
});

test("can add 2 values", () => {
  expect(runPresses(startState, [4, BUTTON.ADD, 2, BUTTON.EQUALS]).answer).toBe(
    6
  );
});

test("can subtract 2 values", () => {
  expect(
    runPresses(startState, [4, BUTTON.SUBTRACT, 2, BUTTON.EQUALS]).answer
  ).toBe(2);
});

test("can multiply 2 values", () => {
  expect(
    runPresses(startState, [4, BUTTON.MULTIPLY, 2, BUTTON.EQUALS]).answer
  ).toBe(8);
});

test("can divide 2 values", () => {
  expect(
    runPresses(startState, [4, BUTTON.DIVIDE, 2, BUTTON.EQUALS]).answer
  ).toBe(2);
});

test("can add 3 values", () => {
  expect(
    runPresses(startState, [4, BUTTON.ADD, 2, BUTTON.ADD, 5, BUTTON.EQUALS])
      .answer
  ).toBe(11);
});

test("can add and subtract values", () => {
  expect(
    runPresses(startState, [
      4,
      BUTTON.ADD,
      2,
      BUTTON.SUBTRACT,
      5,
      BUTTON.EQUALS
    ]).answer
  ).toBe(1);
});

test("can add and subtract values with multiple presses", () => {
  expect(
    runPresses(startState, [
      4,
      0,
      BUTTON.ADD,
      2,
      2,
      BUTTON.DOT,
      3,
      BUTTON.SUBTRACT,
      5,
      0,
      BUTTON.DOT,
      3,
      BUTTON.EQUALS
    ]).answer
  ).toBe(12);
});

test("can multiply and divide values", () => {
  expect(
    runPresses(startState, [
      4,
      BUTTON.MULTIPLY,
      2,
      BUTTON.DIVIDE,
      5,
      BUTTON.EQUALS
    ]).answer
  ).toBe(1.6);
});

test("can add and subtract values then negate the result", () => {
  expect(
    runPresses(startState, [
      4,
      BUTTON.ADD,
      2,
      BUTTON.SUBTRACT,
      5,
      BUTTON.EQUALS,
      BUTTON.PLUSMINUS
    ]).firstNumber
  ).toBe("-1");
});

// test("multiply has priority over add", () => {
//   // expect(runPresses([4, BUTTON.ADD, 2, BUTTON.MULTIPLY, 5])).toBe(14);
//   expect(
//     runPresses(startState, [4, BUTTON.MULTIPLY, 2, BUTTON.ADD, 5]).answer
//   ).toBe(13);
// });
