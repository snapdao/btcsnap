import styled, { css } from "styled-components";
import { FlexBetween } from "../../../kits/Layout/Flex";
import { H4 } from "../../../kits/Layout/Text/Title";
import { Caption } from "../../../kits/Layout/Text/Body";
import { Button as SnapButton } from "snapkit";

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  align-items: center;
  border-radius: 20px 20px 0 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  h3 {
    height: 40px;
    line-height: 40px;
    text-transform: capitalize;
  }
`

export const hideScrollbar = css`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none;
  }
`

export const oneLine = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const RecordDetailsContainer = styled.div`
  margin-top: -60px;
  padding-top: 60px;
  max-height: 548px;
  overflow-y: scroll;
  ${hideScrollbar};
`

export const RecordDetailsContent = styled.div``;

export const RecordDetailsTop = styled.div`
  padding: 8px 0 24px;
  background: linear-gradient(185.06deg, rgba(255, 108, 10, 0.012) 4.07%, rgba(255, 108, 10, 0.06) 95.93%);
`

export const RecordDetailsBottom = styled.div<{moreSpacing?: boolean}>`
  flex: 1;
  margin: 32px 32px 0;
  padding-bottom: ${props => props.moreSpacing ? '44px' : 0};
`

export const RecordItemRow = styled(FlexBetween)`
  margin: 20px 0;
  gap: 24px;
`;

export const RecordItemRowDivider = styled.hr`
  margin: 20px 0 0;
  width: 100%;
  border: none;
  border-bottom: 1px solid #F0F3FA;
`

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
`

export const RecordItemContent = styled(Caption)<{highlight?: boolean, lowlight?: boolean}>`
  color: var(--c-n80);
  ${props => props.highlight ? css`
    color: var(--c-pri50);  
  ` : ''};
  ${props => props.lowlight ? css`
    color: var(--c-n50);  
  ` : ''};
`

export const OneLineRecordItemContent = styled(RecordItemContent)`
  display: inline-block;
  ${oneLine};
`

export const Button = styled(SnapButton)`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  transition: 0.25s;
`

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
`
