import Axios from 'axios'
import qs from 'qs'
import api from '@/services/api'

export default {

  //命名空间 唯一性
  namespace: 'home',

  state: {
    homeData: [],
    currentData: {}
  },

  // 触发异步
  effects: {

    // 获取用户数据
    *FETCH_HOME_DATA ({ payload }, { call, put, select }) {
      const res =  yield call(() => Axios.get(api.homeData))
      yield put({
        type: 'enterHomeData',
        payload: res.data.users
      })
    },

    // 添加用户数据
    *FETCH_HOME_ADD ({ payload }, {call, put, select}) {
      const res = yield call(() => Axios.post(api.addData, qs.stringify(payload)))
      yield put({
        type: 'currentData',
        payload: res.data
      })
    },

    // 修改用户数据
    *FETCH_HOME_UPDATE ({ payload }, {call, put, select}) {
      const res = yield call(() => Axios.post(api.updateData, qs.stringify(payload)))
      yield put({
        type: 'currentData',
        payload: res.data
      })
    },

    // 删除用户数据
    *FETCH_HOME_DELETE ({ payload }, {call, put, select}) {
      const res = yield call(() => Axios.post(api.deleteData, qs.stringify(payload)))
      yield put({
        type: 'currentData',
        payload: res.data
      })
    }

  },

  //修改state只能在这里修改
  reducers: {

    // 存储用户数据
    enterHomeData (state, action) {
      return { ...state, homeData: action.payload }
    },

    // 存储当前操作数据
    currentData (state, action) {
      return { ...state, currentData: action.payload }
    }
  }
}
