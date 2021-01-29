/**
 * @param {string} s
 * @return {number}
 */
function duplicateRemoval (arr) {
  return [...new Set(arr)]
}
/**
 * 第一种方法 超出最大时间限制
 * @param {String} s 
 */
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
/**
 * 第二种方法 滑动窗口
 * @param {String} s 
 */
var lengthOfLongestSubstring = function (s) {
    const length = s.length;
    const tempArr = [];
    let max = 0;
    for (let i = 0; i < length; i ++) {
        let tempStr = s[i];
        const index = tempArr.indexOf(tempStr)
        if (index !== -1) {
            tempArr.splice(0, index + 1)
        }
        tempArr.push(tempStr);
        max = Math.max(max, tempArr.length)
    }

    return max
}

console.log('lengthOfLongestSubstring', lengthOfLongestSubstring('abcadca'));
