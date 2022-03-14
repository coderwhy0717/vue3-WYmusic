import { WRequst, WRequsts } from '../index'

enum API {
  //
  // 获取歌单的 评论
  commentPlaylist = '/comment/playlist?id=',
  // 给歌单的 评论 点赞/取消 点赞
  commentlike = '/comment/like?type=',
  // /comment/like?type=6&cid=1419532712&threadId=A_EV_2_6559519868_32953014&t=0
  // 给歌单的 评论 回复/评论
  // /comment?t=1&type=6&threadId=A_EV_2_6559519868_32953014&content=test
  commentReply = '/comment?t=',
  // /comment?t=0&type=6&threadId=A_EV_2_6559519868_32953014&commentId=1419516382
  // 获取专辑信息
  album = '/artist/album?id=',
  // 获取专辑item的详情
  albumItem = '/album?id=',
  // 获取 热门 50首歌
  hotspot = '/artist/top/song?id=',
  // 请求 歌手详情
  artistdetail = '/artist/desc?id=',
  // 相似 歌手
  SimilarArtist = '/simi/artist?id=',
  // 歌手mv
  artistmv = '/artist/mv?id=',
  // 获取当前播放MV视频
  MVurl = '/mv/url?id=',
  // 获取MV详情
  mvdetail = '/mv/detail?mvid=',
  // 获取MV评论
  MVRemark = '/comment/mv?id=',
  // 相似MV视频
  SimilarMV = '/related/allvideo?id=',
  // 相似MV视频详情
  Similarvideo = '/video/detail?id=',
  // 获取当前播放视频
  videourl = '/video/url?id=',
  // 获取视频的评论
  commentvideo = '/comment/video?id=',
  // 获取歌曲的评论
  commentmusicRemark = '/comment/music?id='
}

// 获取歌单的 评论
export function getSongRemark(id: number) {
  return WRequst.get({
    url: API.commentPlaylist + id + '&limit=' + 60 + '&offset=' + (1 - 1) * 60
  })
}
export function getSongRemarkRemark(id: number, pageindex?: number) {
  return WRequst.get({
    url: API.commentPlaylist + id + '&limit=' + 60 + '&offset=' + pageindex
  })
}
//给歌单的 评论 点赞/取消 点赞 6&cid=1419532712&threadId=A_EV_2_6559519868_32953014&t=0
export function getcommentlike(
  type: number,
  cid: number,
  threadId: any,
  t: number
) {
  return WRequst.get({
    url:
      API.commentlike +
      type +
      '&cid=' +
      cid +
      '&threadId=' +
      threadId +
      '&t=' +
      t,
    showloading: false
  })
}
//给歌单的 评论 回复/评论 1&type=6&threadId=A_EV_2_6559519868_32953014&content=test

export function getcommentReply(
  t: number,
  type: number,
  threadId: any,
  content?: string,
  commentId?: number
) {
  console.log(
    t,
    type,
    threadId,
    'comment:' + commentId,
    'content' + content,
    '网络请求'
  )

  if (content && commentId) {
    return WRequst.get({
      url:
        API.commentReply +
        t +
        '&type=' +
        type +
        '&threadId=' +
        threadId +
        '&content=' +
        content +
        '&commentId=' +
        commentId,
      showloading: false
    })
  } else if (!commentId && content) {
    return WRequst.get({
      url:
        API.commentReply +
        t +
        '&type=' +
        type +
        '&threadId=' +
        threadId +
        '&content=' +
        content,
      showloading: false
    })
  } else if (!content && commentId) {
    return WRequst.get({
      url:
        API.commentReply +
        t +
        '&type=' +
        type +
        '&threadId=' +
        threadId +
        '&commentId=' +
        commentId,
      showloading: false
    })
  }
}
// 获取专辑 limit: 20,
// offset: (this.albumPage - 1) * 20,
export function getAlbum(id: number, limit: number, offset: number) {
  return WRequst.get({
    url: API.album + id + '&limit=' + limit + '&offset=' + offset,
    showloading: false
  })
}
// 获取热门50收歌曲
export function gethotspot(id: number) {
  return WRequst.get({
    url: API.hotspot + id,
    showloading: false
  })
}
// 获取专辑的item
export function getalbumItem(id: number) {
  return WRequst.get({
    url: API.albumItem + id,
    showloading: false
  })
}
// 请求 歌手详情
export function getartistdetail(id: number) {
  return WRequst.get({
    url: API.artistdetail + id,
    showloading: false
  })
}
// 相似 歌手
export function getSimilarArtist(id: number) {
  return WRequst.get({
    url: API.SimilarArtist + id
  })
}
// 歌手mv
export function getartistmv(id: number) {
  return WRequst.get({
    url: API.artistmv + id + '&limit=' + 200
  })
}
// 播放的MV 视频
export function getMVurl(mvId: number) {
  return WRequst.get({
    url: API.MVurl + mvId
  })
}
//获取播放MV详情
export function getmvdetail(mvId: number) {
  return WRequst.get({
    url: API.mvdetail + mvId
  })
}
// 获取mv评论
export function getMVRemark(mvId: number, limit: number, offset: number) {
  return WRequst.get({
    url: API.MVRemark + mvId + '&limit=' + limit + '&offset=' + offset
  })
}
// 相似MV
export function getSimilarMV(mvId: number) {
  return WRequst.get({
    url: API.SimilarMV + mvId
  })
}
// 相似MV视频详情getSimilarvideo
export function getSimilarvideo(vid: string) {
  return WRequst.get({
    url: API.Similarvideo + vid
  })
}
// 相似视频url地址
export function getvideourl(vid: string) {
  return WRequst.get({
    url: API.videourl + vid
  })
}
// 相似视频评论
export function getcommentvideo(vid: string, limit: number, offset: number) {
  return WRequst.get({
    url: API.commentvideo + vid + '&limit=' + limit + '&offset=' + offset
  })
}
// 获取歌曲的评论
export function getcommentmusicRemark(
  id: number,
  limit: number,
  offset: number
) {
  return WRequst.get({
    url: API.commentmusicRemark + id + '&limit=' + limit + '&offset=' + offset
  })
}
