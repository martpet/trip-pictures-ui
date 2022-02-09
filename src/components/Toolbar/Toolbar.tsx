import { Divider, Flex } from '@adobe/react-spectrum';
import SettingsIcon from '@spectrum-icons/workflow/Settings';
import UploadIcon from '@spectrum-icons/workflow/UploadToCloudOutline';
import { lazy, Suspense } from 'react';

import { Logo, UserButton } from '~/components';
import { sideSpace } from '~/consts';
import { useIsTopToolbar } from '~/hooks';

const UploadDialog = lazy(() => import('~/lazy/upload'));
const SettingsDialog = lazy(() => import('~/lazy/settings'));

export function Toolbar() {
  const isTopBar = useIsTopToolbar();
  const direction = isTopBar ? 'row' : 'column';

  return (
    <Flex direction={isTopBar ? 'column' : 'row'} height="100%">
      <Flex
        flexGrow={1}
        direction={direction}
        alignItems="center"
        justifyContent="space-between"
        marginX={isTopBar ? sideSpace : 0}
        marginY={isTopBar ? 0 : sideSpace}
      >
        <Logo />
        <Flex direction={direction} gap="size-85">
          <Suspense fallback={null}>
            <UploadDialog trigger={<UploadIcon />} />
            <SettingsDialog trigger={<SettingsIcon />} />
          </Suspense>
          <UserButton />
        </Flex>
      </Flex>
      <Divider size="M" orientation={isTopBar ? 'horizontal' : 'vertical'} />
    </Flex>
  );
}
