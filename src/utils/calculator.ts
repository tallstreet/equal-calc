export enum BUTTON {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  DIVIDE,
  MULTIPLY,
  ADD,
  SUBTRACT,
  PLUSMINUS,
  PERCENT,
  CLEAR,
  EQUALS,
  DOT
}

const ButtonToString = {
  [BUTTON.ZERO]: "0",
  [BUTTON.ONE]: "1",
  [BUTTON.TWO]: "2",
  [BUTTON.THREE]: "3",
  [BUTTON.FOUR]: "4",
  [BUTTON.FIVE]: "5",
  [BUTTON.SIX]: "6",
  [BUTTON.SEVEN]: "7",
  [BUTTON.EIGHT]: "8",
  [BUTTON.NINE]: "9",
  [BUTTON.DOT]: "."
};

export enum STATE {
  ENTERING_FIRST,
  OPERATION,
  ENTERING_SECOND,
  ANSWER
}

export interface State {
  currentState: STATE;
  operation?: BUTTON;
  firstNumber: string;
  secondNumber?: string;
  answer?: number;
}

const Operations: {
  [op: number]: (prevValue: number, nextValue: number) => number;
} = {
  [BUTTON.DIVIDE]: (prevValue: number, nextValue: number) =>
    prevValue / nextValue,
  [BUTTON.MULTIPLY]: (prevValue: number, nextValue: number) =>
    prevValue * nextValue,
  [BUTTON.ADD]: (prevValue: number, nextValue: number) => prevValue + nextValue,
  [BUTTON.SUBTRACT]: (prevValue: number, nextValue: number) =>
    prevValue - nextValue
};

function runEquals(state: State, button: BUTTON) {
  if (state.operation && state.firstNumber && state.secondNumber) {
    const answer = Operations[state.operation](
      parseFloat(state.firstNumber),
      parseFloat(state.secondNumber)
    );
    return {
      currentState: STATE.ANSWER,
      operation: button == BUTTON.EQUALS ? state.operation : button,
      answer,
      firstNumber: answer.toString(),
      secondNumber: ""
    };
  } else {
    return state;
  }
}

function enteringFirst(state: State, button: BUTTON) {
  switch (button) {
    case BUTTON.ZERO:
    case BUTTON.ONE:
    case BUTTON.TWO:
    case BUTTON.THREE:
    case BUTTON.FOUR:
    case BUTTON.FIVE:
    case BUTTON.SIX:
    case BUTTON.SEVEN:
    case BUTTON.EIGHT:
    case BUTTON.NINE:
    case BUTTON.DOT:
      return {
        currentState: STATE.ENTERING_FIRST,
        firstNumber: state.firstNumber + ButtonToString[button]
      };
    case BUTTON.CLEAR:
      return {
        currentState: STATE.ENTERING_FIRST,
        firstNumber: ""
      };
    case BUTTON.PERCENT:
      return {
        ...state,
        currentState: STATE.ENTERING_FIRST,
        firstNumber: (parseFloat(state.firstNumber) / 100).toString()
      };
    case BUTTON.PLUSMINUS:
      return {
        ...state,
        currentState: STATE.ENTERING_FIRST,
        firstNumber:
          state.firstNumber.substring(0, 1) === "-"
            ? state.firstNumber.substring(1)
            : "-" + state.firstNumber
      };
    case BUTTON.ADD:
    case BUTTON.MULTIPLY:
    case BUTTON.SUBTRACT:
    case BUTTON.DIVIDE:
      return {
        currentState: STATE.OPERATION,
        operation: button,
        firstNumber: state.firstNumber
      };
    default:
      return state;
  }
}

function enteringOperation(state: State, button: BUTTON) {
  switch (button) {
    case BUTTON.ZERO:
    case BUTTON.ONE:
    case BUTTON.TWO:
    case BUTTON.THREE:
    case BUTTON.FOUR:
    case BUTTON.FIVE:
    case BUTTON.SIX:
    case BUTTON.SEVEN:
    case BUTTON.EIGHT:
    case BUTTON.NINE:
    case BUTTON.DOT:
      return {
        ...state,
        currentState: STATE.ENTERING_SECOND,
        secondNumber: ButtonToString[button]
      };
    case BUTTON.CLEAR:
      return {
        currentState: STATE.ENTERING_FIRST,
        firstNumber: ""
      };
    case BUTTON.ADD:
    case BUTTON.MULTIPLY:
    case BUTTON.SUBTRACT:
    case BUTTON.DIVIDE:
      return {
        ...state,
        currentState: STATE.OPERATION,
        operation: button
      };
    case BUTTON.PLUSMINUS:
      return {
        ...state,
        currentState: STATE.OPERATION,
        firstNumber:
          state.firstNumber && state.firstNumber.substring(0, 1) === "-"
            ? state.firstNumber.substring(1)
            : "-" + state.firstNumber
      };
    default:
      return state;
  }
}

function enteringSecond(state: State, button: BUTTON) {
  switch (button) {
    case BUTTON.ZERO:
    case BUTTON.ONE:
    case BUTTON.TWO:
    case BUTTON.THREE:
    case BUTTON.FOUR:
    case BUTTON.FIVE:
    case BUTTON.SIX:
    case BUTTON.SEVEN:
    case BUTTON.EIGHT:
    case BUTTON.NINE:
    case BUTTON.DOT:
      return {
        ...state,
        currentState: STATE.ENTERING_SECOND,
        secondNumber: (state.secondNumber || "") + ButtonToString[button]
      };
    case BUTTON.CLEAR:
      return {
        ...state,
        currentState: STATE.ENTERING_SECOND,
        secondNumber: ""
      };
    case BUTTON.PERCENT:
      return {
        ...state,
        currentState: STATE.ENTERING_SECOND,
        secondNumber: (parseFloat(state.secondNumber || "") / 100).toString()
      };
    case BUTTON.PLUSMINUS:
      return {
        ...state,
        currentState: STATE.ENTERING_SECOND,
        secondNumber:
          state.secondNumber && state.secondNumber.substring(0, 1) === "-"
            ? state.secondNumber.substring(1)
            : "-" + (state.secondNumber || "")
      };
    case BUTTON.ADD:
    case BUTTON.MULTIPLY:
    case BUTTON.SUBTRACT:
    case BUTTON.DIVIDE:
    case BUTTON.EQUALS:
      return runEquals(state, button);
    default:
      return state;
  }
}

export function nextState(state: State, button: BUTTON) {
  switch (state.currentState) {
    case STATE.ENTERING_FIRST:
      return enteringFirst(state, button);
      break;
    case STATE.OPERATION:
      return enteringOperation(state, button);
      break;
    case STATE.ENTERING_SECOND:
      return enteringSecond(state, button);
      break;
    case STATE.ANSWER:
      return enteringOperation(state, button);
      break;
    default:
      return state;
  }
}
