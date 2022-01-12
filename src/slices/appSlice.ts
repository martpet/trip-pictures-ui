import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewportProps } from 'react-map-gl';

import { DeviceColorMode, RootState, SettingsTabKey } from '~/types';

export type AppSliceState = {
  loadersCount: number;
  mapViewport?: ViewportProps;
  deviceColorMode?: DeviceColorMode;
  activeSettingsTab: SettingsTabKey;
};

export const appSliceInitialState: AppSliceState = {
  loadersCount: 0,
  activeSettingsTab: 'language',
};

export const appSlice = createSlice({
  name: 'app',
  initialState: appSliceInitialState,
  reducers: {
    loadingStarted: (state) => {
      state.loadersCount += 1;
    },
    loadingFinished: (state) => {
      state.loadersCount -= 1;
    },
    mapViewportChanged: (state, { payload }: PayloadAction<ViewportProps>) => {
      state.mapViewport = payload;
    },
    deviceColorModeChanged: (state, { payload }: PayloadAction<DeviceColorMode>) => {
      state.deviceColorMode = payload;
    },
    settingsTabSelected: (state, { payload }: PayloadAction<SettingsTabKey>) => {
      state.activeSettingsTab = payload;
    },
  },
});

export const selectIsAppLoading = ({ app }: RootState) => app.loadersCount > 0;
export const selectMapViewport = ({ app }: RootState) => app.mapViewport;
export const selectDeviceColorMode = ({ app }: RootState) => app.deviceColorMode;
export const selectActiveSettingsTab = ({ app }: RootState) => app.activeSettingsTab;

export const {
  loadingStarted,
  loadingFinished,
  mapViewportChanged,
  deviceColorModeChanged,
  settingsTabSelected,
} = appSlice.actions;
