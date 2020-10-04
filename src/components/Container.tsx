import * as React from "react";
import styled from "styled-components/native";

interface IContainerProps {
  children: React.ReactNode;
  centered?: boolean;
}

export const Container = styled.View<IContainerProps>`
  flex: 1;

  ${({ centered }) => {
    switch (centered) {
      case true:
        return "justify-content:center;align-items:center";
      default:
        return;
    }
  }}
`;
