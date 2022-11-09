import styled  from "styled-components";

export const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 50px;
`

export const MessageContent = styled.div`
  height: 40px;
  background: #FFFFFF;
  border: 0.5px solid #E1E6F0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  gap: 4px;
`

export const MessageCopy = styled.span`
  font-weight: 600;
  color: #F54814;
`
