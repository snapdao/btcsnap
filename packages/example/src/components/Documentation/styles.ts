import styled, { css } from 'styled-components';

const hideScrollbar = css`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const DocumentationContainer = styled.div`
  margin: 40px;
  height: calc(100% - 80px);
  max-height: 640px;
  overflow-y: scroll;
  ${hideScrollbar};
`;


export const Image = styled.img`
  margin: 20px auto;
  max-width: 80%;
`;
