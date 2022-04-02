import { ViewState } from 'react-map-gl';

import { persistedViewStateProps, viewStateUrlPrefix } from '~/consts';
import { PersistedViewState, PersistedViewStateProp } from '~/types';

const lonLatDecimals = (zoom: number) => zoom / 3;

const urlViewStateOptions: {
  [key in PersistedViewStateProp]: {
    decimals(zoom?: number): number;
    prefix?: string;
  };
} = {
  longitude: {
    decimals: lonLatDecimals,
  },
  latitude: {
    decimals: lonLatDecimals,
  },
  bearing: {
    decimals: () => 2,
    prefix: 'b',
  },
  pitch: {
    decimals: () => 0,
    prefix: 'p',
  },
  zoom: {
    decimals: () => 1,
    prefix: 'z',
  },
};

const urlViewStateProps = persistedViewStateProps;

const isLonOrLatProp = (index: number) => {
  const isLon = urlViewStateProps[index] === 'longitude';
  const isLat = urlViewStateProps[index] === 'latitude';
  return isLon || isLat;
};

const parseUrl = () => {
  const url = new URL(window.location.href);
  const urlPathsString = url.pathname.substring(1);
  const urlPaths = urlPathsString === '' ? [] : urlPathsString.split('/');
  const lastUrlPath = urlPaths[urlPaths.length - 1];
  const viewStateUrlPath = lastUrlPath?.startsWith(viewStateUrlPrefix)
    ? lastUrlPath
    : undefined;
  const urlViewStateParts = viewStateUrlPath?.replace(viewStateUrlPrefix, '').split(',');

  return {
    url,
    urlPaths,
    viewStateUrlPath,
    urlViewStateParts,
  };
};

export const getViewStateFromUrl = () => {
  const viewState = {} as ViewState;
  const { urlViewStateParts } = parseUrl();
  if (!urlViewStateParts) return undefined;

  urlViewStateParts.forEach((part, index) => {
    let propValue: string;
    let propName: PersistedViewStateProp;
    if (isLonOrLatProp(index)) {
      propValue = part;
      propName = urlViewStateProps[index];
    } else {
      const prefix = part.substring(part.length - 1);
      propValue = part.substring(0, part.length - 1);
      propName = urlViewStateProps.find(
        (name) => urlViewStateOptions[name].prefix === prefix
      )!;
    }
    viewState[propName] = Number(propValue);
  });

  return viewState;
};

export const setViewStateInUrl = (viewState: PersistedViewState) => {
  if (!viewState) return;
  const { longitude, latitude, zoom } = viewState;
  const { url, urlPaths, viewStateUrlPath } = parseUrl();
  let path = '';

  if (longitude !== 0 && latitude !== 0) {
    path = `${viewStateUrlPrefix}`;

    urlViewStateProps.forEach((prop, index) => {
      const { prefix, decimals } = urlViewStateOptions[prop];
      const value = Number((viewState[prop] || 0).toFixed(decimals(zoom)));
      if (value === 0 && !isLonOrLatProp(index)) return;
      if (index !== 0) path += ',';
      path += value;
      if (prefix) path += prefix;
    });
  }

  if (viewStateUrlPath) urlPaths.pop();

  urlPaths.push(path);
  url.pathname = urlPaths.join('/');
  window.history.replaceState({}, '', url);
};
