import { ReactNode } from 'react';
import { Container } from 'semantic-ui-react';
import { ListField } from './ListField';
import { ListForm } from './ListForm';

const List = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>;
};

List.Form = ListForm;
List.Field = ListField;

export { List };
