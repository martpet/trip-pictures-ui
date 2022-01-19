import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

type UploadProviderProps = {
  children: ReactNode;
};

type TUloadContext = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export const UploadContext = createContext({} as TUloadContext);

export function UploadProvider({ children }: UploadProviderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const contextValue = useMemo(() => ({ files, setFiles }), [files]);

  return <UploadContext.Provider value={contextValue}>{children}</UploadContext.Provider>;
}
