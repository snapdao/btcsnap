import React from 'react';
import { CheckIcon, StepContainer, StepIndex, StepsContainer } from './styles';
import { Dots } from '../../Icons/Dots';

export interface StepIndicatorProps {
  totalStep: number;
  currentStep: number;
}

export const StepIndicator = ({ totalStep, currentStep }: StepIndicatorProps) => {
  if(totalStep <= 1) {
    return null;
  }

  return (
    <StepsContainer>
      {
        Array.from({ length: totalStep }).map((_, index) => {
          const currentIndex = index + 1;
          const currentStatus = currentIndex === currentStep ? 'inProgress' : (currentIndex > currentStep ? 'todo' : 'complete');
          return [
            <StepContainer status={currentStatus} key={`connect-${index}`}>
              <StepIndex>
                {
                  currentIndex === totalStep
                    ? <CheckIcon isComplete={currentStep === totalStep} />
                    : currentIndex
                }
              </StepIndex>
            </StepContainer>,
            currentIndex !== totalStep ? <Dots key={`connect-dots-${index}`} /> : null
          ];
        }).flat()
      }
    </StepsContainer>
  );
};
