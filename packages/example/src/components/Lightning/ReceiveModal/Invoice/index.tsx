import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ModalHeader from '../../../../kits/ModalHeader';
import ModalBackground from '../../../../kits/ModalBackground';
import { H3 } from '../../../Layout/Text/Title';
import ReceiveViewModel from '../model';
import { FlexBetween, FlexCenter } from '../../../Layout/Flex';
import {
  Amount,
  Unit,
  ExpireValue,
  AddressBox,
  Description,
  DescriptionPopup,
  CaptionN60,
  CaptionN80,
} from './styles';
import { Popup } from 'snapkit';
import { useEffect, useMemo, useState } from 'react';
import useCountDown from '../../../../hook/useCountdown';
import { Modal } from '../../../../kits';

type LightningReceiveInvoiceModalProps = {
  close: () => void;
  model: ReceiveViewModel;
};

const LightningReceiveInvoiceModal = observer(
  ({ model, close }: LightningReceiveInvoiceModalProps) => {
    const [isExpired, setIsExpired] = useState(false);
    const [date, { start, pause }] = useCountDown({
      startTimeMilliseconds: model.expireCountDown,
      onCountDownEnd() {
        setIsExpired(true);
      },
    });

    useEffect(() => {
      if (model.expiredDate) {
        start();
      }
      return () => {
        pause();
      };
    }, [model.expiredDate]);

    const countDownFormat = useMemo(
      () => `${date.hours}h ${date.minutes}m ${date.seconds}s`,
      [date],
    );

    return (
      <Modal
        style={{
          width: 440,
          height: 640,
          borderRadius: '20px',
          position: 'relative',
        }}
        close={close}
        open={true}
        closeOnDimmerClick={false}>
        <ModalBackground>
          <ModalHeader onClose={() => close()}>
            <H3>Lightning Invoice</H3>
          </ModalHeader>
          <Container style={{ padding: '24px 0 100px' }}>
            <FlexCenter style={{ alignItems: 'baseline' }}>
              <Amount>{model.amountText}</Amount>
              <Unit>{model.defaultUnit}</Unit>
            </FlexCenter>
            <FlexCenter style={{ marginTop: 8 }}>
              <FlexBetween style={{ gap: '0 24px' }}>
                {model.isShowCurrency && (
                  <div>
                    <CaptionN80>{model.amount}</CaptionN80>{' '}
                    <CaptionN60>USD</CaptionN60>
                  </div>
                )}
                <div>
                  {!isExpired ? (
                    <>
                      <CaptionN60>Expires in:</CaptionN60>
                      <ExpireValue>{countDownFormat}</ExpireValue>
                    </>
                  ) : (
                    <ExpireValue>expired !</ExpireValue>
                  )}
                </div>
              </FlexBetween>
            </FlexCenter>
          </Container>
        </ModalBackground>
        <AddressBox model={model} />
        <Popup
          content={<DescriptionPopup>{model.description}</DescriptionPopup>}
          position="top center"
          inverted
          trigger={<Description>{model.description}</Description>}></Popup>
      </Modal>
    );
  },
);

export default LightningReceiveInvoiceModal;
