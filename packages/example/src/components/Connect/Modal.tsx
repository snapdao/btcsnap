import React from 'react';
import { Modal } from "semantic-ui-react";
import { useKeystoneStore } from '../../mobx';
import CloseIcon from '../Icons/CloseIcon';
import "./Modal.css"

interface ConnectModalProps {
  open: boolean;
  close: () => void;
  children: JSX.Element | JSX.Element[];
  isDisabled?: boolean
}

const BasicModal = ({open, close, children, isDisabled = false}: ConnectModalProps) => {
  return (
    <Modal
      size="mini"
      className="Connect-Modal-Container"
      open={open}
    >
      <Modal.Content>
        <CloseIcon onClick={() =>!isDisabled && close() } isDisabled={isDisabled} />
        <div className="Connect-Modal-Content">
          {children}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default BasicModal;
