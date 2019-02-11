/* eslint-disable */
const LZString = require('./LZString');

String.prototype.splic = function(f) {
  return LZString.decompressFromBase64(this).split(f);
};
