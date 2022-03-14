<template>
  <div v-if="mvurl && mvdetail" class="com-artist-mv">
    <div class="com-artist-text">
      <div class="mv-left">
        <div class="MV-color">MV详情</div>
        <video
          v-if="showvideo"
          :src="mvurl.url"
          loop
          controls
          autoplay
          class="video"
        ></video>
        <!-- mv name -->
        <div class="artist-name" v-if="mvdetail.artists">
          <template v-for="item in mvdetail.artists" :key="item.id">
            <img
              class="img"
              :src="item.img1v1Url + '?param=50y50'"
              alt=""
              @click="artistMvbtn(mvdetail.artistId)"
            />
            <div class="name" @click="artistMvbtn(mvdetail.artistId)">
              {{ item.name }}
            </div>
          </template>
        </div>
        <!-- 视频 name-->
        <div class="artist-name" v-if="mvdetail.creator">
          <img
            class="img"
            :src="mvdetail.creator.avatarUrl + '?param=50y50'"
            alt=""
            @click="userName(mvdetail.creator.userId)"
          />
          <div class="name" @click="userName(mvdetail.creator.userId)">
            {{ mvdetail.creator.nickname }}
          </div>
        </div>
        <div class="name-text">
          <div class="name-name">
            {{ mvdetail.name || mvdetail.description || mvdetail.title }}
            <i v-if="mvdetail.desc">
              <caret-bottom
                v-if="showcarets"
                class="carets"
                @click="caretsbtn"
              />
              <caret-top v-else class="carets" @click="caretsbtn" />
            </i>
          </div>
          <div class="name-time">
            <i
              >发布：{{
                $filters.formatTime(mvdetail.publishTime, 'YYYY-MM-DD')
              }}</i
            >
            <i
              >播放：{{
                $filters.formatnumber(
                  mvdetail.playCount || mvdetail.durationms
                )
              }}次</i
            >
          </div>
          <!-- 视频标签 -->
          <div v-if="mvdetail.videoGroup" class="videoGroup">
            <template v-for="item in mvdetail.videoGroup" :key="item.id">
              <i class="group" @click="groupbtn(item.id)">{{ item.name }}</i>
            </template>
          </div>
          <transition
            appear
            enter-active-class="animate__animated animate__backInLeft"
            leave-active-class="animate__animated animate__backOutRight"
            mode="out-in"
          >
            <div v-if="!showcarets" class="name-wenben">
              {{ mvdetail.desc }}
            </div>
          </transition>
        </div>
        <div>
          <div>评论({{ mvdetail.commentCount || mvdetail.commentCount }})</div>
          <bas-comment
            :threadId="threadId ?? threadIds"
            :Brilliant="Brilliant"
            :newest="newest"
            @commentRemarkRemark="commentRemarkRemark"
          />
        </div>
      </div>
      <div class="mv-right">
        <div class="s">相关推荐</div>
        <template v-for="item in similarmv" :key="item.vid">
          <div class="img-text-A">
            <div class="img-text" @click="imgbtn(item.vid)">
              <p class="bgc"></p>
              <i class="playCount">
                <caret-right
                  style="width: 2.2em; margin-right: 20/1920 * 100vw"
                />
                {{ $filters.formatnumber(item.playTime) }}</i
              >
              <img class="img" :src="item.coverUrl + '?param=600y350'" alt="" />
              <p class="bgcbotm"></p>
              <div class="time">
                {{ $filters.formatTime(item.durationms, 'mm:ss') }}
              </div>
            </div>
            <div class="user-text">
              <div class="name" @click="imgbtn(item.vid)">{{ item.title }}</div>
              <div
                class="user-name"
                v-if="item.creator[0]"
                @click="userName(item.creator[0].userId)"
              >
                {{ item.creator[0].userName }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import basComment from '@/basse-ui/bas-comment/src/bas-comment.vue'
import router from '@/router'
import store from '@/store'
import { useStore } from '@/store'
export default defineComponent({
  components: { basComment },
  props: {
    mvurl: {
      type: Object,
      required: true
    },
    mvdetail: {
      type: Object,
      required: true
    },
    similarmv: {
      type: Array,
      required: true
    },
    // 页面的urlid
    urlid: {
      type: String,
      required: true
    }
  },
  emits: ['videodetail'],
  setup(props, { emit }) {
    const store = useStore()
    const showvideo = ref(true)
    const showcarets = ref(true)
    // 获取评论数据 动态id等
    const Brilliant = computed(() => store.state.complexData.userRemark)
    const newest = computed(() => store.state.complexData.newestRemark)
    const threadId = computed(
      () => store.state.complexData.mvdetail.commentThreadId
    )

    const threadIds = computed(() => store.state.complexData.mvdetail.threadId)
    //
    // 跳转用户专辑去
    const artistMvbtn = (id: number) => {
      router.push({
        path: '/main/com/userAlbum/' + id
      })
    }
    // 控制显示文字
    const caretsbtn = () => {
      showcarets.value = !showcarets.value
    }
    // 点击user跳转到个人信息页面
    const userName = (userId: number) => {
      router.push({
        path: '/main/user/playlist/' + userId
      })
    }
    //点击相关推荐视频
    const imgbtn = (vid: string) => {
      emit('videodetail', vid)
    }
    // 点击视频标签
    const groupbtn = (id: number) => {
      console.log(id, '视频标签id')
    }
    //组件评论分页器转的事件 二级传送 获取mv评论
    const commentRemarkRemark = (pageInfo: any) => {
      console.log(props.urlid, '传送成功*************')
      if (parseFloat(props.urlid) > 0) {
        console.log(props.urlid, 'MV评论*************')
        store.dispatch('complexData/mvRemark', {
          mvId: props.urlid,
          limit: 60,
          offset: (pageInfo.conentpage - 1) * pageInfo.pagesize
        })
      } else {
        // 获取视频评论
        console.log(props.urlid, '视频评论*************')
        store.dispatch('complexData/videoRemark', {
          vid: props.urlid,
          limit: 60,
          offset: (pageInfo.conentpage - 1) * pageInfo.pagesize
        })
      }
    }
    return {
      commentRemarkRemark,
      threadId,
      threadIds,
      Brilliant,
      newest,
      groupbtn,
      imgbtn,
      userName,
      showcarets,
      caretsbtn,
      artistMvbtn,
      showvideo
    }
  }
})
</script>

<style scoped lang="less">
.videoGroup {
  cursor: pointer;
  .group {
    display: inline-block;
    background-color: #eee;
    margin-top: 18/1920 * 100vw;
    padding: 3/1920 * 100vw 15/1920 * 100vw;
    font-size: 10/1920 * 100vw;
    border-radius: 30/1920 * 100vw;
    font-weight: 400;
    font-family: '幼圆';
    margin-right: 10/1920 * 100vw;
  }
}
.mv-right {
  margin-left: 20/1920 * 100vw;
}
.img-text-A {
  display: flex;
}
.user-text {
  cursor: pointer;
  font-family: '幼圆';
  position: relative;
  .user-name {
    position: absolute;
    bottom: 40/1920 * 100vw;
    color: #666;
    font-size: 10/1920 * 100vw;
    font-weight: 300;
  }
  .user-name:hover {
    color: #222;
  }
}

.img-text {
  height: 110/1920 * 100vw;
  overflow: hidden;
  align-items: center;
  position: relative;
  border-radius: 10/1920 * 100vw;
  margin-bottom: 18/1920 * 100vw;
  margin-right: 15/1920 * 100vw;
  cursor: pointer;

  .bgc {
    position: absolute;
    top: -12/1920 * 100vw;
    width: 150/1920 * 100vw;
    box-shadow: 5/1920 * 100vw 0 14/1920 * 100vw 25/1920 * 100vw
      rgba(100, 100, 100, 0.2);
  }
  .bgcbotm {
    position: absolute;
    bottom: -12/1920 * 100vw;
    width: 150/1920 * 100vw;
    box-shadow: 5/1920 * 100vw 0 14/1920 * 100vw 25/1920 * 100vw
      rgba(100, 100, 100, 0.2);
  }
  .img {
    width: 190/1920 * 100vw;
    height: 110/1920 * 100vw;
    border-radius: 5/1920 * 100vw;
  }
  .playCount {
    position: absolute;
    top: 2/1920 * 100vw;
    right: 6/1920 * 100vw;
    display: flex;
    align-items: center;
    font-size: 10/1920 * 100vw;
    color: #fff;
    font-weight: normal;
  }
  .time {
    position: absolute;
    right: 5/1920 * 100vw;
    bottom: 5/1920 * 100vw;
    color: #fff;
    font-size: 10/1920 * 100vw;
  }
}

.name {
  font-size: 16/1920 * 100vw;
  width: 150/1920 * 100vw;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.com-artist-text {
  display: flex;
  .MV-color {
    cursor: pointer;
    font-weight: 600;
  }
}
.s {
  font-weight: 600;
  margin-bottom: 20/1920 * 100vw;
}
.mv-left {
  width: 820/1920 * 100vw;
}
.com-artist-mv {
  cursor: default;
  .video {
    margin-top: 20/1920 * 100vw;
    width: 800/1920 * 100vw;
    height: 450/1920 * 100vw;
    box-shadow: 1/1920 * 100vw 1/1920 * 100vw 5/1920 * 100vw 1/1920 * 100vw
      rgba(100, 100, 100, 0.5);
  }
  .artist-name {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-top: 15/1920 * 100vw;
    .img {
      width: 60/1920 * 100vw;
      height: 60/1920 * 100vw;
      border-radius: 50%;
      margin-right: 15/1920 * 100vw;
    }
    .name {
      font-size: 16/1920 * 100vw;
      color: #666;
    }
    .name:hover {
      color: #000;
    }
  }
  .name-text {
    margin: 30/1920 * 100vw 0;
    .name-name {
      display: flex;
      align-items: center;
      font-size: 30/1920 * 100vw;
      font-weight: 600;
      margin-bottom: 20/1920 * 100vw;

      .carets {
        margin-left: 10/1920 * 100vw;
        width: 40/1920 * 100vw;
      }
    }

    .name-time {
      color: #ccc;
      font-size: 10/1920 * 100vw;
      i {
        margin-right: 20/1920 * 100vw;
      }
    }
    .name-wenben {
      line-height: 28/1920 * 100vw;
      margin-top: 20 / 1920 * 100vw;
      font-size: 10/1920 * 100vw;
    }
  }
}
</style>
