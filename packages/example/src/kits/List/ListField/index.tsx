import { ReactNode } from 'react';
import { Icon } from 'snapkit';
import { Container, Content, Title } from './styles';

interface Props {
  title: ReactNode;
  content?: ReactNode;
  arrow?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
}

export const ListField = ({
  title,
  content,
  arrow = false,
  hoverable = false,
  onClick,
}: Props) => {
  return (
    <Container hoverable={hoverable} onClick={onClick}>
      <Title className="title">{title}</Title>
      <Content>{content}</Content>
      {arrow && <Icon.ArrowRight color="var(--c-pri50)" />}
    </Container>
  );
};
