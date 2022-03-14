<template>
  <div>
    <div class="user-item" v-if="item.type != 22">
      <div class="img-div" @click="usermessagebtn(item.user.userId)">
        <img class="img" :src="item.user.avatarUrl + '?param=90y100'" alt="" />
        <img
          class="img-btm"
          v-if="item.user.avatarDetail"
          :src="item.user.avatarDetail.identityIconUrl + '?param=50y50'"
          alt=""
        />
      </div>

      <div class="div">
        <div class="div-name">
          <i class="name" @click="usermessagebtn(item.user.userId)">
            {{ item.user.nickname }}</i
          >
          &nbsp;
          <i class="name-text" v-if="item.type == 18">分享单曲</i>
          <i class="name-text" v-if="item.type == 35">发布动态</i>
          <i class="name-text" v-if="item.type == 17">分享声音</i>
          <i class="name-text" v-if="item.type == 13">分享歌单</i>
          <i class="name-text" v-if="item.type == 28">分享播客</i>
        </div>
        <div class="time">{{ $filters.formatTime(item.eventTime) }}</div>
        <pre class="div-text" v-if="item.jsons.msg">{{ item.jsons.msg }}</pre>

        <!-- bgc背景 -->
        <div class="div-bgc" v-if="item.jsons.song" @click="songbtn(item)">
          <img
            class="imgs"
            v-if="item.jsons.song.img80x80"
            :src="item.jsons.song.img80x80"
            alt=""
          />
          <img
            class="imgs"
            v-if="item.jsons.song.album.img80x80"
            :src="item.jsons.song.album.img80x80"
            alt=""
          />
          <img
            class="imgs"
            v-if="item.jsons.song.extProperties"
            :src="item.jsons.song.extProperties.img80x80"
            alt=""
          />
          <div class="music-right">
            <div class="music-text">{{ item.jsons.song.name }}</div>
            <div class="music-name">
              {{ item.jsons.song.artists[0].name }}
            </div>
          </div>
        </div>
        <!-- 声音背景 -->
        <div
          class="div-bgc"
          v-if="item.jsons.program"
          @click="programbtn(item)"
        >
          <img class="imgs" :src="item.jsons.program.coverUrl" alt="" />
          <div class="music-right">
            <div class="music-text">{{ item.jsons.program.name }}</div>
            <div class="music-name">
              <i class="category">{{ item.jsons.program.radio.category }}</i>
              {{ item.jsons.program.radio.name }}
            </div>
          </div>
        </div>
        <div v-if="item.pics">
          <!-- 照片大于三张的时候 -->
          <div class="imgs-div" :class="item.pics.length > 2 ? 'divwidth' : ''">
            <template v-for="items in item.pics" :key="items">
              <el-image
                v-if="item.pics.length > 2"
                class="imgpics"
                :class="item.pics.length > 2 ? 'imgpicsss' : ''"
                :src="items.originUrl + '?param=288y290'"
                :preview-src-list="[items.originUrl]"
              >
              </el-image>
              <el-image
                v-else
                class="imgpics"
                :class="
                  item.pics.length < 2 &&
                  items.width < 1100 &&
                  items.height < 1000
                    ? 'imgpicwan'
                    : ''
                "
                :src="items.originUrl"
                :preview-src-list="[items.originUrl]"
              >
              </el-image>
            </template>
          </div>
          <!-- <img :src="" alt=""> -->
        </div>
        <div class="carets-div">
          <div class="carets-divs">
            <caret-top class="caret" />| <share class="caret" />|
            <chat-line-square class="caret" />
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="item.type == 35">35 发布动态 <dynamic :item="item" /></div> -->
    <!-- <div v-if="item.type == 17">17声音</div>
    <div v-if="item.type == 13">13分享歌单</div>
    <div v-if="item.type == 28">28分享播客</div> -->
    <div v-if="item.type == 22">
      <forward :item="item" />
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent } from 'vue'
import Forward from './forward.vue'
import { useStore } from '@/store'
export default defineComponent({
  components: {
    Forward
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup() {
    const store = useStore()
    // 点击用户头像
    const usermessagebtn = (userId: number) => {
      router.push({
        path: '/main/user/playlist/' + userId
      })
    }
    // 点击播放bgc音乐
    const songbtn = (item: any) => {
      console.log(item, '点击的music')
      store.dispatch('pageMusic/musicMessageurl', item.jsons.song.id)
    }
    return {
      songbtn,
      usermessagebtn
    }
  }
})
</script>

<style scoped lang="less">
.category {
  padding: 1/1920 * 100vw;
  font-size: 10/1920 * 100vw;
  border: 1/1920 * 100vw solid red;
  color: red;
}
.imgpicwan {
  width: 343/1920 * 100vw !important;
  height: 320/1920 * 100vw !important;
}
.divwidth {
  width: 500/1920 * 100vw !important;
}
.imgpicsss {
  width: 155/1920 * 100vw !important;
  height: 155/1920 * 100vw !important;
}
.user-item {
  display: flex;
  padding-top: 20/1920 * 100vw;
  padding-bottom: 55/1920 * 100vw;
  border-bottom: 0.5px solid rgb(233, 232, 232);

  .imgpics {
    width: 310/1920 * 100vw;
    height: 390/1920 * 100vw;
    box-shadow: 0 0 5/1920 * 100vw 1/1920 * 100vw rgba(100, 100, 100, 0.5);
    border-radius: 10/1920 * 100vw;
    margin: 1/1920 * 100vw 4/1920 * 100vw;
  }

  .img-div {
    position: relative;
    height: 50/1920 * 100vw;
    .img-btm {
      position: absolute;
      bottom: -2/1920 * 100vw;
      right: 8/1920 * 100vw;
      width: 18/1920 * 100vw;
      height: 18/1920 * 100vw;
      border: 50%;
    }
  }
  .img {
    margin-left: 5/1920 * 100vw;
    width: 51/1920 * 100vw;
    height: 51/1920 * 100vw;
    border-radius: 50%;
    box-shadow: 0 0 1/1920 * 100vw 1/1920 * 100vw rgba(100, 100, 100, 0.5);
    margin-right: 15/1920 * 100vw;
  }
  .div-name {
    color: rgb(6, 126, 173);
    font-size: 16/1920 * 100vw;
    .name:hover {
      color: rgb(10, 96, 131);
      cursor: pointer;
    }
    .name-text {
      color: #666;
    }
  }

  .time {
    margin: 12/1920 * 100vw 0;
    color: #999;
    font-size: 14/1920 * 100vw;
    font-weight: 300;
  }
  .time:hover {
    color: #000;
  }
  .div-text {
    margin: 10/1920 * 100vw 0;
    font-weight: 350;
    color: #333;
    font-size: 15/1920 * 100vw;
    white-space: pre-wrap;
    line-height: 1rem;
  }

  .div-bgc {
    background-color: rgb(243, 243, 243);
    border-radius: 10/1920 * 100vw;
    display: flex;
    width: 1500/1920 * 100vw !important;
    padding: 12/1920 * 100vw 10/1920 * 100vw;
    margin-bottom: 15/1920 * 100vw;
    .imgs {
      width: 55/1920 * 100vw;
      height: 55/1920 * 100vw;
      border-radius: 10/1920 * 100vw;
      box-shadow: 0 0 5/1920 * 100vw 1/1920 * 100vw rgba(100, 100, 100, 0.5);
      margin-right: 15/1920 * 100vw;
    }
    .music-right {
      .music-text {
        margin-top: 2/1920 * 100vw;
        font-weight: 400;
        font-size: 15/1920 * 100vw;
      }
      .music-name {
        padding-top: 8/1920 * 100vw;
        font-size: 14/1920 * 100vw;
        color: #999;
      }
    }
  }
  .div-bgc:hover {
    cursor: pointer;
    background-color: #eee;
  }
  .carets-div {
    width: 1500/1920 * 100vw;
    display: flex;
    justify-content: right;
  }
  .carets-divs {
    margin-right: 20/1920 * 100vw;
    display: flex;
    align-items: center;
  }
  .caret {
    margin: 16/1920 * 100vw 0;
    width: 22/1920 * 100vw;
  }
}
</style>
