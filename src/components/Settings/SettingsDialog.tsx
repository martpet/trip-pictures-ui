import { Content, Dialog } from '@adobe/react-spectrum';

import { Settings } from '~/components/Settings';

export function SettingsDialog() {
  return (
    <Dialog size="L">
      <Content>
        <Settings />
      </Content>
    </Dialog>
  );
}
