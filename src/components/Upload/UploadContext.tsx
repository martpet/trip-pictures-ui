import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

type TUploadContext = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export const UploadContext = createContext({} as TUploadContext);

type UploadProviderProps = {
  children: ReactNode;
};

export function UploadProvider({ children }: UploadProviderProps) {
  const [files, setFiles] = useState<TUploadContext['files']>([]);

  const contextValue = useMemo(
    () => ({
      files,
      setFiles,
    }),
    [files]
  );

  return <UploadContext.Provider value={contextValue}>{children}</UploadContext.Provider>;
}
