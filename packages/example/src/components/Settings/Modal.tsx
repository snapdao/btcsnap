import React from 'react';
import { Modal, ModalProps } from "semantic-ui-react";
import "./Modal.css"

const SettingsModal = ({open, close, children}: ModalProps) => {
  return (
    <Modal
      size="tiny"
      className="Settings-Modal-Container"
      open={open}
      onClose={close}
    >
      <Modal.Content>
        {children}
      </Modal.Content>
    </Modal>
  );
};

export default SettingsModal;
