import React from 'react';
import { Modal, ModalProps } from "semantic-ui-react";
import "./Modal.css"

interface ConnectModalProps extends ModalProps {
  open: boolean;
  children: JSX.Element | JSX.Element[];
}

const BasicModal = ({open, close, children}: ConnectModalProps) => {
  return (
    <Modal
      size="mini"
      className="Connect-Modal-Container"
      open={open}
      onClose={close}
    >
      <Modal.Content>
        <div className="Connect-Modal-Content">
          
          {children}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default BasicModal;
