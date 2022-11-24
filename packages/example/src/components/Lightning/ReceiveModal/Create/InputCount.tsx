import styled from 'styled-components';
import { Caption } from '../../../../kits/Layout/Text/Body';

const Container = styled(Caption)<{
  isMax?: boolean;
}>`
  color: ${(props) =>
    props.isMax ? 'var(--sk-color-r60)' : 'var(--sk-color-n50)'};
`;

const InputCount = ({ length = 0, showLength = 0, max = 250 }: Record<string, any>) => {
  return length >= showLength ? (
    <Container isMax={length === max}>
      {length}/{max}
    </Container>
  ) : null;
};

export default InputCount;
