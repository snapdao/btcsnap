import styled, { css } from 'styled-components';

export const LightningWalletTipsContainer = styled.div<{
  shouldDisableAddition?: boolean;
  isFixed: boolean;
}>`
  ${(props) =>
    props.isFixed
      ? css`
          position: absolute;
          left: 0;
          bottom: 0;
          margin: 24px;
        `
      : css`
          position: relative;
          margin-top: 10px;
        `}
  height: 92px;
  width: 240px;
  border: 1px solid #e1e6f0;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.25s;

  ${(props) => {
    return css`
      background-color: ${props.shouldDisableAddition
    ? 'var(--sk-color-n10)'
    : '#ffffff'};

      ${props.shouldDisableAddition &&
      css`
        & > div:nth-child(2) {
          > span,
          p {
            color: var(--sk-color-n50);
          }
        }
      `}
    `;
  }}

  :hover {
    transition: 0.25s;
    cursor: pointer;
  }
`;

export const LightningWalletTipsContent = styled.div`
  padding: 16px 16px 16px 48px;
  span {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #111214;
  }
  p {
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #9095a3;
  }
`;

export const StyledLightningTipsIcon = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
`;
