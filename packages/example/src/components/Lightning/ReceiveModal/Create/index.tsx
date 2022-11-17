import { ChangeEvent, useState } from 'react';
import {
  Container,
  Grid,
  Loader,
  Modal as BaseModal,
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
import { Message, MessageType, Modal } from '../../../../kits';
import ModalLoading from './ModalLoading';
import { FlexBetween } from '../../../Layout/Flex';
import InputCount from './InputCount';

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
        <BaseModal
          style={{
            width: 440,
            height: 640,
            borderRadius: '20px',
            position: 'relative',
          }}
          open={true}>
          {(!model.currencyRate || model.isCreating) && <ModalLoading />}
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
                <InputCount
                  length={model.description.length}
                  showLength={200}
                />
              </FlexBetween>
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
                    primary
                    disabled={
                      !model.amount ||
                      Number(model.amount) === 0 ||
                      !model.currencyRate ||
                      model.isCreating
                    }>
                    <H3>Create Invoice</H3>
                  </Button>
                </Grid.Column>
              </Grid>
            </Container>
          </BodyContainer>
          {errorStatus && (
            <Message
              type={MessageType.Error}
              onClose={() => setErrorStatus(false)}>
              Creating Failed
            </Message>
          )}
        </BaseModal>
      </TransitionablePortal>
    );
  },
);

export default LightningReceiveCreateModal;
