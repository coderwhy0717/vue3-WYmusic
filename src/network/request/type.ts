import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface JHRequestInterceptors<T = AxiosResponse> {
  requestcg?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestsb?: (err: any) => any
  requestxy?: (res: T) => T
  requestxysb?: (error: any) => any
}
export interface JHRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptorss?: JHRequestInterceptors<T>
  showloading?: boolean
  withCredentials?: boolean
}
