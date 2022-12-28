import styled, { css } from 'styled-components';

export const Container = styled.div<{
  enableXPadding?: boolean;
  bannerMode: boolean
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px ${(props) => (props.enableXPadding ? '20px' : '0')} 0;
  min-height: 55px;

  ${props => props.bannerMode ? css`
    width: 100%;
    border-radius: 20px 20px 0 0;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    position: absolute;
    z-index: 10;
    align-items: center;
  ` : ''};
`;

export const Content = styled.span`
  line-height: 20px;
  font-weight: 600;
  vertical-align: middle;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  min-width: 40px;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  min-width: 40px;
`;
