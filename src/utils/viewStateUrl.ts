import { ViewState } from 'react-map-gl';

import { persistedViewStateProps, viewStateUrlPrefix } from '~/consts';
import { PersistedViewState, PersistedViewStateProp } from '~/types';

type UrlViewStateOptions = {
  [key in PersistedViewStateProp]: {
    decimals: number;
    prefix?: string;
  };
};

const urlViewStateOptions: UrlViewStateOptions = {
  longitude: {
    decimals: 6,
  },
  latitude: {
    decimals: 6,
  },
  bearing: {
    decimals: 2,
    prefix: 'b',
  },
  pitch: {
    decimals: 0,
    prefix: 'p',
  },
  zoom: {
    decimals: 0,
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
  const { longitude, latitude } = viewState;
  const { url, urlPaths, viewStateUrlPath } = parseUrl();
  let path = '';

  if (longitude !== 0 && latitude !== 0) {
    path = `${viewStateUrlPrefix}`;

    urlViewStateProps.forEach((prop, index) => {
      const { prefix, decimals } = urlViewStateOptions[prop];
      let value = viewState[prop] || 0;
      value = Number(value.toFixed(decimals));
      if (value === 0 && !isLonOrLatProp(index)) return;
      if (index !== 0) path += ',';
      const formattedValue = Number(value.toFixed(decimals));
      path += formattedValue;
      if (prefix) path += prefix;
    });
  }

  if (viewStateUrlPath) urlPaths.pop();

  urlPaths.push(path);
  url.pathname = urlPaths.join('/');
  window.history.replaceState({}, '', url);
};
