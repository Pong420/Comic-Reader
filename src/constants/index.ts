export { default as PATHS } from './paths.json';
export { default as FILTER_DATA } from './filter.json';

export const MAC_OS = process.platform === 'darwin';
export const WIN_OS = process.platform === 'win32';
export const FRAME_LESS = MAC_OS || WIN_OS;
