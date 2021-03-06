import Vue from 'vue'
import router from './../router'

export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录

export default {
  state: JSON.parse(localStorage.getItem('user')) || {},
  mutations: {
    [USER_SIGNIN](state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      if (typeof Object.assign != 'function') {
      Object.assign = function (target) {
        //第一个传参不能是undefined和null，因为它们不能被转为对象
        if (target === undefined || target === null) {
          throw new TypeError('Can not convert undefined or null to object');
        }
        //使用Object对象化target
        var output = Object(target);
        for (var idx = 1,l=arguments.length; idx < l; idx++) {
          var source = arguments[idx];
          //后续传参也需要判断undefined和null
          if (source !== undefined && source !== null) {
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                output[key] = source[key];
              }
            }
          }
        }
        return output;
      };}
        // Object.assign2(state, user)
      // } else {
        Object.assign(state, user)
      // }
    },
    [USER_SIGNOUT](state) {
      localStorage.removeItem('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))
    },
    warnFlgClear(state){
      // localStorage.user.warnFlg=1;
      state.warnFlg=0;
    },
    reflashClear(state,ind){
      state.reflash[ind]=false;
    },
    reflashSet(state){
      state.reflash=[true,true];
    },
  },
  actions: {
    [USER_SIGNIN]({commit}, user) {
      commit(USER_SIGNIN, user)
    },
    [USER_SIGNOUT]({commit}) {
      commit(USER_SIGNOUT)
    }
  }
}



