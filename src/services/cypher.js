import cypherConfig from '@/config/cypher';

export function decrypt(string) {
  return string.match(/.{1,2}/g)
    .map(function(a) {
      return parseInt(a, 16);
    })
    .map(function(a) {
      return cypherConfig.key.split('')
        .map(function(b) {
          return b.charCodeAt(0);
        })
        .reduce(function(b, c) {
          return b ^ c;
        }, a);
    })
    .map(function(a) {
      return String.fromCharCode(a);
    })
    .join('');
}

export function encrypt(text) {
  return text.split('')
    .map(function(a) {
      return a.split('')
        .map(function(b) {
          return b.charCodeAt(0);
        })
    })
    .map(function(a) {
      return cypherConfig.key.split('')
        .map(function(b) {
          return b.charCodeAt(0);
        })
        .reduce(function(b, c) {
          return b ^ c;
        }, a);
    })
    .map(function(a) {
      return ('0' + Number(a).toString(16)).substr(-2);
    })
    .join('');
}
