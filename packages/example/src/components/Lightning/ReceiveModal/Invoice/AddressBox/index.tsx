import { observer } from 'mobx-react-lite';
import { QRCodeCanvas } from 'qrcode.react';
import { Ref, RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { Message } from '../../../../../kits';
import { copyToClipboard } from '../../../../../utils/clipboard';
import CopyIcon from '../../../../Icons/CopyIcon';
import DownloadIcon from '../../../../Icons/DownloadIcon';
import LightningIcon from '../../../../Icons/LightningIcon';
import ReceiveViewModel from '../../model';
import { DownloadModal } from './DownloadModal';
import {
  Container,
  AddressContainer,
  AddressLabel,
  DownloadContainer,
  ContainerMask,
} from './styles';
import saveData from '../../../../../utils/save';

type AddressBoxProps = {
  model: ReceiveViewModel;
};

const AddressBox = observer(({ model }: AddressBoxProps) => {
  const [showDownloadIcon, setShowDownloadIcon] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

  const downloadDomRef = useRef<{ ref: RefObject<HTMLElement> }>();

  async function onCopy() {
    const res = await copyToClipboard({ text: model.qrcode });
    if (res) {
      setCopyStatus(true);
    }
  }

  async function onDownload() {
    setShowDownloadModal(true);
  }

  useEffect(() => {
    async function generate() {
      if (!downloadDomRef?.current?.ref?.current) return;
      const canvas = await html2canvas(downloadDomRef.current.ref.current);
      canvas.toBlob((blob) => {
        if (blob) {
          saveData(blob, 'lightning-invoice.jpg');
        }
      });
      setShowDownloadModal(false);
    }
    generate();
  }, [downloadDomRef?.current?.ref?.current]);

  if (model.qrcode) {
    return (
      <>
        <Container textAlign="center">
          <AddressContainer>
            <ContainerMask
              onMouseEnter={() => {
                setTimeout(() => {
                  setShowDownloadIcon(true);
                }, 100);
              }}
              onMouseLeave={() => setShowDownloadIcon(false)}
              onClick={onDownload}>
              {showDownloadIcon ? <DownloadIcon /> : <LightningIcon />}
            </ContainerMask>
            <QRCodeCanvas value={model.qrcode} size={256} />
          </AddressContainer>
          <AddressLabel>
            <span>{model.qrcode}</span>
            <CopyIcon onClick={onCopy} style={{ cursor: 'pointer' }} />
          </AddressLabel>
        </Container>
        {copyStatus && (
          <Message onClose={() => setCopyStatus(false)}>
            Copied to clipboard
          </Message>
        )}
        <DownloadModal
          ref={downloadDomRef}
          open={showDownloadModal}
          model={model}
        />
      </>
    );
  }
  return null;
});

export default AddressBox;
