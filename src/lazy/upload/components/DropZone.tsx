import { DragEventHandler, ReactNode, useContext, useState } from 'react';

import { DropZoneIllustration, UploadContext } from '~/lazy/upload';

type Props = {
  children: ReactNode;
};

export function DropZone({ children }: Props) {
  const { uploads, addUploads } = useContext(UploadContext);
  const [isOnTarget, setOnTarget] = useState(false);
  const borderColor = isOnTarget
    ? 'var(--spectrum-global-color-gray-400)'
    : 'transparent';

  const stopEvent: DragEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    addUploads(event.dataTransfer.files);
    setOnTarget(false);
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
        border: `2px dashed ${borderColor}`,
      }}
    >
      {uploads.length ? children : <DropZoneIllustration />}
    </div>
  );
}
