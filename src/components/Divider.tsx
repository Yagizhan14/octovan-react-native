import * as React from "react";
import styled from "styled-components/native";

export const Divider: React.FC<{}> = () => {
  return <DividerView />;
};

const DividerView = styled.View`
  margin: 8px 0;
  border-top-width: 1px;
  border-top-color: black;
`;
