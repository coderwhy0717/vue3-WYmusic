<template>
  <div class="video-mv">
    <div class="video-top">找到 {{ mvMessage.mvCount ?? 0 }} 个视频</div>
    <el-row :gutter="15">
      <template v-for="item in mvMessage.mvs" :key="item.id">
        <el-col :span="sapn" class="artist" @click="artistbtn(item.id)">
          <div class="img-text">
            <p class="bgc"></p>
            <i class="playCount">
              <caret-right
                style="width: 2.2em; margin-right: 20/1920 * 100vw"
              />
              {{ $filters.formatnumber(item.playCount) }}</i
            >
            <img class="img" :src="item.cover + '?param=810y450'" alt="" />
            <p class="bgcbotm"></p>
            <div class="time">
              {{ $filters.formatTime(item.duration, 'mm:ss') }}
            </div>
          </div>
          <div class="name">{{ item.name }}</div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  setup() {
    const store = useStore()
    const sapn = ref(6)
    if (document.documentElement.clientWidth < 700) {
      sapn.value = 12
    }
    // 获取mv数据vuex
    const mvMessage = computed(() => store.state.searchdetail.searchMV)

    const artistbtn = (mvId: number) => {
      console.log(mvId, 'mvid')
      router.push({
        path: '/main/com/artist/MV/' + mvId
      })
    }
    return {
      artistbtn,
      sapn,
      mvMessage
    }
  }
})
</script>

<style scoped lang="less">
.video-mv {
  margin-top: 10/1920 * 100vw;
  margin-left: 2/1920 * 100vw;
  padding-bottom: 100/1920 * 100vw;
  .video-top {
    text-align: right;
    margin-bottom: 10/1920 * 100vw;
    margin-right: 35/1920 * 100vw;
    font-size: 14/1920 * 100vw;
    color: #888;
    font-weight: 300;
  }
}
.artist {
  margin-bottom: 35/1920 * 100vw;
  cursor: pointer;

  .img-text {
    height: 220/1920 * 100vw;
    overflow: hidden;
    align-items: center;
    position: relative;
    border-radius: 10/1920 * 100vw;
    margin-bottom: 10/1920 * 100vw;
    box-shadow: 1/1920 * 100vw 1/1920 * 100vw 5/1920 * 100vw 1/1920 * 100vw
      rgba(100, 100, 100, 0.5);
    .bgc {
      position: absolute;
      top: -12/1920 * 100vw;
      width: 100%;
      box-shadow: 5/1920 * 100vw 0 14/1920 * 100vw 25/1920 * 100vw
        rgba(100, 100, 100, 0.2);
    }
    .bgcbotm {
      position: absolute;
      bottom: -12/1920 * 100vw;
      width: 100%;
      box-shadow: 5/1920 * 100vw 0 14/1920 * 100vw 25/1920 * 100vw
        rgba(100, 100, 100, 0.2);
    }
    .img {
      width: 100%;
      height: 220/1920 * 100vw;
      border-radius: 5/1920 * 100vw;
    }
    .playCount {
      position: absolute;
      top: 4/1920 * 100vw;
      right: 10/1920 * 100vw;
      display: flex;
      align-items: center;
      font-size: 10/1920 * 100vw;
      color: #fff;
      font-weight: normal;
    }
    .time {
      position: absolute;
      right: 5/1920 * 100vw;
      bottom: 8/1920 * 100vw;
      color: #fff;
      font-size: 10/1920 * 100vw;
    }
  }

  .name {
    font-size: 16/1920 * 100vw;
    width: 100%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
