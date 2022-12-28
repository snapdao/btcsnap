import styled from 'styled-components';

export const FlexItemsCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const FlexBetween = styled(FlexItemsCenter)`
  justify-content: space-between;
`;

export const FlexCenter = styled(FlexItemsCenter)`
  justify-content: center;
`;

export const FlexStart = styled(FlexItemsCenter)`
  justify-content: flex-start;
`;

export const FlexEnd = styled(FlexItemsCenter)`
  justify-content: flex-end;
`;

export const FlexItemsStart = styled(FlexItemsCenter)`
  align-items: flex-start;
`;

export const FlexItemsEnd = styled(FlexItemsCenter)`
  align-items: flex-end;
`;

export const InlineFlexItemsCenter = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const InlineFlexBetween = styled(InlineFlexItemsCenter)`
  justify-content: space-between;
`;

export const InlineFlexCenter = styled(InlineFlexItemsCenter)`
  justify-content: center;
`;

export const InlineFlexStart = styled(InlineFlexItemsCenter)`
  justify-content: flex-start;
`;

export const InlineFlexEnd = styled(InlineFlexItemsCenter)`
  justify-content: flex-end;
`;
