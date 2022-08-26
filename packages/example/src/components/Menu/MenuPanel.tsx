import React, { useRef } from "react";
import { ReactComponent as SettingIcon } from "../../assets/settings.svg"
import { ReactComponent as GitHub } from "./image/github.svg"
import { ReactComponent as Discord } from "./image/discord.svg"
import { ReactComponent as Disconnect } from "./image/disconnect.svg"
import { useOutsideCallback } from "./useOutsideClick";
import { useKeystoneStore } from "../../mobx";
import { updateStoredXpub } from "../../lib/globalStorage";

interface MenuPanelProps {
  close: () => void;
  openSettingModal: () => void;
}

const MenuPanel = ({close, openSettingModal}: MenuPanelProps) => {
  const { global: { updateBip44Xpub, network, updateConnectionStatus } } = useKeystoneStore();
  const menuPanelRef = useRef(null);
  useOutsideCallback(menuPanelRef, close);

  const disconnect = () => {
    updateBip44Xpub("");
    updateStoredXpub("", network);
    updateConnectionStatus(false);
    close();
  }

  return (
    <div ref={menuPanelRef} className="Menu-items-container">
      <div className="Menu-item" onClick={openSettingModal}>
        <SettingIcon />
        <span>Settings</span>
      </div>
      <div className="Menu-item" onClick={close}>
        <a href="https://github.com/KeystoneHQ/btcsnap" target="_blank" rel="noopener noreferrer">
          <GitHub />
          <span>GitHub</span>
        </a>
      </div>
      <div className="Menu-item" onClick={close}>
        <a href="https://keyst.one/discord" target="_blank" rel="noopener noreferrer">
          <Discord />
          <span>Feedback</span>
        </a>
      </div>
      <hr className="Menu-divider"/>
      <div className="Menu-item highlight" onClick={disconnect}>
        <Disconnect />
        <span>Disconnect</span>
      </div>
    </div>
  );
};

export default MenuPanel;
