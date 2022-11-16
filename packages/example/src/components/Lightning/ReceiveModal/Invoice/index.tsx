import { Container } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import BigNumber from 'bignumber.js';
import ModalHeader from '../../../../kits/ModalHeader';
import ModalBackground from '../../../../kits/ModalBackground';
import { H3 } from '../../../Layout/Text/Title';
import ReceiveViewModel from '../model';
import { FlexCenter } from '../../../Layout/Flex';
import {
  Amount,
  Unit,
  BodyContainer,
  Expire,
  ExpireValue,
  AddressBox,
  Description,
  DescriptionPopup,
} from './styles';
import { Popup } from 'snapkit';
import { useEffect, useMemo, useState } from 'react';
import useCountDown from '../../../../hook/useCountdown';
import { Modal } from '../../../../kits';

type LightningReceiveQRCodeModalProps = {
  close: () => void;
  model: ReceiveViewModel;
};

const LightningReceiveQRCodeModal = observer(
  ({ model, close }: LightningReceiveQRCodeModalProps) => {
    const [isExpired, setIsExpired] = useState(false);
    const [date, { start, pause }] = useCountDown({
      startTimeMilliseconds: model.expiredDate,
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
        onClose={close}
        open={true}
        closeOnDimmerClick={false}>
        <ModalBackground>
          <ModalHeader onClose={() => close()}>
            <H3>Lightning Invoice</H3>
          </ModalHeader>
          <Container style={{ padding: '24px 0 100px' }}>
            <FlexCenter style={{ alignItems: 'baseline' }}>
              <Amount>{model.amountText}</Amount>
              <Unit>{model.mainUnit}</Unit>
            </FlexCenter>
            <FlexCenter>
              {!isExpired ? (
                <>
                  <Expire>Expires in:</Expire>
                  <ExpireValue>{countDownFormat}</ExpireValue>
                </>
              ) : (
                <ExpireValue>expired !</ExpireValue>
              )}
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

export default LightningReceiveQRCodeModal;
