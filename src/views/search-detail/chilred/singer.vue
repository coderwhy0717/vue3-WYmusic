<template>
  <div class="singer" v-if="singers">
    <div class="singer-top">找到 {{ singers.artistCount ?? 0 }} 位歌手</div>
    <div class="singer-text">
      <template v-for="item in singers.artists" :key="item.id">
        <div class="singer-message" @click="userbtn(item.id)">
          <img
            class="singer-img"
            :src="item.img1v1Url + '?param=100y100'"
            alt=""
          />
          <div class="color">
            {{ item.name }}
            <i class="is" v-if="item.alias[0]">({{ item.alias[0] }})</i>
          </div>
        </div>
      </template>
    </div>
  </div>
  <div v-else>加载中...</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import router from '@/router'
export default defineComponent({
  props: {
    searchName: {
      type: String,
      reuiqred: true
    }
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const singers = computed(() => store.state.searchdetail.searchSinger)
    // 网络请求搜索框内容
    // store.dispatch('searchdetail/searchSinger', {
    //   name: props.searchName,
    //   type: 100,
    //   limit: 60,
    //   offset: 0
    // })
    // 点击跳转到 user所有的专辑页面
    const userbtn = (id: number) => {
      router.push({
        path: '/main/com/userAlbum/' + id
      })
    }
    return {
      userbtn,
      singers
    }
  }
})
</script>

<style scoped lang="less">
.singer {
  padding-bottom: 150/1920 * 100vw;
  .singer-top {
    text-align: right;
    margin-right: 35/1920 * 100vw;
    font-size: 14/1920 * 100vw;
    color: #888;
    font-weight: 300;
  }
  .singer-text {
    .singer-message {
      padding: 10/1920 * 100vw 0 10/1920 * 100vw 10/1920 * 100vw;
      display: flex;
      align-items: center;
    }
    .singer-img {
      width: 80/1920 * 100vw;
      height: 80/1920 * 100vw;
      border-radius: 15/1920 * 100vw;
      box-shadow: 0 0 5/1920 * 100vw 1/1920 * 100vw rgba(100, 100, 100, 0.5);
      margin-right: 20/1920 * 100vw;
    }
    .color {
      font-size: 18/1920 * 100vw;
      .is {
        color: #999;
      }
    }
  }
  .singer-message:hover {
    background-color: rgb(238, 238, 238);
    cursor: pointer;
  }
  .singer-message:nth-child(2n) {
    background-color: rgb(247, 247, 247);
  }
  .singer-message:nth-child(2n):hover {
    background-color: rgb(241, 241, 241);
  }
}
</style>
