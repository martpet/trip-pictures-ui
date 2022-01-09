import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

import { staticApi, strapiApi } from '~/services';
import {
  appSlice,
  AppSliceState,
  authSlice,
  AuthSliceState,
  settingsSlice,
  SettingsSliceState,
} from '~/slices';
import { errorLogger, forbiddenRequestHandler, loadingIndicatorHandler } from '~/store';

const authSlicePersistConfig: PersistConfig<AuthSliceState> = {
  key: authSlice.name,
  whitelist: ['token'],
  storage,
};

const appSlicePersistConfig: PersistConfig<AppSliceState> = {
  key: appSlice.name,
  whitelist: ['mapProps'],
  storage,
};

const settingsSlicePersistConfig: PersistConfig<SettingsSliceState> = {
  key: settingsSlice.name,
  storage,
  stateReconciler: autoMergeLevel2,
};

export const rootReducer = combineReducers({
  [strapiApi.reducerPath]: strapiApi.reducer,
  [staticApi.reducerPath]: staticApi.reducer,
  [authSlice.name]: persistReducer(authSlicePersistConfig, authSlice.reducer),
  [appSlice.name]: persistReducer(appSlicePersistConfig, appSlice.reducer),
  [settingsSlice.name]: persistReducer(settingsSlicePersistConfig, settingsSlice.reducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      strapiApi.middleware,
      staticApi.middleware,
      errorLogger,
      loadingIndicatorHandler,
      forbiddenRequestHandler
    ),
});

export const persistor = persistStore(store);
