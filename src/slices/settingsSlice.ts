import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { defaultLang } from '~/consts';
import { RootState, Settings } from '~/types';

export type SettingsSliceState = {
  data: Settings;
  changedSettings: Partial<{ [K in keyof Settings]: boolean }>;
};

const initialState: SettingsSliceState = {
  data: {
    lang: defaultLang,
    toolbarPosition: 'top',
    colorScheme: 'auto',
  },
  changedSettings: {},
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    freshRemoteSettingsFetched: (
      state,
      { payload }: PayloadAction<Partial<Settings>>
    ) => {
      Object.assign(state.data, payload);
    },
    settingsSynced: (state) => {
      state.changedSettings = {};
    },
    languageSelected: (state, { payload }: PayloadAction<Settings['lang']>) => {
      state.data.lang = payload;
      state.changedSettings.lang = true;
    },
    toolbarPositionSelected: (
      state,
      { payload }: PayloadAction<Settings['toolbarPosition']>
    ) => {
      state.data.toolbarPosition = payload;
      state.changedSettings.toolbarPosition = true;
    },
    colorSchemeSelected: (state, { payload }: PayloadAction<Settings['colorScheme']>) => {
      state.data.colorScheme = payload;
      state.changedSettings.colorScheme = true;
    },
  },
});

export const selectSettings = (state: RootState) => state.settings.data;

export const selectKeysOfChangedSettings = (state: RootState) =>
  state.settings.changedSettings;

export const selectLang = ({ settings }: RootState) => settings.data.lang;

export const selectToolbarPosition = ({ settings }: RootState) =>
  settings.data.toolbarPosition;

export const selectColorSchemeSetting = ({ settings }: RootState) =>
  settings.data.colorScheme;

export const {
  freshRemoteSettingsFetched,
  settingsSynced,
  languageSelected,
  toolbarPositionSelected,
  colorSchemeSelected,
} = settingsSlice.actions;
