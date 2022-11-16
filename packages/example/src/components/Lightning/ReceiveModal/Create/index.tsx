import { ChangeEvent, useState } from 'react';
import {
  Container,
  Grid,
  Modal,
  TransitionablePortal,
} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ModalHeader from '../../../../kits/ModalHeader';
import ReceiveIcon from '../../../Icons/ReceiveIcon';
import ModalBackground from '../../../../kits/ModalBackground';
import { H3, H4 } from '../../../Layout/Text/Title';
import AmountInput from '../AmountInput';
import ReceiveViewModel from '../model';
import { BodyContainer } from './styles';
import { Textarea } from '../../../../kits/Textarea';
import { Button } from '../../../../kits/Button';
import { Message, MessageType } from '../../../../kits';

type LightningReceiveCreateModalProps = {
  close: () => void;
  model: ReceiveViewModel;
};

const LightningReceiveCreateModal = observer(
  ({ model, close }: LightningReceiveCreateModalProps) => {
    const [errorStatus, setErrorStatus] = useState(false);
    async function onCreate() {
      try {
        await model.onCreateReceive();
      } catch (e) {
        console.error('e: ', e);
        setErrorStatus(true);
      }
    }

    return (
      <TransitionablePortal
        open
        onClose={close}
        transition={{ animation: 'fade up', duration: '300' }}>
        <Modal
          style={{
            width: 440,
            height: 640,
            borderRadius: '20px',
            position: 'relative',
          }}
          open={true}>
          <ModalBackground>
            <ModalHeader
              left={
                <>
                  <ReceiveIcon size={36} />
                  <H3 style={{ marginLeft: 4 }}>RECEIVE</H3>
                </>
              }
              onClose={() => close()}
            />
            <Container style={{ padding: 32 }}>
              <H4 style={{ color: 'var(--c-n50)' }}>Amount</H4>
              <AmountInput model={model} />
            </Container>
          </ModalBackground>
          <BodyContainer style={{ padding: 32 }}>
            <Container>
              <H4>Description</H4>
              <Textarea
                placeholder="Leave a payment description (optional)"
                minRows={1}
                maxRows={6}
                style={{
                  resize: 'none',
                }}
                onChange={(ev: ChangeEvent<HTMLTextAreaElement>) =>
                  model.onChangeDescription(ev.target.value)
                }
              />
            </Container>
            <Container>
              <Grid columns={2}>
                <Grid.Column width={8}>
                  <Button onClick={close}>
                    <H3>Cancel</H3>
                  </Button>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Button
                    onClick={onCreate}
                    loading={!model.currencyRate}
                    disabled={!model.amountText || !model.currencyRate}>
                    <H3>Create Invoice</H3>
                  </Button>
                </Grid.Column>
              </Grid>
            </Container>
          </BodyContainer>
          {errorStatus && (
            <Message type={MessageType.Error}>Creating Failed</Message>
          )}
        </Modal>
      </TransitionablePortal>
    );
  },
);

export default LightningReceiveCreateModal;
