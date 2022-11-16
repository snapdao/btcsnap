import { Container } from 'semantic-ui-react';
import styled from 'styled-components';
import { Body, Large } from '../../Layout/Text/Body';
import SwitchIcon from '../../Icons/SwitchIcon';
import { H3 } from '../../Layout/Text/Title';
import ReceiveViewModel from './model';
import { ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';

type AmountInputProps = {
  model: ReceiveViewModel;
};

const LargeInput = styled(Large)`
  color: var(--c-n80);
  :placeholder {
    color: var(--c-ntd20);
  }
  border: 0;
  max-width: 280px;
  background: transparent;
`;

export const Unit = styled.div`
  display: inline-block;
  align-items: center;
  color: var(--c-pri50);
  cursor: pointer;
`;

export const Currency = styled.div``;

export const SecondAmount = styled(Body)`
  color: var(--c-ntd40);
`;

export const SecondUnit = styled(Body)`
  margin-left: 4px;
  color: var(--c-n60);
`;

const AmountInput = observer(({ model }: AmountInputProps) => {
  return (
    <Container>
      <LargeInput
        as="input"
        autoFocus
        size={model.amountLength}
        value={model.amountText}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => {
          model.onChangeAmount(ev.target.value);
        }}
        placeholder="0"
      />
      <Unit onClick={() => model.onChangeViewUnit()}>
        <H3 style={{ display: 'inline-block' }}>{model.mainUnit}</H3>
        <SwitchIcon />
      </Unit>
      <Currency>
        <SecondAmount>{model.secondAmountText}</SecondAmount>
        <SecondUnit>{model.secondUnit}</SecondUnit>
      </Currency>
    </Container>
  );
});

export default AmountInput;
