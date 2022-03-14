<template>
  <div class="footer">
    <!-- <iframe
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="450"
      width="100%"
      height="600"
      src="//music.163.com/outchain/player?type=0&id=541156249&auto=1&height=430"
    ></iframe> -->
    <!-- loop控制 是否单曲播放 -->

    <div class="music">
      <transition
        appear
        enter-active-class="animate__animated  animate__fadeInDown "
        mode="out-in"
      >
        <div class="music-left" v-if="!isshows">
          <img :src="musicMessage.al.picUrl" alt="" @click="isshowsbtn" />

          <div class="left-text">
            <div class="left-text-a">
              {{ musicMessage.text ?? musicMessage.name }}
              <i v-if="musicMessage.alia">
                <template v-for="item in musicMessage.alia" :key="item">
                  <i class="left-text-ccc">{{ item }}</i>
                </template>
              </i>
            </div>
            <template v-for="item in musicMessage.ar" :key="item.id">
              <i>{{ item.name }}</i
              >/
            </template>
          </div>
        </div>
        <!--  -->
        <div class="music-left" v-else @click="isshows = !isshows">
          <arrow-down-bold style="width: 1.5em" />

          <i class=""><share style="width: 1.5em" /></i>
          <div class="left-text">
            <!-- 点击之后显示的 -->
            <div class="left-text-a">!</div>
            <div><i class="iconfont icon-suiji1"></i></div>
          </div>
        </div>
        <!--  -->
      </transition>

      <div class="music-center">
        <div class="music-center-top">
          <caret-left class="play" @click="leftBtn" />

          <video-play class="play" v-if="showPlay" @click="changeState(true)" />
          <video-pause class="play" v-else @click="changeState(false)" />

          <!-- :class="isshowbof ? 'el-icon-video-pause' : 'el-icon-caret-right'" -->

          <caret-right class="play" @click="rightBtn" />

          <span>词</span>
        </div>
        <!-- @play="changeState(true)" -->
        <!-- @pause="changeState(false)" -->
        <div class="music-center-bm">
          <audio
            :src="musicMessage.url"
            controls
            autoplay
            :loop="false"
            @ended="audioFinished"
            class="audioss"
            @timeupdate="timeupdate"
            ref="myRef"
          ></audio>
        </div>
      </div>

      <div class="music-right">
        <!-- <el-select v-model="value" placeholder="标准">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select> -->
        <expand class="carets" @click="drawer = !drawer" />
      </div>
    </div>
  </div>
  <!-- right -->
  <div :class="drawer ? 'mengban' : ''">
    <el-drawer title="我是标题" v-model="drawer" :with-header="false">
      <div class="listdatediv">当前播放列表</div>
      <span class="listdate">总{{ listdate.length }}首</span>
      <el-scrollbar :height="displayArea">
        <transition
          appear
          enter-active-class="animate__animated  animate__shakeX "
          mode="out-in"
        >
          <bas-main-ui-plus
            v-if="drawer"
            :configMusic="configMusicRight"
            :listdate="listdate"
          />
        </transition>
      </el-scrollbar>
    </el-drawer>
  </div>
  <!-- main -->
  <el-drawer title="" v-model="isshows" :direction="'btt'" :with-header="true">
    <el-scrollbar :height="displayArea">
      <transition
        appear
        enter-active-class="animate__animated  animate__shakeY "
        mode="out-in"
      >
        <bas-main-message
          v-if="isshows"
          :musicMessages="musicMessage"
          @TriggerShow="TriggerShows"
        >
        </bas-main-message>
      </transition>
    </el-scrollbar>
  </el-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import basMainUiPlus from '@/basse-ui/bas-main-ui-plus'
import { configMusicRight } from './config/music-right'
import basMainMessage from '@/basse-ui/bas-main-message'
import { musicMessageTime } from '@/utlis/map-menus'

export default defineComponent({
  components: {
    basMainUiPlus,
    basMainMessage
  },
  setup() {
    const store = useStore()

    // 拿到播放当前歌曲 信息
    const musicMessage = computed(() => {
      const message = ref(store.state.pageMusic.currentMusicId)
      return message.value
    })
    console.log(store.state.pageMusic.currentMusicId, '当前播放信息')
    console.log(musicMessage.value.id, '当前播放信息')
    let showPlay: any = ref(musicMessage.value.url ? false : true)

    const audioFinished = (event: any) => {
      console.log(event, '播放结束')
      // vuex里获取双击的index
      const a = store.state.pageMusic.doubleIndex
      console.log(store.state.pageMusic.doubleIndex, '播放结束获取的index')
      // 传入index 去播放下一首
      store.dispatch('pageMusic/setIndex', store.state.pageMusic.doubleIndex)
    }
    const customColor = '#409eff'
    const customColors = [
      { color: '#f56c6c', percentage: 20 },
      { color: '#e6a23c', percentage: 40 },
      { color: '#5cb87a', percentage: 60 },
      { color: '#1989fa', percentage: 80 },
      { color: '#6f7ad3', percentage: 100 }
    ]
    const options = [
      {
        value: '选项1',
        label: '黄金糕'
      },
      {
        value: '选项2',
        label: '双皮奶'
      },
      {
        value: '选项3',
        label: '蚵仔煎'
      },
      {
        value: '选项4',
        label: '龙须面'
      },
      {
        value: '选项5',
        label: '北京烤鸭'
      }
    ]
    // 控制options
    const value = ref('')
    //  控制 footer的 right 页面
    const drawer = ref(false)
    // 控制 footer的main页面
    const isshows = ref(false)
    //一、 获取所有歌曲信息
    const listdate = computed(() => {
      // vuex里获取所有的歌曲message
      const s = ref(store.state.pageMusic.mp3s)
      // 调用方法去转化需要的数据与歌曲时间
      const playermesage = musicMessageTime(s.value)
      return playermesage
    })
    const displayArea = computed(() => {
      return `${document.documentElement.clientWidth / 2.5}px`
    })
    // 当前歌曲播放进度
    const timeupdate = (e: any) => {
      // console.log(parseFloat(e.target.currentTime.toFixed(1)), '播放进度')
      store.dispatch(
        'pageMusic/setcurrentTime',
        parseFloat(e.target.currentTime.toFixed(1))
      )
    }
    // 子组件点击事件
    const TriggerShows = () => {
      isshows.value = !isshows.value
    }
    // 播放上一首歌曲
    const leftBtn = () => {
      console.log('播放上一首')
      store.dispatch('pageMusic/leftBtn')
    }
    // 播放下一首歌曲
    const rightBtn = () => {
      console.log('下一首')
      store.dispatch('pageMusic/rightBtn')
    }
    // 播放 、暂停播放

    // 获取组件audio信息
    const myRef = ref<InstanceType<typeof Audio>>()
    const changeState = (bool: boolean) => {
      // console.log('播放暂停', myRef.value?.play())
      if (!musicMessage.value.url) return
      if (bool) {
        myRef.value?.play()
      } else {
        myRef.value?.pause()
      }
      showPlay.value = !showPlay.value
    }
    // 点击显示、影藏
    const isshowsbtn = () => {
      isshows.value = !isshows.value
      // 网络请求歌曲评论
      console.log('歌曲评论请求')

      store.dispatch('complexData/commentmusicRemark', {
        id: musicMessage.value.id,
        limit: 60,
        offset: 0
      })
    }
    return {
      isshowsbtn,
      showPlay,
      changeState,
      leftBtn,
      rightBtn,
      TriggerShows,
      drawer,
      isshows,
      options,
      value,
      customColors,
      customColor,
      audioFinished,
      configMusicRight,
      listdate,
      displayArea,
      musicMessage,
      timeupdate,
      myRef
    }
  }
})
</script>

<style lang="less" scoped>
.listdate {
  color: #777;
  font-size: 10/1920 * 100vw;
  margin-left: 15/1920 * 100vw;
  margin-bottom: 5/1920 * 100vw;
}
.listdatediv {
  margin-left: 15/1920 * 100vw;
  margin-bottom: 20/1920 * 100vw;
  font-weight: 600;
  font-family: '幼圆';
}
.mengban {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: 1840/1920 * 92vh !important;
  overflow: auto;
}

.audioss {
  width: 900/1920 * 100vw;
  height: 20/1920 * 100vw;
}
.music {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10/1920 * 100vw 20/1920 * 100vw 0 20/1920 * 100vw;
  .music-left {
    align-items: center !important;
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      border-radius: 5%;
      width: 70/1920 * 100vw;
      height: 70/1920 * 100vw;
    }

    .left-text {
      padding-left: 10/1920 * 100vw;
      font-size: 15/1920 * 100vw;
      font-weight: 300;
      .left-text-a {
        font-size: 20/1920 * 100vw;
        .left-text-ccc {
          color: #999;
        }
      }
    }
  }
  .music-center {
    .music-center-top {
      margin-left: -100/1920 * 100vw;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding-top: 20/1920 * 100vw;
      .play {
        font-size: 28/1920 * 100vw;
        width: 20/1920 * 100vw;
        height: 20/1920 * 100vw;
        line-height: 20/1920 * 100vw;
        text-align: center;
      }
      .play:hover {
        color: red !important;
        cursor: pointer;
      }
      span:hover {
        cursor: pointer;
        color: red !important;
      }
    }
    .music-center-bm {
      display: flex;
      align-items: center;
      height: 50/1920 * 100vw;
      font-size: 10/1920 * 100vw;
      font-weight: 200;
      .elpar {
        margin-left: 10/1920 * 100vw;
      }
      .elpar-time {
        font-size: 10/1920 * 100vw;
      }
    }
  }
  .music-right {
    .carets {
      margin-left: 10/1920 * 100vw;
      width: 40/1920 * 100vw;
    }
  }
}
</style>
<style lang="less">
.el-icon-s-grid {
  margin: 0 20/1920 * 100vw;
  font-size: 30/1920 * 100vw;
}
.el-drawer.btt,
.el-drawer.ttb {
  margin-bottom: 105/1920 * 100vw !important;
  z-index: -101 !important;
  height: 1880/1920 * 92vh !important;
  box-shadow: -1px -1px 1px 1px rgba(100, 100, 100, 0.1) !important;
}
.el-overlay {
  // position: static !important;
  background-color: transparent !important;
}

.el-drawer.ltr,
.el-drawer.rtl {
  height: 1658/1920 * 92vh !important;
  top: unset !important;
  box-shadow: -1px -1px 5px 1px rgba(100, 100, 100, 0.1) !important;
}
.el-drawer {
}

.el-progress {
  margin: 35/1920 * 100vw auto;
  width: 500/1920 * 100vw;
  margin-right: 50px;
  display: flex !important;
  align-items: center !important;
}
.el-progress-bar__outer {
  background-color: #777;
  height: 2.5px !important;
}
// right
.el-select .el-input {
  font-size: 10px;
  width: 80px;
}
</style>
