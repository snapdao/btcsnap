import styled, { css } from 'styled-components';
import { FlexCenter } from '../../../kits';
import { Icon } from 'snapkit';

export const StepsContainer = styled(FlexCenter)`
  gap: 4px;
  top: 32px;
  left: 0;
`;

export const StepContainer = styled(FlexCenter)<{ status: 'todo' | 'inProgress' | 'complete' }>`
  width: 23px;
  height: 19px;
  border: 1px solid var(--c-pri50);
  border-radius: 10px;
  transition: 0.25s;

  ${props => props.status === 'inProgress' ? css`
    background-color: var(--c-pri50);
    border-color: var(--c-pri50);
    color: #FFFFFF;
  ` : props.status === 'todo' ? css`
    background-color: transparent;
    border-color: rgba(0, 0, 0, 0.1);
    color: var(--c-n80);
  ` : css`
    background-color: transparent;
    border-color: var(--c-pri50);
    color: var(--c-pri50);
  `};
`;

export const StepIndex = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 19px;
`;

export const CheckIcon = styled(Icon.CheckS)<{isComplete: boolean}>`
  width: 18px;
  height: 18px;
  path {
    stroke: ${props => props.isComplete ? '#FFFFFF' : 'var(--c-n80)'};
  }
`;
