import { TextAreaProps } from 'semantic-ui-react';
import { TextareaWrap } from './styles';

export const Textarea = ({ ...args }: TextAreaProps) => {
  return <TextareaWrap transparent {...args} />;
};
