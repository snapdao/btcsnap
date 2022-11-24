import styled from 'styled-components';

export const AddIconContainer = styled.button`
  padding: 0;
  box-sizing: border-box;
  height: 24px;
  width: 24px;
  border: 1px solid #E1E6F0;
  border-radius: 8px;
  transition: 0.25s;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFF;
  cursor: pointer;

  :hover {
    background: rgba(0, 0, 0, 0.04);
    transition: 0.25s;
    :disabled {
      cursor: not-allowed;
    }
  }

  :disabled {
    background: #F7F9FC;
    svg {
      path {
        fill: #C5CAD6;
      }
    }
  }
`;
