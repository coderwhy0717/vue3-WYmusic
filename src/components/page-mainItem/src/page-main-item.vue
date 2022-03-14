<template>
  <div class="page-main-item">
    <i @click="song(1)" class="song" v-if="isshow"
      >{{ topName }}
      <arrow-right-bold
        style="width: 1em; height: 1em; margin-left: 8/1920 * 100vw"
      />
    </i>
    <!-- 歌单 -->
    <el-row :gutter="10" class="elrow">
      <template v-for="item in personalized" :key="item.id">
        <el-col :span="sapn">
          <div class="recommend" @click="recommendbtn(item)">
            <p class="bgc"></p>
            <i class="playCount">
              <caret-right
                style="width: 2.2em; margin-right: 20/1920 * 100vw"
              />
              <!-- <i class="playcount-icon">▷ </i> -->
              {{ $filters.formatnumber(item.playCount) }}</i
            >
            <img :src="item.picUrl + '?param=500y500'" alt="" class="img" />
            <p class="p-name">{{ item.name }}</p>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { useStore } from '@/store'
import { defineComponent, ref } from 'vue'
import Localcache from '@/utlis/caches'

export default defineComponent({
  props: {
    isshow: {
      type: Boolean,
      default: false
    },
    topName: {
      type: String,
      required: true
    },
    personalized: {
      type: Array,
      default: () => []
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
      // store.dispatch('pageMusic/getMusicPageh', item.id)

      console.log(item.id)

      router.push({
        path: '/main/musiclistdetail/' + item.id
      })
    }
    const sapn = ref(4.5)
    if (document.documentElement.clientWidth < 700) {
      sapn.value = 8
    }
    return {
      sapn,
      song,
      recommendbtn
    }
  }
})
</script>

<style scoped lang="less">
.page-main-item {
  padding: 10/900 * 100vw 0 20/900 * 100vw 20/1920 * 100vw;
  margin: 0 50/900 * 100vw 50/1920 * 100vw;
  .song {
    font-size: 20/1920 * 100vw;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10/1920 * 100vw !important;
  }
  i {
    font-weight: 600;
    font-size: 25/1920 * 100vw;
    padding: 15/1920 * 100vw 0;
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
    .bgc {
      position: absolute;
      box-shadow: 0px 0 13/1920 * 100vw 25/1920 * 100vw rgba(100, 100, 100, 0.3);
    }
    .playCount {
      position: absolute;
      top: -10/1920 * 100vw;
      right: 8/1920 * 100vw;
      font-size: 10/1920 * 100vw;
      display: flex;
      align-items: center;
      color: #fff;
      font-weight: normal;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      // // 高
      // height: 1em;
      // .playcount-icon {
      //   font-size: 10/1920 * 100vw;
      // }
    }
    p {
      margin-top: 0;
      width: 250/1920 * 100vw;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .img {
    border-radius: 10/1920 * 100vw;
    width: 260/1920 * 100vw;
    height: 260/1920 * 100vw;
  }
  .p-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 20/1920 * 100vw;
  }
}
</style>
<style lang="less" scoped>
@media screen and (max-width: 600px) {
  .page-main-item {
    padding: 0 2/1280 * 100rem;
    margin: 0 !important;
    .song {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-bottom: 2/1280 * 100rem !important;
    }

    .recommend {
      overflow: hidden;
      align-items: center;
      cursor: pointer;
      position: relative;
      border-radius: 5/1280 * 100rem;
      .bgc {
        position: absolute;
        width: 100/1280 * 100rem;

        box-shadow: 0px 0 5/1280 * 100rem 15/1280 * 100rem
          rgba(100, 100, 100, 0.3);
      }
      .playCount {
        position: absolute;
        top: -3/1280 * 100rem;
        right: 2/1280 * 100rem;
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: normal;
        font-size: 20/1280 * 100vw;
      }
      p {
        margin-top: 0;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .img {
      border-radius: 5/1280 * 100rem;
      width: 84/1280 * 100rem;
      height: 90/1280 * 100rem;
    }
  }
  .p-name {
    display: inline-block;
    width: 310/1280 * 100vw !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 15/1280 * 100rem;
  }
}
</style>
