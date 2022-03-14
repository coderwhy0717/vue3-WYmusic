import { WRequst, WRequsts } from '../index'
import Localcache from '@/utlis/caches'
enum API {
  AccountLogin = '/search?keywords=',
  result = '/song/url?id=',
  getBanners = '/banner',
  MusicUrls = '/personalized?',
  MusicpageRequest = '/playlist/detail?id=',
  // 获取歌曲的名字
  MusicName = '/song/detail?ids=',
  MusicUrl = '/song/url?id=',
  // 获取歌词
  Lyrics = '/lyric?id=',
  // 获取歌曲评论
  getloading = '/comment/music?id=',
  // 获取歌单 收藏者
  Collectors = '/playlist/subscribers?id=',
  // 获取歌单的 收藏者的用户的详情
  userPlarlist = '/user/playlist?uid=',
  // 获取用户信息
  userInfo = '/user/detail?uid=',
  // 获取用户听歌排行榜
  MyPlayRecord = '/user/record?uid='
}

interface IDataType<T = any> {
  code: number
  result: T
}
// 根据 名字 搜索 歌曲 获取的 id
export function searchRequest(ccount: string) {
  return WRequst.post<IDataType>({
    url: API.AccountLogin + `${ccount}`
  })
}

interface resultType<T = any> {
  code: number
  data: T
}
// 根据id 搜索歌曲
export function resultRequest(id: number) {
  return WRequst.get<resultType>({
    url: API.result + id
  })
}
// 获取轮播图
export function getBannersRequest() {
  return WRequst.get({
    url: API.getBanners
  })
}
// 获取推荐歌单/歌单
export function getMusicRequest(limit: number) {
  return WRequst.get({
    url: API.MusicUrls + limit + '&order=hot'
  })
}
// 获取推荐歌单/歌单的详情 传入id
export function getMusicpageRequest(id: number) {
  return WRequst.get({
    url: API.MusicpageRequest + id,
    showloading: false
  })
}
// const token = Localcache.getCache('token')
// const userDetailId = Localcache.getCache('userDetailId')
// if (token && userDetailId) {
//   config.headers.Authorization = `Bearer ${token}`
// }
// 获取歌曲的名字信息等
export function getMusicName(ids: any) {
  return WRequst.get({
    url: API.MusicName + ids,
    showloading: false
  })
}
// 获取歌曲的Url音乐
export function getMusicUrl(id: number) {
  return WRequst.get({
    url: API.MusicUrl + id,
    showloading: false
  })
}
// 获取歌曲的 歌词
export function getLyrics(id: number) {
  return WRequst.get({
    url: API.Lyrics + id,
    showloading: false
  })
}
// 获取 歌曲 评论
export function getloading(id: number, quantity?: number) {
  if (quantity) {
    return WRequst.get({
      url: API.getloading + id + '&limit=' + quantity
    })
  } else {
    return WRequst.get({
      url: API.getloading + id + '&limit=' + 20
    })
  }
}
// 获取歌单 收藏者 数量
export function getCollectors(id: number, quantity?: number) {
  if (quantity) {
    return WRequst.get({
      url: API.Collectors + id + '&limit=' + quantity
    })
  } else {
    return WRequst.get({
      url: API.Collectors + id + '&limit=' + 30
    })
  }
}
// 获取歌单的 收藏者的用户的详情
export function getUserPlaylist(id: number) {
  return WRequst.get({
    url: API.userPlarlist + id
  })
}
// 获取用户信息
export function getuserInfo(id: number) {
  return WRequst.get({
    url: API.userInfo + id
  })
}
// 获取用户听歌排行榜 17956280761
export function getMyPlayRecord(id: number, index: number) {
  return WRequst.get({
    url: API.MyPlayRecord + id + '&type=' + index
  })
}
