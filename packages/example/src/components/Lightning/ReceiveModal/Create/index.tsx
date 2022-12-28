import { ChangeEvent, useRef, useState } from 'react';
import {
  Container,
} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ReceiveIcon from '../../../Icons/ReceiveIcon';
import { H3, H4 } from '../../../../kits/Layout/Text/Title';
import AmountInput from '../AmountInput';
import ReceiveViewModel from '../model';
import { BodyContainer } from './styles';
import { Textarea } from '../../../../kits/Textarea';
import { Button } from '../../../../kits/Button';
import { Message, MessageType, Modal } from '../../../../kits';
import { FlexBetween } from '../../../../kits/Layout/Flex';
import InputCount from './InputCount';

type LightningReceiveCreateModalProps = {
  close: () => void;
  model: ReceiveViewModel;
};

const LightningReceiveCreateModal = observer(
  ({ model, close }: LightningReceiveCreateModalProps) => {
    const [errorStatus, setErrorStatus] = useState(false);
    const modalRef = useRef<any>(null);
    async function onCreate() {
      try {
        await model.onCreateReceive();
      } catch (e) {
        console.error('e: ', e);
        setErrorStatus(true);
      }
    }

    return (
      <Modal open close={close} ref={modalRef}>
        {(!model.currencyRate || model.isCreating) && <Modal.Loading />}
        <Modal.Background>
          <Modal.Header
            left={
              <>
                <ReceiveIcon size={36} />
                <H3 style={{ marginLeft: 4 }}>RECEIVE</H3>
              </>
            }
            onClose={() => modalRef.current?.onClose()}
            style={{ padding: '20px' }}
          />
          <Container style={{ padding: 32 }}>
            <H4 style={{ color: 'var(--c-n50)' }}>Amount</H4>
            <AmountInput model={model} />
          </Container>
        </Modal.Background>
        <BodyContainer style={{ padding: 32 }}>
          <Container>
            <H4>Description</H4>
            <Textarea
              placeholder='Leave a payment description (optional)'
              minRows={1}
              maxRows={6}
              style={{
                resize: 'none',
              }}
              value={model.description}
              onChange={(ev: ChangeEvent<HTMLTextAreaElement>) => {
                let value = ev.target.value;
                value = value.replaceAll(/\n/g, '');
                if (value.length > 250) return;
                model.onChangeDescription(value);
              }}
            />
            <FlexBetween>
              <div></div>
              <InputCount length={model.description.length} showLength={200} />
            </FlexBetween>
          </Container>
        </BodyContainer>
        <Modal.Footer>
          <Button onClick={close}>
            <H3>Cancel</H3>
          </Button>
          <Button
            onClick={onCreate}
            primary
            disabled={
              !model.amount ||
              Number(model.amount) === 0 ||
              !model.currencyRate ||
              model.isCreating
            }>
            <H3>Create Invoice</H3>
          </Button>
        </Modal.Footer>
        {errorStatus && (
          <Message
            type={MessageType.Error}
            onClose={() => setErrorStatus(false)}>
            Creating Failed
          </Message>
        )}
      </Modal>
    );
  },
);

export default LightningReceiveCreateModal;
