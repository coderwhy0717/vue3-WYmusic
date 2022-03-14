<template>
  <div>
    <div class="lyrics">
      <!-- 占位 -->
      <div class="placeholder"></div>
      <template v-for="(item, index) in lyricsz" :key="index">
        <div
          class="lyricsItem"
          :class="lyricsIndex - 1 == index ? 'currentLyric' : ''"
        >
          {{ item.lyricStr }}
        </div>
      </template>
      <!-- 占位 -->
      <div class="placeholder"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, ref, onMounted, nextTick, watch } from 'vue'

export default defineComponent({
  props: {
    lyricsz: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    // 当前歌词索引
    const lyricsIndex = ref(0)
    const placeholderHeight = ref(0)
    const store = useStore()
    onMounted(() => {
      let lyricsArr = document.querySelectorAll('.lyricsItem')
      let lyrics = document.querySelector('.lyrics') as HTMLImageElement
      console.log(lyrics, 'lyrics')
      console.log(lyricsArr, 'lyricsArr')

      // 实现歌词滚动
      const lyricScroll = (currentLyric: any) => {
        // 获取歌词框
        let lyricsArr = document.querySelectorAll('.lyricsItem')
        let lyrics = document.querySelector('.lyrics') as HTMLImageElement
        // 必须使用断言  获取到第一个元素使用断言
        const itemA = lyricsArr[0] as HTMLImageElement
        nextTick(() => {
          // placeholder 的高度
          if (placeholderHeight.value == 0) {
            placeholderHeight.value = itemA.offsetTop - lyrics.offsetTop
          }
          // 歌词item在歌词框的高度 = 歌词框的 offsetTop - 歌词item的offsetTop
          if (lyricsArr[currentLyric - 1]) {
            const items = lyricsArr[currentLyric - 1] as HTMLImageElement
            let distance = items.offsetTop - lyrics.offsetTop
            lyrics.scrollTo({
              behavior: 'smooth',
              top: distance - placeholderHeight.value
            })
          }
        })
      }
      // 获取当前歌词索引
      const getCurrentLyricsIndex = (currentTime: any) => {
        let lyricsIndexs = 0
        props.lyricsz.some((item: any) => {
          if (lyricsIndexs < props.lyricsz.length - 1) {
            if (currentTime > item.duration) {
              lyricsIndexs += 1
            }
            return currentTime <= item.duration
          }
        })
        lyricsIndex.value = lyricsIndexs
      }
      watch(
        () => store.state.pageMusic.musicCurrent,
        (currentTime, lastTime) => {
          if (
            (lastTime && Math.abs(currentTime - lastTime) >= 1) ||
            (lyricsIndex.value == 0 && props.lyricsz.length > 1)
          ) {
            // 处理播放时间跳转时歌词位置的校准
            if (props.lyricsz.length > 1) {
              getCurrentLyricsIndex(currentTime)
              // 滑动到当前歌词
              lyricScroll(lyricsIndex.value)
            }
          }
          // 根据实时播放时间实现歌词滚动
          if (lyricsIndex.value < props.lyricsz.length) {
            if (
              currentTime >=
              store.state.pageMusic.Lyreic[lyricsIndex.value].duration
            ) {
              lyricsIndex.value += 1
              lyricScroll(lyricsIndex.value)
            }
          }
        }
      )
      watch(
        () => store.state.pageMusic.Lyreic,
        (newLyrics) => {
          lyricsIndex.value = 0
        }
      )
      const lyric = () => {
        // 大于一秒，说明歌词在1秒后才请求成功 歌词可能不能马上跳转到当前时间 这里进行校准
        if (store.state.pageMusic.musicCurrent > 1) {
          // 处理播放时间跳转时歌词位置的校准
          if (store.state.pageMusic.Lyreic.length > 1) {
            getCurrentLyricsIndex(store.state.pageMusic.musicCurrent)
            nextTick(() => {
              // 滑动到当前歌词
              lyricScroll(lyricsIndex.value)
            })
          }
        }
      }
      lyric()
    })

    return {
      lyricsIndex
    }
  }
})
</script>

<style scoped lang="less">
.lyrics {
  width: 550/1920 * 100vw;
  height: 450/1920 * 100vw;
  font-size: 12px;
  text-align: center;
  overflow-y: scroll;
  /* overflow: scroll; */
}

.lyrics::-webkit-scrollbar {
  display: none;
}

.lyricsItem {
  font-size: 12px;
  /* height: 20px; */
  margin: 25px 20px;
  transition: all 0.5s;
  line-height: 20px;
}

.currentLyric {
  font-weight: 600;
  font-size: 14px;
  color: black;
}

.placeholder {
  width: 100%;
  height: 40%;
}
</style>
