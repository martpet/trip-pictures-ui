import { DragEventHandler, ReactNode, useContext, useState } from 'react';

import { DragZoneIllustration, UploadContext } from '~/components/Upload';

type Props = {
  children: ReactNode;
};

export function DropZone({ children }: Props) {
  const { uploads, addUploads } = useContext(UploadContext);
  const [isOnTarget, setOnTarget] = useState(false);

  const stopEvent: DragEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    addUploads(event.dataTransfer.files);
    stopEvent(event);
  };

  const handleDragEnter: DragEventHandler<HTMLDivElement> = (event) => {
    setOnTarget(true);
    stopEvent(event);
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = (event) => {
    setOnTarget(false);
    stopEvent(event);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={stopEvent}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      style={{
        height: '100%',
        border: `2px dashed ${
          isOnTarget ? 'var(--spectrum-global-color-gray-400)' : 'transparent'
        }`,
      }}
    >
      {uploads.length ? children : <DragZoneIllustration />}
    </div>
  );
}
