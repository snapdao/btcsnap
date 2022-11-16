import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

export const TextareaWrap = styled(TextareaAutosize)`
  && {
    outline: 0;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    display: block;
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    margin: 8px 0;
    border: none;
    border-bottom: 1px solid #e1e6f0;
    :focus-within {
      border-bottom: 1px solid #f58300;
    }
  }
`;
