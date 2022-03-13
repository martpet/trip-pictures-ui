import { persistedViewportProps, viewportUrlPathPrefix } from '~/consts';
import { PersistedViewport, PersistedViewportProp } from '~/types';

export const shortPropsNames: Partial<Record<PersistedViewportProp, string>> = {
  bearing: 'b',
  pitch: 'p',
  zoom: 'z',
};

const decimalsCount: Record<PersistedViewportProp, number> = {
  longitude: 6,
  latitude: 6,
  bearing: 2,
  pitch: 1,
  zoom: 1,
};

const parseUrl = () => {
  const url = new URL(window.location.href);
  const urlPathsString = url.pathname.substring(1);
  const urlPaths = urlPathsString === '' ? [] : urlPathsString.split('/');
  const lastUrlPath = urlPaths[urlPaths.length - 1];
  const viewportUrlPath = lastUrlPath?.startsWith(viewportUrlPathPrefix)
    ? lastUrlPath
    : undefined;
  return {
    url,
    urlPaths,
    viewportUrlPath,
  };
};

const isLatOrLonProp = (index: number) => {
  const latPropIndex = persistedViewportProps.indexOf('latitude');
  const lonPropIndex = persistedViewportProps.indexOf('longitude');
  return [latPropIndex, lonPropIndex].includes(index);
};

export const getViewportFromUrl = () => {
  const { viewportUrlPath } = parseUrl();

  if (!viewportUrlPath) {
    return undefined;
  }

  const viewport = {} as PersistedViewport;
  const viewportPropsStrings = viewportUrlPath
    .replace(viewportUrlPathPrefix, '')
    .split(',');

  viewportPropsStrings.forEach((propString, propIndex) => {
    let propName = '' as PersistedViewportProp;
    let propValue = '';
    if (isLatOrLonProp(propIndex)) {
      propName = persistedViewportProps[propIndex];
      propValue = propString;
    } else {
      const shortPropSign = propString.substring(propString.length - 1);
      propValue = propString.substring(0, propString.length - 1);
      const [longPropName] = Object.entries(shortPropsNames).find(
        ([, shortName]) => shortName === shortPropSign
      )!;
      propName = longPropName as PersistedViewportProp;
    }
    viewport[propName] = Number(propValue);
  });
  if (!viewport.zoom) {
    viewport.zoom = 15;
  }
  return viewport;
};

export const setViewportInUrl = (viewport?: PersistedViewport) => {
  if (!viewport) return;
  const isInitialMapState = viewport.latitude === 0 && viewport.longitude === 0;
  if (isInitialMapState) return;
  let newViewportUrlPart = `${viewportUrlPathPrefix}`;
  const { url, urlPaths, viewportUrlPath } = parseUrl();

  persistedViewportProps.forEach((propName, propIndex) => {
    const propValue = Number((viewport[propName] || 0).toFixed(decimalsCount[propName]));
    if (propValue === 0 && !isLatOrLonProp(propIndex)) {
      return;
    }
    if (propIndex !== 0) {
      newViewportUrlPart += ',';
    }
    newViewportUrlPart += propValue;
    if (propName in shortPropsNames) {
      newViewportUrlPart += shortPropsNames[propName];
    }
  });

  if (viewportUrlPath) urlPaths.pop();
  urlPaths.push(newViewportUrlPart);
  url.pathname = urlPaths.join('/');
  window.history.replaceState({}, '', url);
};
