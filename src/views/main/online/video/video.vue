<template>
  <div>
    <div class="videoListCard" @scroll="ascroll">
      <div class="cardItem" v-for="item in count" :key="item">
        <div class="videoCover">{{ item }}</div>
      </div>
    </div>
    <p v-if="loading">加载中...</p>
  </div>
</template>

<script>
import { Position } from '@element-plus/icons'
import { defineComponent, ref, computed, onMounted, watch, nextTick } from 'vue'

export default defineComponent({
  setup(props) {
    const count = ref(10)
    const disabled = ref(true)
    const isLoad = ref(false)
    const loading = ref(false)
    // const noMore = computed(() => count.value >= 150)
    // 上拉触底触发
    onMounted(() => {
      let lyrics = document.querySelector('.videoListCard')
      console.log(lyrics.scrollHeight, 'videoListCard')
    })
    const ascroll = (event) => {
      // console.log(event, 'event')
      console.log(
        event.srcElement.scrollHeight,
        parseFloat(event.srcElement.scrollTop.toFixed(0)),
        event.srcElement.offsetHeight
      )
      if (
        event.srcElement.scrollHeight ===
        parseFloat(event.srcElement.scrollTop.toFixed(0)) +
          event.srcElement.offsetHeight
      ) {
        console.log('加载了')
        count.value += 20
      }
    }
    return {
      ascroll,
      count,
      loading,
      disabled
    }
  }
})
</script>
<style lang="less" scoped>
.videoListCard {
  width: 550/1920 * 100vw;
  height: 450/1920 * 100vw;
  flex-wrap: wrap;
  padding: 0;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 100px;
  overflow-y: scroll;
}
.cardItem {
  max-width: 228px;
  /* width: 18.3vw; */
  width: 14.64vw;
  margin-right: 1%;
  margin-left: 1%;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
