import { Content, Heading, IllustratedMessage, View } from '@adobe/react-spectrum';
import { DragEventHandler, ReactNode, useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { ButtonAddPhotos, UploadContext } from '~/components/Upload';

import { ReactComponent as UploadIcon } from './images/illustrationUpload.svg';

type Props = {
  children: ReactNode;
};

export function DropZone({ children }: Props) {
  const { files, addFiles } = useContext(UploadContext);
  const [isOnTarget, setOnTarget] = useState(false);

  const stopEvent: DragEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    addFiles(event.dataTransfer.files);
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
      {files.length ? children : <Illustration />}
    </div>
  );
}

function Illustration() {
  return (
    <IllustratedMessage>
      <UploadIcon />
      <Heading>
        <FormattedMessage id="upload.dragAndDrop.heading" />
      </Heading>
      <Content>
        <FormattedMessage id="upload.dragAndDrop.subHeading" />
        <View marginTop="size-600">
          <ButtonAddPhotos variant="cta" isQuiet={false} />
        </View>
      </Content>
    </IllustratedMessage>
  );
}
