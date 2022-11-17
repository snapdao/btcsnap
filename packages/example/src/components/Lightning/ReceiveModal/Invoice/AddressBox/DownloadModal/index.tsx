import { observer } from 'mobx-react-lite';
import { QRCodeCanvas } from 'qrcode.react';
import { forwardRef, useMemo } from 'react';
import dayjs from 'dayjs';
import ModalBackground from '../../../../../../kits/ModalBackground';
import ModalHeader from '../../../../../../kits/ModalHeader';
import BitcoinIcon from '../../../../../Icons/BitcoinIcon';
import LightningIcon from '../../../../../Icons/LightningIcon';
import { FlexCenter } from '../../../../../Layout/Flex';
import { Caption } from '../../../../../Layout/Text/Body';
import { H3 } from '../../../../../Layout/Text/Title';
import ReceiveViewModel from '../../../model';
import { CaptionN60, CaptionN80, Unit } from '../../styles';
import { AddressContainer, ContainerMask } from '../styles';
import {
  Container,
  Amount,
  Footer,
  Tip,
  AmountBox,
  Description,
  DownloadHiddenModal,
} from './styles';

export const DownloadModal = observer(
  forwardRef(({ model }: { model: ReceiveViewModel }, ref: any) => {
    const expiredDate = useMemo(() => {
      if (!model.expiredDate) return '';
      return dayjs(model.expiredDate).format('HH:mm MMM DD[,] YYYY');
    }, [model.expiredDate]);

    return (
      <DownloadHiddenModal ref={ref}>
        <ModalBackground style={{ height: 304 }}>
          <ModalHeader>
            <H3>Lightning Invoice</H3>
          </ModalHeader>
          <AddressContainer style={{ marginTop: 24, width: 360, height: 360 }}>
            <ContainerMask noHover>
              <LightningIcon />
            </ContainerMask>
            <QRCodeCanvas value={model.qrcode} size={320} />
          </AddressContainer>
        </ModalBackground>
        <Container style={{ marginTop: 156 }}>
          <FlexCenter style={{ width: '100%', flexDirection: 'column' }}>
            <Tip>Please Pay</Tip>
            <AmountBox>
              <Amount>{model.amountText}</Amount>
              <Unit style={{ marginLeft: 6 }}>{model.defaultUnit}</Unit>
            </AmountBox>
            <FlexCenter style={{ marginTop: 16 }}>
              <CaptionN60>Expires:</CaptionN60>
              <CaptionN80 style={{ marginLeft: 8 }}>{expiredDate}</CaptionN80>
            </FlexCenter>
            <Description>{model.description}</Description>
            <Footer>
              <BitcoinIcon size={20} />
              <Caption style={{ color: 'var(--c-n60)', marginLeft: 8 }}>
                btc.justsnap.io
              </Caption>
            </Footer>
          </FlexCenter>
        </Container>
      </DownloadHiddenModal>
    );
  }),
);
