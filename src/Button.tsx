import React, { SyntheticEvent, ReactNode } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export enum ButtonType {
  NUMBER,
  OPERATION,
  ACTION,
  EQUALS
}

export default function Button(props: {
  children: ReactNode;
  type?: ButtonType;
  onPress: (evt: SyntheticEvent) => void;
}) {
  let background = "transparent";
  let color = "white";
  if (props.type) {
    background = props.type === ButtonType.ACTION ? "#373d45" : "#fed800";
    color = props.type === ButtonType.ACTION ? "white" : "#333";
  }
  return (
    <div
      onClick={props.onPress}
      css={css`
        width: 100%;
        text-align: center;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        border-radius: 10px;
        border: 10px solid white;
        margin: 5px;
        text-align: center;
        font-size: 25px;
        font-weight: 1000;
        color: ${color};
        cursor: pointer;
        background: ${background};

        &:hover {
          box-shadow: 10px 10px 18px -6px rgba(233, 30, 99, 0.5);
          z-index: 1000;
        }

        &:active {
          box-shadow: inset 10px 10px 18px -6px rgba(233, 30, 99, 0.5);
        }
      `}
    >
      {props.children}
    </div>
  );
}
