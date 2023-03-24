// import { IDtype } from '../type'
// import { Module } from 'vuex'
// import { MusicType } from './type'
// import { musicMessageTime } from '@/utlis/map-menus'

// import {
//   getuserInfo,
//   getUserPlaylist,
//   getloading,
//   getLyrics,
//   getMusicName,
//   getMusicpageRequest,
//   getMusicUrl,
//   getCollectors,
//   getMyPlayRecord
// } from '@/network/search/search'
// import { formatUtcString } from '@/utlis/data-formatTime'
// import { dataLyric } from '@/utlis/dataLyric'
// import Localcache from '@/utlis/caches'
// import store from '..'

// const pageMusic: Module<MusicType, IDtype> = {
//   namespaced: true,
//   state: {
//     // 详情页面全部信息
//     playlist: '',

//     MusicMesage: [],

//     musicNames: [],
//     // 展示播放列表数据
//     mp3slist: [
//       {
//         name: '温暖阳光洒落在你的窗前',
//         id: 1484537845,
//         pst: 0,
//         t: 0,
//         ar: [
//           {
//             id: 34637050,
//             name: 'Colo',
//             tns: [],
//             alias: []
//           }
//         ],
//         alia: [],
//         pop: 100,
//         st: 0,
//         rt: '',
//         fee: 8,
//         v: 31,
//         crbt: null,
//         cf: '',
//         al: {
//           id: 96342883,
//           name: 'Sunny',
//           picUrl:
//             'https://p2.music.126.net/oPoqXeUmCm65zml1r55KBA==/109951165364992849.jpg',
//           tns: [],
//           pic_str: '109951165364992849',
//           pic: 109951165364992850
//         },
//         dt: 197394,
//         h: {
//           br: 320000,
//           fid: 0,
//           size: 7897965,
//           vd: -8648,
//           sr: 48000
//         },
//         m: {
//           br: 192000,
//           fid: 0,
//           size: 4738797,
//           vd: -6005,
//           sr: 48000
//         },
//         l: {
//           br: 128000,
//           fid: 0,
//           size: 3159213,
//           vd: -4230,
//           sr: 48000
//         },
//         sq: {
//           br: 1460178,
//           fid: 0,
//           size: 36028884,
//           vd: -8649,
//           sr: 48000
//         },
//         hr: null,
//         a: null,
//         cd: '01',
//         no: 1,
//         rtUrl: null,
//         ftype: 0,
//         rtUrls: [],
//         djId: 0,
//         copyright: 0,
//         s_id: 0,
//         mark: 131136,
//         originCoverType: 0,
//         originSongSimpleData: null,
//         tagPicList: null,
//         resourceState: true,
//         version: 31,
//         songJumpInfo: null,
//         entertainmentTags: null,
//         single: 0,
//         noCopyrightRcmd: null,
//         rtype: 0,
//         rurl: null,
//         mst: 9,
//         cp: 0,
//         mv: 0,
//         publishTime: 0
//       },
//       {
//         name: '消逝的光芒③',
//         id: 1924933964,
//         pst: 0,
//         t: 0,
//         ar: [
//           {
//             id: 50040107,
//             name: '你还在失望吧',
//             tns: [],
//             alias: []
//           }
//         ],
//         alia: [],
//         pop: 20,
//         st: 0,
//         rt: '',
//         fee: 8,
//         v: 4,
//         crbt: null,
//         cf: '',
//         al: {
//           id: 138597273,
//           name: '心之所向',
//           picUrl:
//             'https://p2.music.126.net/7XiJq32IPOT4PJrEDeYNxQ==/109951166912155812.jpg',
//           tns: [],
//           pic_str: '109951166912155812',
//           pic: 109951166912155800
//         },
//         dt: 101520,
//         h: {
//           br: 320000,
//           fid: 0,
//           size: 4061805,
//           vd: -30195,
//           sr: 48000
//         },
//         m: {
//           br: 192000,
//           fid: 0,
//           size: 2437101,
//           vd: -27587,
//           sr: 48000
//         },
//         l: {
//           br: 128000,
//           fid: 0,
//           size: 1624749,
//           vd: -25951,
//           sr: 48000
//         },
//         sq: null,
//         hr: null,
//         a: null,
//         cd: '01',
//         no: 1,
//         rtUrl: null,
//         ftype: 0,
//         rtUrls: [],
//         djId: 0,
//         copyright: 0,
//         s_id: 0,
//         mark: 131072,
//         originCoverType: 0,
//         originSongSimpleData: null,
//         tagPicList: null,
//         resourceState: true,
//         version: 4,
//         songJumpInfo: null,
//         entertainmentTags: null,
//         single: 0,
//         noCopyrightRcmd: null,
//         mv: 0,
//         rtype: 0,
//         rurl: null,
//         mst: 9,
//         cp: 0,
//         publishTime: 0
//       },
//       {
//         name: '无仙',
//         id: 556673324,
//         pst: 0,
//         t: 0,
//         ar: [
//           {
//             id: 1084178,
//             name: 'Candy_Wind',
//             tns: [],
//             alias: []
//           }
//         ],
//         alia: [],
//         pop: 100,
//         st: 0,
//         rt: null,
//         fee: 8,
//         v: 31,
//         crbt: null,
//         cf: '',
//         al: {
//           id: 38522403,
//           name: '无仙',
//           picUrl:
//             'https://p2.music.126.net/u_l-DllJXI5NzSzpsJ_nVA==/109951163275176799.jpg',
//           tns: [],
//           pic_str: '109951163275176799',
//           pic: 109951163275176800
//         },
//         dt: 135959,
//         h: {
//           br: 320000,
//           fid: 0,
//           size: 5440827,
//           vd: -12520,
//           sr: 44100
//         },
//         m: {
//           br: 192000,
//           fid: 0,
//           size: 3264514,
//           vd: -12520,
//           sr: 44100
//         },
//         l: {
//           br: 128000,
//           fid: 0,
//           size: 2176357,
//           vd: -12520,
//           sr: 44100
//         },
//         sq: {
//           br: 788269,
//           fid: 0,
//           size: 13396615,
//           vd: -12520,
//           sr: 44100
//         },
//         hr: null,
//         a: null,
//         cd: '01',
//         no: 1,
//         rtUrl: null,
//         ftype: 0,
//         rtUrls: [],
//         djId: 0,
//         copyright: 0,
//         s_id: 0,
//         mark: 393216,
//         originCoverType: 0,
//         originSongSimpleData: null,
//         tagPicList: null,
//         resourceState: true,
//         version: 31,
//         songJumpInfo: null,
//         entertainmentTags: null,
//         single: 0,
//         noCopyrightRcmd: null,
//         mst: 9,
//         cp: 0,
//         mv: 0,
//         rurl: null,
//         rtype: 0,
//         publishTime: 1525017600000
//       },
//       {
//         name: 'So Far Away',
//         id: 521416693,
//         pst: 0,
//         t: 0,
//         ar: [
//           {
//             id: 780003,
//             name: 'Martin Garrix',
//             tns: [],
//             alias: []
//           },
//           {
//             id: 31211,
//             name: 'David Guetta',
//             tns: [],
//             alias: []
//           },
//           {
//             id: 141813,
//             name: 'Jamie Scott',
//             tns: [],
//             alias: []
//           },
//           {
//             id: 12900365,
//             name: 'Romy Dya',
//             tns: [],
//             alias: []
//           }
//         ],
//         alia: [],
//         pop: 100,
//         st: 0,
//         rt: null,
//         fee: 8,
//         v: 47,
//         crbt: null,
//         cf: '',
//         al: {
//           id: 36873174,
//           name: 'So Far Away',
//           picUrl:
//             'https://p2.music.126.net/bDdwz0zd-BGYpel1QEU2RA==/109951165983886039.jpg',
//           tns: [],
//           pic_str: '109951165983886039',
//           pic: 109951165983886030
//         },
//         dt: 183693,
//         h: {
//           br: 320000,
//           fid: 0,
//           size: 7347766,
//           vd: -35570,
//           sr: 44100
//         },
//         m: {
//           br: 192000,
//           fid: 0,
//           size: 4408677,
//           vd: -33056,
//           sr: 44100
//         },
//         l: {
//           br: 128000,
//           fid: 0,
//           size: 2939133,
//           vd: -31519,
//           sr: 44100
//         },
//         sq: null,
//         hr: null,
//         a: null,
//         cd: '1',
//         no: 1,
//         rtUrl: null,
//         ftype: 0,
//         rtUrls: [],
//         djId: 0,
//         copyright: 1,
//         s_id: 0,
//         mark: 270336,
//         originCoverType: 1,
//         originSongSimpleData: null,
//         tagPicList: null,
//         resourceState: true,
//         version: 47,
//         songJumpInfo: null,
//         entertainmentTags: null,
//         single: 0,
//         noCopyrightRcmd: null,
//         rtype: 0,
//         rurl: null,
//         mst: 9,
//         cp: 7001,
//         mv: 5756048,
//         publishTime: 1512057600000
//       },
//       {
//         name: '消逝的光芒',
//         id: 1922882557,
//         pst: 0,
//         t: 0,
//         ar: [
//           {
//             id: 50040107,
//             name: '你还在失望吧',
//             tns: [],
//             alias: []
//           }
//         ],
//         alia: [],
//         pop: 60,
//         st: 0,
//         rt: '',
//         fee: 0,
//         v: 5,
//         crbt: null,
//         cf: '',
//         al: {
//           id: 138597273,
//           name: '心之所向',
//           picUrl:
//             'https://p2.music.126.net/7XiJq32IPOT4PJrEDeYNxQ==/109951166912155812.jpg',
//           tns: [],
//           pic_str: '109951166912155812',
//           pic: 109951166912155800
//         },
//         dt: 109392,
//         h: {
//           br: 320000,
//           fid: 0,
//           size: 4376685,
//           vd: -11362,
//           sr: 48000
//         },
//         m: {
//           br: 192000,
//           fid: 0,
//           size: 2626029,
//           vd: -8750,
//           sr: 48000
//         },
//         l: {
//           br: 128000,
//           fid: 0,
//           size: 1750701,
//           vd: -7128,
//           sr: 48000
//         },
//         sq: null,
//         hr: null,
//         a: null,
//         cd: '01',
//         no: 1,
//         rtUrl: null,
//         ftype: 0,
//         rtUrls: [],
//         djId: 0,
//         copyright: 0,
//         s_id: 0,
//         mark: 128,
//         originCoverType: 2,
//         originSongSimpleData: null,
//         tagPicList: null,
//         resourceState: true,
//         version: 5,
//         songJumpInfo: null,
//         entertainmentTags: null,
//         single: 0,
//         noCopyrightRcmd: null,
//         mst: 9,
//         cp: 0,
//         mv: 0,
//         rtype: 0,
//         rurl: null,
//         publishTime: 0
//       },
//       {
//         name: '你的轮廓',
//         id: 1813864802,
//         pst: 0,
//         t: 0,
//         ar: [
//           {
//             id: 35187624,
//             name: '叶琼琳',
//             tns: [],
//             alias: []
//           }
//         ],
//         alia: ['我穿过所有浪漫银河'],
//         pop: 100,
//         st: 0,
//         rt: '',
//         fee: 8,
//         v: 13,
//         crbt: null,
//         cf: '',
//         al: {
//           id: 121957769,
//           name: '你的轮廓',
//           picUrl:
//             'https://p2.music.126.net/-u92GsfIvtgTXCRapqQZeQ==/109951165647093663.jpg',
//           tns: [],
//           pic_str: '109951165647093663',
//           pic: 109951165647093660
//         },
//         dt: 237225,
//         h: {
//           br: 320000,
//           fid: 0,
//           size: 9491897,
//           vd: -29953,
//           sr: 44100
//         },
//         m: {
//           br: 192000,
//           fid: 0,
//           size: 5695155,
//           vd: -27344,
//           sr: 44100
//         },
//         l: {
//           br: 128000,
//           fid: 0,
//           size: 3796785,
//           vd: -25680,
//           sr: 44100
//         },
//         sq: {
//           br: 803584,
//           fid: 0,
//           size: 23828864,
//           vd: -29912,
//           sr: 44100
//         },
//         hr: null,
//         a: null,
//         cd: '01',
//         no: 1,
//         rtUrl: null,
//         ftype: 0,
//         rtUrls: [],
//         djId: 0,
//         copyright: 0,
//         s_id: 0,
//         mark: 8192,
//         originCoverType: 1,
//         originSongSimpleData: null,
//         tagPicList: null,
//         resourceState: true,
//         version: 13,
//         songJumpInfo: null,
//         entertainmentTags: null,
//         single: 0,
//         noCopyrightRcmd: null,
//         rtype: 0,
//         rurl: null,
//         mst: 9,
//         cp: 2708406,
//         mv: 0,
//         publishTime: 0
//       },
//       {
//         name: '想你',
//         id: 1949052976,
//         pst: 0,
//         t: 0,
//         ar: [
//           {
//             id: 1198123,
//             name: '姜云升',
//             tns: [],
//             alias: []
//           },
//           {
//             id: 12898527,
//             name: '顾帅Gs',
//             tns: [],
//             alias: []
//           }
//         ],
//         alia: [],
//         pop: 100,
//         st: 0,
//         rt: '',
//         fee: 8,
//         v: 3,
//         crbt: null,
//         cf: '',
//         al: {
//           id: 145261868,
//           name: '想你',
//           picUrl:
//             'https://p1.music.126.net/L594fkj1w0mcymRSgfG5yQ==/109951167448936482.jpg',
//           tns: [],
//           pic_str: '109951167448936482',
//           pic: 109951167448936480
//         },
//         dt: 205081,
//         h: {
//           br: 320002,
//           fid: 0,
//           size: 8206125,
//           vd: -49909,
//           sr: 48000
//         },
//         m: {
//           br: 192002,
//           fid: 0,
//           size: 4923693,
//           vd: -47288,
//           sr: 48000
//         },
//         l: {
//           br: 128002,
//           fid: 0,
//           size: 3282477,
//           vd: -45606,
//           sr: 48000
//         },
//         sq: {
//           br: 831489,
//           fid: 0,
//           size: 21315325,
//           vd: -50013,
//           sr: 48000
//         },
//         hr: {
//           br: 1592548,
//           fid: 0,
//           size: 40825183,
//           vd: -49906,
//           sr: 48000
//         },
//         a: null,
//         cd: '01',
//         no: 1,
//         rtUrl: null,
//         ftype: 0,
//         rtUrls: [],
//         djId: 0,
//         copyright: 0,
//         s_id: 0,
//         mark: 536879104,
//         originCoverType: 1,
//         originSongSimpleData: null,
//         tagPicList: null,
//         resourceState: true,
//         version: 3,
//         songJumpInfo: null,
//         entertainmentTags: null,
//         single: 0,
//         noCopyrightRcmd: null,
//         rtype: 0,
//         rurl: null,
//         mst: 9,
//         cp: 0,
//         mv: 0,
//         publishTime: 1653062400000
//       }
//     ],
//     //播放列表-- // 获取用户播放排行榜
//     mp3s: [
//       {
//         name: '温暖阳光洒落在你的窗前',
//         id: 1484537845,
//         pst: 0,
//         t: 0,
//         ar: [
//           {
//             id: 34637050,
//             name: 'Colo',
//             tns: [],
//             alias: []
//           }
//         ],
//         alia: [],
//         pop: 100,
//         st: 0,
//         rt: '',
//         fee: 8,
//         v: 31,
//         crbt: null,
//         cf: '',
//         al: {
//           id: 96342883,
//           name: 'Sunny',
//           picUrl:
//             'https://p2.music.126.net/oPoqXeUmCm65zml1r55KBA==/109951165364992849.jpg',
//           tns: [],
//           pic_str: '109951165364992849',
//           pic: 109951165364992850
//         },
//         dt: 197394,
//         h: {
//           br: 320000,
//           fid: 0,
//           size: 7897965,
//           vd: -8648,
//           sr: 48000
//         },
//         m: {
//           br: 192000,
//           fid: 0,
//           size: 4738797,
//           vd: -6005,
//           sr: 48000
//         },
//         l: {
//           br: 128000,
//           fid: 0,
//           size: 3159213,
//           vd: -4230,
//           sr: 48000
//         },
//         sq: {
//           br: 1460178,
//           fid: 0,
//           size: 36028884,
//           vd: -8649,
//           sr: 48000
//         },
//         hr: null,
//         a: null,
//         cd: '01',
//         no: 1,
//         rtUrl: null,
//         ftype: 0,
//         rtUrls: [],
//         djId: 0,
//         copyright: 0,
//         s_id: 0,
//         mark: 131136,
//         originCoverType: 0,
//         originSongSimpleData: null,
//         tagPicList: null,
//         resourceState: true,
//         version: 31,
//         songJumpInfo: null,
//         entertainmentTags: null,
//         single: 0,
//         noCopyrightRcmd: null,
//         rtype: 0,
//         rurl: null,
//         mst: 9,
//         cp: 0,
//         mv: 0,
//         publishTime: 0
//       },
//       {
//         name: '消逝的光芒③',
//         id: 1924933964,
//         pst: 0,
//         t: 0,
//         ar: [
//           {
//             id: 50040107,
//             name: '你还在失望吧',
//             tns: [],
//             alias: []
//           }
//         ],
//         alia: [],
//         pop: 20,
//         st: 0,
//         rt: '',
//         fee: 8,
//         v: 4,
//         crbt: null,
//         cf: '',
//         al: {
//           id: 138597273,
//           name: '心之所向',
//           picUrl:
//             'https://p2.music.126.net/7XiJq32IPOT4PJrEDeYNxQ==/109951166912155812.jpg',
//           tns: [],
//           pic_str: '109951166912155812',
//           pic: 109951166912155800
//         },
//         dt: 101520,
//         h: {
//           br: 320000,
//           fid: 0,
//           size: 4061805,
//           vd: -30195,
//           sr: 48000
//         },
//         m: {
//           br: 192000,
//           fid: 0,
//           size: 2437101,
//           vd: -27587,
//           sr: 48000
//         },
//         l: {
//           br: 128000,
//           fid: 0,
//           size: 1624749,
//           vd: -25951,
//           sr: 48000
//         },
//         sq: null,
//         hr: null,
//         a: null,
//         cd: '01',
//         no: 1,
//         rtUrl: null,
//         ftype: 0,
//         rtUrls: [],
//         djId: 0,
//         copyright: 0,
//         s_id: 0,
//         mark: 131072,
//         originCoverType: 0,
//         originSongSimpleData: null,
//         tagPicList: null,
//         resourceState: true,
//         version: 4,
//         songJumpInfo: null,
//         entertainmentTags: null,
//         single: 0,
//         noCopyrightRcmd: null,
//         mv: 0,
//         rtype: 0,
//         rurl: null,
//         mst: 9,
//         cp: 0,
//         publishTime: 0
//       },
//       {
//         name: '无仙',
//         id: 556673324,
//         pst: 0,
//         t: 0,
//         ar: [
//           {
//             id: 1084178,
//             name: 'Candy_Wind',
//             tns: [],
//             alias: []
//           }
//         ],
//         alia: [],
//         pop: 100,
//         st: 0,
//         rt: null,
//         fee: 8,
//         v: 31,
//         crbt: null,
//         cf: '',
//         al: {
//           id: 38522403,
//           name: '无仙',
//           picUrl:
//             'https://p2.music.126.net/u_l-DllJXI5NzSzpsJ_nVA==/109951163275176799.jpg',
//           tns: [],
//           pic_str: '109951163275176799',
//           pic: 109951163275176800
//         },
//         dt: 135959,
//         h: {
//           br: 320000,
//           fid: 0,
//           size: 5440827,
//           vd: -12520,
//           sr: 44100
//         },
//         m: {
//           br: 192000,
//           fid: 0,
//           size: 3264514,
//           vd: -12520,
//           sr: 44100
//         },
//         l: {
//           br: 128000,
//           fid: 0,
//           size: 2176357,
//           vd: -12520,
//           sr: 44100
//         },
//         sq: {
//           br: 788269,
//           fid: 0,
//           size: 13396615,
//           vd: -12520,
//           sr: 44100
//         },
//         hr: null,
//         a: null,
//         cd: '01',
//         no: 1,
//         rtUrl: null,
//         ftype: 0,
//         rtUrls: [],
//         djId: 0,
//         copyright: 0,
//         s_id: 0,
//         mark: 393216,
//         originCoverType: 0,
//         originSongSimpleData: null,
//         tagPicList: null,
//         resourceState: true,
//         version: 31,
//         songJumpInfo: null,
//         entertainmentTags: null,
//         single: 0,
//         noCopyrightRcmd: null,
//         mst: 9,
//         cp: 0,
//         mv: 0,
//         rurl: null,
//         rtype: 0,
//         publishTime: 1525017600000
//       },
//       {
//         name: 'So Far Away',
//         id: 521416693,
//         pst: 0,
//         t: 0,
//         ar: [
//           {
//             id: 780003,
//             name: 'Martin Garrix',
//             tns: [],
//             alias: []
//           },
//           {
//             id: 31211,
//             name: 'David Guetta',
//             tns: [],
//             alias: []
//           },
//           {
//             id: 141813,
//             name: 'Jamie Scott',
//             tns: [],
//             alias: []
//           },
//           {
//             id: 12900365,
//             name: 'Romy Dya',
//             tns: [],
//             alias: []
//           }
//         ],
//         alia: [],
//         pop: 100,
//         st: 0,
//         rt: null,
//         fee: 8,
//         v: 47,
//         crbt: null,
//         cf: '',
//         al: {
//           id: 36873174,
//           name: 'So Far Away',
//           picUrl:
//             'https://p2.music.126.net/bDdwz0zd-BGYpel1QEU2RA==/109951165983886039.jpg',
//           tns: [],
//           pic_str: '109951165983886039',
//           pic: 109951165983886030
//         },
//         dt: 183693,
//         h: {
//           br: 320000,
//           fid: 0,
//           size: 7347766,
//           vd: -35570,
//           sr: 44100
//         },
//         m: {
//           br: 192000,
//           fid: 0,
//           size: 4408677,
//           vd: -33056,
//           sr: 44100
//         },
//         l: {
//           br: 128000,
//           fid: 0,
//           size: 2939133,
//           vd: -31519,
//           sr: 44100
//         },
//         sq: null,
//         hr: null,
//         a: null,
//         cd: '1',
//         no: 1,
//         rtUrl: null,
//         ftype: 0,
//         rtUrls: [],
//         djId: 0,
//         copyright: 1,
//         s_id: 0,
//         mark: 270336,
//         originCoverType: 1,
//         originSongSimpleData: null,
//         tagPicList: null,
//         resourceState: true,
//         version: 47,
//         songJumpInfo: null,
//         entertainmentTags: null,
//         single: 0,
//         noCopyrightRcmd: null,
//         rtype: 0,
//         rurl: null,
//         mst: 9,
//         cp: 7001,
//         mv: 5756048,
//         publishTime: 1512057600000
//       },
//       {
//         name: '消逝的光芒',
//         id: 1922882557,
//         pst: 0,
//         t: 0,
//         ar: [
//           {
//             id: 50040107,
//             name: '你还在失望吧',
//             tns: [],
//             alias: []
//           }
//         ],
//         alia: [],
//         pop: 60,
//         st: 0,
//         rt: '',
//         fee: 0,
//         v: 5,
//         crbt: null,
//         cf: '',
//         al: {
//           id: 138597273,
//           name: '心之所向',
//           picUrl:
//             'https://p2.music.126.net/7XiJq32IPOT4PJrEDeYNxQ==/109951166912155812.jpg',
//           tns: [],
//           pic_str: '109951166912155812',
//           pic: 109951166912155800
//         },
//         dt: 109392,
//         h: {
//           br: 320000,
//           fid: 0,
//           size: 4376685,
//           vd: -11362,
//           sr: 48000
//         },
//         m: {
//           br: 192000,
//           fid: 0,
//           size: 2626029,
//           vd: -8750,
//           sr: 48000
//         },
//         l: {
//           br: 128000,
//           fid: 0,
//           size: 1750701,
//           vd: -7128,
//           sr: 48000
//         },
//         sq: null,
//         hr: null,
//         a: null,
//         cd: '01',
//         no: 1,
//         rtUrl: null,
//         ftype: 0,
//         rtUrls: [],
//         djId: 0,
//         copyright: 0,
//         s_id: 0,
//         mark: 128,
//         originCoverType: 2,
//         originSongSimpleData: null,
//         tagPicList: null,
//         resourceState: true,
//         version: 5,
//         songJumpInfo: null,
//         entertainmentTags: null,
//         single: 0,
//         noCopyrightRcmd: null,
//         mst: 9,
//         cp: 0,
//         mv: 0,
//         rtype: 0,
//         rurl: null,
//         publishTime: 0
//       },
//       {
//         name: '你的轮廓',
//         id: 1813864802,
//         pst: 0,
//         t: 0,
//         ar: [
//           {
//             id: 35187624,
//             name: '叶琼琳',
//             tns: [],
//             alias: []
//           }
//         ],
//         alia: ['我穿过所有浪漫银河'],
//         pop: 100,
//         st: 0,
//         rt: '',
//         fee: 8,
//         v: 13,
//         crbt: null,
//         cf: '',
//         al: {
//           id: 121957769,
//           name: '你的轮廓',
//           picUrl:
//             'https://p2.music.126.net/-u92GsfIvtgTXCRapqQZeQ==/109951165647093663.jpg',
//           tns: [],
//           pic_str: '109951165647093663',
//           pic: 109951165647093660
//         },
//         dt: 237225,
//         h: {
//           br: 320000,
//           fid: 0,
//           size: 9491897,
//           vd: -29953,
//           sr: 44100
//         },
//         m: {
//           br: 192000,
//           fid: 0,
//           size: 5695155,
//           vd: -27344,
//           sr: 44100
//         },
//         l: {
//           br: 128000,
//           fid: 0,
//           size: 3796785,
//           vd: -25680,
//           sr: 44100
//         },
//         sq: {
//           br: 803584,
//           fid: 0,
//           size: 23828864,
//           vd: -29912,
//           sr: 44100
//         },
//         hr: null,
//         a: null,
//         cd: '01',
//         no: 1,
//         rtUrl: null,
//         ftype: 0,
//         rtUrls: [],
//         djId: 0,
//         copyright: 0,
//         s_id: 0,
//         mark: 8192,
//         originCoverType: 1,
//         originSongSimpleData: null,
//         tagPicList: null,
//         resourceState: true,
//         version: 13,
//         songJumpInfo: null,
//         entertainmentTags: null,
//         single: 0,
//         noCopyrightRcmd: null,
//         rtype: 0,
//         rurl: null,
//         mst: 9,
//         cp: 2708406,
//         mv: 0,
//         publishTime: 0
//       },
//       {
//         name: '想你',
//         id: 1949052976,
//         pst: 0,
//         t: 0,
//         ar: [
//           {
//             id: 1198123,
//             name: '姜云升',
//             tns: [],
//             alias: []
//           },
//           {
//             id: 12898527,
//             name: '顾帅Gs',
//             tns: [],
//             alias: []
//           }
//         ],
//         alia: [],
//         pop: 100,
//         st: 0,
//         rt: '',
//         fee: 8,
//         v: 3,
//         crbt: null,
//         cf: '',
//         al: {
//           id: 145261868,
//           name: '想你',
//           picUrl:
//             'https://p1.music.126.net/L594fkj1w0mcymRSgfG5yQ==/109951167448936482.jpg',
//           tns: [],
//           pic_str: '109951167448936482',
//           pic: 109951167448936480
//         },
//         dt: 205081,
//         h: {
//           br: 320002,
//           fid: 0,
//           size: 8206125,
//           vd: -49909,
//           sr: 48000
//         },
//         m: {
//           br: 192002,
//           fid: 0,
//           size: 4923693,
//           vd: -47288,
//           sr: 48000
//         },
//         l: {
//           br: 128002,
//           fid: 0,
//           size: 3282477,
//           vd: -45606,
//           sr: 48000
//         },
//         sq: {
//           br: 831489,
//           fid: 0,
//           size: 21315325,
//           vd: -50013,
//           sr: 48000
//         },
//         hr: {
//           br: 1592548,
//           fid: 0,
//           size: 40825183,
//           vd: -49906,
//           sr: 48000
//         },
//         a: null,
//         cd: '01',
//         no: 1,
//         rtUrl: null,
//         ftype: 0,
//         rtUrls: [],
//         djId: 0,
//         copyright: 0,
//         s_id: 0,
//         mark: 536879104,
//         originCoverType: 1,
//         originSongSimpleData: null,
//         tagPicList: null,
//         resourceState: true,
//         version: 3,
//         songJumpInfo: null,
//         entertainmentTags: null,
//         single: 0,
//         noCopyrightRcmd: null,
//         rtype: 0,
//         rurl: null,
//         mst: 9,
//         cp: 0,
//         mv: 0,
//         publishTime: 1653062400000
//       }
//     ],
//     //当前播放的歌曲信息
//     currentMusicId: {
//       name: '温暖阳光洒落在你的窗前',
//       id: 1484537845,
//       pst: 0,
//       t: 0,
//       ar: [
//         {
//           id: 34637050,
//           name: 'Colo',
//           tns: [],
//           alias: []
//         }
//       ],
//       alia: [],
//       pop: 100,
//       st: 0,
//       rt: '',
//       fee: 8,
//       v: 31,
//       crbt: null,
//       cf: '',
//       al: {
//         id: 96342883,
//         name: 'Sunny',
//         picUrl:
//           'https://p2.music.126.net/oPoqXeUmCm65zml1r55KBA==/109951165364992849.jpg',
//         tns: [],
//         pic_str: '109951165364992849',
//         pic: 109951165364992850
//       },
//       dt: 197394,
//       h: {
//         br: 320000,
//         fid: 0,
//         size: 7897965,
//         vd: -8648,
//         sr: 48000
//       },
//       m: {
//         br: 192000,
//         fid: 0,
//         size: 4738797,
//         vd: -6005,
//         sr: 48000
//       },
//       l: {
//         br: 128000,
//         fid: 0,
//         size: 3159213,
//         vd: -4230,
//         sr: 48000
//       },
//       sq: {
//         br: 1460178,
//         fid: 0,
//         size: 36028884,
//         vd: -8649,
//         sr: 48000
//       },
//       hr: null,
//       a: null,
//       cd: '01',
//       no: 1,
//       rtUrl: null,
//       ftype: 0,
//       rtUrls: [],
//       djId: 0,
//       copyright: 0,
//       s_id: 0,
//       mark: 131136,
//       originCoverType: 0,
//       originSongSimpleData: null,
//       tagPicList: null,
//       resourceState: true,
//       version: 31,
//       songJumpInfo: null,
//       entertainmentTags: null,
//       single: 0,
//       noCopyrightRcmd: null,
//       rtype: 0,
//       rurl: null,
//       mst: 9,
//       cp: 0,
//       mv: 0,
//       publishTime: 0
//     },
//     //歌单的 收藏者
//     Collectors: [],
//     // 歌单的收藏者的某个用户歌单信息
//     userPlaylist: [],
//     // 获取用户信息
//     userInfo: {},
//     // 歌单的收藏者的某个用户歌单信息 自己创建
//     userlist: [],
//     // 歌单的收藏者的某个用户歌单信息  收藏
//     Collectorslist: [],
//     //当前歌曲的播放进度---
//     musicCurrent: 0,
//     // 双击的index
//     doubleIndex: -1,
//     // 播放顺序0顺序 1单曲 2 随机
//     sequence: 0,
//     Lyreic: [] //歌词
//   },
//   getters: {},
//   mutations: {
//     addmusicplaylist(state, list: any) {
//       state.playlist = list
//     },

//     addMusicMesage(state, obj: any) {
//       state.MusicMesage = obj
//     },

//     addmusicNames(state, list: any[]) {
//       state.musicNames = list
//     },
//     addmp3slist(state, list: any[]) {
//       state.mp3slist = list
//     },
//     addmp3s(state, list: any[]) {
//       state.mp3s = list
//     },
//     addcurrentPlayMessage(state, musicId: any) {
//       state.currentMusicId = musicId
//     },
//     addDoubleIndex(state, index: any) {
//       state.doubleIndex = index
//     },
//     addDoubleIndexadd(state) {
//       state.doubleIndex++
//     },
//     addDoubleIndexaddjian(state) {
//       state.doubleIndex--
//     },
//     addCollectors(state, list: any[]) {
//       state.Collectors = list
//     },
//     adduserInfo(state, userInfo: any) {
//       state.userInfo = userInfo
//     },
//     adduserlist(state, userlist: any[]) {
//       state.userlist = userlist
//     },
//     addplaylist(state, playlist: any[]) {
//       state.Collectorslist = playlist
//     },
//     adduserPlaylist(state, userlist: any[]) {
//       state.userPlaylist = userlist
//     },
//     addtrackmusics(state, tracks: any[]) {
//       state.mp3slist.push(...tracks)
//     },
//     // 获取用户播放排行榜
//     addPlayRecord(state, list: any[]) {
//       state.mp3slist = list
//     },
//     addsetcurrentTime(state, setTime: number) {
//       state.musicCurrent = setTime
//     },
//     // 歌词
//     addLyreic(state, Lyreic: any[]) {
//       state.Lyreic = Lyreic
//     }
//   },
//   actions: {
//     //获取详情页信息
//     async getMusicPageh({ commit, state, dispatch }, id: number) {
//       commit('addmusicplaylist', '')
//       // 详情页所有信息
//       const { playlist } = await getMusicpageRequest(id)
//       const playermesage = musicMessageTime(playlist.tracks)
//       commit('addmusicplaylist', playlist)
//       commit('addmp3slist', playermesage)
//       console.log(playlist, '获取歌单音乐')

//       // 获取 评论 数量 remarknumber
//       dispatch('complexData/remarknumberss', playlist.commentCount, {
//         root: true
//       })
//       // 分页器id
//       dispatch('complexData/ThreadId', id, {
//         root: true
//       })
//       const token = Localcache.getCache('token')
//       if (token) {
//         store.dispatch('pageMusic/LoadMusic')
//       }
//     },
//     // 加载更多音乐
//     async LoadMusic({ commit, state, dispatch }) {
//       let arr = state.playlist.trackIds.slice(state.mp3slist.length)
//       if (arr.length > 100) {
//         arr = arr.slice(0, 100)
//       }
//       // console.log(arr.length);
//       let ids = ''
//       arr.forEach((item: any) => {
//         ids += item.id + ','
//       })
//       console.log(ids)
//       ids = ids.substr(0, ids.length - 1)

//       console.log(ids.substr(0, ids.length - 1))
//       const { songs } = await getMusicName(ids)
//       const playermesage = musicMessageTime(songs)
//       console.log(playermesage, 'aaa')
//       commit('addtrackmusics', playermesage)
//       // 做一个上拉滚动触发请求更多音乐
//       if (state.playlist.trackCount !== state.mp3slist.length) {
//         dispatch('LoadMusic')
//       }
//     },
//     //点击获取单曲详情歌曲信息  用户动态 播放MP3的
//     async musicMessageurl({ commit }, ids: number) {
//       const { songs } = await getMusicName(ids)
//       const playermesage = musicMessageTime(songs)
//       // 歌曲列表
//       commit('addmp3s', playermesage)
//       const { id, name, ar, al, index, tns, alia, mv } = playermesage[0]
//       // 获取当前播放的歌单列表
//       const musicurl = await getMusicUrl(id)
//       const getLyricss = await getLyrics(id)
//       const Lyreic = dataLyric(getLyricss.lrc)
//       commit('addLyreic', Lyreic)
//       // 当前播放的歌曲
//       commit('addcurrentPlayMessage', {
//         text: name,
//         ar: ar,
//         al: al,
//         ...musicurl.data[0],
//         Lyreic,
//         tns: tns,
//         alia: alia,
//         mv: mv
//       })
//       commit('addDoubleIndex', index)
//     },
//     //双击之后 获取播放信息
//     async PlayMessage({ commit, state }, pages: any) {
//       const { event, listdates } = pages
//       console.log(event, '双击后的数据')
//       console.log(pages, '双击后的数据')
//       commit('addmp3s', listdates)
//       const { id, name, ar, al, index, tns, alia, mv } = event
//       console.log(id, 'id')
//       // 获取当前播放的歌单列表
//       console.log(name, '双击的name')

//       const musicurl = await getMusicUrl(id)
//       const getLyricss = await getLyrics(id)
//       console.log(getLyricss, 'getLyricsgetLyricsgetLyrics')
//       const Lyreic = dataLyric(getLyricss.lrc)
//       commit('addLyreic', Lyreic)
//       // 当前播放的歌曲
//       commit('addcurrentPlayMessage', {
//         text: name,
//         ar: ar,
//         al: al,
//         ...musicurl.data[0],
//         Lyreic,
//         tns: tns,
//         alia: alia,
//         mv: mv
//       })
//       commit('addDoubleIndex', index)
//       console.log(state.doubleIndex)
//     },
//     // 播放上一首歌曲
//     async leftBtn({ commit, state }) {
//       commit('addDoubleIndexaddjian')
//       console.log(state.mp3s[state.doubleIndex])
//       if (state.doubleIndex == -1) {
//         commit('addDoubleIndex', (state.mp3s.length - 1) * 1)
//       }
//       const { id, name, ar, al, index, tns, alia, mv } =
//         state.mp3s[state.doubleIndex]
//       console.log(id, 'id')
//       // 获取当前播放的歌单列表
//       const musicurl = await getMusicUrl(id)
//       const getLyricss = await getLyrics(id)
//       console.log(getLyricss, 'getLyricsgetLyricsgetLyrics')
//       const Lyreic = dataLyric(getLyricss.lrc)
//       commit('addLyreic', Lyreic)
//       // 当前播放的歌曲
//       commit('addcurrentPlayMessage', {
//         text: name,
//         ar: ar,
//         al: al,
//         ...musicurl.data[0],
//         Lyreic,
//         tns: tns,
//         alia: alia,
//         mv: mv
//       })
//       commit('addDoubleIndex', index)
//     },
//     // 播放下一首歌曲
//     async rightBtn({ commit, state }) {
//       commit('addDoubleIndexadd')
//       console.log(state.mp3s[state.doubleIndex])
//       if (state.doubleIndex == state.mp3s.length) {
//         commit('addDoubleIndex', 0)
//       }
//       const { id, name, ar, al, index, tns, alia, mv } =
//         state.mp3s[state.doubleIndex]
//       console.log(id, 'id')
//       // 获取当前播放的歌单列表
//       const musicurl = await getMusicUrl(id)
//       const getLyricss = await getLyrics(id)
//       console.log(getLyricss, 'getLyricsgetLyricsgetLyrics')
//       const Lyreic = dataLyric(getLyricss.lrc)
//       commit('addLyreic', Lyreic)
//       // 当前播放的歌曲
//       commit('addcurrentPlayMessage', {
//         text: name,
//         ar: ar,
//         al: al,
//         ...musicurl.data[0],
//         Lyreic,
//         tns: tns,
//         alia: alia,
//         mv: mv
//       })
//       commit('addDoubleIndex', index)
//     },
//     // 自动播放完了之后 播放下一首
//     async setIndex({ commit, state }, index: number) {
//       index++
//       if (index === state.mp3s.length) {
//         commit('addDoubleIndex', 0)
//         const musicurl = await getMusicUrl(state.mp3s[0].id)
//         const getLyricss = await getLyrics(state.mp3s[0].id)
//         const Lyreic = dataLyric(getLyricss.lrc)
//         commit('addLyreic', Lyreic)
//         const { name, ar, al, tns, alia, mv } = state.mp3s[0]
//         // 当前播放的歌曲
//         commit('addcurrentPlayMessage', {
//           text: name,
//           ar: ar,
//           al: al,
//           ...musicurl.data[0],
//           Lyreic,
//           tns: tns,
//           alia: alia,
//           mv: mv
//         })
//       } else {
//         commit('addDoubleIndex', index)
//         console.log(state.doubleIndex, '自动播放后的index')
//         const musicurl = await getMusicUrl(state.mp3s[index].id)
//         const getLyricss = await getLyrics(state.mp3s[index].id)
//         const Lyreic = dataLyric(getLyricss.lrc)
//         commit('addLyreic', Lyreic)
//         const { name, ar, al, tns, alia, mv } = state.mp3s[index]
//         // 当前播放的歌曲
//         commit('addcurrentPlayMessage', {
//           text: name,
//           ar: ar,
//           al: al,
//           ...musicurl.data[0],
//           Lyreic,
//           tns: tns,
//           alia: alia,
//           mv: mv
//         })
//       }
//     },

//     // 获取歌单的收藏者
//     async getCollector({ commit }, page: any) {
//       const Collectors = await getCollectors(page)
//       console.log(Collectors, 'CollectorsCollectors')
//       commit('addCollectors', Collectors.subscribers)
//     },

//     async getUserPlaylists({ commit, state }, id: number) {
//       commit('adduserInfo', '')
//       commit('adduserlist', '')
//       commit('addplaylist', '')
//       commit('adduserPlaylist', '')
//       // 获取用户信息
//       const userInfo = await getuserInfo(id)
//       commit('adduserInfo', userInfo)

//       const userPlaylist = await getUserPlaylist(id)
//       // console.log(userPlaylist.playlist, 'getUserPlaylistgetUserPlaylist')
//       const userlist: any[] = []
//       const playlist: any[] = []
//       userPlaylist.playlist.map((item: any) => {
//         if (item.creator.userId === id) {
//           userlist.push(item)
//         } else {
//           playlist.push(item)
//         }
//       })
//       console.log(userInfo, 'userInfouserInfouserInfo')

//       commit('adduserlist', userlist)
//       commit('addplaylist', playlist)
//       commit('adduserPlaylist', userPlaylist.playlist)
//     },
//     async getPlayRecord({ commit }, page: any) {
//       commit('addPlayRecord', [])

//       const { id, index } = page
//       const PlayRecord = await getMyPlayRecord(id, index)
//       console.log(PlayRecord, '播放')
//       const a: any[] = []
//       if (PlayRecord.weekData) {
//         for (const item of PlayRecord.weekData) {
//           a.push(item.song)
//         }
//       } else {
//         for (const item of PlayRecord.allData) {
//           a.push(item.song)
//         }
//       }
//       console.log(a, 'aa')

//       // 处理转化数据与dt时间
//       const playermesage = musicMessageTime(a)
//       commit('addPlayRecord', playermesage)
//     },
//     //当前歌曲的播放进度---
//     setcurrentTime({ commit }, setTime: number) {
//       commit('addsetcurrentTime', setTime)
//     },
//     // 所有专辑点击播放全部图标/点击热门50首展开
//     albumcurrentmusic({ commit }, list: any[]) {
//       commit('addmp3s', list)
//     }
//     //
//   }
// }
// export default pageMusic
