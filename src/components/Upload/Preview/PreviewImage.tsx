import { DragEventHandler, ReactEventHandler } from 'react';

type Props = {
  file: File;
};

export function PreviewImage({ file }: Props) {
  const handleImageLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    URL.revokeObjectURL(event.currentTarget.src);
  };

  const handleImageDragStart: DragEventHandler<HTMLImageElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };
  return (
    <img
      alt={file.name}
      src={URL.createObjectURL(file)}
      onLoad={handleImageLoad}
      onDragStart={handleImageDragStart}
      style={{ width: '100%' }}
    />
  );
}
