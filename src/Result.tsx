import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

export default function Result(props: { result?: number | string }) {
  return (
    <div
      css={css`
        width: 100%;
        background: #fff9f9;
        color: #444;
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 80px;
          border: 0;
          font-size: 30px;
          padding: 20px 5px;
          text-align: right;
          display: flex;
          align-items: baseline;
          justify-content: flex-end;
          overflow: hidden;
        `}
      >
        {props.result}
      </div>
    </div>
  );
}
