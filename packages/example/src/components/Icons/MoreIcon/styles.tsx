import styled from 'styled-components';

export const MoreIconContainer = styled.button`
  box-sizing: border-box;
  height: 24px;
  width: 24px;
  border-radius: 8px;
  border: none;
  padding: 0;
  transition: 0.25s;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;

  :hover {
    background: rgba(0, 0, 0, 0.04);
    transition: 0.25s;
    cursor: pointer;
  }

  :disabled {
    cursor: default;
  }
`;
