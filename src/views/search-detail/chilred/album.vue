<template>
  <!-- 专辑 -->
  <div class="album">
    <div class="album-top">找到 {{ albummessage.albumCount ?? 0 }} 张专辑</div>
    <template v-for="item in albummessage.albums" :key="item.id">
      <div class="imgs-A" @click="albumMessage(item.id)">
        <div class="img-B">
          <div class="img-c">
            <img class="img s" src="~@/assets/img/albumbgc.png" alt="" />
            <div class="img ss">
              <img class="img" :src="item.picUrl + '?param=300y300'" />
            </div>
            <div class="color">
              {{ item.name }}
              <i class="is" v-if="item.alias[0]">({{ item.alias[0] }})</i>
            </div>
          </div>
          <div class="color a" @click.stop="useralbum(item.artist.id)">
            {{ item.artist.name }}
            <i v-if="item.artist.alias[0]" class="is"
              >({{ item.artist.alias[0] }})</i
            >
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import router from '@/router'
export default defineComponent({
  setup() {
    const store = useStore()
    const albummessage = computed(() => store.state.searchdetail.searchAlbum)
    // 点击跳转到用户所有专辑页面
    const useralbum = (id: number) => {
      router.push({
        path: '/main/com/userAlbum/' + id
      })
    }
    // 点击跳转到专辑详情页
    const albumMessage = (id: number) => {
      router.push({
        path: '/main/com/userAlbumItem/' + id
      })
    }
    return {
      albumMessage,
      useralbum,
      albummessage
    }
  }
})
</script>

<style scoped lang="less">
.album {
  padding-bottom: 150/1920 * 100vw;
  .album-top {
    text-align: right;
    margin-right: 35/1920 * 100vw;
    font-size: 14/1920 * 100vw;
    color: #888;
    font-weight: 300;
  }
  .imgs-A {
    position: relative;
    padding: 10/1920 * 100vw;

    .img-B {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .img-c {
      display: flex;
      align-items: center;
    }
    .img {
      width: 80/1920 * 100vw;
      height: 80/1920 * 100vw;
      border-radius: 10/1920 * 100vw;
    }
    .s {
      position: absolute;
      left: 25/1920 * 100vw;
    }
    .ss {
      background-color: #eee;
    }
  }
  .color {
    margin-left: 30/1920 * 100vw;
    font-size: 18/1920 * 100vw;
    .is {
      color: #999;
    }
  }
  .a {
    font-size: 14/1920 * 100vw;
    width: 600/1920 * 100vw;
    color: #444;
  }
  .a:hover {
    color: #000;
  }
  .imgs-A:hover {
    background-color: rgb(238, 238, 238);
    cursor: pointer;
  }
  .imgs-A:nth-child(2n) {
    background-color: rgb(247, 247, 247);
  }
  .imgs-A:nth-child(2n):hover {
    background-color: rgb(241, 241, 241);
  }
}
</style>
