import * as React from "react";
import { Modal as RNModal } from "react-native";
import styled from "styled-components/native";

interface IModalProps {
  isShown: boolean;
  children: React.ReactNode;
  height?: number;
  onDismiss: () => void;
}

export const Modal: React.FC<IModalProps> = ({
  isShown,
  onDismiss,
  height,
  children,
}) => {
  return (
    <RNModal
      animated
      animationType="fade"
      visible={isShown}
      transparent
      onRequestClose={onDismiss}
    >
      <ModalOverlay>
        <ModalInner>{children}</ModalInner>
      </ModalOverlay>
    </RNModal>
  );
};

const ModalOverlay = styled.View`
  background-color: rgba(0, 0, 0, 0.2);
  flex: 1;
  justify-content: flex-end;
`;

const ModalInner = styled.View`
  background-color: white;
  padding: 20px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  height: 200px;
`;
