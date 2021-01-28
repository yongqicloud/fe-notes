/**
 * @param {string} s
 * @return {number}
 */
function duplicateRemoval (arr) {
  return [...new Set(arr)]
}
var lengthOfLongestSubstring = function(s) {
  const length = s.length;

  if (!s.length) {
      return 0;
  }

  if (duplicateRemoval(s.split('')).length === 1) {
      return 1;
  }

  if (duplicateRemoval(s.split('')).length === length ) {
     return length
  }

  for (let i = length - 1; i >= 2; i --) {
      const loop = length - i;
      for (let k = 0; k <= loop; k ++) {
          const tempStr = s.slice(k, k + i);
          if (duplicateRemoval(tempStr.split('')).length === tempStr.length) {
              return tempStr.length
          }
      }
  }
};