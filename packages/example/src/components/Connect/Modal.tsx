import React from 'react';
import { Modal } from "semantic-ui-react";
import "./Modal.css"

interface ConnectModalProps {
  open: boolean;
  children: JSX.Element | JSX.Element[];
}

const BasicModal = ({open, children}: ConnectModalProps) => {
  return (
    <Modal
      size="mini"
      className="Connect-Modal-Container"
      open={open}
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
