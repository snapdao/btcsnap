import styled, { css } from 'styled-components';

export const LightningWalletTipsContainer = styled.button<{
  shouldDisableAddition?: boolean;
  isFixed: boolean;
}>`
  position: relative;
  height: 92px;
  width: 100%;
  border: 1px solid #e1e6f0;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.25s;
  background-color: #ffffff;

  :hover {
    transition: 0.25s;
    cursor: pointer;
  }
  :disabled {
    cursor: not-allowed;
    background-color: var(--sk-color-n10);
    & > div:nth-child(2) {
      > span,
      p {
        color: var(--sk-color-n50);
      }
    }
  }
`;

export const LightningWalletTipsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 16px 16px 48px;
  gap: 2px;

  span:last-child {
    color: #9095a3;
    text-align: left;
  }
`;

export const StyledLightningTipsIcon = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
`;
