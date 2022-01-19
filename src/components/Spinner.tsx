import { Flex, ProgressCircle } from '@adobe/react-spectrum';
import { SpectrumProgressCircleProps } from '@react-types/progress';

type SpinnerProps = SpectrumProgressCircleProps & {
  centered?: boolean;
};

export function Spinner({ centered, ...circleProps }: SpinnerProps) {
  return (
    <Flex justifyContent={centered ? 'center' : 'start'}>
      <ProgressCircle isIndeterminate aria-label="Loading" {...circleProps} />
    </Flex>
  );
}
