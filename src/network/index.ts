import WJHRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import Localcache from '@/utlis/caches'
const WRequst = new WJHRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  withCredentials: true,
  interceptorss: {
    requestcg: (config) => {
      // 实例发送请求时 添加携带token
      const token = Localcache.getCache('token')
      if (token) {
        // config.headers.Authorization = `Bearer ${token}`
      }
      // console.log('请求成功')
      return config
    },
    requestxy: (res) => {
      console.log('响应成功')
      return res
    }
  }
})
const WRequsts = new WJHRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptorss: {
    requestcg: (config) => {
      // 实例发送请求时 添加携带token
      const token = Localcache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // console.log('请求成功')
      return config
    },
    requestxy: (res) => {
      console.log('响应成功')
      return res
    }
  }
})

export { WRequst, WRequsts }
