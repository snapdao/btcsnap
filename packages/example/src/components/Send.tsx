import React, {useState} from 'react';
import { Button, Form, Label, Container } from 'semantic-ui-react';

const SendBox = (props: {
  feeRate: number;
  target: string | undefined;
  value: number | undefined;
  setTarget: Function;
  setValue: Function;
  onSendClick: Function;
}) => {
  const [number, setNumber] = useState(props.value ? String(props.value) : undefined)

  const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value
    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
      setNumber(input)
    }
  }

  return (
    <Form>
      <Form.Input
        label="Target Address"
        placeholder="Address"
        value={props.target}
        onChange={(e) => props.setTarget(e.target.value)}
      />
      <Form.Input
        label="Value"
        placeholder="value"
        value={number}
        onChange={handleNumber}
        onBlur={() => {
          if(number) {
            props.setValue(parseFloat(number))
          }
        }}
      />
      <Container className="Container">
        <Label>Fee Rate: {props.feeRate}</Label>
      </Container>
      <Container className="Container">
        <Button
          content="Send Transaction"
          primary
          onClick={(e) => props.onSendClick()}
        />
      </Container>
    </Form>
  );
}



export default SendBox;
