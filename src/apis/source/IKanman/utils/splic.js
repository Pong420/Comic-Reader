/* eslint-disable */
import LZString from './LZString';

String.prototype.splic = function(f) {
  return LZString.decompressFromBase64(this).split(f);
};
