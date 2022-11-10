import { ReactNode } from 'react';
import { Container, Content, PrefixIcon } from './styles';

interface Props {
  icon: ReactNode;
  children: ReactNode;
}

const Message = ({ icon, children }: Props) => {
  return (
    <Container>
      {icon && <PrefixIcon>{icon}</PrefixIcon>}
      <Content>{children}</Content>
    </Container>
  );
};

export default Message;
