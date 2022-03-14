import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Localcache from '@/utlis/caches'
import store from '@/store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main.vue'),
    children: [
      {
        path: '/main/discovr/music',
        name: 'music',
        component: () => import('@/views/main/discovr/music/music.vue'),
        children: [
          {
            path: '/main/discovr/music/recommend',
            component: () =>
              import('@/views/main/discovr/music/recommend/recommend.vue')
          },
          {
            path: '/main/discovr/music/musiclist',
            component: () =>
              import('@/views/main/discovr/music/musiclist/musiclist.vue')
          },
          {
            path: '/main/discovr/music/ranking',
            component: () =>
              import('@/views/main/discovr/music/ranking/ranking.vue')
          },
          {
            path: '/main/discovr/music/singer',
            component: () =>
              import('@/views/main/discovr/music/singer/singer.vue')
          }
        ]
      },
      {
        path: '/main/online/video',
        name: 'video',
        component: () => import('@/views/main/online/video/video.vue')
      },
      {
        path: '/main/musiclistdetail/:id',
        name: 'musiclistdetail',
        component: () => import('@/components/page-main')
      },
      {
        path: '/main/user/playlist/:id',
        name: 'userPlaylist',
        component: () => import('@/components/com-user-playlist')
      },
      {
        path: '/main/MyPlayRecord/:id',
        name: 'MyPlayRecord',
        component: () => import('@/components/com-myplayrecord')
      },
      // 用户动态/粉丝/关注
      {
        path: '/main/user/userDynamic/:id',
        name: 'userDynamic',
        component: () => import('@/components/com-user-item/com-user-dynamic')
      },
      {
        path: '/main/user/userfansConcern/:id',
        name: 'userfans',
        component: () => import('@/components/com-user-item/com-user-fans')
      },
      // 用户所有专辑
      {
        path: '/main/com/userAlbum/:id',
        name: 'userAlbum',
        component: () => import('@/components/com-user-album')
      },
      // 用户单个专辑
      {
        path: '/main/com/userAlbumItem/:id',
        name: 'userAlbumItem',
        component: () => import('@/components/com-user-albumitem')
      },
      // mv视频播放
      {
        path: '/main/com/artist/MV/:id',
        name: 'artistMV',
        component: () => import('@/components/com-artist-mv')
      },
      // mv视频播放
      {
        path: '/main/com/artist/video/:vid',
        name: 'artistvideo',
        component: () => import('@/components/com-artist-mv')
      },
      // 跳转搜索界面
      {
        path: '/search/detail/:id',
        name: 'searchDetail',
        component: () => import('@/views/search-detail')
      }
    ]
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('@/views/main/notfound/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to) => {
  console.log(to.path)
  if (to.path === '/main') {
    return '/main/discovr/music/recommend'
  }
})
export default router
