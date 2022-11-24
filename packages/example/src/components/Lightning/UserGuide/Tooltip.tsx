import React from 'react';
import {
  Container,
  Text,
  Button
} from './styles';


interface iPageTourModal {
  continuous: boolean // If the tour is continuous or not
  index: number // The current step's index
  isLastStep: boolean // The name says it all
  size: number // The number of steps in the tour
  step: any // The current step data
  backProps: any // The back button's props
  closeProps: any // The close button's props
  primaryProps: any // The primary button's props (Close or Next if the tour is continuous)
  skipProps: any // The skip button's props
  tooltipProps: any // The root element props (including ref)
}

export const Tooltip = ({
  closeProps,
  tooltipProps,
}: iPageTourModal) => {

  return (
    <Container {...tooltipProps}>
      <Text>You can always create lightning wallets here any time later.</Text>
      <Button {...closeProps}>Got It</Button>
    </Container>
  );
};
