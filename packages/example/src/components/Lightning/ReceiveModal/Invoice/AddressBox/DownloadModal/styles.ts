import { Card } from 'semantic-ui-react';
import { Container as BaseContainer } from 'semantic-ui-react';
import { FlexCenter } from '../../../../../../kits/Layout/Flex/index';
import styled from 'styled-components';
import {
  Big,
  Body,
  Caption,
} from '../../../../../../kits/Layout/Text/Body/index';

export const DownloadHiddenModal = styled(Card)`
  &&& {
    position: fixed;
    top: -200vh;
    width: 440px;
    border-radius: 20px;
    box-shadow: none;
  }
`;

export const Container = styled(BaseContainer)`
  position: relative;
`;

export const AmountBox = styled(FlexCenter)`
  margin-top: 4px;
  align-items: baseline;
`;

export const Amount = styled(Big)`
  color: var(--c-n80);
`;

export const Tip = styled(Caption)`
  color: var(--c-n60);
`;

export const Description = styled(Body).attrs({
  as: 'p',
})`
  overflow: inherit;
  display: inline-block;
  color: var(--c-n60);
  width: auto;
  max-width: 100%;
  overflow: hidden;
  margin: 24px 0 80px;
  padding: 0 32px;
  overflow-wrap: break-word;
`;

export const Footer = styled(FlexCenter)`
  position: absolute;
  bottom: 20px;
`;
