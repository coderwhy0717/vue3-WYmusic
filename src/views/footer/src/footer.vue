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
              <div
                class="left-text-aaa"
                @mouseover="mouseoverchang"
                ref="lefttext"
              >
                <div class="left-text-3">
                  {{ musicMessage.text ?? musicMessage.name }}
                </div>
              </div>
            </div>
            <div v-if="musicMessage.alia" class="left-text-cc1">
              <template v-for="item in musicMessage.alia" :key="item">
                <i class="left-text-ccc">{{ item }}</i>
              </template>
              <template v-for="item in musicMessage.ar" :key="item.id">
                <i>{{ item.name }}</i
                >/
              </template>
            </div>
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
      <!-- :class="isshowbof ? 'el-icon-video-pause' : 'el-icon-caret-right'" -->
      <!-- <div class="music-center-top">
          <caret-left class="play" @click="leftBtn" />

          <video-play class="play" v-if="showPlay" @click="changeState(true)" />
          <video-pause class="play" v-else @click="changeState(false)" />


          <caret-right class="play" @click="rightBtn" />

          <span>词</span>
        </div> -->
      <!-- @play="changeState(true)" -->
      <!-- @pause="changeState(false)" -->
      <div class="music-center">
        <div class="playMusic">
          <div
            class="along iconfont"
            :class="sequence"
            @click="cahngeAlong()"
          ></div>
          <div
            class="last iconfont icon-shangyishou"
            @click="lastNext(-1)"
          ></div>
          <div
            class="iconfont"
            :class="isShowPlay ? 'pause icon-pause-full' : 'play icon-bofang'"
            @click="changeref"
          ></div>
          <div class="next iconfont icon-xiayishou" @click="lastNext(1)"></div>
          <div class="lyric" @click="openCenter()">词</div>
        </div>
        <div class="slider">
          <div>{{ formatUtcString(songPlayTime, 'mm:ss') }}</div>
          <el-slider
            size="small"
            :model-value="Progress"
            :max="100"
            :min="0"
            :step="0.1"
            @change="change"
            @input="changeinput"
          />
          <div>{{ formatUtcString(musicMessage.dt, 'mm:ss') }}</div>
        </div>
        <audio
          autoplay
          :src="getSongUrl(musicMessage.id)"
          :loop="false"
          @ended="audioFinished"
          class="audioss"
          @timeupdate="timeupdate"
          ref="myRef"
        ></audio>
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
        <!-- 歌词 -->
        <div>{{ currentLy }}</div>

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
import {
  computed,
  defineComponent,
  ref,
  onMounted,
  watchEffect,
  onUpdated,
  onBeforeUpdate
} from 'vue'
import { useStore } from '@/store'
import basMainUiPlus from '@/basse-ui/bas-main-ui-plus'
import { configMusicRight } from './config/music-right'
import basMainMessage from '@/basse-ui/bas-main-message'
import { musicMessageTime, throller } from '@/utlis/map-menus'
import { formatUtcString } from '@/utlis/data-formatTime'
import { ElMessage } from 'element-plus'
export default defineComponent({
  components: {
    basMainUiPlus,
    basMainMessage
  },
  setup() {
    const store = useStore()
    const myRef = ref<InstanceType<typeof Audio>>()
    // 获取组件audio信息
    const getSongUrl = (id: number) => {
      return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    }
    const isShowPlay = computed(() => store.state.pageMusic.showPlay)
    const songPlayTime = ref(0)
    const Progress = ref(0)
    const isShowPLayProgress = ref(true)
    const isShowLyreic = ref(false)
    // 拿到播放当前歌曲 信息
    const musicMessage = computed(() => store.state.pageMusic.currentMusicId)
    const currentLy = computed(() => store.state.pageMusic.currentLyreic)
    onMounted(() => {
      console.log(myRef)

      myRef.value!.src = getSongUrl(musicMessage.value.id)
      myRef
        .value!.play()
        .then(() => {
          store.dispatch('pageMusic/changePlayStateAction', true)
        })
        .catch(() => {
          store.dispatch('pageMusic/changePlayStateAction', false)
        })
    })
    const changeref = () => {
      console.log(isShowPlay.value)
      isShowPlay.value ? myRef.value!.pause() : myRef.value!.play()
      store.dispatch('pageMusic/changePlayStateAction', !isShowPlay.value)
    }
    // 当前歌曲播放进度
    const timeupdate = (e: any) => {
      // if (!isShowPlay.value) {
      //   const showPlayis = computed(() => store.state.pageMusic.showPlay)
      //   isShowPlay.value = showPlayis.value
      // }
      const currentTime = e.target.currentTime * 1000

      if (isShowPLayProgress.value) {
        songPlayTime.value = currentTime
        Progress.value = (currentTime / musicMessage.value.dt) * 100
        // console.log(parseFloat(e.target.currentTime), '播放进度')
      }
      if (isShowLyreic.value) {
        const songly = computed(() => store.state.pageMusic.Lyreic)
        const lyIndex = computed(() => store.state.pageMusic.lyreicIndex)
        let index = 0
        for (let i = 0; i < songly.value.length; i++) {
          if (currentTime < songly.value[i].duration * 1000) {
            index = i - 1
            break
          }
        }
        const ly = songly.value[index]?.lyricStr
        console.log(index)
        if (index !== lyIndex.value) {
          console.log(ly, lyIndex.value)
          store.dispatch('pageMusic/changelyIndexAction', index)
          store.dispatch('pageMusic/changeCurrentLy', ly)
        }
      }
      store.dispatch(
        'pageMusic/setcurrentTime',
        parseFloat(e.target.currentTime.toFixed(1))
      )
    }
    // 点击滑块两个事件
    // 滑动鼠标松开
    const change = (val: any) => {
      // isShowPLayProgress.value = false
      myRef.value!.currentTime = ((val / 1000) * musicMessage.value.dt) / 100
      isShowPLayProgress.value = true
      if (!isShowPlay.value) {
        changeref()
      }
      console.log(val, '值改变时')
    }
    // 滑动
    const changeinput = (val: any) => {
      isShowPLayProgress.value = false
      Progress.value = val
      songPlayTime.value = (val * musicMessage.value.dt) / 100
      change(val)
    }

    // -------------------------------
    console.log(store.state.pageMusic.currentMusicId, '当前播放信息')
    console.log(musicMessage.value.id, '当前播放信息')
    let showPlay: any = ref(musicMessage.value.url ? false : true)
    // 播放结束
    const sequenceIndex = computed(() => store.state.pageMusic.sequence)
    const audioFinished = () => {
      if (sequenceIndex.value === 1) {
        myRef.value!.currentTime = 0
        myRef.value!.play()
      } else {
        lastNext(1)
      }
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

    const lefttext = ref()
    let i = 0
    // 子组件点击事件
    const TriggerShows = () => {
      isshows.value = !isshows.value
    }
    // 获取播放顺序
    const sequence = computed(() => {
      const seq = store.state.pageMusic.sequence
      switch (seq) {
        case 1:
          return 'icon-danquxunhuan'
        case 2:
          return 'icon-suijibofang'
        default:
          return 'icon-bofang-xunhuanbofang'
      }
    })
    //  歌曲是否0循环 1单曲 2随机
    const cahngeAlong = () => {
      store.dispatch('pageMusic/changeSequence')
    }

    //播放上一首歌曲 / 下一首歌曲
    const lastNext = (tag: any) => {
      store.dispatch('pageMusic/lastNext', tag)
    }
    // 播放 、暂停播放

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
    let foo = (showif = true) => {
      i--
      console.log(showif, 'show')
      const box_obj = lefttext.value
      let distance =
        box_obj.width ||
        box_obj.clientWidth ||
        box_obj.offsetWidth ||
        box_obj.scrollWidth
      console.log(distance, 'distance')
      if (i <= -distance) {
        i = 2 * distance
        console.log(i, 'i')
        box_obj.style.right = -distance + 'px'
      } else if (i >= distance) {
        let now_left = i - distance
        console.log(now_left, 'now_left')
        console.log(i, 'now_left i')
        console.log(distance, 'now_left distance')
        box_obj.style.left = now_left + 'px'
      } else {
        console.log(i, 'iii')
        if (i == distance - 1) {
          box_obj.style.left = 0 + 'px'
          i = 0
          return
        }
        box_obj.style.left = i + 'px'
      }
      if (showif) {
        setTimeout(foo, 30)
      }
    }

    // 鼠标经过text事件
    const mouseoverchang = throller(foo, 5000)
    const openCenter = () => {
      isShowLyreic.value = !isShowLyreic.value
    }
    return {
      currentLy,
      openCenter,
      getSongUrl,
      sequence,
      cahngeAlong,
      change,
      changeinput,
      Progress,
      isShowPlay,
      songPlayTime,
      lefttext,
      mouseoverchang,
      changeref,
      isshowsbtn,
      showPlay,
      lastNext,
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
      myRef,
      formatUtcString
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
    display: flex;
    cursor: pointer;
    width: 25%;
    // background-color: red;
    img {
      border-radius: 5%;
      width: 70/1920 * 100vw;
      height: 70/1920 * 100vw;
    }
    .left-text {
      position: relative;
      padding-left: 10/1920 * 100vw;
      font-size: 15/1920 * 100vw;
      font-weight: 300;
      width: 210/1920 * 100vw;
      overflow: hidden;
      .left-text-a {
        position: relative;
        top: 0;
        left: 0;
        font-size: 20/1920 * 100vw;
        .left-text-aaa {
          position: relative;
          left: 0;
          top: 0;
          width: 210/1920 * 100vw;
          background-color: red;
          .left-text-3 {
            position: absolute;
            white-space: nowrap;
            overflow: hidden;
            color: #222;
            // background-color: green;
          }
          .left-text-3:hover {
            color: #000;
          }
        }
      }
      .left-text-cc1 {
        position: absolute;
        bottom: 10px;
        .left-text-ccc {
          color: #999;
        }
      }
    }
  }

  .music-center {
    flex: 1;
    .playMusic {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      width: 500/1920 * 100vw;
      div {
        text-align: center;
        font-size: 25px;
        cursor: pointer;
      }
      .along {
        width: 100/1920 * 100vw;
        text-align: center;
      }
      .lyric {
        width: 100/1920 * 100vw;
        text-align: center;
      }
      .last {
        width: 28px;
        height: 28px;
      }
      .last:hover {
        background-color: rgb(236, 235, 235);
        border-radius: 5px;
      }
      .pause {
        width: 32px;
        height: 32px;
        line-height: 30px;
      }
      .pause:hover {
        background-color: rgb(236, 235, 235);
        border-radius: 5px;
      }
      .play {
        width: 32px;
        height: 32px;
        line-height: 30px;
      }
      .play:hover {
        background-color: rgb(236, 235, 235);
        border-radius: 5px;
      }
      .next {
        width: 28px;
        height: 28px;
      }
      .next:hover {
        background-color: rgb(236, 235, 235);
        border-radius: 5px;
      }
    }
    .slider {
      width: 700/1920 * 100vw;
      display: flex;
      align-items: center;
      margin: 0 auto;
      div {
        font-size: 13px;
        margin: 0 10px;
        color: #8b8b8d;
      }
    }
  }

  .music-right {
    // background-color: red;
    display: flex;
    width: 25%;
    .carets {
      margin-left: 10/1920 * 100vw;
      width: 40/1920 * 100vw;
    }
  }
}
</style>
<style lang="less">
// 滑块
.el-slider {
  width: 600/1920 * 100vw;
  --el-slider-button-size: 15px;

  .el-slider__runway {
    background-color: #c9c9c9;
  }
  .el-slider__runway {
    --el-slider-main-bg-color: #e20931;
    --el-slider-runway-bg-color: #c20c2c;
  }
}

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
