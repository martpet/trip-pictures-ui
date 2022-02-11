import { useEffect } from 'react';

export const usePreventDragDrop = () => {
  useEffect(() => {
    const onDragOver = (event: any) => {
      event.preventDefault();
      document.documentElement.style.cursor = 'not-allowed';
    };

    const onDragLeave = () => {
      document.documentElement.style.cursor = '';
    };

    const onDrop = (event: any) => {
      event.preventDefault();
      document.documentElement.style.cursor = '';
    };

    document.addEventListener('dragover', onDragOver);
    document.addEventListener('dragleave', onDragLeave);
    document.addEventListener('drop', onDrop);
  }, []);
};
