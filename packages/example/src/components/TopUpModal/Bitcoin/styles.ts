import { FlexCenter } from './../../../kits/Layout/Flex/index';
import { Caption } from './../../../kits/Layout/Text/Body/index';
import styled from 'styled-components';

export const SendContainer = styled.div`
  background: linear-gradient(185.06deg, rgba(255, 108, 10, 0.012) 4.07%, rgba(255, 108, 10, 0.06) 95.93%);
  :last-child {
    background: #FFFFFF;
  }
`;

export const AddressCaption = styled(Caption)`
  display: flex;
  align-items: center;
  height: 48px;
`;

export const SendTitle = styled.span.attrs({ className: 'send-title' })`
  display: flex;
  align-items: center;
  color: #9095A3;
  font-weight: 600;
  ~ .send-title {
    margin-top: 32px;
  }
  > svg {
    margin-left: 4px;
  }
`;

export const SendBody = styled.div`
  padding: 32px 32px 24px;
`;

export const SendAmountContainer = styled.div`
  margin-top: 8px;
`;

export const CancelButton = styled.button`
  width: 176px;
  height: 48px;
  font-weight: 600;
  line-height: 24px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  :hover {
    background: #E1E6F0;
    transition: 0.25s;
  }
  :not(:hover) {
    background: #F0F3FA;
    transition: 0.25s;
  }
`;

export const FailedContainer = styled.div`
  width: 100%;
  padding: 24px 32px 0;
`;

export const FailedText = styled.p`
  color: #9095A3;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  margin: 0;
  span {
    white-space: nowrap;
  }
`;

export const ResultSuccessSection = styled.div`
  width: 100%;
  padding: 24px 32px 32px;
`;

export const PendingContainer = styled(FlexCenter)`
  flex-direction: column;
  padding: 64px 0;
`;

export const ResultContainer = styled(FlexCenter)`
  flex-direction: column;
  padding: 4px 0 24px;
`;

export const PendingIconContainer = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .pending-icon {
    width: 96px;
    height: 96px;
  }
`;

