import styled, { css } from 'styled-components';
import { Container as BaseContainer } from 'semantic-ui-react';

export const Container = styled(BaseContainer)`
  position: relative;
  padding: 0 32px;
`;

export const ContainerMask = styled.div<{
  noHover?: boolean;
}>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: background 0.25s;
  cursor: pointer;
  ${(props) =>
    !props?.noHover &&
    css`
      &:hover {
        background: var(--c-ntl80);
      }
    `}

  > svg {
    pointer-events: none;
  }
`;

export const AddressContainer = styled.div`
  position: relative;
  margin: -76px auto 0;
  display: flex;
  width: 296px;
  height: 296px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to left, #f58300, #f58300) left top no-repeat,
    linear-gradient(to bottom, #f58300, #f58300) left top no-repeat,
    linear-gradient(to left, #f58300, #f58300) right top no-repeat,
    linear-gradient(to bottom, #f58300, #f58300) right top no-repeat,
    linear-gradient(to left, #f58300, #f58300) left bottom no-repeat,
    linear-gradient(to bottom, #f58300, #f58300) left bottom no-repeat,
    linear-gradient(to left, #f58300, #f58300) right bottom no-repeat,
    linear-gradient(to left, #f58300, #f58300) right bottom no-repeat;
  background-color: #ffffff;
  background-size: 1.64px 9.84px, 9.84px 1.64px, 1.64px 9.84px, 9.84px 1.64px;
`;

export const AddressLabel = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  padding: 14px 16px;
  align-items: center;
  background: #f0f3fa;
  border-radius: 16px;
  height: 48px;
  > span {
    text-align: left;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  > svg {
    color: var(--c-n60);
  }
`;

export const DownloadContainer = styled(BaseContainer)`
  position: relative;
  padding: 0 32px;
`;
