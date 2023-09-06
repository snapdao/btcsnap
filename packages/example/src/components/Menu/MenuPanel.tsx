import React, { useRef } from 'react';
import { ReactComponent as SettingIcon } from '../../assets/settings.svg';
import { ReactComponent as GitHub } from './image/github.svg';
import { ReactComponent as Discord } from './image/discord.svg';
import { ReactComponent as Disconnect } from './image/disconnect.svg';
import { ReactComponent as Connect } from './image/connect.svg';
import { useOutsideCallback } from './useOutsideClick';
import { useAppStore } from '../../mobx';
import {
  MenuItemsContainer,
  MenuItem,
  MenuItemSpan,
  MenuItemLink,
  MenuDivider,
  MenuItemIsConnect,
} from './styles';

interface MenuPanelProps {
  openSettingModal: () => void;
  close: () => void;
}

const MenuPanel = ({ openSettingModal, close }: MenuPanelProps) => {
  const {
    disconnectAccount,
    current,
    runtime: { continueConnect },
  } = useAppStore();
  const menuPanelRef = useRef(null);
  useOutsideCallback(menuPanelRef, close);

  const disconnect = () => {
    disconnectAccount();
    close();
  };

  return (
    <MenuItemsContainer ref={menuPanelRef}>
      <MenuItem onClick={openSettingModal}>
        <SettingIcon />
        <MenuItemSpan>Settings</MenuItemSpan>
      </MenuItem>
      <MenuItem onClick={close}>
        <MenuItemLink
          href='https://github.com/snapdao/btcsnap'
          target='_blank'
          rel='noopener noreferrer'>
          <GitHub />
          <MenuItemSpan>GitHub</MenuItemSpan>
        </MenuItemLink>
      </MenuItem>
      <MenuItem onClick={close}>
        <MenuItemLink
          href='https://discord.gg/P22cvXpybj'
          target='_blank'
          rel='noopener noreferrer'>
          <Discord />
          <MenuItemSpan>Feedback</MenuItemSpan>
        </MenuItemLink>
      </MenuItem>
      <MenuDivider />
      {current ? (
        <MenuItem onClick={disconnect}>
          <Disconnect />
          <MenuItemIsConnect>Disconnect</MenuItemIsConnect>
        </MenuItem>
      ) : (
        <MenuItem onClick={continueConnect}>
          <Connect />
          <MenuItemIsConnect connect>Connect</MenuItemIsConnect>
        </MenuItem>
      )}
    </MenuItemsContainer>
  );
};

export default MenuPanel;
