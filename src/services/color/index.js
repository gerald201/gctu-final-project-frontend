import store from '@/store';
import cssConstants from '@/services/color/css-constants.json';

export function constantToCleanRgb(color) {
  if(typeof color != 'string' || !color) return '';

  if(!cssConstants[color]) return '';

  return hexToCleanRgb(cssConstants[color]);
}

export function contrast(color, step = 0) {
  if(typeof color?.valueOf() != 'string' || !color) return '';

  step = isNaN(step) ? 0 : (parseInt(step) < 0 ? 0 : (parseInt(step) > 2 ? 2 : parseInt(step)));
  
  const scheme = store.getters['PREFERENCES/COLOR/actualActiveModeValues'];
  const cleanRgb = toCleanRgb(color, scheme);
  const blackMap = ['dark', 'darker', 'black'];
  const whiteMap = ['light', 'lighter', 'white'];

  if(!cleanRgb) return '';

  const black = toCleanRgb(blackMap[step], scheme);
  const white = toCleanRgb(whiteMap[step], scheme);

  const rgbProps = cleanRgb.split(/\s?,\s?/g, 3)
    .map(function(c) {
      return parseInt(c);
    });
  const cMax = Math.max(...rgbProps);
  const cMin = Math.min(...rgbProps);
  const lum = (cMax + cMin) / 2;

  return lum > 0.6 * 255 ? black : white;
}

export function hexToCleanRgb(color) {
  if(typeof color?.valueOf() != 'string' || !color) return '';

  if(!isHex(color)) return '';

  const check = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(color);

  check.splice(0, 1);

  if(!(Array.isArray(check) && check.length == 3)) return '';

  return check
    .map(function(matched) {
      return parseInt((matched.length == 1 ? matched + matched : matched), 16);
    }).join(',');
}

export function hexToRawRgb(color) {
  if(typeof color != 'string' || !color) return '';

  return `rgb(${this.hexToCleanRgb(color)})`;
}

export function isCleanRgb(color) {
  return /^(\d{1,2}|[1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\s*,\s*(\d{1,2}|[1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\s*,\s*(\d{1,2}|[1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])$/i.test(color);
}

export function isHex(color) {
  return /^#?([\da-f]{3}){1,2}$/i.test(color);
}

export function isRawRgb(color) {
  return /rgb\((\d{1,2}|[1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\s*,\s*(\d{1,2}|[1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]])\s*,\s*(\d{1,2}|[1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\)/i.test(color);
}

export function rawRgbToCleanRgb(color) {
  if(typeof color?.valueOf != 'string' || !color) return '';

  if(!isRawRgb(color)) return '';

  return color.replace(/^rgb/i, '').replace(/[\(\)]/g, '').replace(/\s?,\s?/g, ',');
}

export function toCleanRgb(color) {
  if(typeof color?.valueOf() != 'string' || !color) return '';

  const scheme = store.getters['PREFERENCES/COLOR/actualActiveModeValues'];

  if(isCleanRgb(color)) return color.replace(/\s?,\s?/g, ',');

  if(isRawRgb(color)) return rawRgbToCleanRgb(color);

  if(isHex(color)) return hexToCleanRgb(color);

  if(typeof scheme?.valueOf() == 'object') {
    if(!!scheme[color]) {
      if(isCleanRgb(scheme[color])) return scheme[color].replace(/\s?,\s?/g, ',');

      if(isRawRgb(scheme[color])) return rawRgbToCleanRgb(scheme[color]);

      if(isHex(scheme[color])) return hexToCleanRgb(scheme[color]);
    }

    if(/^(var\(--cs-)((\w+-*)+)(\))$/.test(color)) {
      const trimmedColor = color.replace(/^(var\(--cs-)((\w+-*)+)(\))$/, '$2');

      if(!!scheme[trimmedColor]) {
        if(isCleanRgb(scheme[trimmedColor])) return scheme[trimmedColor].replace(/\s?,\s?/g, ',');

        if(isRawRgb(scheme[trimmedColor])) return rawRgbToCleanRgb(scheme[trimmedColor]);

        if(isHex(scheme[trimmedColor])) return hexToCleanRgb(scheme[trimmedColor]);
      }
    }
  }

  return constantToCleanRgb(color);
}
