import { Container } from 'semantic-ui-react';
import styled from 'styled-components';
import { Body, Large } from '../../Layout/Text/Body';
import SwitchIcon from '../../Icons/SwitchIcon';
import { H3 } from '../../Layout/Text/Title';
import ReceiveViewModel from './model';
import { ChangeEvent, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import BigNumber from 'bignumber.js';
import { useAppStore } from '../../../mobx';
import { BitcoinUnit } from '../../../interface';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    runtime: { currencyRate },
  } = useAppStore();

  const numberReg = /^[+-]?\d*(?:[.,]\d*)?$/;
  function focusInput() {
    return inputRef.current?.focus();
  }

  useEffect(() => {
    if (currencyRate) {
      focusInput();
    }
  }, [currencyRate]);

  return (
    <Container>
      <LargeInput
        as="input"
        ref={inputRef}
        size={model.amountLength}
        value={model.amount}
        onChange={(ev: ChangeEvent<HTMLInputElement>) => {
          const value = ev.target.value.trim();
          const banList = ['-', '00'].includes(value);
          const [int, dec] = value.split('.');
          console.log('%c Line:71 🥑 int', 'color:#ea7e5c', int);
          console.log('%c Line:71 🍋 dec', 'color:#ffdd4d', dec);

          const isBTC = model.currUnit === BitcoinUnit.BTC;
          const isSatoshi = model.currUnit === BitcoinUnit.Sats;
          const currDecMaxLen = {
            [BitcoinUnit.BTC]: 8,
            [BitcoinUnit.Currency]: 2,
            [BitcoinUnit.Sats]: 0,
          }[model.currUnit];
          const intMaxLen = int.length > (isBTC ? 2 : 9);
          const decMaxLen = dec && dec.length > currDecMaxLen;
          console.log('%c Line:83 🍭 decMaxLen', 'color:#ea7e5c', decMaxLen);

          const isDisDotInput = isSatoshi && value?.at(-1) === '.';

          if (
            !numberReg.test(value) ||
            banList ||
            Number(value) < 0 ||
            intMaxLen ||
            decMaxLen ||
            isDisDotInput
          )
            return;

          model.onChangeAmount(value);
        }}
        placeholder="0"
      />
      <Unit
        onClick={() => {
          model.onChangeViewUnit();
          focusInput();
        }}>
        <H3 style={{ display: 'inline-block' }}>{model.mainUnit}</H3>
        <SwitchIcon style={{ marginBottom: -2 }} />
      </Unit>
      <Currency>
        <SecondAmount>{model.secondAmountText}</SecondAmount>
        <SecondUnit>{model.secondUnit}</SecondUnit>
      </Currency>
    </Container>
  );
});

export default AmountInput;
