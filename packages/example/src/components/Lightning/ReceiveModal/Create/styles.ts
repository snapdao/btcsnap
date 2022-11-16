import styled from 'styled-components';
import { Container } from 'semantic-ui-react';

export const BodyContainer = styled(Container)`
  && {
    display: flex;
    flex-direction: column;
    height: calc(100% - 220px);
    justify-content: space-between;
  }
`;
