import { Modal } from 'semantic-ui-react';
import { TransitionablePortal } from 'semantic-ui-react';
import CloseIcon from '../Icons/CloseIcon';
import {
  ModalHeader,
  ModalHeaderContainer,
  ModalHeaderLabel,
  TermsContainer,
  MaskArea
} from './styles';

interface ConnectProps {
  open: boolean;
  close: () => void;
}

const TermsOfService = (({ open, close }: ConnectProps) => {
  return (
    <TransitionablePortal
      open={open}
      transition={{ animation: 'fade up', duration: '300' }}
    >
      <Modal
        open={true}
        style={{ width: '440px', height: '568px', marginTop: '72px', borderRadius: '20px' }}
      >
        <ModalHeader>
          <ModalHeaderContainer>
            <ModalHeaderLabel>Terms Of Service</ModalHeaderLabel>
          </ModalHeaderContainer>
          <CloseIcon onClick={close} />
        </ModalHeader>
        <TermsContainer>
          <p>Last updated: April 15th, 2021</p>
          <h2>General</h2>
          <p>
            By using Keystone Products and Services, you consent to the privacy practices described in this Policy.
            This Policy is incorporated into and is subject to the Terms of Use for the Keystone Products and Services you use.
          </p>
          <h2>Governing Law and Dispute Resolution</h2>
          <p>
            This Policy is governed by the laws of the Hong Kong SAR without regard to conflict of law principles.
            If a lawsuit or court proceeding is permitted.com under this Policy,then you and Yanssie HK Limited agree to
            submit to the personal and exclusive jurisdiction of the courts located within Hong Kong SAR for the purpose of
            litigating any dispute.
          </p>
          <p>
            This Policy is governed by the laws of the Hong Kong SAR without regard to conflict of law principles.
            If a lawsuit or court proceeding is permitted under this Policy, then you and Yanssie HK Limited agree to submit to
            the personal and exclusive jurisdiction of the courts located within Hong Kong SAR for the purpose of litigating any
            dispute.
          </p>
          <MaskArea />
        </TermsContainer>
      </Modal>
    </TransitionablePortal>
  );
});

export default TermsOfService;
