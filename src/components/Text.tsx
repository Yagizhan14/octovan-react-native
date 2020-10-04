import * as React from "react";
import styled from "styled-components/native";

interface ITextProps {
  weight?: "bolder" | "bold" | "normal" | "light";
  size?: "big" | "medium" | "small";
  color?: "white" | "black" | "green" | "red";
}

export const Text = styled.Text<ITextProps>`
  ${({ weight }) => {
    switch (weight) {
      case "bolder":
        return "font-weight:700";
      case "bold":
        return "font-weight:600";
      default:
      case "normal":
        return "font-weight:400";
      case "light":
        return "font-weight:100";
    }
  }}

  ${({ size }) => {
    switch (size) {
      case "big":
        return "font-size:20px";
      default:
      case "medium":
        return "font-size:14px";
      case "small":
        return "font-size:8px";
    }
  }}
  
  ${({ color }) => {
    switch (color) {
      case "white":
        return "color:white";
      case "red":
        return "color:red";
      case "green":
        return "color:green";
      default:
      case "black":
        return "color:black";
    }
  }}
`;
