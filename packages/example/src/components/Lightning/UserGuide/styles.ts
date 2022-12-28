import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 320px;
  height: 114px;
  padding: 16px;
  background: linear-gradient(185.06deg, rgba(255, 108, 10, 0.012) 4.07%, rgba(255, 108, 10, 0.06) 95.93%) #FFFFFF;
  border-radius: 8px;
`;

export const Text = styled.p`
  color: #111214;
  font-size: 14px;
  line-height: 20px;
`;

export const Button = styled.button`
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 62px;
  height: 32px;
  padding: 6px 12px;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  :hover {
    background-color: #f58300;
    transition: 0.25s;
  }

  :not(:hover) {
    background: #111214;
    transition: 0.25s;
  }
`;
