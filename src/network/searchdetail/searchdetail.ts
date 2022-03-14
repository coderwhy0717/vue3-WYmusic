import { WRequst } from '../index'

enum API {
  // 获取热搜热表
  searchDetail = '/search/hot/detail',
  //搜索信息
  searchkeywords = '/cloudsearch?keywords=',
  LikeMusic = '/like?id=', //喜欢音乐
  likeuser = '/likelist?uid=', //用户喜欢列表
  userevent = '/user/event?uid=' //获取用户动态
}
// 获取热搜热表getsearchDetail
export function getsearchDetail() {
  return WRequst.get({
    url: API.searchDetail,
    showloading: false
  })
}
// //搜索信息
export function getsearchkeywords(
  name: string,
  type: number,
  limit: number,
  offset: number
) {
  return WRequst.get({
    url:
      API.searchkeywords +
      name +
      '&type=' +
      type +
      '&limit=' +
      limit +
      '&offset=' +
      offset
  })
}
export function getLikeMusic(id: number, like: boolean) {
  return WRequst.get({
    url: API.LikeMusic + id + '&like=' + like
  })
}
export function getlikeuser(id: number) {
  return WRequst.get({
    url: API.likeuser + id
  })
}
//获取用户动态  32953014&limit=1&lasttime=1558011138743'

export function getuserevent(uid: number, lasttime?: any) {
  return WRequst.get({
    url: API.userevent + uid + '&limit=' + 60 + '&lasttime=' + lasttime
  })
}
