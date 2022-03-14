<template>
  <div class="page-main-item">
    <!-- 歌单 -->
    <el-row :gutter="10" class="elrow">
      <slot name="gege"></slot>

      <template v-for="item in personalized" :key="item.id">
        <el-col :span="4">
          <div class="recommend" @click="recommendbtn(item)">
            <p class="bgc"></p>

            <i class="playCount">
              <caret-right
                style="width: 2.2em; margin-right: 20/1920 * 100vw"
              />
              {{ $filters.formatnumber(item.playCount) }}</i
            >
            <img
              :src="item.coverImgUrl + '?param=500y500'"
              alt=""
              class="img"
            />
            <p class="p-name">{{ item.name }}</p>
            <p class="trackCount">{{ item.trackCount }}首</p>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { useStore } from '@/store'
import { computed, defineComponent, ref } from 'vue'
import Localcache from '@/utlis/caches'
export default defineComponent({
  props: {
    personalized: {
      type: Array,
      default: () => []
    },
    shoAddup: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    const store = useStore()

    const song = (a: number) => {
      store.commit('songnumber', a)
      router.push({
        path: '/main/discovr/music/musiclist'
      })
    }
    const recommendbtn = (item: any) => {
      router.push({
        path: '/main/musiclistdetail/' + item.id
      })
    }

    return {
      song,
      recommendbtn
    }
  }
})
</script>

<style scoped lang="less">
.page-main-item {
  padding: 10/900 * 100vw 0 20/900 * 100vw 0;
  .song {
    cursor: pointer;
  }
  i {
    font-weight: 600;
    font-size: 25/1920 * 100vw;
    padding: 10px 0;
    i {
      // font-weight: 900;
      font-size: 25/1920 * 100vw;
    }
  }
  .recommend {
    overflow: hidden;
    align-items: center;
    cursor: pointer;
    position: relative;
    border-radius: 10/1920 * 100vw;
    margin-bottom: 10/1920 * 100vw;
    .bgc {
      position: absolute;
      width: 240/1920 * 100vw;
      box-shadow: 0px 0 14/1920 * 100vw 28/1920 * 100vw rgba(100, 100, 100, 0.2);
    }
    .playCount {
      position: absolute;
      top: -10/1920 * 100vw;
      right: 10/1920 * 100vw;
      display: flex;
      align-items: center;
      font-size: 10/1920 * 100vw;
      color: #fff;
      font-weight: normal;
    }
    p {
      margin-top: 0;
      width: 245/1920 * 100vw;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .img {
    border-radius: 10/1920 * 100vw;
    width: 245/1920 * 100vw;
    height: 245/1920 * 100vw;
  }
  .p-name {
    font-size: 14/1920 * 100vw;
    margin-bottom: 0;
  }
  .trackCount {
    font-size: 5px;
    font-weight: 300;
    color: rgb(196, 189, 189);
  }
}
</style>
