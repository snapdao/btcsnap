import styled from 'styled-components';

export const Container = styled.div`
  height: 40px;
  position: absolute;
  display: flex;
  align-items: center;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  border-radius: 12px !important;
  padding: 10px 16px 10px 14px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
`;

export const Content = styled.span`
  color: #21a35d;
  line-height: 20px;
  font-weight: 600;
  vertical-align: middle;
`;

export const PrefixIcon = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 5px;
  vertical-align: middle;
`;
