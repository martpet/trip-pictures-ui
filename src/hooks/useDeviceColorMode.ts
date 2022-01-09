import { useMediaQuery } from '@react-spectrum/utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { deviceColorModeChanged } from '~/slices';

export const useDeviceColorMode = () => {
  const dispatch = useDispatch();
  const matchesDark = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    dispatch(deviceColorModeChanged(matchesDark ? 'dark' : 'light'));
  }, [matchesDark]);
};
