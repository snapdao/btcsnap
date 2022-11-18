import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

export const InputWrap = styled(Input)`
  && {
    font-size: 14px;
    line-height: 20px;
    display: block;
    width: 100%;
    height: 48px;
    line-height: 20px;
    margin: 8px 0;
    border: none;
    border-bottom: 1px solid #e1e6f0;
    > input {
      width: 100%;
      height: 100%;
    }

    :focus-within {
      border-bottom: 1px solid #f58300;
    }
  }
`;
