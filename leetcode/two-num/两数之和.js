/**
 * 第一种 暴力破解
 */
var twoSum = function(nums, target) {
  for (let i = 0; i < nums.length; i ++) {
    for (let j = i + 1; j < nums.length; j ++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}
/**
 * 第二种 字典 + for循环
 */
var twoSum = function(nums, target) {
  const map = new Map()
  // 填充map
  for (let k = 0; k < nums.length; k ++) {
    map.set(nums[k], k)
  }
  // 比较
  for (let i = 0; i < nums.length; i ++) {
    const res = target - nums[i]
    if (map.get(res) && map.get(res) !== i) {
      return [i, map.get(res)]
    }
  }
}