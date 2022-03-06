import { ViewportProps } from 'react-map-gl';

import {
  persistedViewportKeyMap,
  persistedViewportKeys,
  persistedViewportShortKeys,
} from '~/consts';
import { mapViewportChanged } from '~/slices';
import { store } from '~/store';
import { PersistedViewport, PersistedViewportShortKey } from '~/types';

export const getViewportFromUrl = () => {
  const viewport = {} as PersistedViewport;
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.forEach((value, k) => {
    const shortKey = k as PersistedViewportShortKey;
    if (persistedViewportShortKeys.includes(shortKey)) {
      const longKey = persistedViewportKeys[persistedViewportShortKeys.indexOf(shortKey)];
      viewport[longKey] = Number(value);
    }
  });
  if (Object.keys(viewport).length) {
    return viewport;
  }
  return undefined;
};

const setViewportInUrl = (viewport: PersistedViewport) => {
  const urlParams = new URLSearchParams(window.location.search);
  persistedViewportKeys.forEach((key) => {
    const shortKey = persistedViewportKeyMap[key];
    const val = viewport[key];
    urlParams.delete(shortKey);
    if (val) {
      let finalValue = String(val);
      if (key === 'longitude' || key === 'latitude') finalValue = val.toFixed(6);
      if (key === 'bearing') finalValue = val.toFixed(2);
      if (key === 'pitch') finalValue = val.toFixed(1);
      if (key === 'zoom') finalValue = val.toFixed(1);
      urlParams.set(shortKey, Number(finalValue).toString());
    }
  });
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
};

export const persistViewport = (viewportProps: ViewportProps) => {
  const oldViewport = store.getState().app.mapViewport;
  const newViewport = {} as PersistedViewport;
  persistedViewportKeys.forEach((key) => {
    newViewport[key] = viewportProps[key] || 0;
  });
  const isChanged = JSON.stringify(newViewport) !== JSON.stringify(oldViewport);
  if (isChanged) {
    setViewportInUrl(newViewport);
    store.dispatch(mapViewportChanged(newViewport));
  }
};
