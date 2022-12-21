import { ButtonProps } from 'snapkit';
import LoadingIcon from '../../components/Icons/Loading';
import ButtonText from './ButtonText';
import { ButtonWrap } from './styles';

type WButtonProps = ButtonProps

const Button = ({ children, ...args }: WButtonProps) => {
  return (
    <ButtonWrap loadingIcon={<LoadingIcon spin />} {...args}>
      {children}
    </ButtonWrap>
  );
};

Button.Text = ButtonText;

export {
  Button
};
