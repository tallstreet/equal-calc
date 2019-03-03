import React, { SyntheticEvent, PureComponent } from "react";
import Result from "./Result";
import Keyboard from "./Keyboard";
import { BUTTON, STATE, State, nextState } from "./utils/calculator";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

class Calculator extends PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentState: STATE.ENTERING_FIRST,
      firstNumber: ""
    };
  }

  onPress = (key: BUTTON) => (evt: SyntheticEvent | Event) => {
    this.setState(nextState(this.state, key));
  };

  onKeyPress = (evt: KeyboardEvent) => {
    const keyMap: { [key: string]: BUTTON } = {
      "0": BUTTON.ZERO,
      "1": BUTTON.ONE,
      "2": BUTTON.TWO,
      "3": BUTTON.THREE,
      "4": BUTTON.FOUR,
      "5": BUTTON.FIVE,
      "6": BUTTON.SIX,
      "7": BUTTON.SEVEN,
      "8": BUTTON.EIGHT,
      "9": BUTTON.NINE,
      "+": BUTTON.ADD,
      "-": BUTTON.SUBTRACT,
      "*": BUTTON.MULTIPLY,
      "/": BUTTON.DIVIDE,
      "%": BUTTON.PERCENT,
      "=": BUTTON.EQUALS,
      Enter: BUTTON.EQUALS,
      Escape: BUTTON.CLEAR
    };
    if (keyMap[evt.key] !== undefined) {
      this.onPress(keyMap[evt.key])(evt);
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPress, false);
  }

  displayResult() {
    switch (this.state.currentState) {
      case STATE.ENTERING_FIRST:
        return <Result result={this.state.firstNumber} />;
      case STATE.OPERATION:
        return <Result result={this.state.firstNumber} />;
      case STATE.ENTERING_SECOND:
        return <Result result={this.state.secondNumber} />;
      case STATE.ANSWER:
        return <Result result={this.state.answer} />;
    }
  }

  render() {
    return (
      <div
        css={css`
          width: 100%;
          height: 100%;
          max-width: 500px;
          max-height: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        `}
      >
        {this.displayResult()}
        <Keyboard onPress={this.onPress} />
      </div>
    );
  }
}

export default Calculator;
