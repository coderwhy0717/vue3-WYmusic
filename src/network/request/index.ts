import axios from 'axios'
import { AxiosInstance } from 'axios'
import { ElLoading } from 'element-plus'
import { JHRequestInterceptors, JHRequestConfig } from './type'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
import {
  commentlike,
  commentReply,
  LikeMusic,
  UserSub,
  UserPlayList,
  UserDetail,
  LikeList,
  RefLogin,
  MVList,
  CollectSinger,
  SingerList,
  LoginStatus
} from './API'
import Localcache from '@/utlis/caches'
const DEFAULT_LOAFING = true
const url = [
  commentlike,
  commentReply,
  LikeMusic,
  UserSub,
  UserPlayList,
  UserDetail,
  LikeList,
  RefLogin,
  MVList,
  CollectSinger,
  SingerList,
  LoginStatus
]
class WJHRequest {
  instance: AxiosInstance
  interceptorss?: JHRequestInterceptors
  isloading?: LoadingInstance
  showloading: boolean
  withCredentials: boolean
  constructor(config: JHRequestConfig) {
    this.instance = axios.create(config)
    this.interceptorss = config.interceptorss
    this.showloading = config.showloading ?? DEFAULT_LOAFING
    this.withCredentials = config.withCredentials ?? true
    // // 请求拦截器，对需要携带cookie的api添加cookie参数
    this.instance.interceptors.request.use(
      (data) => {
        // console.log(data, 'data')
        // console.log(data.url?.split('?')[0], 'data')
        const isNeverLogin = url.findIndex(
          (item) => item == data.url?.split('?')[0]
        )
        console.log(isNeverLogin, 'cookieisNeverLogin')
        const cookie = Localcache.getCache('cookie')
        if (cookie && isNeverLogin >= 0) {
          if (data.params) {
            data.params.cookie = cookie
            console.log(data.params.cookie, ' data.params.cookie')
          }
        }

        // console.log(data, 'cookieData')
        return data
      },
      (err) => {
        console.log(err)
        return err
      }
    )
    // 实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptorss?.requestcg,
      this.interceptorss?.requestsb
    )
    this.instance.interceptors.response.use(
      this.interceptorss?.requestxy,
      this.interceptorss?.requestxysb
    )

    // 全局的拦截器 直接写
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局的请求成功:::')
        if (this.showloading) {
          this.isloading = ElLoading.service({
            lock: true,
            text: '俢钩~ ，Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        console.log('全局的请求失败')

        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局的响应成功')
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('-1001,响应请求失败~')
        } else {
          this.isloading?.close()
          return data
        }
      },
      (err) => {
        console.log('全局的响应失败')
        if (err.response.status === 404) {
          console.log('404~错误')
        }
        this.isloading?.close()
        return err
      }
    )
  }
  // 单独请求来到这里调用
  request<T = any>(config: JHRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 判断传进来的config 有没有拦截器 如果有就执行这个函数  本质上就是在请求的前一步做判断 执行函数 里的loading等事情 达到效果 后  然后把传进来的值原路返回 类似于过滤器只是增加东西执行
      if (config.interceptorss?.requestcg) {
        config = config.interceptorss.requestcg(config) //发送请求成功
      } else if (config.interceptorss?.requestsb) {
        config = config.interceptorss.requestsb(config) //发送请求失败
      }
      // 修改 this,showloading
      if (config.showloading === false) {
        this.showloading = config.showloading
      }
      //真正的 网络请求
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 服务器返回时 判断config里面是否有响应式拦截器  如果有就调用这个函数把服务器的数据res传进去 执行里面的loading等事情 后 再把res服务器返回的数据 返回出去
          if (config.interceptorss?.requestxy) {
            res = config.interceptorss.requestxy(res) //响应成功
          } else if (config.interceptorss?.requestxysb) {
            res = config.interceptorss.requestxysb(res) //响应失败
          }

          resolve(res) //数据

          // 返回数据之后 还原 showloading
          this.showloading = DEFAULT_LOAFING
        })
        .catch((error) => {
          this.showloading = DEFAULT_LOAFING
          reject(error)
          console.log(error, 'error')
        })
    })
  }

  get<T = any>(config: JHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: JHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: JHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: JHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default WJHRequest
