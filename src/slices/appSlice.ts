import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ViewState } from 'react-map-gl';

import { ColorScheme, PersistedViewState, RootState, SettingsMenu } from '~/types';
import { getViewStateFromUrl } from '~/utils';

export const viewStateProp = 'viewState';

export type AppSliceState = {
  loadersCount: number;
  viewState: PersistedViewState | ViewState;
  deviceColorMode?: ColorScheme;
  activeSettingsTab: SettingsMenu;
};

export const appSliceInitialState: AppSliceState = {
  loadersCount: 0,
  [viewStateProp]: getViewStateFromUrl() || {
    longitude: 0,
    latitude: 0,
  },
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
    viewStateChanged: (
      state,
      { payload }: PayloadAction<PersistedViewState | ViewState>
    ) => {
      state.viewState = payload;
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
export const selectViewState = ({ app }: RootState) => app.viewState;
export const selectActiveSettingsMenu = ({ app }: RootState) => app.activeSettingsTab;

export const selectColorScheme = (state: RootState) =>
  state.settings.data.colorScheme === 'auto'
    ? state.app.deviceColorMode
    : state.settings.data.colorScheme;

export const {
  loadingStarted,
  loadingFinished,
  viewStateChanged,
  deviceColorModeChanged,
  settingsMenuSelected,
} = appSlice.actions;
