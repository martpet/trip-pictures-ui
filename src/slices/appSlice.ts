import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ColorScheme, PersistedViewport, RootState, SettingsMenu } from '~/types';
import { getViewportFromUrl } from '~/utils';

export type AppSliceState = {
  loadersCount: number;
  persistedViewport?: PersistedViewport;
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
    viewportChanged: (state, { payload }: PayloadAction<PersistedViewport>) => {
      state.persistedViewport = payload;
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

export const selectMapViewport = ({ app }: RootState) => {
  return getViewportFromUrl() || app.persistedViewport;
};

export const selectColorScheme = (state: RootState) =>
  state.settings.data.colorScheme === 'auto'
    ? state.app.deviceColorMode
    : state.settings.data.colorScheme;

export const selectActiveSettingsMenu = ({ app }: RootState) => app.activeSettingsTab;

export const {
  loadingStarted,
  loadingFinished,
  viewportChanged,
  deviceColorModeChanged,
  settingsMenuSelected,
} = appSlice.actions;
