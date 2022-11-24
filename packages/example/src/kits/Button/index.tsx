import { ButtonProps } from 'snapkit';
import LoadingIcon from '../../components/Icons/Loading';
import { ButtonWrap } from './styles';

type WButtonProps = ButtonProps

export const Button = ({ children, ...args }: WButtonProps) => {
  return (
    <ButtonWrap loadingIcon={<LoadingIcon spin />} {...args}>
      {children}
    </ButtonWrap>
  );
};
