<template>
  <div class="artist-mv">
    <el-row :gutter="12">
      <template v-for="item in artistmvs" :key="item.id">
        <el-col :span="sapn" class="artist" @click="artistbtn(item.id)">
          <div class="img-text">
            <p class="bgc"></p>
            <i class="playCount">
              <caret-right
                style="width: 2.2em; margin-right: 20/1920 * 100vw"
              />
              {{ $filters.formatnumber(item.playCount) }}</i
            >
            <img class="img" :src="item.imgurl + '?param=600y350'" alt="" />
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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    artistmvs: {
      type: Array,
      required: true
    }
  },
  setup() {
    const sapn = ref(4.5)
    if (document.documentElement.clientWidth < 700) {
      sapn.value = 8
    }
    const artistbtn = (mvId: number) => {
      console.log(mvId, 'mvid')
      router.push({
        path: '/main/com/artist/MV/' + mvId
      })
    }
    return {
      artistbtn,
      sapn
    }
  }
})
</script>

<style scoped lang="less">
.artist-mv {
  margin-top: 10/1920 * 100vw;
  margin-left: 2/1920 * 100vw;
}
.artist {
  margin-bottom: 35/1920 * 100vw;
  cursor: pointer;

  .img-text {
    height: 180/1920 * 100vw;
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
      width: 300/1920 * 100vw;
      box-shadow: 5/1920 * 100vw 0 14/1920 * 100vw 25/1920 * 100vw
        rgba(100, 100, 100, 0.2);
    }
    .bgcbotm {
      position: absolute;
      bottom: -12/1920 * 100vw;
      width: 300/1920 * 100vw;
      box-shadow: 5/1920 * 100vw 0 14/1920 * 100vw 25/1920 * 100vw
        rgba(100, 100, 100, 0.2);
    }
    .img {
      width: 300/1920 * 100vw;
      height: 180/1920 * 100vw;
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
    width: 295/1920 * 100vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
