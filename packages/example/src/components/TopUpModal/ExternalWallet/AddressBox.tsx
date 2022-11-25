import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Container } from 'semantic-ui-react';
import { AddressBoxLabel, AddressBoxWrap } from './styles';

type AddressBoxProps = {
  address?: string;
};

const AddressBox = ({ address }: AddressBoxProps) => {
  if (address) {
    return (
      <Container textAlign='center'>
        <AddressBoxWrap>
          <QRCodeCanvas value={address as string} size={204} />
        </AddressBoxWrap>
        <AddressBoxLabel>{address}</AddressBoxLabel>
      </Container>
    );
  }
  return null;
};

export default AddressBox;
