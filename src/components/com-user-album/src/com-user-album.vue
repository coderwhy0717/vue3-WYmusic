<template>
  <!-- 滚动 -->
  <div
    class="user-album"
    @scroll="hedeScroll"
    :style="{ height: heights }"
    v-if="useralbumMusics"
  >
    <div class="album-top" v-if="userAlbumList.artist">
      <div class="img-A">
        <el-image
          class="img"
          :src="userAlbumList.artist.img1v1Url + '?param=500y500'"
          :preview-src-list="[userAlbumList.artist.img1v1Url]"
        >
        </el-image>
      </div>
      <div class="text-A">
        <div class="text-ge">
          <i class="text-text">{{ userAlbumList.artist.name }} </i>
        </div>
        <div class="text-text-text">
          <template
            v-for="(item, index) in userAlbumList.artist.alias"
            :key="index"
          >
            {{ item }}
          </template>
        </div>
        <!--  -->
        <div class="button">
          <!-- {{ $filters.formatnumber(playlist.subscribedCount) }} {{ playlist.shareCount }} -->
          <div class="danger1s">
            <folder-add class="folder" />
            收藏
          </div>
          <div class="danger1s">
            <user class="folder" />
            个人主页
          </div>
        </div>
        <div class="text-footer">
          <div>
            <i> 单曲数:{{ userAlbumList.artist.musicSize }}</i>
            <i class="item-text">
              专辑数:{{ userAlbumList.artist.albumSize }}</i
            >
            <i> MV数:{{ artistmvs.length }}</i>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div>加载中...</div>
    </div>
    <!-- ----------- -->
    <div class="album-main" v-if="userAlbumList.artist">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="专辑" name="first">
          <bas-user-album
            :albumMuisc="albummessage"
            :useralbumMusics="useralbumMusics"
            :showloadingalbum="showloadingalbum"
            :albumSize="userAlbumList.artist.albumSize"
          />
        </el-tab-pane>
        <el-tab-pane label="MV" name="second">
          <artist-mv :artistmvs="artistmvs" />
        </el-tab-pane>
        <el-tab-pane label="歌手详情" name="third">
          <artist-detail :albumName="userAlbumList.artist.name" />
        </el-tab-pane>
        <el-tab-pane label="相似歌手" name="fourth">
          <similar-artist @first="first" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- </el-scrollbar> -->
  </div>
  <div v-else>加载中...</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
  onDeactivated
} from 'vue'
import basUserAlbum from '@/basse-ui/bas-user-album/user-album'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import artistDetail from '@/basse-ui/bas-user-album/artist-detail'
import similarArtist from '@/basse-ui/bas-user-album/similar-artist'
import artistMv from '@/basse-ui/bas-user-album/artist-mv'
import router from '@/router'
export default defineComponent({
  components: {
    basUserAlbum,
    artistDetail,
    similarArtist,
    artistMv
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const activeName = ref('first')
    const a = ref(true)
    const urlId = ref(parseFloat(route.path.split('/')[4]))
    const albumPage = ref(1)
    watch(
      () => route.path.split('/')[4],
      (newitem) => urlAlbum(parseFloat(newitem))
    )
    // 获取专辑用户id
    /*
    router.beforeEach((to) => {
      if (parseFloat(to.path.split('/')[4]) !== urlId.value) {
        if (to.path.split('/')[4] == 'MV') return
        store.dispatch('complexData/useralbumsMusickong')
        a.value = false
        albumPage.value = 1
        activeName.value = 'first'
        urlAlbum(parseFloat(to.path.split('/')[4]))
      }

      // if (parseFloat(to.path.split('/')[4]) == urlId.value && a.value) {
      //   store.dispatch('complexData/useralbumsMusickong')
      //   albumPage.value = 1
      //   activeName.value = 'first'
      //   urlAlbum(parseFloat(to.path.split('/')[4]))
      // }
    })
     */
    // watch(
    //   () => urlId.value,
    //   (newitem) => urlAlbum(newitem)
    // )

    const urlAlbum = (newitem: number) => {
      store.dispatch('complexData/useralbumsMusickong')
      console.log(newitem, '调用了几次')
      albumPage.value = 1
      activeName.value = 'first'
      store.dispatch('complexData/gethotspots', newitem)
      store.dispatch('complexData/Album', {
        albumId: newitem,
        limit: 10,
        offset: 0
      })
      urlId.value = newitem
    }

    urlAlbum(urlId.value)
    // 控制加载中、。。。
    const showloadings = ref(false)

    const handleClick = (tab: any, event: any) => {
      console.log(tab, '....')
      if (tab.index == 1 && a.value) {
        console.log('mv')
        store.dispatch('complexData/artistmv', urlId.value)
      }
      if (tab.index == 2) {
        if (urlId.value !== urlId.value) {
          showloadings.value = true
        }
        store.dispatch('complexData/getartistDetail', urlId.value)
      }
      if (tab.index == 3) {
        store.dispatch('complexData/getSimilarArtist', urlId.value)
      }
    }
    // 获取当前屏幕宽度
    const heights = ref(`${document.documentElement.clientHeight / 1.4}px`)

    // 获取热门歌曲50首
    const albummessage = computed(() => store.state.complexData.Hotspots)
    // 获取用户专辑歌单列表
    const useralbumMusics = computed(
      () => store.state.complexData.useralbumsMusics
    )
    // 获取用户专辑信息
    const userAlbumList = computed(() => store.state.complexData.useralbumslist)
    // 获取MV
    const artistmvs = computed(() => store.state.complexData.artistmvs)
    // 专辑上拉触底加载

    // 显示加载中信息
    const showloadingalbum = ref(false)

    const hedeScroll = (event: any) => {
      // console.log(event.path[0].scrollHeight, '滚动--------------')
      // console.log(event.path[0].scrollTop, '滚动--------------')
      // console.log(event.srcElement.scrollHeight - event.srcElement.scrollTop)
      // console.log(
      //   '加的' +
      //     (parseFloat(heights.value) + event.srcElement.scrollTop).toFixed(0),
      //   '总高度' + event.path[0].scrollHeight
      // )
      // console.log(
      //   heights.value,
      //   '屏幕高度',
      //   (
      //     event.path[0].scrollHeight -
      //     parseFloat(heights.value) -
      //     event.srcElement.scrollTop
      //   ).toFixed(0)
      // )

      if (event.srcElement.scrollTop > 1000) {
        // console.log('显示')
      }
      if (
        activeName.value === 'first' &&
        useralbumMusics.value.length !== userAlbumList.value.artist.albumSize
      ) {
        if (
          event.srcElement.scrollHeight ===
            parseFloat(event.srcElement.scrollTop.toFixed(0)) +
              event.srcElement.offsetHeight &&
          useralbumMusics.value.length !== userAlbumList.value.artist.albumSize
        ) {
          console.log(urlId.value, '加载数据')
          albumPage.value++
          showloadingalbum.value = true
          console.log(urlId.value, 'urlId.value')

          store.dispatch('complexData/Album', {
            albumId: urlId.value,
            limit: 10,
            offset: (albumPage.value - 1) * 10
          })
        }
      }
    }
    // 点击某个相似歌手还原
    const first = (id: number) => {
      // activeName.value = 'first'
      // urlId.value = id
      // albumPage.value = 1
      // a.value = false
      // store.dispatch('complexData/useralbumsMusickong')
    }
    // 清除scroll
    // onDeactivated(() => {
    //   window.removeEventListener('scroll', hedeScroll)
    // })
    return {
      artistmvs,
      showloadings,
      handleClick,
      first,
      showloadingalbum,
      hedeScroll,
      heights,
      userAlbumList,
      useralbumMusics,
      albummessage,
      activeName
    }
  }
})
</script>

<style scoped lang="less">
.elScroll {
}
.user-album::-webkit-scrollbar {
  display: none;
}

.user-album {
  overflow-y: scroll;
  padding-bottom: 80/1920 * 100vw;
  .img {
    width: 250/1920 * 100vw;
    height: 250/1920 * 100vw;
    border-radius: 10/1920 * 100vw;
  }
  .album-top {
    display: flex;
    margin-bottom: 20/1920 * 100vw;

    .text-A {
      margin-left: 25/1920 * 100vw;
      cursor: default;
      .text-ge {
        display: flex;
        align-items: center;

        .text-text {
          color: #333;
          font-weight: 600;
          font-size: 30/1920 * 100vw;
          font-family: '幼圆';
        }
      }
      .text-text-text {
        font-size: 10/12920 * 100vw;
        margin: 15/1920 * 100vw 0 10/1920 * 100vw;
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

        .danger1s.is-active {
          background: #eee;
        }
        .danger1s {
          color: #555;
          text-align: center;
          padding: 8/1920 * 100vw 15/1920 * 100vw;
          margin-right: 10/1920 * 100vw;
          border: 1px solid #ccc;
          border-radius: 100px;
          font-size: 18/1920 * 100vw;
          display: flex;
          align-items: center;
          .folder {
            width: 25/1920 * 100vw;
            margin-right: 4/1920 * 100vw;
          }
        }
        .danger1s:hover {
          background: #eee;
          cursor: pointer;
        }
      }
      .text-footer {
        color: #444;
        font-size: 17/1920 * 100vw;
        font-weight: 500;
        margin-top: 20/1920 * 100vw;
        cursor: default;
        .item-text {
          margin: 0 20/1920 * 100vw;
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
.album-main {
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
    padding: 0 18/1920 * 100vw !important;
  }
}
</style>
