import request from '@/utils/request'

// 定义接口参数类型
export interface LoginParams {
  username: string
  password: string
}

// 定义返回数据类型
export interface LoginResponse {
  token: string
  userInfo: {
    id: number
    username: string
    role: string
  }
}

export interface UserInfoResponse {
  id: number
  username: string
  role: string
  avatar?: string
}

// API 方法
export const userApi = {
  login: (data: LoginParams) => {
    return request<LoginResponse>({
      url: '/user/login',
      method: 'post',
      data
    })
  },

  getUserInfo: () => {
    return request<UserInfoResponse>({
      url: '/user/info',
      method: 'get'
    })
  }
}