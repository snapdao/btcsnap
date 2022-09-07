import styled from "styled-components"

export const AccountBackground = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F0F3FA;
`

export const AccountContainer = styled.div`
  width: 960px;
  height: 640px;
  background: #FFFFFF;
  border: 1px solid #E1E6F0;
  border-radius: 20px;
  display: flex;
`

export const AccountLabel = styled.p`
  position: absolute;
  bottom: calc(50% - 640px / 2 - 12px - 48px);
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #9095A3;
`

export const AccountMain = styled.div`
  width: 560px;
  padding: 40px;
`

export const AccountAside = styled.div`
  width: 400px;
  height: 100%;
  background: linear-gradient(222.5deg, rgba(250, 251, 255, 0.8) 47.82%, rgba(245, 247, 252, 0) 100%);
  border-radius: 0 20px 20px 0;
`

export const AccountAsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
  align-items: flex-end;
  margin: 40px 24px;
`

export const AccountAsideRefresh = styled.div`
  margin-right: 16px;
`

export const TxListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`

export const TxListContent = styled.div`
  width: 100%;
  height: 400px;
`

export const TxListEmpty = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const EmptyTip = styled.p`
  margin-top: 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #9095A3;
`

export const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const LogoLabel = styled.span`
  display: inline-block;
  width: 50px;
  height: 23px;
  margin-left: 8px;
  line-height: 23px;
  text-align: center;
  background: rgba(255, 108, 10, 0.2);
  border-radius: 8px;
  color: #FF6C0A;
  cursor: default;
`

export const BalanceContainer = styled.div`
  margin: 56px 0 76px;
`

export const BalanceLabel = styled.p`
  text-transform: uppercase;
  color: #9095A3;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
`

export const BalacneLeftItem = styled.div`
  display: inline-block;
  font-weight: 400;
  font-size: 48px;
  line-height: 64px;
  color: #111214;

  :hover {
    cursor: pointer;
    color: #F58300;
    transition: 0.25s;

    & > span:last-child {
      visibility: visible;
      animation: showElement 0.5s;
      animation-fill-mode: forwards;
    }
    & + div {
      visibility: hidden;
      animation: hideElement 0.25s;
      animation-fill-mode: forwards;
    }
  }
  :not(:hover) {
    color: #111214;
    transition: 0.5s;
    & > span:last-child {
      visibility: hidden;
      animation: hideElement 0.5s;
      animation-fill-mode: forwards;
    }
    & + div {
      visibility: visible;
      animation: showElement 0.5s linear;
      animation-fill-mode: forwards;
    }
  }
  @keyframes showElement {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @keyframes hideElement {
    from {opacity: 1;}
    to {opacity: 0;}
  }
`

export const BalacneLeftLabel = styled.span`
  display: inline-block;
  line-height: 64px;
`

export const BalacneLeftArrow = styled.span`
  visibility: hidden;
  line-height: 40px;
  vertical-align: middle;
  opacity: 0;
`


export const BalacneRightItem = styled.div`
  display: inline-block;
  margin-left: -25px;
  visibility: visible;
  opacity: 1;
`

export const BalacneRightLine = styled.span`
  display: inline-block;
  font-weight: 600;
  color: #9095A3;
  margin: 0 8px;
`

export const BalacneRightLabel = styled.span`
  display: inline-block;
  font-weight: 600;
  color: #9095A3;
  :hover {
    cursor: pointer;
    color: #F58300;
    transition: 0.25s;
  }
  :not(:hover) {
    color: #9095A3;
    transition: 0.25s;
  }
`

export const CurrencyContainer = styled.div<{isTestnet: boolean}>`
  margin-top: 4px;
  color: #656D85;
  font-size: 16px;
  line-height: 24px;
  ${props => props.isTestnet ? "text-decoration-line: line-through;" : ""}
`

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 0;
`

export const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const ModalHeaderLabel = styled.span`
  font-size: 16px;
  margin-left: 4px;
  font-weight: 600;
`

export const AccountDetailTop = styled.div`
  background: linear-gradient(185.06deg, rgba(255, 108, 10, 0.012) 4.07%, rgba(255, 108, 10, 0.06) 95.93%);
`

export const AccountDetailHeader = styled.div`
  padding: 26px 32px 20px;
`

export const AccountTopBalance = styled.span`
  display: inline-block;
  line-height: 32px;
  font-size: 24px;
  font-weight: 400;
`

export const AccountTopUnits = styled.span`
  display: inline-block;
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  color: #F58300;
  margin-left: 4px;
`

export const AccountDetailBottom = styled.div`
  padding: 24px 32px 32px;
`


export const AccountListItem = styled.div`
  margin-bottom: 24px;
`

export const AccountListLabel = styled.div`
  display: flex;
  justify-content: space-between;
`

export const AccountListLabelTop = styled.span`
  display: inline-block;
  line-height: 24px;
  font-size: 16px;
  &:nth-child(1) {
    font-weight: 400
  }
  &:nth-child(2) {
    font-weight: 600
  }
`

export const AccountListLabelBottom = styled.span`
  color: #656D85;
  & > span {
    color: #111214;
    margin-left: 4px;
  }
`

export const ActionContainer = styled.div`
  display: flex;
`
export const ActionContainerItem = styled.div`
  margin-right: 48px
`

export const ActionLabel = styled.p`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #656D85;
  margin-top: 12px;
  text-transform: uppercase;
`

export const ActionButton = styled.button`
  width: 96px;
  height: 96px;
  border: 1px solid #E1E6F0;
  border-radius: 28px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  :hover {
    border-color: #F58300;
    cursor: pointer;
    transition: 0.25s;
  }

  :not(:hover) {
    border-color: #E1E6F0;
    transition: 0.25s;
  }
`
