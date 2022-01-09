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
  const remoteSettings = (currentUser?.settings || {}) as Settings;
  const changedLocalSettings = useSelector(selectKeysOfChangedSettings);
  const [updateRemoteSettings, { isLoading: remoteMutationInProgress }] =
    useUpdateMySettingsMutation();

  const sync = () => {
    const localPatch: Partial<Settings> = {};
    const remotePatch: Partial<Settings> = {};
    const settingsKeys = Object.keys(localSettings) as Array<keyof Settings>;

    settingsKeys.forEach((key) => {
      const localValue = localSettings[key];
      const remoteValue = remoteSettings[key];
      if (localValue !== remoteValue) {
        const isSettingChanged = changedLocalSettings[key];
        const isRemoteOutdated = isSettingChanged || !remoteValue;
        const patch = isRemoteOutdated ? remotePatch : localPatch;
        const newValue = isRemoteOutdated ? localValue : remoteValue;
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
