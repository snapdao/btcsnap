import React, { useState } from 'react';
import { useAppStore } from '../../../mobx';
import { observer } from 'mobx-react-lite';
import ArrowRight from '../../Icons/ArrowRight';
import { SettingContent, SettingItem, SettingRadio, } from './styles';
import { AddressType, addressTypeOptions } from './AddressType';
import { Message } from '../../../kits';

enum SettingOptions {
  AddressType,
}

export const BitcoinSettings = observer(() => {
  const {settings: {scriptType, dynamicAddress, setDynamicAddress}} = useAppStore();
  const [currentVisible, setCurrentVisible] = useState<SettingOptions | null>();
  const [showSettingSuccessMessage, setShowSettingSuccessMessage] = useState<boolean>(false);
  const openDialog = (option: SettingOptions) => {
    setCurrentVisible(option);
  };

  const closeDialog = () => {
    setCurrentVisible(null);
  };

  const showSettingChangedTips = () => {
    setShowSettingSuccessMessage(true);
    setTimeout(() => {
      setShowSettingSuccessMessage(false);
    }, 1500);
  };

  return (
    <SettingContent>
      <SettingItem onClick={() => openDialog(SettingOptions.AddressType)}>
        <span>Address Type</span>
        <span>
          <span>
            {
              addressTypeOptions.find(
                (option) => option.type === scriptType,
              )?.label
            }
          </span>
          <ArrowRight size={18}/>
        </span>
      </SettingItem>
      {currentVisible === SettingOptions.AddressType && (
        <AddressType
          open={true}
          close={closeDialog}
          onChanged={() => {
            closeDialog();
            showSettingChangedTips();
          }}
        />
      )}

      <SettingItem
        onClick={() => {
          setDynamicAddress(!dynamicAddress);
          showSettingChangedTips();
        }}>
        <span>Dynamic Address</span>
        <span>
          <SettingRadio toggle checked={dynamicAddress}/>
        </span>
      </SettingItem>

      {
        showSettingSuccessMessage && <Message>Setting Changed Success</Message>
      }
    </SettingContent>
  );
});
