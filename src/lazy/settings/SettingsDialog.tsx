import { Content, Dialog, DialogTrigger } from '@adobe/react-spectrum';
import { Dispatch, ReactNode, SetStateAction } from 'react';

import { Settings } from '~/lazy/settings';

type Props = {
  button: ReactNode;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function SettingsDialog({ button, isOpen, setOpen }: Props) {
  return (
    <DialogTrigger type="popover" isOpen={isOpen} onOpenChange={setOpen}>
      <div>{button}</div>
      <Dialog size="L">
        <Content>
          <Settings />
        </Content>
      </Dialog>
    </DialogTrigger>
  );
}
