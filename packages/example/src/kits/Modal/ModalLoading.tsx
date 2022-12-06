import { Loader, LoaderProps, Modal } from 'semantic-ui-react';
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

const ModalLoading = ({ inModal, ...args }: LoaderProps & { inModal?: boolean; } = { inModal: true }) => {
  const Wrap = inModal ? Mask : Modal;
  return (
    <Wrap open>
      <Loader {...args} />
    </Wrap>
  );
};

export default ModalLoading;
