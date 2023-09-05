import React from 'react';
import { ListForm, Props } from './index';
import { SaveButton } from './styles';

interface WithSaverProps extends Omit<Props, 'children'> {
  disabled?: boolean
  onSave: () => void
}

export const ListFormWithSaver = ({ disabled = false, onSave, ...rest }: WithSaverProps) => {
  return (
    <ListForm {...rest}>
      <SaveButton primary disabled={disabled} onClick={onSave}>
        Save
      </SaveButton>
    </ListForm>
  );
};
