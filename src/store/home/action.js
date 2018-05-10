import * as home from './action-type';

// 获取数据
export const getData = (value, datatype) => {
  return {
    type: home.GET_DATA,
    value,
    datatype
  }
}
