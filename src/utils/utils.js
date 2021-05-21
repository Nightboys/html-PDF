/**
 * 去除对象中为空或undefined的值
 * @param object 指定对象
 * @return {{}}
 */
export const removeObjectNil = object => {
  if (!object) return {};
  const newObject = {};
  Object.keys(object).forEach(key => {
    if (object[key] !== undefined && object[key] !== '') {
      newObject[key] = object[key];
    }
  });
  return newObject;
};
/**
 * 是否包含
 * @param value 指定值
 * @param list 全部值
 * @return {Boolean}
 */
export function oneOf(value, list) {
  return list.some(item => item === value);
}

/**
 * @method arrToObj
 * @description 根据属性将数组分组成对象组
 * @param {arr: object[], attribute: string, total?: string}
 * @return {newArr: obejct[]} 
 * @author wuzq2
 */
export const arrToObj = (arr = [], attribute = 'name', total = '') => {
  return arr.reduce((pre, cur) => {
    pre[cur[attribute]] = pre[cur[attribute]] || [];
    pre[cur[attribute]].push(cur);
    if (total) {
      pre[total] = pre[total] || [];
      pre[total].push(JSON.parse(JSON.stringify(cur)));
    }
    return pre;
  }, {})
}

