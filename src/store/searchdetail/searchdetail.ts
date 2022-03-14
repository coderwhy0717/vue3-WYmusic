import { Module } from 'vuex'
import { IDtype } from '../type'
import { searchdetailtype } from './search-type'
import {
  getsearchDetail,
  getsearchkeywords,
  getLikeMusic,
  getlikeuser,
  getuserevent
} from '@/network/searchdetail/searchdetail'
import { getMusicUrl } from '@/network/search/search'
import { musicMessageTime, userevent } from '@/utlis/map-menus'
const searchDetail: Module<searchdetailtype, IDtype> = {
  namespaced: true,
  state: {
    searchdetail: [], //获取热搜热表
    searchkeywords: {}, // 获取歌曲的搜索结果
    searchSinger: {}, // 获取歌手的搜索结果
    searchAlbum: {}, // 获取搜索的专辑
    searchMV: {}, // 获取搜索的视频
    searchSong: {}, // 获取搜索的歌单
    searchLyrics: {}, // 获取搜索的歌词
    searchUser: {}, // 获取搜索的用户
    userevents: [] //获取用户动态信息
  },
  mutations: {
    addsearchdetail(state, list: any[]) {
      state.searchdetail = list
    },
    addsearchkeywords(state, play: any) {
      state.searchkeywords = play
    },
    addsearchSinger(state, play: any) {
      state.searchSinger = play
    },
    addsearchAlbum(state, play: any) {
      state.searchAlbum = play
    },
    addsearchMV(state, play: any) {
      state.searchMV = play
    },
    addsearchSong(state, play: any) {
      state.searchSong = play
    },
    addsearchLyrics(state, play: any) {
      state.searchLyrics = play
    },
    addsearchUser(state, play: any) {
      state.searchUser = play
    },
    adduserevents(state, list: any) {
      state.userevents = list
    }
  },
  actions: {
    // 获取热搜热表
    async searchmessage({ commit }) {
      const searchs = await getsearchDetail()
      console.log(searchs.data, '搜索热门详情')
      commit('addsearchdetail', searchs.data)
    },
    // 获取所搜的单曲
    async searchkeywords({ commit }, page: any) {
      const { name, type, limit, offset } = page
      const searchkeyword = await getsearchkeywords(name, type, limit, offset)
      console.log(searchkeyword, '搜索的信息')
      const searchkeywords = musicMessageTime(searchkeyword.result.songs)
      commit('addsearchkeywords', {
        songCount: searchkeyword.result.songCount,
        songs: searchkeywords
      })
    },
    // 获取搜索的歌手
    async searchSinger({ commit }, page: any) {
      const { name, type, limit, offset } = page
      const searchSinger = await getsearchkeywords(name, type, limit, offset)
      console.log(searchSinger, '搜索的歌手')
      commit('addsearchSinger', {
        artistCount: searchSinger.result.artistCount,
        artists: searchSinger.result.artists
      })
    },
    // 获取搜索的专辑
    async searchAlbum({ commit }, page: any) {
      const { name, type, limit, offset } = page
      const searchAlbum = await getsearchkeywords(name, type, limit, offset)
      console.log(searchAlbum, '搜索的专辑')
      commit('addsearchAlbum', {
        albumCount: searchAlbum.result.albumCount,
        albums: searchAlbum.result.albums
      })
    },
    // 获取搜索的视频
    async searchMV({ commit }, page: any) {
      const { name, type, limit, offset } = page
      const searchMV = await getsearchkeywords(name, type, limit, offset)
      console.log(searchMV, '搜索的视频')
      commit('addsearchMV', {
        mvCount: searchMV.result.mvCount,
        mvs: searchMV.result.mvs
      })
    },
    // 获取搜索的歌单
    async searchSong({ commit }, page: any) {
      const { name, type, limit, offset } = page
      const searchSong = await getsearchkeywords(name, type, limit, offset)
      console.log(searchSong, '搜索的歌单')

      commit('addsearchSong', {
        playlistCount: searchSong.result.playlistCount,
        playlists: searchSong.result.playlists
      })
    },
    // 获取搜索的歌词
    async searchLyrics({ commit }, page: any) {
      const { name, type, limit, offset } = page
      const searchLyrics = await getsearchkeywords(name, type, limit, offset)
      console.log(searchLyrics, '搜索的歌词')
      const aLyrics = musicMessageTime(searchLyrics.result.songs)
      console.log(aLyrics, '处理的歌词')

      commit('addsearchLyrics', {
        songCount: searchLyrics.result.songCount,
        songs: aLyrics
      })
    },
    // 获取搜索的播客
    // async searchSinger({ commit }, page: any) {
    //   const { name, type, limit, offset } = page
    //   const searchkeyword = await getsearchkeywords(name, type, limit, offset)
    //   console.log(searchkeyword, '搜索的歌手')
    //   commit('addsearchSinger', {
    //     artistCount: searchkeyword.result.artistCount,
    //     artists: searchkeyword.result.artists
    //   })
    // },
    // 获取搜索的声音
    // async searchSinger({ commit }, page: any) {
    //   const { name, type, limit, offset } = page
    //   const searchkeyword = await getsearchkeywords(name, type, limit, offset)
    //   console.log(searchkeyword, '搜索的歌手')
    //   commit('addsearchSinger', {
    //     artistCount: searchkeyword.result.artistCount,
    //     artists: searchkeyword.result.artists
    //   })
    // },
    // 获取搜索的用户
    async searchUser({ commit }, page: any) {
      const { name, type, limit, offset } = page
      const searchUsers = await getsearchkeywords(name, type, limit, offset)
      console.log(searchUsers, '搜索的用户')
      commit('addsearchUser', {
        userprofileCount: searchUsers.result.userprofileCount,
        userprofiles: searchUsers.result.userprofiles
      })
    },
    // 用户喜欢音乐
    async LikeMusic({ commit }, page: any) {
      const { id, like, userId } = page
      const likes = await getLikeMusic(id, like)
      console.log(likes, 'likes')
      const userlike = await getlikeuser(userId)
      console.log(userlike, 'getlikeuser')
      const musicurl = await getMusicUrl(likes.playlistId)
      console.log(musicurl, 'musicurl')
    },
    // 获取用户动态
    async userevent({ commit }, page: any) {
      const { uid, lasttime } = page
      const userevents = await getuserevent(uid, lasttime)
      console.log(userevents, '用户动态事件')
      const eventschu = userevent(userevents.events)
      console.log(eventschu, '用户动态事件处理的')
      commit('adduserevents', {
        events: eventschu,
        lasttime: userevents.lasttime
      })
    }
  }
}

export default searchDetail
