import { Module } from 'vuex'
import { complexDataType } from './type'
import { IDtype } from '../type'
import {
  getSongRemark,
  getcommentlike,
  getSongRemarkRemark,
  getcommentReply,
  getAlbum,
  getalbumItem,
  gethotspot,
  getartistdetail,
  getSimilarArtist,
  getartistmv,
  getMVurl,
  getmvdetail,
  getMVRemark,
  getSimilarMV,
  getSimilarvideo,
  getvideourl,
  getcommentvideo,
  getcommentmusicRemark
} from '../../network/complexData/complexData'
import { ElNotification } from 'element-plus'
import { musicMessageTime } from '@/utlis/map-menus'

const complexData: Module<complexDataType, IDtype> = {
  namespaced: true,
  state: {
    userRemark: [],
    newestRemark: [],
    showloadings: false,
    useralbumslist: {}, //用户专辑信息列表
    useralbumsMusics: [], //用户专辑所有的歌,
    Hotspots: [], //热门50首
    userAlbumItem: {}, //用户单个专辑播放列表
    artistDetail: {}, //歌手详情
    SimilarArtist: [], //相似歌手
    artistmvs: [], //专辑MV
    MVurl: {}, //当前播放的MV
    mvdetail: {}, //当前播放MV的详情
    similarmv: [], //相关推荐视频
    remarknumber: 0, //评论总数量
    ThreadId: '' //评论分页器
  },
  mutations: {
    addSongremark(state, list: any[]) {
      state.userRemark = list
    },
    addnewestRemark(state, list: any[]) {
      state.newestRemark = list
    },
    addshowsuccess(state, show: boolean) {
      state.showloadings = show
    },
    remoedelete(state, item: any) {
      // state.newestRemark.splice(state.newestRemark[item], 1)
    },
    //用户专辑信息列表
    adduseralbumslist(state, list: any) {
      state.useralbumslist = list
    },
    // 热门50首
    addHotspot(state, list: any[]) {
      state.Hotspots = list
    },
    // 用户专辑所有的歌的数据
    addUseralbumsMusic(state, list: any) {
      state.useralbumsMusics.push(list)
    },
    //
    addUseralbumsMusickong(state, list: any[]) {
      state.useralbumsMusics = []
    },
    // 单个专辑信息
    adduserAlbumItem(state, item: any) {
      state.userAlbumItem = item
    },
    // 歌手详情
    addartistDetail(state, detail: any) {
      state.artistDetail = detail
    },
    // 相似歌手
    addSimilarArtist(state, artist: any) {
      state.SimilarArtist = artist
    },
    // 专辑的MV
    addartistmvs(state, list: any[]) {
      state.artistmvs = list
    },
    // 当前播放的mv
    addMVurl(state, play: any) {
      state.MVurl = play
    },
    // 当前播放MV详情
    addmvdetail(state, play: any) {
      state.mvdetail = play
    },
    // 相似MV视频
    addsimilarmvv(state, list: any[]) {
      state.similarmv = list
    },
    //评论总数量
    addremarknumber(state, remarknumber: number) {
      state.remarknumber = remarknumber
    },
    // 评论分页器addThreadId
    addThreadId(state, ThreadId: any) {
      state.ThreadId = ThreadId
    }
  },
  actions: {
    async SongRemark({ commit }, id: number) {
      console.log('调用 了')
      const songremark = await getSongRemark(id)
      console.log(songremark, '歌单评论')
      commit('addSongremark', songremark.hotComments)
      commit('addnewestRemark', songremark.comments)
    },
    async SongRemarkRemark({ commit }, page: any) {
      const { id, pageindex } = page

      console.log(id, ' url: API.commentPlaylist + id')

      const songremark = await getSongRemarkRemark(id, pageindex)
      console.log(songremark, '歌单评论getSongRemarkRemark')
      commit('addnewestRemark', songremark.comments)
    },
    //  const page = {id:defaultActive, commentId:item.commentId,t:0,type:2}
    // 6&cid=1419532712&threadId=A_EV_2_6559519868_32953014&t=0
    async commentlike({ dispatch }, page: any) {
      const { type, commentId, threadId, t, id } = page
      const a = await getcommentlike(type, commentId, threadId, t)
      console.log(a, '返回的点赞')
      // dispatch('SongRemark', id)
    },
    // 给歌单 回复/评论 comment?t=1&type=6&threadId=A_EV_2_6559519868_32953014&content=test
    async commentReply({ commit, dispatch, state }, page: any) {
      const { t, type, threadId, content, commentId, urlId } = page
      const commentreplys = await getcommentReply(
        t,
        type,
        threadId,
        content,
        commentId
      )
      console.log(commentreplys, '回复。。。')

      if (commentreplys.code == 200) {
        ElNotification({
          title: '评论成功',
          type: 'success'
        })
        commit('addshowsuccess', true)
        // 从新获取数据
        console.log(urlId, 'urlId')

        // store.dispatch('complexData/SongRemark', urlId)
      } else if (commentreplys.code == 400) {
        ElNotification({
          title: '写点东西吧，内容不能为空哦~',
          type: 'warning'
        })
        commit('addshowsuccess', false)
      }
    },
    show({ commit }, show: boolean) {
      commit('addshowsuccess', show)
    },
    // 歌单删除评论
    async remarkdeletea({ commit, dispatch, state }, page: any) {
      console.log('删除了')

      const { t, type, threadId, commentId, urlId } = page
      const abs = state.newestRemark.find((item) => item.commentId == commentId)
      commit('remoedelete', abs)
      const redelete = await getcommentReply(t, type, threadId, '', commentId)
      console.log(redelete, 'delete')
      if (redelete.code == 200) {
        ElNotification({
          type: 'success',
          title: '删除成功!'
        })

        // store.dispatch('complexData/SongRemark', urlId)
        // 从新获取数据
      } else if (redelete.code == 400) {
        ElNotification({
          type: 'info',
          title: '删除失败!'
        })
      }
    },
    // 歌单 评论发送
    async commentsand({ commit }, page: any) {
      const { t, type, threadId, content, urlId } = page
      console.log(page)
      console.log(content)

      const commentsands = await getcommentReply(t, type, threadId, content)
      if (commentsands.code == 200) {
        ElNotification({
          title: '评论成功',
          type: 'success'
        })
        commit('addshowsuccess', true)
        // 从新获取数据
        console.log(urlId, 'urlId')

        // store.dispatch('complexData/SongRemark', urlId)
      } else if (commentsands.code == 400) {
        ElNotification({
          title: '写点东西吧，内容不能为空哦~',
          type: 'warning'
        })
        commit('addshowsuccess', false)
      }
    },
    // 获取所有专辑
    // album: album,
    // limit: 20,
    // offset: 0
    async Album({ commit, dispatch, state }, page: any) {
      console.log('调用了 ')
      const { albumId, limit, offset } = page
      // 获取用户专辑信息
      const albums = await getAlbum(albumId, limit, offset)
      console.log(albums, '专辑信息')
      commit('adduseralbumslist', albums)
      // if (state.useralbumsMusics) {
      //   albums.hotAlbums = albums.hotAlbums.slice(state.useralbumsMusics.length)
      // }
      await albums.hotAlbums.forEach((item: any) => {
        dispatch('getAlbumDetail', item.id)
      })
    },
    // 获取热门50首歌
    async gethotspots({ commit }, albumId: number) {
      // 获取热门50首歌
      const hotspot = await gethotspot(albumId)
      const hotspots = musicMessageTime(hotspot.songs)
      console.log(hotspots, '热门50首')
      commit('addHotspot', hotspots)
    },
    // 获取歌手详情
    async getartistDetail({ commit }, albumId: number) {
      // 获取歌手详情
      const { briefDesc, introduction, topicData } = await getartistdetail(
        albumId
      )
      commit('addartistDetail', {
        briefDesc: briefDesc,
        introduction: introduction,
        topicData: topicData
      })
    },
    // 清空 歌手详情
    //评论总数量
    remarknumberss({ commit }, remarknumber: number) {
      commit('addremarknumber', remarknumber)
    },
    // 评论分页器addThreadId
    ThreadId({ commit }, ThreadId: any) {
      commit('addThreadId', ThreadId)
    },
    // 相似歌手
    async getSimilarArtist({ commit }, albumId: number) {
      // 相似歌手
      const SimilarArtist = await getSimilarArtist(albumId)
      console.log(SimilarArtist, '相似歌手')
      commit('addSimilarArtist', SimilarArtist.artists)
    },
    // 初始化
    useralbumsMusickong({ commit }) {
      commit('addUseralbumsMusickong')
    },
    // 获取用户每个专辑歌
    async getAlbumDetail({ commit }, itemId: number) {
      const { album, songs } = await getalbumItem(itemId)
      // 处理数据、歌曲时间
      const songss = musicMessageTime(songs)
      commit('addUseralbumsMusic', { album: album, songs: songss })
    },
    // 在所有专辑里 点击了单个专辑 存入单个专辑数据
    userAlbumItem({ commit }, item: any) {
      commit('adduserAlbumItem', item)
    },

    // 用户刷新单个专辑调用
    async getuserAlbumMessage({ commit }, urlid: any) {
      console.log(urlid, 'aaa')
      const { album, songs } = await getalbumItem(urlid)
      const songss = musicMessageTime(songs)
      commit('adduserAlbumItem', { album: album, songs: songss })
    },
    // 获取专辑的MV
    async artistmv({ commit }, albumId: number) {
      const artistmvs = await getartistmv(albumId)
      console.log(artistmvs.mvs, '专辑MV--------------------------')
      commit('addartistmvs', artistmvs.mvs)
    },
    // 获取播放的MV视频/mv详情
    async MVurl({ commit }, mvId: number) {
      const mvdetail = await getmvdetail(mvId)
      console.log(mvdetail, 'mv详情')
      commit('addmvdetail', mvdetail.data)
      commit('addremarknumber', mvdetail.data.commentCount)
      commit('addThreadId', mvId)
      // MVmp4
      const mvurls = await getMVurl(mvId)
      console.log(mvurls, 'mvurl')
      commit('addMVurl', mvurls.data)
    },
    // 获取MV评论
    async mvRemark({ commit }, page: any) {
      const { mvId, limit, offset } = page
      console.log(page, 'page')
      const mvRemarks = await getMVRemark(mvId, limit, offset)
      console.log(mvRemarks, 'mv 评论')
      commit('addSongremark', mvRemarks.hotComments)
      commit('addnewestRemark', mvRemarks.comments)
    },

    // 获取相似MV
    async SimilarMV({ commit }, mvId: any) {
      const similarmvv = await getSimilarMV(mvId)
      console.log(similarmvv, '相似mv')
      commit('addsimilarmvv', similarmvv.data)
    },
    // 相似MV视频的详情
    async detailvideo({ commit }, vid: string) {
      console.log(vid)
      // 相似MV视频的详情
      const similarvideos = await getSimilarvideo(vid)
      console.log(similarvideos, '相似MV视频的详情')
      commit('addmvdetail', similarvideos.data)
      //  相似视频url地址
      const videourls = await getvideourl(vid)
      console.log(videourls, '相似视频url地址')
      commit('addThreadId', vid)
      // 视频的评论总数
      commit('addremarknumber', similarvideos.data.commentCount)

      commit('addMVurl', videourls.urls[0])
    },
    // 相似视频评论
    async videoRemark({ commit }, page: any) {
      const { vid, limit, offset } = page
      const commentvideo = await getcommentvideo(vid, limit, offset)
      console.log(commentvideo, '相似视频评论')
      commit('addSongremark', commentvideo.hotComments)
      commit('addnewestRemark', commentvideo.comments)
    },
    // 获取歌曲评论
    async commentmusicRemark({ commit }, page: any) {
      const { id, limit, offset } = page
      const commentmusicRemarks = await getcommentmusicRemark(id, limit, offset)
      console.log(commentmusicRemarks, '歌曲评论')
      commit('addSongremark', commentmusicRemarks.hotComments)
      commit('addnewestRemark', commentmusicRemarks.comments)
    }
  }
}
export default complexData
