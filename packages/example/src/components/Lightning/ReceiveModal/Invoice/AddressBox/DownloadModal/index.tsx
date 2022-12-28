import { observer } from 'mobx-react-lite';
import { QRCodeCanvas } from 'qrcode.react';
import { forwardRef, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import BitcoinIcon from '../../../../../Icons/BitcoinIcon';
import LightningIcon from '../../../../../Icons/LightningIcon';
import { FlexCenter } from '../../../../../../kits/Layout/Flex';
import { Caption } from '../../../../../../kits/Layout/Text/Body';
import { H3 } from '../../../../../../kits/Layout/Text/Title';
import ReceiveViewModel from '../../../model';
import { CaptionN60, CaptionN80, Unit } from '../../styles';
import { AddressContainer, ContainerMask } from '../styles';
import { Modal } from '../../../../../../kits';
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

    useEffect(() => {
      model.setDownloadImageReady(true);
    }, []);

    return (
      <DownloadHiddenModal ref={ref}>
        <Modal.Background style={{ height: 304 }}>
          <Modal.Header>
            <H3>Lightning Invoice</H3>
          </Modal.Header>
          <AddressContainer style={{ marginTop: 24, width: 360, height: 360 }}>
            <ContainerMask noHover>
              <LightningIcon />
            </ContainerMask>
            <QRCodeCanvas value={model.qrcode} size={320} />
          </AddressContainer>
        </Modal.Background>
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
