import styled from 'styled-components';
import { circularMotion } from '../../../kits';

export const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  & .ui.page.modals {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 22px;
`;

export const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ModalHeaderLabel = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const TransactionListArea = styled.div`
  border-top: 1px solid #F0F3FA;
  & > div {
    padding: 0 16px;
  }
  & ::-webkit-scrollbar {
    display: none;
    width: 6px;
  }
  & ::-webkit-scrollbar-track {
    background: none;
  }
  & ::-webkit-scrollbar-thumb {
    background: #9095A3;
  }
`;

export const MaskArea = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  border-bottom-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
  background: #FFFFFF;
  mask: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
`;

export const LoadingIconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 30px 0;
  svg {
    animation: ${circularMotion} 1s linear infinite;
  }
`;

export const BottomTipsContainer = styled.div`
  text-align: center;
  margin: 30px 0;
  span {
    display: inline-block;
    color: #9095A3;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
    div {
      height: 18px;
      margin-left: 6px;
      svg path{
        fill: #9095A3;
      }
      :hover {
        svg path {
          fill: #FF6C0A;
        }
      }
    }
  }
  a {
    display: block;
    width: 187px;
    color: #FF6C0A;
    margin: 0 auto;
    line-height: 20px;
    :hover {
      text-decoration: underline;
      transition: 0.25s;
      }
      :not(:hover) {
      text-decoration: none;
      transition: 0.25s;
    }
  }

  .icon-info:hover path {
    fill: var(--sk-color-pri50);
  }
`;
