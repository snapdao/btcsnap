import styled from 'styled-components';

export const MenuContainer = styled.div`
  position: relative;
`;

export const MenuButton = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 16px;
  background-color: #FFFFFF;
  border: 1px solid #E1E6F0;
  border-radius: 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  :hover {
    background-color: rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: 0.25s;
  }
  :not(:hover) {
    background-color: #FFFFFF;
    transition: 0.25s;
  }
`;

export const MenuItemsContainer = styled.div`
  position: absolute;
  left: 0;
  width: 188px;
  margin-top: 4px;
  background: #FFFFFF;
  border: 1px solid #E1E6F0;
  border-radius: 16px;
  padding: 8px;
  z-index: 9;
`;

export const MenuItem = styled.div`
  width: 172px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  margin: 4px 0;
  & > svg {
    margin: 6px 8px;
  }
  :hover {
    background: rgba(0, 0, 0, 0.04);
    cursor: pointer;
    transition: 0.25s;
  }
`;

export const MenuItemLink = styled.a`
  width: 172px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  margin: 4px 0;
  & > svg {
    margin: 6px 8px;
  }
`;

export const MenuItemSpan = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #111214;
`;

export const MenuItemIsConnect = styled.span<{connect?: boolean}>`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color:${props => props.connect ? '#21A35D' : '#F54814' }
`;

export const MenuDivider = styled.hr`
  width: 148px;
  height: 0;
  border: 1px solid #F0F3FA;
  margin: 4px 0;
`;
