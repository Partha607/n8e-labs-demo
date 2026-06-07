export const withBase = (path = '') =>
  `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`;

const assetVersion = import.meta.env.PUBLIC_BUILD_ID ?? '1';

export const withAsset = (path = '') => `${withBase(path)}?v=${assetVersion}`;
