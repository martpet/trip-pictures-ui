import { DragEventHandler, ReactNode, useContext, useState } from 'react';

import { DropZoneIllustration, UploadContext } from '~/lazy/upload';

type Props = {
  children: ReactNode;
};

export function DropZone({ children }: Props) {
  const { uploads, addUploads, isUploading } = useContext(UploadContext);
  const [isOnTarget, setOnTarget] = useState(false);

  const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    if (isUploading) {
      return;
    }
    if (!isOnTarget) {
      setOnTarget(true);
      document.documentElement.style.cursor = '';
    }
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = ({ dataTransfer }) => {
    if (isUploading) {
      return;
    }
    addUploads(dataTransfer.files);
    setOnTarget(false);
  };

  const handleDragLeave: DragEventHandler<HTMLDivElement> = () => {
    setOnTarget(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        height: '100%',
        boxSizing: 'border-box',
        border: `2px dashed ${
          isOnTarget ? 'var(--spectrum-global-color-gray-500)' : 'transparent'
        }`,
      }}
    >
      {uploads.length ? children : <DropZoneIllustration />}
    </div>
  );
}
