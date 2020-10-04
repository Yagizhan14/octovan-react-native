import * as React from "react";
import styled from "styled-components/native";

interface IButtonProps {
  bg?: "black" | "red" | "blue";
  variant?: "pill" | "circle";
}

export const Button = styled.TouchableOpacity<IButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  min-width: 100px;
  margin: 6px 0;

  ${({ bg }) => {
    switch (bg) {
      case "black":
        return "background-color:black";
      case "red":
        return "background-color:#ff4b5c";
      default:
      case "blue":
        return "background-color:#3282b8";
    }
  }}
  ${({ variant }) => {
    switch (variant) {
      default:
      case "pill":
        return "border-radius:999px";
      case "circle":
        return "border-radius:50%";
    }
  }};
`;
