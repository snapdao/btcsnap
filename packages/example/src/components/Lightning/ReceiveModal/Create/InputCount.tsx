import { Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import { Caption } from '../../../Layout/Text/Body';

const Container = styled(Caption)`
  color: var(--c-n50);
`;

const InputCount = ({ length = 0, showLength = 0, max = 250 }) => {
  return length >= showLength ? (
    <Container>
      {length}/{max}
    </Container>
  ) : null;
};

export default InputCount;
