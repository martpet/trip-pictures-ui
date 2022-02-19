import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useUpdateMySettingsMutation } from '~/services';
import {
  freshRemoteSettingsFetched,
  selectCurrentUser,
  selectKeysOfChangedSettings,
  selectSettings,
  settingsSynced,
} from '~/slices';
import { Settings } from '~/types';

export const useSyncSettings = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const localSettings = useSelector(selectSettings);
  const remoteSettings = currentUser?.settings;
  const changedLocalSettings = useSelector(selectKeysOfChangedSettings);
  const [updateRemoteSettings, { isLoading: remoteMutationInProgress }] =
    useUpdateMySettingsMutation();

  const sync = () => {
    const localPatch: Partial<Settings> = {};
    const remotePatch: Partial<Settings> = {};
    const keys = Object.keys(localSettings) as Array<keyof Settings>;

    keys.forEach((key) => {
      const localVal = localSettings[key];
      const remoteVal = remoteSettings?.[key];
      if (localVal !== remoteVal) {
        const isRemoteOutdated = changedLocalSettings[key] || !remoteVal;
        const patch = isRemoteOutdated ? remotePatch : localPatch;
        const newValue = isRemoteOutdated ? localVal : remoteVal;
        Object.assign(patch, { [key]: newValue });
      }
    });

    if (Object.keys(remotePatch).length && !remoteMutationInProgress) {
      updateRemoteSettings(remotePatch);
    }

    if (Object.keys(localPatch).length) {
      dispatch(freshRemoteSettingsFetched(localPatch));
    }

    dispatch(settingsSynced());
  };

  useEffect(() => {
    if (currentUser) {
      sync();
    }
  }, [localSettings, remoteSettings]);
};
