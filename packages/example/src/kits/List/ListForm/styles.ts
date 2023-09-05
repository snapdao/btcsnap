import { H4 } from './../../Layout/Text/Title/index';
import styled from 'styled-components';
import { Button } from 'snapkit';

export const Container = styled.div`
  padding: 0 12px;
  margin: 10px 0;
  background: white;
  border-radius: 8px;
  transition: all 0.25s;
  position: relative;
`;

export const Title = styled(H4)``;

export const SaveButton = styled(Button)`
  position: absolute;
  right: 20px;
  bottom: 10px;
  width: 56px;
  height: 32px;
  border-radius: 10px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
`;
