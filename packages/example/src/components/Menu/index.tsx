import React, { useCallback, useState } from "react";
import MenuIcon from "./image/menu.svg";
import MenuPanel from "./MenuPanel";
import "./Menu.css"
import { Modal } from "semantic-ui-react";

const Menu = () => {
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState<boolean>(false);

  const openMenuPanel = useCallback(() => {
    setIsPanelOpen(true)
  }, [setIsPanelOpen])

  const closeMenuPanel = useCallback(() => {
    setIsPanelOpen(false)
  }, [setIsPanelOpen])

  const openSettingModal = useCallback(() => {
    setIsSettingModalOpen(true)
    setIsPanelOpen(false)
  }, [setIsPanelOpen, setIsSettingModalOpen])

  const closeSettingModal = useCallback(() => {
    setIsSettingModalOpen(false)
  }, [setIsSettingModalOpen])

  return (
    <div className="Menu-container">
      <div className="Menu-button" onClick={openMenuPanel}>
        <img src={MenuIcon} alt="Menu" />
      </div>
      {
        isPanelOpen && <MenuPanel close={closeMenuPanel} openSettingModal={openSettingModal} />
      }
      <Modal
        onClose={closeSettingModal}
        open={isSettingModalOpen}
      >
        <Modal.Header>
          Settings
        </Modal.Header>
        <Modal.Content>
          WIP
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Menu;