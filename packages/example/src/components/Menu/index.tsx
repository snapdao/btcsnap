import React, { useCallback, useState } from 'react';
import { ReactComponent as MenuIcon } from './image/menu.svg';
import MenuPanel from './MenuPanel';
import Settings from '../Settings';
import { Transition } from 'semantic-ui-react';
import { MenuContainer, MenuButton } from './styles';

const Menu = () => {
  const [isSettingModalOpen, setIsSettingModalOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const closeMenuPanel = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const openSettingModal = useCallback(() => {
    setIsSettingModalOpen(true);
    setVisible(false);
  }, [setIsSettingModalOpen]);

  const closeSettingModal = useCallback(() => {
    setIsSettingModalOpen(false);
  }, [setIsSettingModalOpen]);

  const settingClick = useCallback(() => {
    setVisible(visible => !visible);
  }, [setVisible]);

  return (
    <MenuContainer>
      <MenuButton onClick={settingClick}>
        <MenuIcon />
      </MenuButton>
      <Transition.Group animation={'slide down'} duration={'200'}>
        {visible && (
          <div>
            <MenuPanel openSettingModal={openSettingModal} close={closeMenuPanel} />
          </div>
        )}
      </Transition.Group>
      { isSettingModalOpen && <Settings open={isSettingModalOpen} close={closeSettingModal} />}
    </MenuContainer>
  );
};

export default Menu;
