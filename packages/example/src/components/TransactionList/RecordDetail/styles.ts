import styled, { css } from 'styled-components';
import { FlexBetween, H4, Caption } from '../../../kits';
import { Button as SnapButton } from 'snapkit';

export const ModalTitleContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
`;

export const hideScrollbar = css`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const oneLine = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RecordDetailsContainer = styled.div`
  padding-top: 60px;
  max-height: 640px;
  overflow-y: scroll;
  ${hideScrollbar};
`;

export const RecordDetailsContent = styled.div``;

export const RecordDetailsTop = styled.div`
  padding: 8px 0 24px;
  background: linear-gradient(185.06deg, rgba(255, 108, 10, 0.012) 4.07%, rgba(255, 108, 10, 0.06) 95.93%);
`;

export const RecordDetailsBottom = styled.div<{moreSpacing?: boolean}>`
  flex: 1;
  margin: 32px 32px 0;
  padding-bottom: ${props => props.moreSpacing ? '108px' : '32px'};
`;

export const RecordItemRow = styled(FlexBetween)`
  margin: 20px 0;
  gap: 24px;
`;

export const RecordItemRowDivider = styled.hr`
  margin: 20px 0 0;
  width: 100%;
  border: none;
  border-bottom: 1px solid #F0F3FA;
`;

export const RecordItemLabel = styled(H4)<{highlight?: boolean, succeed?: boolean}>`
  :first-letter{
    text-transform: capitalize
  }
  color: var(--c-n50);
  ${props => props.highlight ? css`
    color: var(--c-pri50);  
  ` : ''};
  ${props => props.succeed ? css`
    color: var(--c-g60);
  ` : ''};
`;

export const RecordItemContent = styled(Caption)<{highlight?: boolean, lowlight?: boolean, wordBreak?: boolean}>`
  color: var(--c-n80);
  ${props => props.highlight ? css`
    color: var(--c-pri50);  
  ` : ''};
  ${props => props.lowlight ? css`
    color: var(--c-n50);  
  ` : ''};
  word-break: ${props => props.wordBreak ? 'break-all' : 'normal'};
`;

export const OneLineRecordItemContent = styled(RecordItemContent)`
  display: inline-block;
  ${oneLine};
`;

export const GradientLayer = styled.div`
  height: 32px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
`;

export const Button = styled(SnapButton)`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  transition: 0.25s;
`;

export const PrimaryButton = styled(Button)`
  && {
    :hover {
      background-color: #F58300;
    }

    :disabled {
      cursor: not-allowed;
      background-color: #E1E6F0;
    }
  }
`;
