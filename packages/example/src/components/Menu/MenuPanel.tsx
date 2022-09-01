import React, { useRef } from "react";
import { ReactComponent as SettingIcon } from "../../assets/settings.svg"
import { ReactComponent as GitHub } from "./image/github.svg"
import { ReactComponent as Discord } from "./image/discord.svg"
import { ReactComponent as Disconnect } from "./image/disconnect.svg"
import { useOutsideCallback } from "./useOutsideClick";
import { useKeystoneStore } from "../../mobx";
import { updateStoredXpub } from "../../lib/globalStorage";
import { MenuItemsContainer, MenuItem, MenuItemSpan, MenuItemLink, MenuDivider } from "./styles"

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
    <MenuItemsContainer ref={menuPanelRef}>
      <MenuItem onClick={openSettingModal}>
        <SettingIcon />
        <MenuItemSpan>Settings</MenuItemSpan>
      </MenuItem>
      <MenuItem onClick={close}>
        <MenuItemLink href="https://github.com/KeystoneHQ/btcsnap" target="_blank" rel="noopener noreferrer">
          <GitHub />
          <MenuItemSpan>GitHub</MenuItemSpan>
        </MenuItemLink>
      </MenuItem>
      <MenuItem onClick={close}>
        <MenuItemLink href="https://keyst.one/discord" target="_blank" rel="noopener noreferrer">
          <Discord />
          <MenuItemSpan>Feedback</MenuItemSpan>
        </MenuItemLink>
      </MenuItem>
      <MenuDivider />
      <MenuItem onClick={disconnect}>
        <Disconnect />
        <MenuItemSpan>Disconnect</MenuItemSpan>
      </MenuItem>
    </MenuItemsContainer>
  );
};

export default MenuPanel;
