import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadingFinished, loadingStarted } from '~/slices';

export function Loader() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingStarted());

    return () => {
      dispatch(loadingFinished());
    };
  }, []);

  return null;
}
