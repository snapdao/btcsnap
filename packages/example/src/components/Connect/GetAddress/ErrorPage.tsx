import React from 'react';
import { Modal } from 'semantic-ui-react';
import { ReactComponent as SendFailed } from '../../../assets/send_failed.svg';
import CloseIcon from '../../Icons/CloseIcon';
import '../Modal.css';
import {
  Button,
  FailedIconContainer,
  FailedTitle,
  FailedText
} from './styles';
import { ModalHeader } from '../styles';

interface ErrorProps {
  open: boolean;
  close: () => void;
  fatalErrorMessage: {
    code: number,
    message: string
  };
}

export const ErrorPage = ({ open, close, fatalErrorMessage }: ErrorProps) => {
  return (
    <Modal
      size='mini'
      className='Connect-Modal-Container'
      open={open}
    >
      <Modal.Content>
        <ModalHeader>
          <CloseIcon onClick={close}/>
        </ModalHeader>
        <div className='Connect-Modal-Content'>
          <FailedIconContainer>
            <SendFailed />
          </FailedIconContainer>

          <FailedTitle>something went wrong</FailedTitle>

          <FailedText>{fatalErrorMessage.message}<span> [{fatalErrorMessage.code}] </span>.</FailedText>

          <Button onClick={close}>OK</Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};
