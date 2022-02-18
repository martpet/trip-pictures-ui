import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewportProps } from 'react-map-gl';

import { ColorScheme, RootState, SettingsMenu } from '~/types';

export type AppSliceState = {
  loadersCount: number;
  mapViewport?: ViewportProps;
  deviceColorMode?: ColorScheme;
  activeSettingsTab: SettingsMenu;
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
    deviceColorModeChanged: (state, { payload }: PayloadAction<ColorScheme>) => {
      state.deviceColorMode = payload;
    },
    settingsMenuSelected: (state, { payload }: PayloadAction<SettingsMenu>) => {
      state.activeSettingsTab = payload;
    },
  },
});

export const selectIsAppLoading = ({ app }: RootState) => app.loadersCount > 0;

export const selectMapViewport = ({ app }: RootState) => app.mapViewport;

export const selectColorScheme = (state: RootState) =>
  state.settings.data.colorScheme === 'auto'
    ? state.app.deviceColorMode
    : state.settings.data.colorScheme;

export const selectActiveSettingsMenu = ({ app }: RootState) => app.activeSettingsTab;

export const {
  loadingStarted,
  loadingFinished,
  mapViewportChanged,
  deviceColorModeChanged,
  settingsMenuSelected,
} = appSlice.actions;
