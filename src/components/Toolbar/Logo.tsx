import { ActionButton, Flex, View } from '@adobe/react-spectrum';
import { StyleProps } from '@react-types/shared';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { paths } from '~/consts';

type Props = {
  size?: StyleProps['width'];
};

export function Logo({ size = 'static-size-400' }: Props) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();
  const handlePress = () => navigate(paths.home);

  return (
    <ActionButton
      isQuiet
      aria-label={formatMessage({ id: 'toolbar.button.home' })}
      onPress={handlePress}
    >
      <View
        width={size}
        height={size}
        borderRadius="large"
        borderWidth="thick"
        borderColor="gray-500"
      >
        <Flex height="100%" justifyContent="center" alignItems="center">
          TP
        </Flex>
      </View>
    </ActionButton>
  );
}
