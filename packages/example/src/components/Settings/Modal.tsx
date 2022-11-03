import React from 'react';
import { Modal, ModalProps, TransitionablePortal } from "semantic-ui-react";
import "./Modal.css"

const SettingsModal = ({open, close, children}: ModalProps) => {
  return (
    <TransitionablePortal
      open={true}
      transition={{animation: 'fade up', duration: '300'}}
      closeOnDocumentClick={false}
    >
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
    </TransitionablePortal>
  );
};

export default SettingsModal;
