import styled from 'styled-components';
import { TransactionInfo } from 'snapkit';
import { Body } from '../../../kits/Layout/Text/Body';
import { H3 } from '../../../kits/Layout/Text/Title';

export const StyledRecordCard = styled(TransactionInfo)`
  cursor: pointer;
  transition: 0.25s;
  :hover {
    background: var(--sk-color-ntd04);
  }
`;

export const StyledRecordCardSkeleton = styled(TransactionInfo.Skeleton)`
  .right-info :nth-child(2) > div {
    animation-duration: 2s;
  }
`;

export const DefaultTitle = styled(Body)`
  text-transform: capitalize;
  color: var(--sk-color-n80);
`;

export const ExpiredTitle = styled(Body)`
  text-transform: capitalize;
  color: var(--c-n50);
`;

export const ReceiveAmount = styled(H3)`
  color: var(--sk-color-n80);
`;

export const SendAmount = styled(H3)`
  color: var(--c-pri60);
`;

export const TopUpAmount =styled(H3)`
  color: var(--c-g60);
`;

export const NotReceivedAmount =styled(H3)`
  color: var(--c-n50);
`;
