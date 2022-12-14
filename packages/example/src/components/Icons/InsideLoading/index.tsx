import { Spin } from './style';
import ImgLoading from './images/img.png';

const InsideLoadingIcon = ({
  spin = false,
  width = 24,
  height = 24,
  color = '#9095A3',
  ...args
}: Record<string, any>) => (
  <Spin enable={spin} style={{ width, height }} color={color} {...args}>
    {spin ? <img src={ImgLoading} /> : <svg width={width} height={height} viewBox='0 0 96 96' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <rect x='0.5' y='0.5' width='95' height='95' rx='47.5' stroke='black' strokeOpacity='0.1'/>
    </svg>
    }
  </Spin>
);

export default InsideLoadingIcon;
