// import { IDtype } from '../type'
// import { Module } from 'vuex'
// import { MusicType } from './type'
// import {
//   getloading,
//   getLyrics,
//   getMusicName,
//   getMusicpageRequest,
//   getMusicUrl
// } from '@/network/search/search'
// import { formatUtcString } from '@/utlis/data-formatTime'
// const pageMusic: Module<MusicType, IDtype> = {
//   namespaced: true,
//   state: {
//     playlist: '',
//     MusicMesage: '',

//     musicNames: [],
//     //播放列表
//     mp3s: [],
//     //当前播放的歌曲信息
//     currentMusicId: {
//       album: {
//         picUrl:
//           'https://p1.music.126.net/GQkPC35zjYvJj5Q_KWs21Q==/109951165685006345.jpg'
//       },
//       text: '',
//       name: [{ name: '' }]
//     },
//     //当前歌曲的播放进度
//     musicCurrent: '',
//     // 双击的index
//     doubleIndex: 0
//   },
//   mutations: {
//     addMusicMesage(state, obj: any) {
//       state.MusicMesage = obj

//     },
//     addmusicplaylist(state, list: any) {
//       state.playlist = list
//     },

//     addmusicNames(state, list: any[]) {
//       state.musicNames = list
//     },
//     addmp3s(state, list: any[]) {
//       state.mp3s = list
//     },
//     addcurrentMusicId(state, musicId: any) {
//       state.currentMusicId = musicId
//     },
//     addDoubleIndex(state, index: any) {
//       state.doubleIndex = index
//     }
//   },
//   actions: {
//     async getMusicPageh({ commit }, id: number) {
//       const { playlist, privileges  } = await getMusicpageRequest(id)
//       //1. 获取歌曲name信息
//       const playlists = playlist.tracks
//       //2. 获取对应的头部信息歌曲id
//       // const privilegess = privileges
//       //3. 融合到一个新的数组中
//       const musicpage: any[] = []
//       //3.1 遍历
//       for (let i = 0; i < playlists.length; i++) {
//         //3.2 浅拷贝
//         const a = { ...playlists[i], ...privileges[i], i }
//         musicpage.push(a)
//       }
//       console.log(musicpage, 'vuex musicpagemusicpagemusicpagemusicpagess')

//       //4. 遍历修改新数组中的数据
//       const musicname = musicpage.map((item: any) => {
//         //5. 对歌曲的时间格式化
//         const dt = formatUtcString(item.dt, 'mm:ss')
//         //
//         return {
//           text: item.name,
//           name: item.ar,
//           album: item.al,
//           dt: dt,
//           musicId: item.id,
//           index: item.i
//         }
//       })
//       commit('addMusicMesage', musicname)
//       // 获取详情页的头部 信息 与 歌曲信息
//       commit('addmusicplaylist', playlist)
//     },
//     // 点击播放时
//     async getMusicUrl({ commit, state }, plod: any) {
//       // 多曲
//       const musics: any[] = []

//       // 歌单的每个
//       for (const item of state.MusicMesage) {
//         console.log(item, 'vuexitem')
//         const musicurl = await getMusicUrl(item.musicId)
//         const Lyrics = await getLyrics(item.musicId)
//         musics.push({ ...musicurl.data[0], ...item, ...Lyrics })
//       }
//       // 获取播放歌曲url列表
//       commit('addmp3s', musics)
//       // 单曲播放歌曲url
//       const musicurl = await getMusicUrl(plod.musicId)
//       const Lyrics = await getLyrics(plod.musicId)
//       const geloading = await getloading(plod.musicId)
//       console.log(geloading, 'LyricsLyricsLyrics')

//       commit('addcurrentMusicId', {
//         ...musicurl.data[0],
//         ...plod,
//         ...Lyrics
//       })
//     },
//     // 双击的index
//     setDoubleIndex({ commit }, index: number) {
//       commit('addDoubleIndex', index)
//     },
//     // 播放结束调用
//     setIndex({ commit, state }, index: number) {
//       console.log(index, '当前播放id')

//       index++
//       // 判断循环 重置播放歌曲
//       if (index === state.mp3s.length) {
//         commit('addDoubleIndex', 0)
//         commit('addcurrentMusicId', state.mp3s[0])
//       } else {
//         console.log(index, '去播放vuex')
//         console.log(state.doubleIndex, '当前播放')
//         console.log(state.mp3s.length, '总vuex')
//         commit('addDoubleIndex', index)
//         commit('addcurrentMusicId', state.mp3s[index])
//         console.log(index, '去播放之后vuex')
//         console.log(state.doubleIndex, '当前播放2')
//       }
//     },
//     // 获取当前播放歌曲信息img mp3
//     async getMusicmessage({ commit }, message: any) {
//       const { album, name } = message

//       const currentmessage = { ...album, ...name }
//       commit('addmusicmeassge', currentmessage)

//       // commit('addmusicmeassge', musicmessage)
//     }
//   }
// }
// export default pageMusic

// -------------------
// const traIds = [...state.playlist.trackIds]
//       traIds.splice(0, state.mp3s.length)
//       console.log(traIds, '删除之后的长度')
//       const songss: any[] = []

//       a()
//       async function a() {
//         if (state.mp3s[0].id === state.playlist.trackIds[0].id) {
//           if (traIds.length < 30) {
//             for (const item in traIds) {
//               console.log(traIds[item], 'item...')
//               const a = await getMusicName(traIds[item].id)
//               console.log(a.songs, 'aaaaaaaaaaaaass')
//               songss.push(...a.songs)
//             }
//             console.log(songss, 'songss数组')

//             commit('addtrackmusics', songss)
//           } else {
//             const son: any[] = []
//             for (let i = 0; i < 20; i++) {
//               const a = await getMusicName(traIds[i].id)
//               son.push(...a.songs)
//             }
//             commit('addtrackmusics', son)
//             traIds.splice(0, 20)
//             console.log(traIds.length, '获取20个之后的长度')
//             a()
//           }
//         }
//       }
// -----------
