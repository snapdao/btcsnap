import { ButtonProps } from 'snapkit';
import LoadingIcon from '../../components/Icons/Loading';
import { ButtonWrap } from './styles';

export const Button = ({ loading, children, ...args }: ButtonProps) => {
  return (
    <ButtonWrap {...args}>
      {loading ? <LoadingIcon spin /> : children}
    </ButtonWrap>
  );
};
