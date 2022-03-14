import { WRequst, WRequsts } from '../index'
enum API {
  // 登录
  login = '/login/cellphone?phone=',
  // 退出登录
  logout = '/logout',
  // 获取登录状态
  loginStatus = '/login/status',

  userSubcount = '/user/subcount',
  // 获取用户 动态
  userDynamics = '/user/event?uid=',
  // 获取用户关注/user/follows?uid=32953014
  userConcern = '/user/follows?uid=',
  // 获取用户粉丝
  userfans = '/user/followeds?uid='
}
// 登录
export function getLogin(phone: number, password: any) {
  return WRequst.get({
    url: API.login + phone + '&password=' + password,
    showloading: false
  })
}
// 获取登录状态
export function getLoginStatus() {
  return WRequst.get({
    url: API.loginStatus,
    showloading: false
  })
}
// 退出登录状态
export function logout() {
  return WRequst.get({
    url: API.logout,
    showloading: false
  })
}
// 获取用户信息歌单收藏，mv ,dj,数量等
export function userSubcount() {
  return WRequst.get({
    url: API.userSubcount,
    showloading: false
  })
}
// 获取用户动态 关注 粉丝
export function userDynamics(id: number, pageindex?: number) {
  return WRequst.get({
    url: API.userDynamics + id + '&offset=' + pageindex
  })
}
export function userConcern(id: number, pageindex?: number) {
  return WRequst.get({
    url: API.userConcern + id + '&offset=' + pageindex
  })
}
export function userFans(id: number, pageindex?: number) {
  return WRequst.get({
    url: API.userfans + id + '&offset=' + pageindex
  })
}
