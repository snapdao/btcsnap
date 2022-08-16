import React, { useCallback, useState } from "react";
import MenuIcon from "./image/menu.svg";
import MenuPanel from "./MenuPanel";
import Settings from "../Settings";
import "./index.css"

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
      <Settings open={isSettingModalOpen} close={closeSettingModal} />
    </div>
  );
};

export default Menu;