import { Content, Dialog, DialogTrigger } from '@adobe/react-spectrum';
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Settings } from '~/lazy/settings';
import { selectToolbarPosition } from '~/slices';

type Props = {
  trigger: ReactNode;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function SettingsDialog({ trigger, isOpen, setOpen }: Props) {
  const toolbarPosition = useSelector(selectToolbarPosition);

  useEffect(() => {
    setOpen(false);
  }, [toolbarPosition]);

  return (
    <DialogTrigger type="popover" isOpen={isOpen} onOpenChange={setOpen}>
      <div>{trigger}</div>
      <Dialog size="L">
        <Content>
          <Settings />
        </Content>
      </Dialog>
    </DialogTrigger>
  );
}
