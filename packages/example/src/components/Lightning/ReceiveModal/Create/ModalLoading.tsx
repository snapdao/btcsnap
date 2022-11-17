import { Loader } from 'semantic-ui-react';
import styled from 'styled-components';

const Mask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px !important;
  z-index: 200;
`;

const ModalLoading = () => {
  return (
    <Mask>
      <Loader />
    </Mask>
  );
};

export default ModalLoading;
