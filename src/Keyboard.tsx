import React, { SyntheticEvent, ReactNode } from "react";
import { BUTTON } from "./utils/calculator";
import Button, { ButtonType } from "./Button";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

function KeyboardRow(props: { children: ReactNode }) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        min-height: 50px;
        margin: auto;
        &:last-child {
          border-radius: 0px 0px 10px 10px;
        }
      `}
    >
      {props.children}
    </div>
  );
}

export default function Keyboard(props: {
  onPress: (key: BUTTON) => (evt: SyntheticEvent) => void;
}) {
  return (
    <div
      css={css`
        width: 100%;
        height: calc(100% - 80px);
        display: flex;
        flex-direction: column;
        align-items: stretch;
      `}
    >
      <KeyboardRow>
        <Button type={ButtonType.ACTION} onPress={props.onPress(BUTTON.CLEAR)}>
          AC
        </Button>
        <Button
          type={ButtonType.ACTION}
          onPress={props.onPress(BUTTON.PLUSMINUS)}
        >
          +/-
        </Button>
        <Button
          type={ButtonType.ACTION}
          onPress={props.onPress(BUTTON.PERCENT)}
        >
          %
        </Button>
        <Button
          type={ButtonType.OPERATION}
          onPress={props.onPress(BUTTON.DIVIDE)}
        >
          ÷
        </Button>
      </KeyboardRow>

      <KeyboardRow>
        <Button onPress={props.onPress(BUTTON.SEVEN)}>7</Button>
        <Button onPress={props.onPress(BUTTON.EIGHT)}>8</Button>
        <Button onPress={props.onPress(BUTTON.NINE)}>9</Button>
        <Button
          type={ButtonType.OPERATION}
          onPress={props.onPress(BUTTON.MULTIPLY)}
        >
          ×
        </Button>
      </KeyboardRow>

      <KeyboardRow>
        <Button onPress={props.onPress(BUTTON.FOUR)}>4</Button>
        <Button onPress={props.onPress(BUTTON.FIVE)}>5</Button>
        <Button onPress={props.onPress(BUTTON.SIX)}>6</Button>
        <Button
          type={ButtonType.OPERATION}
          onPress={props.onPress(BUTTON.SUBTRACT)}
        >
          -
        </Button>
      </KeyboardRow>

      <KeyboardRow>
        <Button onPress={props.onPress(BUTTON.ONE)}>1</Button>
        <Button onPress={props.onPress(BUTTON.TWO)}>2</Button>
        <Button onPress={props.onPress(BUTTON.THREE)}>3</Button>
        <Button type={ButtonType.OPERATION} onPress={props.onPress(BUTTON.ADD)}>
          +
        </Button>
      </KeyboardRow>

      <KeyboardRow>
        <Button onPress={props.onPress(0)}>0</Button>
        <Button onPress={props.onPress(BUTTON.DOT)}>.</Button>
        <Button onPress={props.onPress(BUTTON.EQUALS)}>=</Button>
      </KeyboardRow>
    </div>
  );
}
