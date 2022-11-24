import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Container } from 'semantic-ui-react';
import './index.css';

type AddressBoxProps = {
  address?: string;
};

const AddressBox = ({ address }: AddressBoxProps) => {
  if (address) {
    return (
      <Container textAlign='center'>
        <div className={'address-box'}>
          <QRCodeCanvas value={address as string} size={204} />
        </div>
        <span className='address-label'>{address}</span>
      </Container>
    );
  }
  return null;
};

export default AddressBox;
