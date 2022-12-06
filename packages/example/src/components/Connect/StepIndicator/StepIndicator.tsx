import React from 'react';
import { StepContainer, StepIndex, StepsContainer } from './styles';
import { Dots } from '../../Icons/Dots';
import { Icon } from 'snapkit';

export interface StepIndicatorProps {
  totalStep: number;
  currentStep: number;
}

export const StepIndicator = ({totalStep, currentStep}: StepIndicatorProps) => {
  return (
    <StepsContainer>
      {
        new Array(totalStep).fill(1).map((_, index) => {
          const currentIndex = index + 1;
          const currentStatus = currentIndex === currentStep ? 'inProgress' : (currentIndex > currentStep ? 'todo' : 'complete');
          return (
            <>
              <StepContainer status={currentStatus} key={index}>
                <StepIndex>
                  {
                    currentIndex === totalStep
                      ? <Icon.Check height={'18px'} width={'18px'}/>
                      : currentIndex
                  }
                </StepIndex>
              </StepContainer>
              {
                currentIndex !== totalStep && (<Dots/>)
              }
            </>
          );
        })
      }
    </StepsContainer>
  );
};
