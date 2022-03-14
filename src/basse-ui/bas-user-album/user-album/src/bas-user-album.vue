<template>
  <div class="lyricsss">
    <div class="bas-user-album">
      <div class="album-img-top">
        <img src="~@/assets/img/topSongsLogo.png" class="img" />
      </div>
      <div class="album-right">
        <div class="remen">
          热门50首
          <div class="video-folder">
            <video-play class="video" @click="videobtn(albumMuiscs)" />
            <i>|</i>
            <folder-add class="folder" @click="folderbtn" />
          </div>
        </div>
        <div class="music-main">
          <bas-main-ui-plus
            :configMusic="configAlbum"
            :listdate="albumMuiscs"
            :showloading="false"
          />
        </div>
        <div class="div-length" @click="albumadd(albumMuisc)" v-if="albumshow">
          <div></div>
          <div class="aaa">
            查看全部{{ albumMuisc.length }}首 <arrow-right-bold class="arrow" />
          </div>
        </div>
      </div>
    </div>
    <!-- -------- -->
    <div>
      <div
        class="bas-user-album"
        v-for="item in useralbumMusics"
        :key="item.album.id"
      >
        <div class="album-img">
          <img
            v-if="!item.album.picUrl"
            class="img"
            src="~@/assets/img/imgLoading.png"
            alt=""
          />
          <el-image
            v-else
            class="img s"
            :src="item.album.picUrl"
            :preview-src-list="[item.album.picUrl]"
          >
          </el-image>
          <img class="img" src="~@/assets/img/albumbgc.png" alt="" />

          <div class="publishTime">
            {{ $filters.formatTime(item.album.publishTime, 'YYYY-MM-DD') }}
          </div>
        </div>
        <div class="album-right">
          <div class="remen">
            <i class="remens" @click="albumadds(item)">
              {{ item.album.name }}</i
            >
            <div class="video-folder">
              <video-play class="video" @click="videobtn(item.songs)" />
              <i>|</i>
              <folder-add class="folder" @click="folderbtn" />
            </div>
          </div>
          <div class="music-main">
            <bas-main-ui-plus
              v-if="item.songs.length > 10"
              :configMusic="configAlbum"
              :listdate="item.songs.slice(0, 10)"
              :showloading="false"
            />
            <bas-main-ui-plus
              v-else
              :configMusic="configAlbum"
              :listdate="item.songs"
              :showloading="false"
            />
          </div>
          <div
            class="div-length"
            @click="albumadds(item)"
            v-if="item.songs.length > 10"
          >
            <div></div>
            <div class="aaa">
              查看全部{{ item.songs.length }}首
              <arrow-right-bold class="arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="showloadingalbum && useralbumMusics.length !== albumSize">
        加载中...
      </div>
      <div v-if="useralbumMusics.length == albumSize">没有更多了</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, onMounted } from 'vue'
import basMainUiPlus from '@/basse-ui/bas-main-ui-plus'
import { configAlbum } from '../config/configAlbum'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import Localcache from '@/utlis/caches'
import router from '@/router'

export default defineComponent({
  components: {
    basMainUiPlus
  },
  props: {
    // 热门50首
    albumMuisc: {
      type: Array,
      required: true
    },
    // 专辑歌
    useralbumMusics: {
      type: Array,
      required: true
    },
    // 显示加载中
    showloadingalbum: {
      type: Boolean,
      default: false
    },
    // 专辑的数量
    albumSize: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()

    const videobtn = (list: any[]) => {
      store.dispatch('pageMusic/albumcurrentmusic', list)
      console.log('播放全部')
      const indexaa = store.state.pageMusic.mp3s.length - 1

      store.dispatch('pageMusic/setIndex', indexaa)
    }
    const folderbtn = () => {
      console.log('加入播放列表')
    }
    const albumshow = ref(true)
    const albumMuiscs = computed(() => {
      if (props.albumMuisc.length > 10 && albumshow.value) {
        return props.albumMuisc.slice(0, 10)
      } else {
        return props.albumMuisc
      }
    })
    // 点击显示更多音乐
    const albumadd = (list: any[]) => {
      albumshow.value = false
      store.dispatch('pageMusic/albumcurrentmusic', list)
    }
    // 每一个item专辑数据 跳转到专辑页面
    const indexitems = ref()
    const albumadds = (item: any) => {
      store.dispatch('complexData/userAlbumItem', item)
      console.log(item, 'item')
      // indexitems.value = index
      // 跳转到专辑 传入专辑id 用途刷新页面去请求网络调用专辑数据

      router.push({
        path: '/main/com/userAlbumItem/' + item.album.id
      })
    }

    return {
      indexitems,
      albumadds,
      albumshow,
      albumadd,
      albumMuiscs,
      videobtn,
      folderbtn,
      configAlbum
    }
  }
})
</script>

<style scoped lang="less">
.bas-user-album {
  margin-bottom: 50/1920 * 100vw;
  display: flex;
  cursor: default;
  .album-img-top {
    margin-right: 76/1920 * 100vw;
    margin-left: 10/1920 * 100vw;
  }
  .img {
    width: 185/1920 * 100vw;
    height: 185/1920 * 100vw;
    border-radius: 8/1920 * 100vw;
  }
  .album-img {
    margin-right: 34/1920 * 100vw;
    position: relative;
    margin-left: 52/1920 * 100vw;

    .s {
      position: absolute;
      right: 37/1920 * 100vw;
      box-shadow: 1/1920 * 100vw 1/1920 * 100vw 10/1920 * 100vw 1/1920 * 100vw
        rgba(100, 100, 100, 0.5);
    }
    .publishTime {
      margin-left: -35/1920 * 100vw;
      font-size: 10/1920 * 100vw;
      font-weight: 300;
      color: #555;
      cursor: default;
    }
  }
  .album-right {
    .div-length {
      margin-top: -50/1920 * 100vw;
      text-align: right;
      font-size: 8/1920 * 100vw;
      color: #ccc;
      height: 45/1920 * 100vw;
      line-height: 45/1920 * 100vw;
      background-color: rgb(250, 248, 248);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .aaa {
        display: flex;
        align-items: center;
        margin-right: 50/1920 * 100vw;
      }
      .aaa:hover {
        cursor: pointer;
      }
      .arrow {
        width: 20/1920 * 100vw;
      }
    }
    .div-length:hover {
      color: #666;
    }
    .remen {
      display: flex;
      font-family: '幼圆';
      font-size: 21/1920 * 100vw;
      font-weight: 550;
      color: #333;
    }
    .remens:hover {
      cursor: pointer;
      color: #000;
    }
    .video-folder {
      display: flex;
      align-items: center;
      margin-left: 35/1920 * 100vw;
      color: #666;
      i {
        display: inline-block;
        height: 18/1920 * 100vw;
        overflow: hidden;
        margin: 0 10/1920 * 100vw;
        color: #ccc;
        font-weight: 100;
      }
      .video {
        width: 28/1920 * 100vw;
      }
      .folder {
        width: 28/1920 * 100vw;
      }
      .video:hover {
        color: #333;
        cursor: pointer;
      }
      .folder:hover {
        color: #333;
        cursor: pointer;
      }
    }
  }
}
</style>
