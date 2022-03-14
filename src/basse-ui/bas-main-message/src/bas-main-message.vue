<template>
  <div class="bsa-main-message">
    <div class="bsa-music-text">
      <i class="i"
        >{{ musicMessages.text }}
        <i
          v-if="musicMessages.mv !== 0"
          class="MV"
          @click="MVbtn(musicMessages.mv)"
          >MV<i class="MV-c">▶</i>
        </i>
      </i>

      <div class="div">
        <div v-if="musicMessages.tns">{{ musicMessages.tns[0] }}</div>
        <div v-if="musicMessages.alia">{{ musicMessages.alia[0] }}</div>
        <i class="bas-i-length">
          <template v-for="(item, index) in musicMessages.ar" :key="item.id">
            <i @click="useritem(item.id, index)">{{ item.name }}</i
            >/
          </template>
        </i>
        <i
          class="bas-i-lengths"
          v-if="musicMessages.al.name"
          @click="useritemAlbum(musicMessages.al.id)"
          >- {{ musicMessages.al.name }}</i
        >
      </div>
    </div>
    <div class="bas-top">
      <div class="bas-left">
        <el-image
          class="img"
          :src="musicMessages.al.picUrl"
          :preview-src-list="[musicMessages.al.picUrl]"
        >
        </el-image>
      </div>
      <!-- 歌词封装 -->
      <lyrics-scroll v-if="Lyreic" :lyricsz="Lyreic" />
      <div class="bas-right">
        <el-image
          class="img"
          :src="musicMessages.al.picUrl"
          :preview-src-list="[musicMessages.al.picUrl]"
        >
        </el-image>
      </div>
    </div>
    <slot></slot>
    <div class="bas-footer" v-if="Brilliant && newest">
      <div class="bas-footer-top">
        <remark
          v-if="Brilliant.length != 0"
          :comments="Brilliant"
          commentsname="精彩评论"
          @player="playerPlay"
          @remarkbtns="remarkbtnss"
          @remarkdelete="remarkdelete"
          :commentThreadId="threadId"
          @commentRemark="commentRemark"
        />
      </div>
      <div class="bas-footer-fot">
        <remark
          v-if="newest.length != 0"
          :comments="newest"
          commentsname="最新评论"
          @player="playerPlay"
          @remarkbtns="remarkbtnss"
          @remarkdelete="remarkdelete"
          :commentThreadId="threadId"
          @commentRemark="commentRemark"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, onMounted } from 'vue'
import { useStore } from '@/store'
import LyricsScroll from './LyricsScroll.vue'
import router from '@/router'
import Localcache from '@/utlis/caches'
import remark from '@/basse-ui/bas-comment/src/remark.vue'
export default defineComponent({
  components: {
    LyricsScroll,
    remark
  },
  props: {
    musicMessages: {
      type: Object,
      required: true
    }
  },
  emits: ['TriggerShow'],
  setup(props, { emit }) {
    const store = useStore()
    //  获取vuex评论数据
    const Brilliant = computed(() => store.state.complexData.userRemark)
    const newest = computed(() => store.state.complexData.newestRemark)
    console.log(Brilliant.value, 'vuex评论数据s')
    console.log(newest.value, 'vuex评论数据2')
    console.log(props.musicMessages, '歌词')
    // 获取歌词
    const Lyreic = computed(() => store.state.pageMusic.Lyreic)
    const heightss = ref(400 + 'px')
    if (document.documentElement.clientWidth < 700) {
      heightss.value = document.documentElement.clientHeight / 5 + 'px'
    }
    // 获取当前屏幕宽度
    const heights = ref(`${document.documentElement.clientHeight / 1.4}px`)

    // 获取当前播放的进度
    const getTime = computed(() => store.state.pageMusic.musicCurrent)
    //
    const useritem = (album: number, index: number) => {
      // 热门50首播放没有用户id 存入本地
      console.log(album, index, '跳转到用户专辑页面')
      // store.dispatch('complexData/useralbumsMusickong')
      // store.dispatch('complexData/Album', {
      //   albumId: album,
      //   limit: 10,
      //   offset: 0
      // })
      store.dispatch('complexData/gethotspots', album)
      router.push({
        path: '/main/com/userAlbum/' + album
      })
      emit('TriggerShow')
    }

    // 跳转到用户创建的专辑
    const useritemAlbum = (id: number) => {
      console.log(id, 'id')
      router.push({
        path: '/main/com/userAlbumItem/' + id
      })
      emit('TriggerShow')
    }
    // 跳转到MV页面
    const MVbtn = (mvId: number) => {
      console.log('a')
      router.push({
        path: '/main/com/artist/MV/' + mvId
      })
      emit('TriggerShow')
    }
    const commentRemarkRemark = () => {
      console.log('a')
    }

    return {
      commentRemarkRemark,
      Brilliant,
      newest,
      Lyreic,
      MVbtn,
      getTime,
      heights,
      heightss,
      useritem,
      useritemAlbum
    }
  }
})
</script>

<style scoped lang="less">
.el-container .is-vertical .conraoner {
  background-color: red !important;
  z-index: 99999;
}
.bsa-main-message {
  padding-bottom: 100/1920 * 100vw;
  .bas-top {
    display: flex;
    justify-content: space-around;
    .img {
      width: 400/1920 * 100vw;
      height: 400/1920 * 100vw;
      border-radius: 50%;
    }
  }
  .bas-footer {
    width: 1000/1920 * 100vw;
    margin: 0 auto;
    margin-top: 102/1920 * 100vw;
  }
}
.text {
  color: red;
  font-size: 25/1920 * 100vw;
  font-weight: 600;
}
.bas-center {
  padding: 150px 0;
  // 800 1426
  // 400 1026
  width: 30%;
  overflow: scroll;
  height: 0px;
}
.text-center {
  text-align: center;
  font-size: 20/1920 * 100vw;
  padding: 10/1920 * 100vw;
  transition: all 0.5s;
}

.bsa-music-text {
  margin: 0 auto;
  .i {
    font-family: '幼圆';
    font-size: 35/1920 * 100vw;
    color: #222;
    display: block;
    text-align: center;
    .MV {
      overflow: hidden;
      display: inline-block;
      width: 40/1920 * 100vw;
      height: 15/1920 * 100vw;
      border: 1px solid red;
      font-size: 8/1920 * 100vw;
      color: red;
      margin-bottom: 15/1920 * 100vw;
      line-height: 15/1920 * 100vw;
      border-radius: 3/1920 * 100vw;
      cursor: pointer;
      .MV-c {
        font-size: 2/1920 * 100vw;
      }
    }
  }

  .div {
    text-align: center;
    margin: 10/1920 * 100vw 0 20/1920 * 100vw;
    font-family: '幼圆';
    font-size: 18/1920 * 100vw;
    color: #666;
    .div-center {
      margin: 0 auto;
      text-align: center;
    }
    .bas-i-length {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: right;
    }
    .bas-i-lengths {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
    }
    .bas-i-length:hover {
      cursor: pointer;
      color: rgb(29, 77, 180);
    }
    .bas-i-lengths:hover {
      cursor: pointer;
      color: rgb(29, 77, 180);
    }
  }
}
</style>
<style>
.el-drawer__body {
  padding: 0 !important;
}
</style>
