      // 创建动态路由
      const routesa: any[] = [
        {
          type: 1,
          children: [
            {
              id: 39,
              url: '/main/discovr/music',
              name: '发现音乐',
              sort: 106,
              type: 2,
              children: null,
              parentId: 38
            },
            {
              id: 40,
              url: '/main/online/video',
              name: '视频',
              sort: 107,
              type: 2,
              children: null,
              parentId: 38
            }
          ]
        }
      ]

      const musics: any[] = [
        {
          type: 1,
          children: [
            {
              id: 39,
              url: '/main/discovr/music/recommend',
              name: '个性推荐',
              sort: 106,
              type: 2,
              children: null,
              parentId: 38
            },
            {
              id: 40,
              url: '/main/discovr/music/musiclist',
              name: '歌单',
              sort: 107,
              type: 2,
              children: null,
              parentId: 38
            },
            {
              id: 41,
              url: '/main/discovr/music/ranking',
              name: '排行榜',
              sort: 107,
              type: 2,
              children: null,
              parentId: 38
            },
            {
              id: 42,
              url: '/main/discovr/music/singer',
              name: '歌手',
              sort: 107,
              type: 2,
              children: null,
              parentId: 38
            }
          ]
        }
      ]


      commit('addRoutes', routesa)

      commit('addRoutesChildren', musics)
      // 保存本地路由数据
      Localcache.setCache('Route', routesa)
      Localcache.setCache('RoutesChildren', musics)
