import React, { useEffect, useState } from 'react';
import { Modal } from "semantic-ui-react";
import { useAppStore } from '../../mobx';
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
      className={'Connect-Modal-Container fade-in'}
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
