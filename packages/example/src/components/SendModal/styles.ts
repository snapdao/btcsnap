import styled from "styled-components"

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
