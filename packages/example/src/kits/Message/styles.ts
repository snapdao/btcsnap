import styled from 'styled-components';
import { MessageType } from './index';

export const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 300;
  > .visible.transition {
    display: flex !important;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    gap: 4px;
  }
`;

export const MessageContent = styled.div`
  height: 40px;
  background: #ffffff;
  border: 0.5px solid #e1e6f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  svg, span {
    display: inline-block;
  }
`;

export const MessageCopy = styled.span<{ type: MessageType }>`
  font-weight: 600;
  color: ${(props) => ({
    [MessageType.Error]: '#F54814',
    [MessageType.Succeed]: '#21A35D',
    [MessageType.Info]: '#1F69FF',
  }[props.type])};
`;
