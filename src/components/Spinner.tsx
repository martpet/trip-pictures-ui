import { ProgressCircle } from '@adobe/react-spectrum';
import { SpectrumProgressCircleProps } from '@react-types/progress';

export function Spinner(props: SpectrumProgressCircleProps) {
  return <ProgressCircle isIndeterminate aria-label="Loading" {...props} />;
}
