import { ButtonProps } from 'snapkit';
import LoadingIcon from '../../components/Icons/Loading';
import { ButtonWrap } from './styles';

interface WButtonProps extends ButtonProps {}

export const Button = ({ loading, children, ...args }: WButtonProps) => {
  return (
    <ButtonWrap {...args}>
      {loading ? <LoadingIcon spin /> : children}
    </ButtonWrap>
  );
};
