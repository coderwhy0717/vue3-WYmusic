import { Module } from 'vuex'
import { LoginType, Logins } from './type'
import { IDtype } from '../type'
import {
  getLogin,
  logout,
  getLoginStatus,
  userSubcount,
  userDynamics,
  userConcern,
  userFans
} from '@/network/login/login'
import Localcache from '@/utlis/caches'
import router from '@/router'
import { useStore } from '@/store'
const login: Module<LoginType, IDtype> = {
  namespaced: true,
  state: {
    token: '',
    profiles: {},
    userFansConcern: [],
    userDynamics: []
  },
  mutations: {
    addlogintoken(state, token: string) {
      state.token = token
    },
    addprofile(state, profile: any) {
      state.profiles = profile
    },
    // 用户的关注/用户的粉丝
    adduserFansConcern(state, list: any[]) {
      state.userFansConcern = list
    },
    // 用户的动态
    adduserDynamics(state, list: any[]) {
      state.userDynamics = list
    }
  },
  actions: {
    // 登录调用
    async getLogins({ commit, dispatch }, play: Logins) {
      const { phone, password } = play
      // 登录
      console.log(phone, password)
      const a = await getLogin(phone, password)
      const { token, profile, cookie } = a
      console.log(a, '登录数据')
      console.log(a.cookie, 'a.cookie')
      console.log(cookie, 'cookie')

      document.cookie = cookie //登录时设置cookie
      document.cookie = 'acookie'
      commit('addprofile', profile)
      commit('addlogintoken', token)

      Localcache.setCache('token', token)
      Localcache.setCache('cookie', cookie)
      Localcache.setCache('userInfo', profile)

      const getLoginStatu = await getLoginStatus()

      console.log(getLoginStatu, '获取当前的登陆状态')
      if (getLoginStatu.data.profile) {
        dispatch('search/loadLocalLogin', null, { root: true })
        router.push('/main')
        // 获取用户信息 歌单 收藏MV等
        const userSubcounts = await userSubcount()
        console.log(userSubcounts, '获取用户信息 歌单 收藏MV等')
      }

      // commit('addprofile', getLoginStatu.data.profile)
    },
    // 退出登录调用
    async outLogin({ commit, dispatch }) {
      const logouts = await logout()
      console.log(logouts, '退出登录信息')
      const getLoginStatu = await getLoginStatus()
      console.log(getLoginStatu, '获取当前退出的状态')
      commit('addlogintoken', '')
      commit('addprofile', {})
      dispatch('search/loadLocalLogin', null, { root: true })
      Localcache.deleteCache('userDetailId')
      Localcache.deleteCache('cookie')
      router.push('/main')
    },
    async getuserFans({ commit }, page: any) {
      const { id, pageindex } = page
      const userFanss = await userFans(id, pageindex)
      console.log(userFanss, 'userFanssss')
      commit('adduserFansConcern', userFanss.followeds)
    },
    async getuserConcern({ commit }, page: any) {
      const { id, pageindex } = page
      const userConcerns = await userConcern(id, pageindex)
      console.log(userConcerns.follow, 'aaa')
      commit('adduserFansConcern', userConcerns.follow)
    }
  }
}

export default login
