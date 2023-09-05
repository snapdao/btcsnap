import { CSSProperties, ReactNode } from 'react';
import { Container } from 'semantic-ui-react';
import { ListField } from './ListField';
import { ListForm } from './ListForm';
import { ListFormWithSaver } from './ListForm/Saver';

const List = ({
  children,
  style,
  className,
  ...args
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) => {
  return (
    <Container
      className={`list-container ${className}`}
      style={style}
      {...args}>
      {children}
    </Container>
  );
};

List.Form = ListForm;
List.FormWithSaver = ListFormWithSaver;
List.Field = ListField;

export { List };
