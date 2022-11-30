import SendViewModel from './model';
import React, { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';
import {Container, Divider, Loader, Modal, TransitionablePortal} from 'semantic-ui-react';
import BTCValue from './BTCValue';
import CloseIcon from '../../Icons/CloseIcon';
import { trackSendClick, trackSendConfirm } from '../../../tracking';
import {
  MiddleTitleHeader,
  CloseContainer,
  AddressBox
} from './styles';
import { Button, Caption, Popup } from '../../../kits';
import InfoIcon from '../../Icons/InfoIcon';

export type ConfirmModalProps = {
  model: SendViewModel;
};

const ConfirmModal: FunctionComponent<ConfirmModalProps> = observer(props => {
  const { model } = props;

  return (
    <TransitionablePortal
      open={model.confirmOpen}
      transition={{ animation: 'fade up', duration: '300' }}
      trigger={
        <Button
          onClick={() => {
            trackSendClick(model.network);
            model.setConfirmOpen(true);
          }}
          primary
          style={{ maxWidth: 176 }}
          disabled={!model.valid}
        >
          Top Up
        </Button>
      }
    >
      <Modal
        style={{ width: 440, marginTop: 72, borderRadius: 20, position: 'relative' }}
        open={true}
        openOnTriggerClick={model.valid}
      >
        {model.isSending ?
          <><Loader content='Continue at MetaMask' /></> :
          <>
            <Container className={'colored-container'}>
              <MiddleTitleHeader>
                <p>Top Up</p>
              </MiddleTitleHeader>

              <CloseContainer><CloseIcon onClick={() => model.setConfirmOpen(false)} /></CloseContainer>

              <div className={'modal-confirm-box vertical-center'}>
                <span className={'text-weight-bold text-secondary confirm-top-span'}>
                  {'You\'re Sending'}
                </span>
                <div className={'confirm-btc-box'}>
                  <BTCValue
                    value={model.amountText}
                    size={'large'}
                    fontWeight={'normal'}
                    unit={model.mainUnit}
                  />
                </div>
                <span className={'text-weight-bold text-secondary confirm-middle-span'}>
                  To
                </span>
                <AddressBox>
                  <Caption>{model.to}</Caption>
                  <Popup 
                    position='top center'
                    content={<span>This receive address is used for topping up your lightning wallet.</span>}
                    trigger={<InfoIcon />}
                    wide
                  />
                </AddressBox>
              </div>
            </Container>

            <Container className={'modal-confirm-section'}>
              <div className={'modal-section'}>
                <div className={'flex row space-between'}>
                  <span className={'text-secondary text-weight-bold confirm-bottom-span'}>Amount</span>
                  <BTCValue
                    value={model.amountText}
                    size={'normal'}
                    fontWeight={'normal'}
                    unit={model.mainUnit}
                  />
                </div>
                <div className={'flex row space-between'}>
                  <span className={'text-secondary text-weight-bold confirm-bottom-span'}>Fee</span>
                  <BTCValue
                    value={model.feeText}
                    size={'normal'}
                    fontWeight={'normal'}
                    unit={model.mainUnit}
                  />
                </div>
                <Divider className={'bottom-divider'} />
                <div className={'flex row space-between confirm-amount-section'}>
                  <span className={'text-secondary text-weight-bold'}>
                    Total Amount
                  </span>
                  <BTCValue
                    value={model.totalAmount}
                    size={'normal'}
                    fontWeight={'bold'}
                    unit={model.sendInitUnit}
                  />
                </div>
                <p className='currencyValue'>=<span>{model.totalCurrency}</span> USD</p>
              </div>
              <Button
                style={{ marginTop: 44 }}
                primary
                onClick={() => {
                  trackSendConfirm(model.network);
                  model.send();
                }}>
                Confirm
              </Button>
            </Container>
          </>
        }
      </Modal>
    </TransitionablePortal>
  );
});

export default ConfirmModal;
