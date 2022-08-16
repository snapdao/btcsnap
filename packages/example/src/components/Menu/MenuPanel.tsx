import React, { useRef } from "react";
import SettingIcon from "./image/settings.svg"
import GitHub from "./image/github.svg"
import Discord from "./image/discord.svg"
import Disconnect from "./image/disconnect.svg"
import { useOutsideCallback } from "./useOutsideClick";
import { useKeystoneStore } from "../../mobx";

interface MenuPanelProps {
  close: () => void;
  openSettingModal: () => void;
}

const MenuPanel = ({close, openSettingModal}: MenuPanelProps) => {
  const { global: { updateBip44Xpub } } = useKeystoneStore();
  const menuPanelRef = useRef(null);
  useOutsideCallback(menuPanelRef, close);

  const disconnect = () => {
    updateBip44Xpub("");
    close()
  }

  return (
    <div ref={menuPanelRef} className="Menu-items-container">
      <div className="Menu-item" onClick={openSettingModal}>
        <img src={SettingIcon} alt="Settings"/>
        <span>Settings</span>
      </div>
      <div className="Menu-item" onClick={close}>
        <a href="https://github.com/KeystoneHQ/btcsnap" target="_blank" rel="noopener noreferrer">
          <img src={GitHub} alt="GitHub"/>
          <span>GitHub</span>
        </a>
      </div>
      <div className="Menu-item" onClick={close}>
        <a href="https://keyst.one/discord" target="_blank" rel="noopener noreferrer">
          <img src={Discord} alt="Discord"/>
          <span>Feedback</span>
        </a>
      </div>
      <hr className="Menu-divider"/>
      <div className="Menu-item highlight" onClick={disconnect}>
        <img src={Disconnect} alt="Disconnect"/>
        <span>Disconnect</span>
      </div>
    </div>
  );
};

export default MenuPanel;
