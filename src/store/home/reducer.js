import * as home from './action-type';

let defaultState = {
  orderSum: '', //金额
  name: '', //姓名
  phoneNo: '', //手机号
  imgpath: '', //图片地址
}
// 表单数据
export const formData = (state = defaultState , action = {}) => {
  switch(action.type){
    case home.GET_DATA:
      return {...state, ...{[action.datatype]: action.value}};
    default:
      return state;
  }
}

