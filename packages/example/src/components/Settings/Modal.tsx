import React from 'react';
import { ModalProps } from 'semantic-ui-react';
import { Modal } from '../../kits';
import './Modal.css';

const SettingsModal = ({ open, close, children }: ModalProps ) => {
  return (
    <Modal
      size='tiny'
      className='Settings-Modal-Container'
      open={open}
      close={close}
    >
      {children}
    </Modal>
  );
};

export default SettingsModal;
