import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Label, Container, Header } from 'semantic-ui-react';

type AddressBoxProps = {
  address: string | undefined;
  path: string | undefined;
};

const AddressBox = (props: AddressBoxProps) => {
  if (props.address && props.path) {
    return (
    
      <Container textAlign='center'>
        <QRCodeCanvas value={props.address} size={300} />
        <Container>
            <Label>{props.address}</Label>
        </Container>
        <Container className={"Container"}>
            <Label>{props.path}</Label>
        </Container>        
      </Container>
    );
  }
  return null;
};

export default AddressBox;
