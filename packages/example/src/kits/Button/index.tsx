import { ButtonProps } from 'snapkit';
import LoadingIcon from '../../components/Icons/Loading';
import { ButtonWrap } from './styles';

interface WButtonProps extends ButtonProps {}

export const Button = ({ children, ...args }: WButtonProps) => {
  return (
    <ButtonWrap loadingIcon={<LoadingIcon spin />} {...args}>
      {children}
    </ButtonWrap>
  );
};
