<template>
  <div>
    <div class="user-item" v-if="item.type == 22">
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
          <i class="name-text">转发</i>
        </div>
        <div class="time">{{ $filters.formatTime(item.eventTime) }}</div>
        <div class="div-text">{{ item.jsons.msg }}</div>
        <div class="div-div">
          <div>
            <div class="aaas">
              <i class="is" @click="userbtn(item.jsons.event.user.userId)"
                >@{{ item.jsons.event.user.nickname }}</i
              >
              分享单曲：
              <pre
                :class="Json.msg.length > 300 ? 's' : 'pre'"
                :style="showtext ? '' : 'height:auto;color:#666;'"
              >
                {{ Json.msg }}
              </pre>
              <div
                :class="showtext && Json.msg.length > 300 ? 'div-zhe' : 'zhe'"
                @click="textbtn"
              >
                展开全文
              </div>
            </div>
          </div>
          <div class="div-bgc" v-if="Json.song" @click="musicbgcbtn(Json)">
            <img
              class="imgs"
              v-if="Json.song.img80x80"
              :src="Json.song.img80x80"
              alt=""
            />
            <img
              class="imgs"
              v-if="Json.song.album.img80x80"
              :src="Json.song.album.img80x80"
              alt=""
            />
            <img
              class="imgs"
              v-if="Json.song.extProperties"
              :src="Json.song.extProperties.img80x80"
              alt=""
            />
            <div class="music-right">
              <div class="music-text">{{ Json.song.name }}</div>
              <div class="music-name">
                {{ Json.song.artists[0].name }}
              </div>
            </div>
          </div>

          <!-- 照片大于三张的时候 -->
          <div>
            <div
              class="imgs-div"
              :class="item.jsons.event.pics.length > 2 ? 'divwidth' : ''"
            >
              <template v-for="items in item.jsons.event.pics" :key="items">
                <el-image
                  v-if="item.jsons.event.pics.length > 2"
                  class="imgpics"
                  :class="item.jsons.event.pics.length > 2 ? 'imgpicsss' : ''"
                  :src="items.originUrl + '?param=288y290'"
                  :preview-src-list="[items.originUrl]"
                >
                </el-image>
                <el-image
                  v-else
                  class="imgpics"
                  :class="
                    item.jsons.event.pics.length < 2 &&
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
          </div>
        </div>
        <div class="carets-div">
          <div class="carets-divs">
            <caret-top class="caret" />| <share class="caret" />|
            <chat-line-square class="caret" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const Json = computed(() => {
      let a = ''
      if (props.item.type == 22) {
        a = JSON.parse(props.item.jsons.event.json)
        console.log(JSON.parse(props.item.jsons.event.json), 'aaa')
      }

      return a
    })
    // 点击跳转到用户详情页
    const userbtn = (userId: number) => {
      router.push({
        path: '/main/user/playlist/' + userId
      })
    }
    // 点击用户头像
    const usermessagebtn = (userId: number) => {
      router.push({
        path: '/main/user/playlist/' + userId
      })
    }
    //点击bgc音乐
    const musicbgcbtn = (item: any) => {
      console.log(item, '转发的')
      store.dispatch('pageMusic/musicMessageurl', item.song.id)
    }
    // 展开全文
    const showtext = ref(true)
    const textbtn = () => {
      showtext.value = false
    }
    return {
      textbtn,
      showtext,
      musicbgcbtn,
      usermessagebtn,
      userbtn,
      Json
    }
  }
})
</script>

<style scoped lang="less">
.div-div:hover {
  cursor: pointer;
  background-color: rgb(245, 245, 245);
  .div-zhe {
    background-color: rgb(252, 252, 252);
    border-radius: 10/1920 * 100vw;
  }
}
.div-div {
  border-radius: 10/1920 * 100vw;
  padding: 15/1920 * 100vw;
  background-color: rgb(248, 248, 248);
  font-size: 10/1920 * 100vw;
  .aaas {
    position: relative;
  }
  .s {
    height: 200/1920 * 100vw;
    overflow: hidden;
    font-size: 20/1920 * 100vw;
    white-space: pre-wrap;
    line-height: 1.4rem;
    color: rgb(182, 181, 181);
  }
  .pre {
    font-size: 20/1920 * 100vw;
    white-space: pre-wrap;
    line-height: 1.4rem;
    color: #666;
  }
  .div-zhe {
    position: absolute;
    bottom: -0;
    margin-bottom: -15/1920 * 100vw;
    text-align: center;
    color: rgb(9, 115, 177);
    font-size: 18/1920 * 100vw;
    width: 100%;
    background-color: rgb(250, 250, 250);
    box-shadow: 0/1920 * 100vw -60/1920 * 100vw 70/1920 * 100vw 70/1920 * 100vw rgba(255, 255, 255, 0.8);
  }
  .zhe {
    display: none;
  }
  .is {
    color: rgb(67, 155, 206);
  }
  .is:hover {
    color: rgb(7, 133, 206);
    cursor: pointer;
  }
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
    font-size: 20/1920 * 100vw;
  }

  .div-bgc {
    margin-top: 50/1920 * 100vw;
    background-color: rgb(255, 255, 255);
    border-radius: 10/1920 * 100vw;
    display: flex;
    width: 1450/1920 * 100vw;
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
