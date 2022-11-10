import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ReactComponent as LightningIcon } from '../image/lightning.svg';
import CloseIcon from '../../Icons/CloseIcon';
import {
  CreateWalletModal,
  CreateContentTop,
  CreateContentBottom,
  CreateContent,
  CreateTitle,
  CreateInput,
  CreateLNWalletButton,
  ImportLNWalletLink,
} from './styles';
import { CloseContainer, Header } from '../styles';
import { TransitionablePortal } from 'semantic-ui-react';
import { useAppStore } from '../../../mobx';
import LoadingIcon from '../../Icons/Loading';

interface CreateWalletProps {
  close: () => void;
  create: (name: string) => void;
  loading: boolean;
}

const CreateWallet = observer(
  ({ close, loading, create }: CreateWalletProps) => {
    const [walletName, setWalletName] = useState('');
    const {
      lightning: { nextWalletName },
    } = useAppStore();

    return (
      <TransitionablePortal
        open={true}
        transition={{ animation: 'fade up', duration: '300' }}>
        <CreateWalletModal open={true}>
          <Header>
            <LightningIcon />
            <p>add lightning wallet</p>
          </Header>
          <CloseContainer>
            <CloseIcon onClick={close} />
          </CloseContainer>

          <CreateContent>
            <CreateContentTop>
              <CreateTitle>wallet name</CreateTitle>
              <CreateInput
                onInput={({ target }: React.ChangeEvent<HTMLInputElement>) => {
                  setWalletName(target.value);
                }}
                autoFocus
                placeholder={nextWalletName}
              />
            </CreateContentTop>
            <CreateContentBottom>
              <CreateLNWalletButton
                onClick={() => create(walletName)}
                disabled={loading}>
                {loading ? <LoadingIcon spin /> : 'create lightning wallet'}
              </CreateLNWalletButton>
              <ImportLNWalletLink>import lightning wallet</ImportLNWalletLink>
            </CreateContentBottom>
          </CreateContent>
        </CreateWalletModal>
      </TransitionablePortal>
    );
  },
);

export default CreateWallet;
