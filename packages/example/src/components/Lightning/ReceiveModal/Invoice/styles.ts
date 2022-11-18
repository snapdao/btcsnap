import { Body, Caption } from '../../../../kits/Layout/Text/Body/index';
import { H4 } from '../../../../kits/Layout/Text/Title/index';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react';
import { Medium } from '../../../../kits/Layout/Text/Body';
import BaseAddressBox from './AddressBox';

export const BodyContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const Amount = styled(Medium)`
  color: var(--c-n80);
`;

export const Unit = styled(H4)`
  color: var(--c-n50);
  margin-left: 3px;
`;

export const CaptionN60 = styled(Caption)`
  color: var(--c-n60);
`;

export const CaptionN80 = styled(Caption)`
  color: var(--c-n80);
`;

export const ExpireValue = styled(CaptionN80)`
  margin-left: 8px;
`;

export const AddressBox = styled(BaseAddressBox)``;

export const Description = styled(Body).attrs({
  as: 'p',
})`
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 24px;
  padding: 0 32px;
  overflow-wrap: break-word;
  width: 100%;
`;

export const DescriptionPopup = styled(Caption)`
  display: inline-block;
  max-width: 350px;
  overflow-wrap: break-word;
`;
