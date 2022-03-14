<template>
  <!-- 专辑 -->
  <div class="song">
    <div class="song-top">找到 {{ songmessage.playlistCount ?? 0 }} 个歌单</div>
    <template v-for="item in songmessage.playlists" :key="item.id">
      <div class="imgs-A" @click="songMessagebtn(item.id)">
        <div class="img-B">
          <div class="img-c">
            <div class="img ss">
              <img class="img" :src="item.coverImgUrl + '?param=300y300'" />
            </div>
            <div class="color">
              {{ item.name }}
            </div>
          </div>
          <div class="song-right">
            <div class="trackCount">{{ item.trackCount }}首</div>
            <div></div>
            <div class="nickname" @click.stop="usermessagebtn(item.userId)">
              <i class="trackCount">by</i> {{ item.creator.nickname }}
            </div>
            <div class="a">
              <video-play class="video" />
              {{ $filters.formatnumber(item.playCount) }}
            </div>
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
    const songmessage = computed(() => store.state.searchdetail.searchSong)
    // 点击跳转到歌单页面
    const songMessagebtn = (id: number) => {
      router.push({
        path: '/main/musiclistdetail/' + id
      })
    }
    // 点击跳转到用户详情页
    const usermessagebtn = (id: number) => {
      router.push({
        path: '/main/user/playlist/' + id
      })
    }
    return {
      usermessagebtn,
      songMessagebtn,
      songmessage
    }
  }
})
</script>

<style scoped lang="less">
.song {
  padding-bottom: 150/1920 * 100vw;
  .song-top {
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

    .ss {
      background-color: #eee;
    }
  }
  .color {
    margin-left: 30/1920 * 100vw;
    font-size: 18/1920 * 100vw;
  }
  .song-right {
    display: flex;
    justify-content: right;
    width: 850/1920 * 100vw;
  }
  .trackCount {
    font-size: 14/1920 * 100vw;
    text-align: left;
    color: #999;
    width: 150/1920 * 100vw;
    font-weight: 300;
  }
  .nickname {
    font-size: 14/1920 * 100vw;
    width: 450/1920 * 100vw;
    text-align: left;
    color: #444;
  }
  .nickname:hover {
    color: #000;
  }
  .a {
    display: flex;
    align-items: center;
    font-size: 14/1920 * 100vw;
    width: 200/1920 * 100vw;
    text-align: left;
    color: #444;
    font-weight: 300;
    .video {
      width: 20/1920 * 100vw;
      margin-right: 2/1920 * 100vw;
    }
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
