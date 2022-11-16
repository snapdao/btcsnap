import { Button as BaseButton, ButtonProps } from 'snapkit';
import LoadingIcon from '../../components/Icons/Loading';

export const Button = ({ loading, children, ...args }: ButtonProps) => {
  return (
    <BaseButton {...args}>
      {loading ? <LoadingIcon spin /> : children}
    </BaseButton>
  );
};
