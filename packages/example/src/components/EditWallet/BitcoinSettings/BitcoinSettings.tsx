import React, { useState } from 'react';
import { useAppStore } from '../../../mobx';
import { observer } from 'mobx-react-lite';
import ArrowRight from '../../Icons/ArrowRight';
import { DynamicAddressContainer, SettingContent, SettingItem, SettingRadio, } from './styles';
import { AddressType, addressTypeOptions } from './AddressType';
import { Message, Popup } from '../../../kits';
import InfoIcon from '../../Icons/InfoIcon';

enum SettingOptions {
  AddressType,
}

export const BitcoinSettings = observer(() => {
  const { settings: { scriptType, dynamicAddress, setDynamicAddress, changeAddress, setChangeAddress } } = useAppStore();
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
        <DynamicAddressContainer>
          Dynamic Address
          <Popup
            wide
            content={'When enabled, a new Bitcoin address will be generated for each time a deposit is received to maximize your privacy.'}
            trigger={<span><InfoIcon /></span>}
          />
        </DynamicAddressContainer>
        <span>
          <SettingRadio toggle checked={dynamicAddress}/>
        </span>
      </SettingItem>

      <SettingItem
        onClick={() => {
          setChangeAddress(!changeAddress);
          showSettingChangedTips();
        }}>
        <DynamicAddressContainer>
          Change Address
          <Popup
            wide
            content={'When enabled, change address will be used when a transfer is made to maximize your privacy.'}
            trigger={<span><InfoIcon /></span>}
          />
        </DynamicAddressContainer>
        <span>
          <SettingRadio toggle checked={changeAddress}/>
        </span>
      </SettingItem>

      {
        showSettingSuccessMessage && <Message>Changed Successfully</Message>
      }
    </SettingContent>
  );
});
