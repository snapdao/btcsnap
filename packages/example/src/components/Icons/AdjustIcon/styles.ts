import styled from 'styled-components';

export const AdjustIconContainer = styled.div`
  height: 28px;
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  :hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.04);
  }
  &:disabled {
    background: transparent;
    cursor: default;
  }
`;
