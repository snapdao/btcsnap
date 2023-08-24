import styled from 'styled-components';

export const AnchorContainer = styled.a`
  display: inline-flex;
  color: #F58300;
  transition: 0.25s;
  justify-content: center;
  align-items: center;

  div:last-child {
    position: relative;
    right: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: 0.25s;
  }

  :hover {
    color: #F58300;
    div:last-child {
      right: -6px;
    }
  }
`;
