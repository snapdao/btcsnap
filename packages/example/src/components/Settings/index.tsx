import React, { useRef, useState } from 'react';
import Modal from './Modal';
import { observer } from 'mobx-react-lite';
import CloseIcon from '../Icons/CloseIcon';
import NetworkIcon from '../Icons/Network';
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg';
import {
  SettingHeader,
  SettingLabel,
  SettingContent,
  SettingItem,
} from './styles';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';
import Divider from '../../kits/Divider';
import ArrowRight from '../Icons/ArrowRight';
import { VERSION } from '../../config';
import Network from './Network';
import { useAppStore } from '../../mobx';
import { WalletType } from '../../interface';
import { Popup } from '../../kits';
import AboutZion from './About';

interface SettingProps {
  open: boolean;
  close: () => void;
}

enum SettingOptions {
  Network,
  AddressType,
  Terms,
  Privacy,
  About,
}

const SHOW_POLICY_RELATED_SETTINGS = false;

const Settings = observer(({ open, close }: SettingProps) => {
  const { settings: { network }, currentWalletType } = useAppStore();
  const parentNode = useRef(null);
  const [currentVisible, setCurrentVisible] = useState<SettingOptions | null>();
  const openDialog = (option: SettingOptions) => {
    setCurrentVisible(option);
  };

  const closeDialog = () => {
    setCurrentVisible(null);
  };

  return (
    <Modal open={open}>
      <SettingHeader>
        <SettingLabel>
          <SettingsIcon />
          <h3>Settings</h3>
        </SettingLabel>
        <CloseIcon onClick={close} />
      </SettingHeader>

      <SettingContent ref={parentNode}>
        <Popup
          disabled={currentWalletType === WalletType.BitcoinWallet}
          wide
          trigger={
            <SettingItem
              aria-disabled={currentWalletType !== WalletType.BitcoinWallet}
              onClick={() => {
                if(currentWalletType === WalletType.BitcoinWallet){
                  openDialog(SettingOptions.Network);
                }
              }}
            >
              <span>Network</span>
              <span>
                <NetworkIcon network={network} />
                <span>{network}</span>
                <ArrowRight size={18} />
              </span>
            </SettingItem>
          }
          content={'Only available in the Bitcoin wallet'}
        />

        {parentNode.current && <Network open={currentVisible === SettingOptions.Network} close={closeDialog} parentNode={parentNode.current} />}

        <Divider style={{ margin: '16px 12px', width: 376 }} />

        {
          SHOW_POLICY_RELATED_SETTINGS ? (
            <>
              <SettingItem onClick={() => openDialog(SettingOptions.Terms)}>
                <span>Terms of Service</span>
                <span><ArrowRight size={18} /></span>
              </SettingItem>
              <TermsOfService open={currentVisible === SettingOptions.Terms} close={closeDialog} />

              <SettingItem onClick={() => openDialog(SettingOptions.Privacy)}>
                <span>Privacy Policy</span>
                <span><ArrowRight size={18} /></span>
              </SettingItem>
              <PrivacyPolicy open={currentVisible === SettingOptions.Privacy} close={closeDialog} />
              <Divider style={{ margin: '16px' }} />
            </>
          ) : null
        }

        <SettingItem onClick={() => openDialog(SettingOptions.About)} >
          <span>About Zion</span>
          <span>
            <ArrowRight size={18} />
          </span>
        </SettingItem>
        {currentVisible === SettingOptions.About && <AboutZion open close={closeDialog} />}
        <SettingItem>
          <span>Version</span>
          <span>v{VERSION}</span>
        </SettingItem>
      </SettingContent>
    </Modal>
  );
});

export default Settings;
