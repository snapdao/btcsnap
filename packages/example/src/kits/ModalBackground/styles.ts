import styled from 'styled-components';

export const Container = styled.div<{ background?: string; height?: string }>`
  background: ${(props) =>
    props.background ||
    `linear-gradient(
    185.06deg,
    rgba(255, 108, 10, 0.012) 4.07%,
    rgba(255, 108, 10, 0.06) 95.93%
  )`};
  background-repeat: no-repeat;
`;
