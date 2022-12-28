import { ReactNode } from 'react';
import { Icon } from 'snapkit';
import { Container, Content, Title } from './styles';

interface Props {
  title: ReactNode;
  content?: ReactNode;
  arrow?: boolean;
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export const ListField = ({
  title,
  icon,
  content,
  arrow = false,
  hoverable = false,
  className,
  onClick,
}: Props) => {
  return (
    <Container
      className={`list-field ${className}`}
      hoverable={hoverable}
      onClick={onClick}>
      {icon}
      <Title className='title'>{title}</Title>
      <Content>{content}</Content>
      {arrow && <Icon.ArrowRight color='var(--c-pri50)' />}
    </Container>
  );
};
