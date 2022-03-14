import { Module } from 'vuex'
import { IDtype } from '../type'
import {
  searchRequest,
  resultRequest,
  getBannersRequest,
  getMusicRequest
} from '@/network/search/search'
import { searchType } from './type'
import Localcache from '@/utlis/caches'
import { useRoute } from 'vue-router'
import router from '@/router'

const search: Module<searchType, IDtype> = {
  namespaced: true,
  state: {
    //搜索歌曲的数据
    searchgoods: [],
    // 轮播图数据
    bannergoods: [],
    // 推荐歌曲
    recommend: [],
    // aside路由路径
    routeList: [],
    // music路由
    musicList: []
  },
  mutations: {
    addsearch(state, pold: any[]) {
      state.searchgoods = pold
    },
    addbanners(state, plod: any[]) {
      state.bannergoods = plod
    },
    // addRoutes(state, list: any[]) {
    //   state.routeList = list[0]

    //   const mapUrl = mapMenusToRouters(list)
    //   mapUrl.forEach((route) => {
    //     router.addRoute('main', route)
    //   })
    // },
    // addRoutesChildren(state, list: any[]) {
    //   state.musicList = list
    //   const mapUrl = mapMenusToRouters(list)
    //   mapUrl.forEach((route) => {
    //     router.addRoute('music', route)
    //   })
    // },
    addMusicList(state, list: any[]) {
      state.recommend = list
    }
  },
  actions: {
    async getSearch({ commit, dispatch }) {
      // const a = await searchRequest(pold)
      // console.log(a, 'aaaaaaaaaaaaaaaaaaaaaaaaaa')
      // commit('addsearch', a.result.songs)
      //登录逻辑里  轮播图
      const banners = await getBannersRequest()

      commit('addbanners', banners.banners)

      dispatch('getRecommended', 30)
    },
    async getMusic({ commit }, id: number) {
      const music = await resultRequest(id)
      console.log(music, 'music')
    },
    async getRecommended({ commit }, limit: number) {
      // 推荐歌曲
      const MusicList = await getMusicRequest(limit)

      commit('addMusicList', MusicList.result)
    },

    // 刷新
    loadLocalLogin({ commit, dispatch }) {
      const token = Localcache.getCache('token')
      const userInfo = Localcache.getCache('userInfo')
      if (token && userInfo) {
        commit('login/addlogintoken', token, { root: true })
        commit('login/addprofile', userInfo, { root: true })
      }
      const userDetailId = Localcache.getCache('userDetailId')
      if (userDetailId) {
        dispatch('pageMusic/getUserPlaylists', userDetailId, { root: true })
      }
    }
  }
}

export default search
