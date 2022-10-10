import React, { useState } from "react";
import { useKeystoneStore } from "../../mobx";
import Modal from "./Modal";
import { observer } from "mobx-react-lite";
import NetworkIcon from "../Icons/Network";
import CloseIcon from "../Icons/CloseIcon";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { Divider } from "semantic-ui-react";
import ArrowRight from "../Icons/ArrowRight";
import { SettingHeader, SettingLabel, SettingContent, SettingItem, SettingRadio } from "./styles"
import AddressType, { addressTypeOptions } from "./AddressType";
// TODO:Hide before on-line.
// import TermsOfService from "./TermsOfService";
// import PrivacyPolicy from "./PrivacyPolicy";
import Network from "./Network";
import { VERSION } from "../../config";

interface SettingProps {
  open: boolean;
  close: () => void;
}

enum SettingOptions {
  Network,
  AddressType,
  Terms,
  Privacy,
}

const Settings = observer(({open, close}: SettingProps) => {
  const { settings: { network, scriptType, dynamicAddress, setDynamicAddress }, current} = useKeystoneStore();
  const [currentVisible, setCurrentVisible] = useState<SettingOptions | null>();
  const openDialog = (option: SettingOptions) => {
    setCurrentVisible(option);
  }

  const closeDialog = () => {
    setCurrentVisible(null);
  }

  return (
    <Modal open={open}>
      <SettingHeader>
        <SettingLabel>
          <SettingsIcon />
          <h3>Settings</h3>
        </SettingLabel>
        <CloseIcon onClick={close} />
      </SettingHeader>

      <SettingContent>
        {current &&
          <>
            <SettingItem onClick={() => openDialog(SettingOptions.Network)}>
              <span>Network</span>
              <span>
                <NetworkIcon network={network} />
                <span>{network}</span>
                <ArrowRight size={18} />
              </span>
            </SettingItem>
            <Network open={currentVisible === SettingOptions.Network} close={closeDialog} />

            <SettingItem onClick={() => openDialog(SettingOptions.AddressType)} >
              <span>Address Type</span>
              <span>
                <span>{addressTypeOptions.find(option => option.type === scriptType)!.label}</span>
                <ArrowRight size={18} />
              </span>
            </SettingItem>
            <AddressType open={currentVisible === SettingOptions.AddressType} close={closeDialog} />

            <SettingItem onClick={() => { setDynamicAddress(!dynamicAddress)} } >
              <span>Dynamic Address</span>
              <span><SettingRadio toggle checked={dynamicAddress} /></span>
            </SettingItem>
            <Divider style={{margin: '16px'}} />
          </>
        }
        {/* TODO:Hide before on-line.  */}
        {/* <SettingItem onClick={() => openDialog(SettingOptions.Terms)}>
          <span>Terms of Service</span>
          <span><ArrowRight size={18} /></span>
        </SettingItem>
        <TermsOfService open={currentVisible === SettingOptions.Terms} close={closeDialog} />

        <SettingItem onClick={() => openDialog(SettingOptions.Privacy)}>
          <span>Privacy Policy</span>
          <span><ArrowRight size={18} /></span>
        </SettingItem>
        <PrivacyPolicy open={currentVisible === SettingOptions.Privacy} close={closeDialog} />
        <Divider style={{margin: '16px'}} /> */}

        <SettingItem>
          <span>Version</span>
          <span>V{VERSION}</span>
        </SettingItem>
      </SettingContent>
    </Modal>
  );
});

export default Settings;
