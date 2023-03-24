<template>
  <div class="page-main" v-if="playlist">
    <el-scrollbar :height="heights" class="elScroll">
      <!-- <div class="elScroll" style="overflow: auto" @scroll="hedeScroll"> -->
      <div class="top">
        <div class="img-A">
          <el-image
            class="img"
            :src="playlist.coverImgUrl + '?param=500y500'"
            :preview-src-list="[playlist.coverImgUrl]"
          >
          </el-image>
        </div>

        <div class="text-A">
          <div class="text-ge">
            <div class="text-top">歌单</div>
            <i class="text-text">{{ playlist.name }}</i>
          </div>
          <div class="text-center">
            <div class="text-center-a" @click="userUrl(playlist.userId)">
              <img
                v-if="playlist.creator.avatarUrl"
                :src="playlist.creator.avatarUrl"
                alt=""
              />
              <i class="item-name" @click="Urlbtn">
                {{ playlist.creator.nickname }}
              </i>
            </div>
            <i class="Time">
              {{
                $filters.formatTime(playlist.creator.createTime, 'YYYY-MM-DD')
              }}创建
            </i>
          </div>
          <!--  -->
          <div class="button">
            <div class="danger" @click="playAll(listdate)">
              <i class="danger-icon">播放全部</i>
            </div>
            <div class="danger1s">
              <i class="danger-icon"
                >收藏({{ $filters.formatnumber(playlist.subscribedCount) }})</i
              >
            </div>
            <div class="danger1s">
              <i class="danger-icon">
                <share style="width: 1em" />分享({{ playlist.shareCount }})</i
              >
            </div>
            <div class="danger1s">
              <i class="danger-icon">下载全部</i>
            </div>
          </div>
          <div class="text-footer">
            <div>
              标签：<template v-for="item in playlist.tags" :key="item.id">
                <i class="item-text"> {{ item }}</i>
              </template>
            </div>
            <div class="gequ">
              歌曲：{{
                musicShow ? playlist.trackIds.length : playlist.tracks.length
              }}<i class="bofang"
                >播放：{{ $filters.formatnumber(playlist.playCount) }}</i
              >
            </div>
            <div class="jianjie">简介：{{ playlist.description }}</div>
          </div>
        </div>
      </div>
      <!-- 歌曲部分 -->
      <div class="footer">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="歌曲列表" name="first">
            <bas-main-ui-plus :listdate="listdate" :configMusic="configMusic" />
          </el-tab-pane>
          <el-tab-pane label="评论" name="second">
            <bas-comment
              :threadId="threadId"
              :Brilliant="Brilliant"
              :newest="newest"
              @commentRemarkRemark="commentRemarkRemark"
            />
          </el-tab-pane>
          <el-tab-pane label="收藏者" name="third">
            <bas-collector :collector="collectors" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-scrollbar>
    <up-top :upname="'.page-main'" />
  </div>

  <!-- </div> -->
  <div v-else>
    <div class=""></div>
    加载中...
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { configMusic } from '../config/config-music'
import { musicMessageTime } from '@/utlis/map-menus'
import basMainUiPlus from '@/basse-ui/bas-main-ui-plus'
import basComment from '@/basse-ui/bas-comment'
import basCollector from '@/basse-ui/bas-collector'
import router from '@/router'
import upTop from '@/basse-ui/up-top'
// import { debounce } from '@/utlis/map-menus'
import Localcache from '@/utlis/caches'

export default defineComponent({
  components: {
    basMainUiPlus,
    basComment,
    basCollector,
    upTop
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    // 获取页面路由的id
    const defaultActive = parseInt(route.path.split('/')[3])
    // 存储id 在刷新页面时调用从新请求数据
    // 当前 页面 urlid存入本地 用处获取评论用
    Localcache.setCache('pageUrlId', defaultActive)

    // 页面自动刷新获取调用
    if (defaultActive) {
      if (defaultActive == 123) return
      store.dispatch('pageMusic/getMusicPageh', defaultActive)
    }
    // 计算属性去监听vuex数据变化
    const playlist = computed(() => store.state.pageMusic.playlist)
    // 监听有没有登录去控制歌曲数量
    const musicShow = computed(() => store.state.login.token)
    // 子组件传送
    // 获取评论数据 精彩/最新评论
    const Brilliant = computed(() => store.state.complexData.userRemark)
    const newest = computed(() => store.state.complexData.newestRemark)
    // 点击评论回复动态id
    const threadId = computed(
      () => store.state.pageMusic.playlist.commentThreadId
    )

    // 加载更多歌曲

    const scrollbtn = (scrollTop: any) => {
      // console.log(scrollTop)
      if (scrollTop.scrollTop > 339) {
        if (scrollTop.scrollTop < 340) {
          console.log('加载了')

          // ul.value = true
        }
      }
    }
    const activeName = ref('first')
    // 获取当前屏幕宽度
    const heights = ref(`${document.documentElement.clientHeight / 1.4}px`)

    //一、 获取所有歌曲信息
    const listdate = computed(() => {
      // vuex里获取所有的歌曲message
      console.log(store.state.pageMusic.mp3slist.length, '计算属性')
      const s = ref(store.state.pageMusic.mp3slist)
      const playermesage = musicMessageTime(s.value)
      // 调用方法去转化需要的数据与歌曲时间

      return playermesage
    })

    // 播放全部
    const playAll = (list: any[]) => {
      console.log(list, '播放全部')

      store.dispatch('pageMusic/albumcurrentmusic', list)
      const indexaa = store.state.pageMusic.mp3s.length - 1

      store.dispatch('pageMusic/setIndex', indexaa)
    }

    // 点击收藏者 发送网络请求歌单的收藏者

    const handleClick = (tab: any, event: any) => {
      if (tab.index == 1) {
        store.dispatch(
          'complexData/SongRemark',
          store.state.pageMusic.playlist.id
        )
      }
      if (tab.index == 2) {
        store.dispatch(
          'pageMusic/getCollector',
          store.state.pageMusic.playlist.id
        )
      }
    }
    // 获取收藏者数据
    const collectors = computed(() => {
      if (store.state.pageMusic.Collectors) {
        return store.state.pageMusic.Collectors
      } else {
        return store.state.pageMusic.playlist.subscribers
      }
    })

    // 点击跳转到用户歌单
    const userUrl = (id: any) => {
      store.dispatch('pageMusic/getUserPlaylists', id)
      console.log(id, '用户id')

      router.push({
        path: '/main/user/playlist/' + id
      })
    }
    const aaa = () => {
      btn()
    }
    const btn = () => {
      console.log('btn')
    }
    //组件评论分页器转的事件 二级传送
    const commentRemarkRemark = (page: any) => {
      console.log('传送成功*************')
      store.dispatch('complexData/SongRemarkRemark', {
        id: defaultActive,
        pageindex: (page.conentpage - 1) * page.pagesize
      })
    }
    return {
      commentRemarkRemark,
      threadId,
      Brilliant,
      newest,
      aaa,
      btn,
      userUrl,
      scrollbtn,
      musicShow,
      handleClick,
      collectors,
      activeName,
      heights,
      playlist,
      listdate,
      configMusic,
      playAll
    }
  }
})
</script>

<style lang="less" scoped>
.page-main {
  padding: 0px 0px 65px 10px;
}
.elScroll {
  .top {
    display: flex;

    .img-A {
      .img {
        width: 250/1920 * 100vw;
        height: 250/1920 * 100vw;
        border-radius: 10/1920 * 100vw;
      }
    }
    .text-A {
      margin-left: 20/1920 * 100vw;
      .text-ge {
        display: flex;
        align-items: center;
        .text-top {
          color: red;
          padding: 1/1920 * 100vw 2/1920 * 100vw;
          border-radius: 3/1920 * 100vw;

          box-shadow: 1px 1px 4px 1px rgba(230, 10, 10, 0.5);
          border: 1px solid red;
          font-size: 10/1920 * 100vw;
        }
        .text-text {
          color: #333;
          font-weight: 600;
          margin-left: 10/1920 * 100vw;
          font-size: 30/1920 * 100vw;
        }
      }
      .text-center-a {
        display: flex;
        align-items: center;
      }
      .text-center {
        margin-top: 10/1920 * 100vw;
        display: flex;
        align-items: center;

        img {
          width: 50/1920 * 100vw;
          height: 50/1920 * 100vw;
          border-radius: 50%;
          cursor: pointer;
        }
        .item-name {
          color: #6191c2;
          cursor: pointer;
          padding: 0 10/1920 * 100vw;
          font-size: 18/1920 * 100vw;
        }
        .Time {
          color: #999;
          font-size: 16/1920 * 100vw;
        }
      }
      //
      .button {
        margin: 10/1920 * 100vw 0;
        display: flex;
        align-items: center;
        .danger {
          background-color: red;
          color: #fff;
          text-align: center;
          width: 150/1920 * 100vw;
          padding: 8/1920 * 100vw 0;
          margin-right: 10/1920 * 100vw;
          border: 1px solid #ccc;
          border-radius: 100px;
          font-size: 18/1920 * 100vw;
        }
        .danger:hover {
          background: rgb(228, 94, 94);
          cursor: pointer;
        }
        .danger1s.is-active {
          background: #eee;
        }
        .danger1s {
          color: #555;
          text-align: center;
          width: 150/1920 * 100vw;
          padding: 8/1920 * 100vw 0;
          margin-right: 10/1920 * 100vw;
          border: 1px solid #ccc;
          border-radius: 100px;
          font-size: 18/1920 * 100vw;
        }
        .danger1s:hover {
          background: #eee;
          cursor: pointer;
        }
      }
      .text-footer {
        color: #333;
        font-size: 17/1920 * 100vw;
        font-weight: 300;
        .item-text {
          margin-left: 5/1920 * 100vw;
          color: #6191c2;
        }
        .gequ {
          margin: 3/1920 * 100vw 0;
          .bofang {
            margin-left: 8/1920 * 100vw;
          }
        }
        .jianjie {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
@media screen and (min-width: 600px) and (max-width: 1300px) {
  .elScroll {
    padding: 20/1300 * 100rem 20/1300 * 100rem;
    .top {
      display: flex;

      .img-A {
        img {
          width: 260/1300 * 100rem;
          height: 260/1300 * 100rem;
          border-radius: 10/1300 * 100rem;
        }
      }
      .text-A {
        margin-left: 20/1300 * 100vw;
        .text-ge {
          display: flex;
          align-items: center;
          .text-top {
            color: red;
            padding: 1/1300 * 100vw 2/1300 * 100vw;
            border-radius: 5/1300 * 100vw;

            box-shadow: 1px 1px 4px 1px rgba(230, 10, 10, 0.5);
            border: 1px solid red;
            font-size: 8/1300 * 100vw;
          }
          .text-text {
            color: #333;
            font-weight: 600;
            margin-left: 10/1300 * 100vw;
            font-size: 22/1300 * 100vw;
          }
        }
        .text-center {
          margin-top: 10/1300 * 100vw;
          display: flex;
          align-items: center;

          img {
            width: 50/1300 * 100vw;
            height: 50/1300 * 100vw;
            border-radius: 50%;
          }
          .item-name {
            color: #6191c2;
            cursor: pointer;
            padding: 0 10/1300 * 100vw;
            font-size: 18/1300 * 100vw;
          }
          .Time {
            color: #999;
            font-size: 16/1300 * 100vw;
          }
        }
        //
        .button {
          margin: 10/1300 * 100vw 0;
          display: flex;
          align-items: center;
          .danger {
            background-color: red;
            color: #fff;
            text-align: center;
            // padding: 8/1300 * 100vw 10/1300 * 100vw;
            width: 150/1300 * 100vw;
            margin-right: 8/1300 * 100vw;
            border: 1px solid #ccc;
            border-radius: 100px;
            font-size: 10/1300 * 100vw;
          }
          .danger:hover {
            background: rgb(228, 94, 94);
            cursor: pointer;
          }

          .danger1s {
            // background-color: red;
            color: #555;
            text-align: center;
            margin-right: 10/1300 * 100vw;
            border-radius: 100px;
            font-size: 10/1300 * 100vw;
            // padding: 0 20/1300 * 100vw;
            width: 150/1300 * 100vw;
          }
          .danger1s:hover {
            background: #eee;
            cursor: pointer;
          }
        }
        .text-footer {
          color: #333;
          font-size: 17/1300 * 100vw;
          font-weight: 300;
          .item-text {
            margin-left: 5/1300 * 100vw;
            color: #6191c2;
          }
          .gequ {
            margin: 3/1300 * 100vw 0;
            .bofang {
              margin-left: 8/1300 * 100vw;
            }
          }
          .jianjie {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
// 歌曲部分
.footer {
  .el-tabs__item:hover {
    color: #000 !important;
  }
  // 设置点击显示
  .el-tabs__item.is-active {
    font-size: 22/1920 * 100vw;
    font-weight: 600 !important;
    color: #000 !important;
  }
}
// 设置下面红线的灰色虚线
.el-tabs__nav-wrap::after {
  height: 0 !important;
}
// 设置下面的红线
.el-tabs__active-bar {
  background-color: #ec4141 !important;
  height: 4/1920 * 100vw !important;
}
</style>

<style lang="less" scoped>
// 手机版
.page-main {
  padding: 0px 0px 65px 10px;
}
.elScroll {
  .top {
    display: flex;

    .img-A {
      .img {
        width: 250/1920 * 100vw;
        height: 250/1920 * 100vw;
        border-radius: 10/1920 * 100vw;
      }
    }
    .text-A {
      margin-left: 20/1920 * 100vw;
      .text-ge {
        display: flex;
        align-items: center;
        .text-top {
          color: red;
          padding: 1/1920 * 100vw 2/1920 * 100vw;
          border-radius: 3/1920 * 100vw;

          box-shadow: 1px 1px 4px 1px rgba(230, 10, 10, 0.5);
          border: 1px solid red;
          font-size: 10/1920 * 100vw;
        }
        .text-text {
          color: #333;
          font-weight: 600;
          margin-left: 10/1920 * 100vw;
          font-size: 30/1920 * 100vw;
        }
      }
      .text-center-a {
        display: flex;
        align-items: center;
      }
      .text-center {
        margin-top: 10/1920 * 100vw;
        display: flex;
        align-items: center;

        img {
          width: 50/1920 * 100vw;
          height: 50/1920 * 100vw;
          border-radius: 50%;
          cursor: pointer;
        }
        .item-name {
          color: #6191c2;
          cursor: pointer;
          padding: 0 10/1920 * 100vw;
          font-size: 18/1920 * 100vw;
        }
        .Time {
          color: #999;
          font-size: 16/1920 * 100vw;
        }
      }
      //
      .button {
        margin: 10/1920 * 100vw 0;
        display: flex;
        align-items: center;
        .danger {
          background-color: red;
          color: #fff;
          text-align: center;
          width: 150/1920 * 100vw;
          padding: 8/1920 * 100vw 0;
          margin-right: 10/1920 * 100vw;
          border: 1px solid #ccc;
          border-radius: 100px;
          font-size: 18/1920 * 100vw;
        }
        .danger:hover {
          background: rgb(228, 94, 94);
          cursor: pointer;
        }
        .danger1s.is-active {
          background: #eee;
        }
        .danger1s {
          color: #555;
          text-align: center;
          width: 150/1920 * 100vw;
          padding: 8/1920 * 100vw 0;
          margin-right: 10/1920 * 100vw;
          border: 1px solid #ccc;
          border-radius: 100px;
          font-size: 18/1920 * 100vw;
        }
        .danger1s:hover {
          background: #eee;
          cursor: pointer;
        }
      }
      .text-footer {
        color: #333;
        font-size: 17/1920 * 100vw;
        font-weight: 300;
        .item-text {
          margin-left: 5/1920 * 100vw;
          color: #6191c2;
        }
        .gequ {
          margin: 3/1920 * 100vw 0;
          .bofang {
            margin-left: 8/1920 * 100vw;
          }
        }
        .jianjie {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
<style lang="less">
// 手机版
@media screen and (max-width: 600px) {
  // 歌曲部分
  .footer {
    .el-tabs__item:hover {
      color: #000 !important;
    }
    // 设置点击显示
    .el-tabs__item.is-active {
      font-size: 22/1920 * 100vw;
      font-weight: 600 !important;
      color: #000 !important;
    }
  }
  // 设置下面红线的灰色虚线
  .el-tabs__nav-wrap::after {
    height: 0 !important;
  }
  // 设置下面的红线
  .el-tabs__active-bar {
    background-color: #ec4141 !important;
    height: 4/1920 * 100vw !important;
  }
}
</style>
