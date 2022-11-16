import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0;
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
