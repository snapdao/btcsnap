import { Loader, LoaderProps } from 'semantic-ui-react';
import styled from 'styled-components';

const Mask = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px !important;
  z-index: 200;
`;

const ModalLoading = (args: LoaderProps) => {
  return (
    <Mask>
      <Loader {...args} />
    </Mask>
  );
};

export default ModalLoading;
