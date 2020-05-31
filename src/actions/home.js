import { 
  FETCH_HOME_DATA, 
  FETCH_HOME_ADD,
  FETCH_HOME_UPDATE,
  FETCH_HOME_DELETE
} from '@/constants/actionTypes'

// 获取用户数据
export const HomeData = (options) => {
  return {
    type: FETCH_HOME_DATA,
    payload: options
  }
}

// 添加用户数据
export const HomeAdd = (options) => {
  return {
    type: FETCH_HOME_ADD,
    payload: options
  }
}

// 添加用户数据
export const HomeUpdate = (options) => {
  return {
    type: FETCH_HOME_UPDATE,
    payload: options
  }
}

// 删除用户数据
export const HomeDelete = (options) => {
  return {
    type: FETCH_HOME_DELETE,
    payload: options
  }
}