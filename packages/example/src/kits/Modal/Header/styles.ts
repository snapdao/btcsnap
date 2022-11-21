import styled from 'styled-components';

export const Container = styled.div<{
  enableXPadding?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px ${(props) => (props.enableXPadding ? '20px' : '0')} 0;
  min-height: 55px;
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
