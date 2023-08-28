import { Modal } from 'semantic-ui-react';
import { TransitionablePortal } from 'semantic-ui-react';
import CloseIcon from '../Icons/CloseIcon';

import {
  ModalHeader,
  ModalHeaderContainer,
  ModalHeaderLabel,
  MaskArea,
  AboutSectionContainer
} from './styles';

interface ConnectProps {
  open: boolean;
  close: () => void;
}

const AboutZion = (({ open, close }: ConnectProps) => {

  return (
    <TransitionablePortal
      open={open}
      transition={{ animation: 'fade up', duration: '300' }}
    >
      <Modal
        open
        style={{ width: '440px', height: 250, marginTop: 390, borderRadius: '20px' }}
      >
        <ModalHeader style={{ paddingLeft: 155 }}>
          <ModalHeaderContainer>
            <ModalHeaderLabel>About Zion</ModalHeaderLabel>
          </ModalHeaderContainer>
          <CloseIcon onClick={close} />
        </ModalHeader>
        <AboutSectionContainer>
          <p>Zion is a program based off MetaMask.</p>
          <p>Zion is a web platform operated and developed by Yanssie HK Limited. Services include but not limited to, accessing any website or application on the platform, and any services offered through the btcsnap platform.</p>
          <MaskArea />
        </AboutSectionContainer>
      </Modal>
    </TransitionablePortal>
  );
});

export default AboutZion;
