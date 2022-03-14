import { IDtype } from '../type'
import { Module } from 'vuex'
import { MusicType } from './type'
import { musicMessageTime } from '@/utlis/map-menus'

import {
  getuserInfo,
  getUserPlaylist,
  getloading,
  getLyrics,
  getMusicName,
  getMusicpageRequest,
  getMusicUrl,
  getCollectors,
  getMyPlayRecord
} from '@/network/search/search'
import { formatUtcString } from '@/utlis/data-formatTime'
import { dataLyric } from '@/utlis/dataLyric'
import Localcache from '@/utlis/caches'
import store from '..'

const pageMusic: Module<MusicType, IDtype> = {
  namespaced: true,
  state: {
    // 详情页面全部信息
    playlist: '',

    MusicMesage: [],

    musicNames: [],
    // 展示播放列表数据
    mp3slist: [],
    //播放列表-- // 获取用户播放排行榜
    mp3s: [],
    //当前播放的歌曲信息
    currentMusicId: {
      name: '',
      0: [{ name: '' }],
      al: {
        picUrl:
          'https://p1.music.126.net/GQkPC35zjYvJj5Q_KWs21Q==/109951165685006345.jpg'
      }
    },
    //歌单的 收藏者
    Collectors: [],
    // 歌单的收藏者的某个用户歌单信息
    userPlaylist: [],
    // 获取用户信息
    userInfo: {},
    // 歌单的收藏者的某个用户歌单信息 自己创建
    userlist: [],
    // 歌单的收藏者的某个用户歌单信息  收藏
    Collectorslist: [],
    //当前歌曲的播放进度---
    musicCurrent: 0,
    // 双击的index
    doubleIndex: -1,
    Lyreic: [] //歌词
  },
  getters: {},
  mutations: {
    addmusicplaylist(state, list: any) {
      state.playlist = list
    },

    addMusicMesage(state, obj: any) {
      state.MusicMesage = obj
    },

    addmusicNames(state, list: any[]) {
      state.musicNames = list
    },
    addmp3slist(state, list: any[]) {
      state.mp3slist = list
    },
    addmp3s(state, list: any[]) {
      state.mp3s = list
    },
    addcurrentPlayMessage(state, musicId: any) {
      state.currentMusicId = musicId
    },
    addDoubleIndex(state, index: any) {
      state.doubleIndex = index
    },
    addDoubleIndexadd(state) {
      state.doubleIndex++
    },
    addDoubleIndexaddjian(state) {
      state.doubleIndex--
    },
    addCollectors(state, list: any[]) {
      state.Collectors = list
    },
    adduserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    adduserlist(state, userlist: any[]) {
      state.userlist = userlist
    },
    addplaylist(state, playlist: any[]) {
      state.Collectorslist = playlist
    },
    adduserPlaylist(state, userlist: any[]) {
      state.userPlaylist = userlist
    },
    addtrackmusics(state, tracks: any[]) {
      state.mp3slist.push(...tracks)
    },
    // 获取用户播放排行榜
    addPlayRecord(state, list: any[]) {
      state.mp3slist = list
    },
    addsetcurrentTime(state, setTime: number) {
      state.musicCurrent = setTime
    },
    // 歌词
    addLyreic(state, Lyreic: any[]) {
      state.Lyreic = Lyreic
    }
  },
  actions: {
    //获取详情页信息
    async getMusicPageh({ commit, state, dispatch }, id: number) {
      commit('addmusicplaylist', '')
      // 详情页所有信息
      const { playlist } = await getMusicpageRequest(id)
      const playermesage = musicMessageTime(playlist.tracks)
      commit('addmusicplaylist', playlist)
      commit('addmp3slist', playermesage)
      console.log(playlist, '获取歌单音乐')

      // 获取 评论 数量 remarknumber
      dispatch('complexData/remarknumberss', playlist.commentCount, {
        root: true
      })
      // 分页器id
      dispatch('complexData/ThreadId', id, {
        root: true
      })
      const token = Localcache.getCache('token')
      if (token) {
        store.dispatch('pageMusic/LoadMusic')
      }
    },
    // 加载更多音乐
    async LoadMusic({ commit, state, dispatch }) {
      let arr = state.playlist.trackIds.slice(state.mp3slist.length)
      if (arr.length > 100) {
        arr = arr.slice(0, 100)
      }
      // console.log(arr.length);
      let ids = ''
      arr.forEach((item: any) => {
        ids += item.id + ','
      })
      console.log(ids)
      ids = ids.substr(0, ids.length - 1)

      console.log(ids.substr(0, ids.length - 1))
      const { songs } = await getMusicName(ids)
      const playermesage = musicMessageTime(songs)
      console.log(playermesage, 'aaa')
      commit('addtrackmusics', playermesage)
      // 做一个上拉滚动触发请求更多音乐
      if (state.playlist.trackCount !== state.mp3slist.length) {
        dispatch('LoadMusic')
      }
    },
    //点击获取单曲详情歌曲信息  用户动态 播放MP3的
    async musicMessageurl({ commit }, ids: number) {
      const { songs } = await getMusicName(ids)
      const playermesage = musicMessageTime(songs)
      // 歌曲列表
      commit('addmp3s', playermesage)
      const { id, name, ar, al, index, tns, alia, mv } = playermesage[0]
      // 获取当前播放的歌单列表
      const musicurl = await getMusicUrl(id)
      const getLyricss = await getLyrics(id)
      const Lyreic = dataLyric(getLyricss.lrc)
      commit('addLyreic', Lyreic)
      // 当前播放的歌曲
      commit('addcurrentPlayMessage', {
        text: name,
        ar: ar,
        al: al,
        ...musicurl.data[0],
        Lyreic,
        tns: tns,
        alia: alia,
        mv: mv
      })
      commit('addDoubleIndex', index)
    },
    //双击之后 获取播放信息
    async PlayMessage({ commit, state }, pages: any) {
      const { event, listdates } = pages
      console.log(event, '双击后的数据')
      console.log(pages, '双击后的数据')
      commit('addmp3s', listdates)
      const { id, name, ar, al, index, tns, alia, mv } = event
      console.log(id, 'id')
      // 获取当前播放的歌单列表
      console.log(name, '双击的name')

      const musicurl = await getMusicUrl(id)
      const getLyricss = await getLyrics(id)
      console.log(getLyricss, 'getLyricsgetLyricsgetLyrics')
      const Lyreic = dataLyric(getLyricss.lrc)
      commit('addLyreic', Lyreic)
      // 当前播放的歌曲
      commit('addcurrentPlayMessage', {
        text: name,
        ar: ar,
        al: al,
        ...musicurl.data[0],
        Lyreic,
        tns: tns,
        alia: alia,
        mv: mv
      })
      commit('addDoubleIndex', index)
      console.log(state.doubleIndex)
    },
    // 播放上一首歌曲
    async leftBtn({ commit, state }) {
      commit('addDoubleIndexaddjian')
      console.log(state.mp3s[state.doubleIndex])
      if (state.doubleIndex == -1) {
        commit('addDoubleIndex', (state.mp3s.length - 1) * 1)
      }
      const { id, name, ar, al, index, tns, alia, mv } =
        state.mp3s[state.doubleIndex]
      console.log(id, 'id')
      // 获取当前播放的歌单列表
      const musicurl = await getMusicUrl(id)
      const getLyricss = await getLyrics(id)
      console.log(getLyricss, 'getLyricsgetLyricsgetLyrics')
      const Lyreic = dataLyric(getLyricss.lrc)
      commit('addLyreic', Lyreic)
      // 当前播放的歌曲
      commit('addcurrentPlayMessage', {
        text: name,
        ar: ar,
        al: al,
        ...musicurl.data[0],
        Lyreic,
        tns: tns,
        alia: alia,
        mv: mv
      })
      commit('addDoubleIndex', index)
    },
    // 播放下一首歌曲
    async rightBtn({ commit, state }) {
      commit('addDoubleIndexadd')
      console.log(state.mp3s[state.doubleIndex])
      if (state.doubleIndex == state.mp3s.length) {
        commit('addDoubleIndex', 0)
      }
      const { id, name, ar, al, index, tns, alia, mv } =
        state.mp3s[state.doubleIndex]
      console.log(id, 'id')
      // 获取当前播放的歌单列表
      const musicurl = await getMusicUrl(id)
      const getLyricss = await getLyrics(id)
      console.log(getLyricss, 'getLyricsgetLyricsgetLyrics')
      const Lyreic = dataLyric(getLyricss.lrc)
      commit('addLyreic', Lyreic)
      // 当前播放的歌曲
      commit('addcurrentPlayMessage', {
        text: name,
        ar: ar,
        al: al,
        ...musicurl.data[0],
        Lyreic,
        tns: tns,
        alia: alia,
        mv: mv
      })
      commit('addDoubleIndex', index)
    },
    // 自动播放完了之后 播放下一首
    async setIndex({ commit, state }, index: number) {
      index++
      if (index === state.mp3s.length) {
        commit('addDoubleIndex', 0)
        const musicurl = await getMusicUrl(state.mp3s[0].id)
        const getLyricss = await getLyrics(state.mp3s[0].id)
        const Lyreic = dataLyric(getLyricss.lrc)
        commit('addLyreic', Lyreic)
        const { name, ar, al, tns, alia, mv } = state.mp3s[0]
        // 当前播放的歌曲
        commit('addcurrentPlayMessage', {
          text: name,
          ar: ar,
          al: al,
          ...musicurl.data[0],
          Lyreic,
          tns: tns,
          alia: alia,
          mv: mv
        })
      } else {
        commit('addDoubleIndex', index)
        console.log(state.doubleIndex, '自动播放后的index')
        const musicurl = await getMusicUrl(state.mp3s[index].id)
        const getLyricss = await getLyrics(state.mp3s[index].id)
        const Lyreic = dataLyric(getLyricss.lrc)
        commit('addLyreic', Lyreic)
        const { name, ar, al, tns, alia, mv } = state.mp3s[index]
        // 当前播放的歌曲
        commit('addcurrentPlayMessage', {
          text: name,
          ar: ar,
          al: al,
          ...musicurl.data[0],
          Lyreic,
          tns: tns,
          alia: alia,
          mv: mv
        })
      }
    },

    // 获取歌单的收藏者
    async getCollector({ commit }, page: any) {
      const Collectors = await getCollectors(page)
      console.log(Collectors, 'CollectorsCollectors')
      commit('addCollectors', Collectors.subscribers)
    },

    async getUserPlaylists({ commit, state }, id: number) {
      commit('adduserInfo', '')
      commit('adduserlist', '')
      commit('addplaylist', '')
      commit('adduserPlaylist', '')
      // 获取用户信息
      const userInfo = await getuserInfo(id)
      commit('adduserInfo', userInfo)

      const userPlaylist = await getUserPlaylist(id)
      // console.log(userPlaylist.playlist, 'getUserPlaylistgetUserPlaylist')
      const userlist: any[] = []
      const playlist: any[] = []
      userPlaylist.playlist.map((item: any) => {
        if (item.creator.userId === id) {
          userlist.push(item)
        } else {
          playlist.push(item)
        }
      })
      console.log(userInfo, 'userInfouserInfouserInfo')

      commit('adduserlist', userlist)
      commit('addplaylist', playlist)
      commit('adduserPlaylist', userPlaylist.playlist)
    },
    async getPlayRecord({ commit }, page: any) {
      commit('addPlayRecord', [])

      const { id, index } = page
      const PlayRecord = await getMyPlayRecord(id, index)
      console.log(PlayRecord, '播放')
      const a: any[] = []
      if (PlayRecord.weekData) {
        for (const item of PlayRecord.weekData) {
          a.push(item.song)
        }
      } else {
        for (const item of PlayRecord.allData) {
          a.push(item.song)
        }
      }
      console.log(a, 'aa')

      // 处理转化数据与dt时间
      const playermesage = musicMessageTime(a)
      commit('addPlayRecord', playermesage)
    },
    //当前歌曲的播放进度---
    setcurrentTime({ commit }, setTime: number) {
      commit('addsetcurrentTime', setTime)
    },
    // 所有专辑点击播放全部图标/点击热门50首展开
    albumcurrentmusic({ commit }, list: any[]) {
      commit('addmp3s', list)
    }
    //
  }
}
export default pageMusic
