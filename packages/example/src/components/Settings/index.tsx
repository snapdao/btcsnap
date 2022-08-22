import React from "react";
import { useKeystoneStore } from "../../mobx";
import { BitcoinNetwork } from "../../interface";
import Modal from "./Modal";
import { observer } from "mobx-react-lite";
import NetworkIcon from "../Icons/Network";
import SwitchIcon from "../Icons/SwitchIcon";
import CloseIcon from "../Icons/CloseIcon";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import "./index.css";

interface SettingProps {
  open: boolean;
  close: () => void;
}

const Settings = observer(({open, close}: SettingProps) => {
  const { global: { network, updateNetwork }} = useKeystoneStore();

  const changeNetwork = () => {
    const targetNetwork = network === BitcoinNetwork.Main ? BitcoinNetwork.Test : BitcoinNetwork.Main
    updateNetwork(targetNetwork);
  }

  return (
    <Modal open={open}>
      <div className="Setting-Container">
        <div className="Setting-Header">
          <div className="Setting-Label">
            <SettingsIcon />
            <h3>Settings</h3>
          </div>
          <CloseIcon onClick={close} />
        </div>
        <div className="Setting-Content">
          <div className="Setting-ItemList">
            <div className="Setting-Item Setting-Network" onClick={changeNetwork}>
              <span>Network</span>
              <span className="Setting-Network-Switcher">
                <NetworkIcon network={network} />
                <span>{network}</span>
                <SwitchIcon />
              </span>
            </div>
            <div className="Setting-Item">
              <span>Version</span>
              <span>V0.9.0 Alpha</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default Settings;
