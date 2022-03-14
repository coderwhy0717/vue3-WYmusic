<template>
  <div class="com-user-albumitem" v-if="userAlbumItem.album">
    <el-scrollbar :height="heights" class="elScroll">
      <!-- <div class="elScroll" style="overflow: auto" @scroll="hedeScroll"> -->
      <div class="top">
        <div class="img-A">
          <img class="img" src="~@/assets/img/albumbgc.png" alt="" />
          <el-image
            class="img s"
            :src="userAlbumItem.album.picUrl + '?param=500y500'"
            :preview-src-list="[userAlbumItem.album.picUrl]"
          >
          </el-image>
        </div>

        <div class="text-A">
          <div class="text-ge">
            <div class="text-top">专辑</div>
            <i class="text-text"
              >{{ userAlbumItem.album.name }}
              <i class="text-text-text" v-if="userAlbumItem.album.alias[0]">
                ({{ userAlbumItem.album.alias[0] }})</i
              ></i
            >
          </div>

          <!--  -->
          <div class="button">
            <div class="danger" @click="playAll(userAlbumItem.songs)">
              <i class="danger-icon">播放全部</i>
            </div>
            <div class="danger1s">
              <i class="danger-icon">收藏</i>
              <!-- {{ $filters.formatnumber(playlist.subscribedCount) }} {{ playlist.shareCount }} -->
            </div>
            <div class="danger1s">
              <i class="danger-icon">
                <share style="width: 1em" />分享({{
                  userAlbumItem.album.info.shareCount
                }})</i
              >
            </div>
            <div class="danger1s">
              <i class="danger-icon">下载全部</i>
            </div>
          </div>
          <div class="text-footer">
            <div>
              歌手：
              <i
                class="item-text"
                @click="Singerbtn(userAlbumItem.album.artists[0].id)"
                >{{ userAlbumItem.album.artist.name }}</i
              >
            </div>
            <div class="gequ">
              时间：{{
                $filters.formatTime(
                  userAlbumItem.album.publishTime,
                  'YYYY-MM-DD'
                )
              }}
            </div>
          </div>
        </div>
      </div>
      <!-- 歌曲部分 -->
      <div class="albumitem-music">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="歌曲列表" name="first">
            <bas-main-ui-plus
              :configMusic="configalbumitem"
              :listdate="userAlbumItem.songs"
            />
          </el-tab-pane>
          <el-tab-pane label="评论" name="second"> b </el-tab-pane>
          <el-tab-pane label="专辑详情" name="third">
            <div class="introduce-A">专辑介绍</div>
            <div style="white-space: pre-line" class="introduce">
              {{ userAlbumItem.album.description }}
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-scrollbar>
    <up-top :upname="'.com-user-albumitem'" />
  </div>
  <div v-else>加载中...</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import basMainUiPlus from '@/basse-ui/bas-main-ui-plus'
import { configalbumitem } from '../config/configalbumitem'
import { useRoute } from 'vue-router'
import router from '@/router'
import upTop from '@/basse-ui/up-top'
export default defineComponent({
  components: {
    basMainUiPlus,
    upTop
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const activeName = ref('first')
    const urlId = parseFloat(route.path.split('/')[4])
    if (urlId) {
      console.log(urlId, 'urlId')
      store.dispatch('complexData/getuserAlbumMessage', urlId)
    }
    const handleClick = (tab: any, event: any) => {
      console.log(tab, 'tab')
      console.log(event, 'event')
    }
    // 获取当前屏幕宽度
    const heights = ref(`${document.documentElement.clientHeight / 1.4}px`)

    const userAlbumItem = computed(() => store.state.complexData.userAlbumItem)

    // 播放全部
    const playAll = (list: any[]) => {
      store.dispatch('pageMusic/albumcurrentmusic', list)
      console.log('播放全部')
      const indexaa = store.state.pageMusic.mp3s.length - 1

      store.dispatch('pageMusic/setIndex', indexaa)
    }
    // 点击歌手跳转到专辑页面
    const Singerbtn = (id: number) => {
      console.log(id, 'id')
      router.push({
        path: '/main/com/userAlbum/' + id
      })
    }
    return {
      Singerbtn,
      playAll,
      heights,
      activeName,
      handleClick,
      userAlbumItem,
      configalbumitem
    }
  }
})
</script>

<style scoped lang="less">
.introduce-A {
  cursor: default;
  font-size: 20/1920 * 100vw;
  font-weight: 550;
  font-family: '幼圆';
  padding-bottom: 10/1920 * 100vw;
}
.introduce {
  cursor: default;

  font-family: '幼圆';
  font-size: 18/1920 * 100vw;
  color: #777;
  line-height: 30/1920 * 100vw;
  letter-spacing: 1/1920 * 100vw;
  // text-indent: 2em;
}
.elScroll {
  .top {
    display: flex;
    .img-A {
      position: relative;
      margin-left: 52/1920 * 100vw;
      .img {
        width: 250/1920 * 100vw;
        height: 250/1920 * 100vw;
        border-radius: 10/1920 * 100vw;
      }
      .s {
        position: absolute;
        right: 50/1920 * 100vw;
      }
    }
    .text-A {
      margin-left: 15/1920 * 100vw;
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
          .text-text-text {
            color: rgb(168, 167, 167);
          }
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
        margin: 15/1920 * 100vw 0;
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
        margin-top: 20/1920 * 100vw;
        .item-text {
          color: #6191c2;
          cursor: pointer;
        }
        .gequ {
          margin: 10/1920 * 100vw 0;
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
  .albumitem-music {
    padding-bottom: 100/1920 * 100vw;
  }
}
</style>
<style lang="less">
.albumitem-music {
  .el-tabs__item:hover {
    color: #000 !important;
  }
  // 设置点击显示
  .el-tabs__item.is-active {
    font-size: 22/1920 * 100vw;
    font-weight: 600 !important;
    color: #000 !important;
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
  .el-tabs__item {
    padding: 0 10/1920 * 100vw !important;
  }
}
</style>
