<template>
  <div class="com-user-playlist" v-if="userInfos">
    <el-scrollbar :height="heights">
      <div class="user-top">
        <el-image
          class="img"
          :src="userInfos.profile.avatarUrl"
          :preview-src-list="[userInfos.profile.avatarUrl]"
        >
        </el-image>

        <div class="user-top-text">
          <div>
            <h2>{{ userInfos.profile.nickname }}</h2>
          </div>
          <div class="text">
            <i class="Lv">Lv{{ userInfos.level }} </i>
            <male
              v-if="
                userInfos.profile.gender == 1 || userInfos.profile.gender == 0
              "
              class="man"
            />
            <female v-else class="nv" />
          </div>

          <div class="user-message">
            <div class="us-message">
              <div class="us-left" @click="left">
                {{ userInfos.profile.eventCount }}
                <div class="div">动态</div>
              </div>
              <div class="us-center" @click="center">
                {{ userInfos.profile.newFollows }}
                <div class="div">关注</div>
              </div>
              <div class="us-right" @click="right">
                {{ userInfos.profile.followeds }}
                <div class="div">粉丝</div>
              </div>
            </div>
          </div>
          <div class="mesage-text">
            <div v-if="userInfos.profile.province">
              所在地区:
              <i class="color-text"
                >{{ $filters.City(userInfos.profile.province) }}
              </i>
              &nbsp;
              <i class="color-text">{{
                $filters.City(userInfos.profile.city)
              }}</i>
            </div>
            <div>社交网络: <i class="color-text">未绑定</i></div>
            <div class="text-over">
              个人介绍:
              <i class="color-text">
                {{
                  userInfos.profile.signature === ''
                    ? '暂无介绍'
                    : userInfos.profile.signature
                }}</i
              >
            </div>
          </div>
        </div>
      </div>

      <div class="user-footer">
        <div v-if="!userlist.length == 0">
          <div>
            歌单 <i class="indexs">({{ userlist.length }})</i>
          </div>
          <com-user-item :personalized="userlist">
            <template #gege>
              <el-col :span="4" v-if="peopleCanSeeMyPlayRecord">
                <div class="recommend" @click="MyPlayRecord(PlayRecord)">
                  <img src="~@/assets/img/bgc.jpg" alt="" class="img" />
                  <p class="p-name">听歌排行榜</p>
                  <p class="trackCount">累计听歌{{ userAddop }}首</p>
                </div>
              </el-col>
            </template>
          </com-user-item>
        </div>
        <div v-if="!Collectinglist.length == 0">
          <div>
            收藏 <i class="indexs">({{ Collectinglist.length }})</i>
          </div>
          <com-user-item :personalized="Collectinglist" />
        </div>
        <div v-if="Collectinglist.length == 0 && userlist.length == 0">
          暂无歌单
        </div>
      </div>
    </el-scrollbar>
  </div>
  <div v-else>
    <div class=""></div>
    加载中...
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import Localcache from '@/utlis/caches'
import comUserItem from '@/components/com-user-item'
import router from '@/router'
export default defineComponent({
  components: { comUserItem },
  setup() {
    const route = useRoute()
    const store = useStore()

    const defaultActive = parseInt(route.path.split('/')[4])
    // 本地数据存入当前的页面id
    Localcache.setCache('userDetailId', defaultActive)
    // 发起网络请求收藏者用户的歌单  请求数据
    if (defaultActive) {
      store.dispatch('pageMusic/getUserPlaylists', defaultActive)
    }
    // 获取收藏者用户的歌单的数据
    const userInfos = computed(() => store.state.pageMusic.userInfo)

    // 歌单
    const userlist = computed(() => store.state.pageMusic.userlist)

    // 收藏
    const Collectinglist = computed(() => store.state.pageMusic.Collectorslist)
    console.log(userlist, '比较的user用户创建')
    console.log(Collectinglist, '比较的user用户收藏')
    const left = () => {
      router.push({
        path: '/main/user/userDynamic/' + userInfos.value.profile.userId
      })
    }
    const center = () => {
      router.push({
        path:
          '/main/user/userfansConcern/' + userInfos.value.profile.userId + 'a'
      })
    }
    const right = () => {
      router.push({
        path: '/main/user/userfansConcern/' + userInfos.value.profile.userId
      })
    }
    // 插槽
    const peopleCanSeeMyPlayRecord = computed(
      () => store.state.pageMusic.userInfo.peopleCanSeeMyPlayRecord
    )
    const PlayRecord = computed(
      () => store.state.pageMusic.userInfo.profile.userId
    )
    const userAddop = computed(() => store.state.pageMusic.userInfo.listenSongs)

    const MyPlayRecord = (id: any) => {
      console.log(id, 'id')

      router.push({
        path: '/main/MyPlayRecord/' + id
      })
    }
    // 获取当前屏幕宽度
    const heights = ref(`${document.documentElement.clientHeight / 1.4}px`)

    return {
      heights,
      MyPlayRecord,
      PlayRecord,
      peopleCanSeeMyPlayRecord,
      userAddop,
      left,
      center,
      right,
      userInfos,
      userlist,
      Collectinglist
    }
  }
})
</script>

<style scoped lang="less">
.recommend {
  overflow: hidden;
  align-items: center;
  cursor: pointer;
  position: relative;
  border-radius: 10/1920 * 100vw;
  margin-bottom: 10/1920 * 100vw;
  font-size: 10/1920 * 100vw;
  .bgc {
    position: absolute;
    box-shadow: 0px 0 14/1920 * 100vw 28/1920 * 100vw rgba(100, 100, 100, 0.2);
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
    margin-top: 0;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 5px;
    font-weight: 300;
    color: rgb(196, 189, 189);
  }
}
.com-user-playlist {
  margin: 30/1920 * 100vw 30/1920 * 100vw;
  h2 {
    margin: 0 0 10/1920 * 100vw 0;
  }
  .user-top {
    display: flex;

    .img {
      cursor: pointer;

      width: 230/1920 * 100vw;
      height: 230/1920 * 100vw;
      border-radius: 50%;
      box-shadow: 1/1920 * 100vw 1/1920 * 100vw 10/1920 * 100vw 1/1920 * 100vw
        rgba(100, 100, 100, 0.2);
    }

    .user-top-text {
      width: 83%;
      margin-left: 30/1920 * 100vw;

      .text {
        padding-bottom: 13/1920 * 100vw;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
        .Lv {
          font-size: 10/1920 * 100vw;
          padding: 0/1920 * 100vw 10/1920 * 100vw;
          border-radius: 50/1920 * 100vw;
          background-color: #eee;
        }
        .man {
          width: 1em;

          margin-left: 10/1920 * 100vw;
          font-size: 16/1920 * 100vw;
          background-color: rgb(193, 224, 253);
          color: rgb(119, 119, 247);
          border-radius: 50%;
          padding: 2/1920 * 100vw 2/1920 * 100vw;
        }
        .nv {
          width: 1em;
          font-size: 20px;
          margin-left: 10/1920 * 100vw;
          font-size: 16/1920 * 100vw;
          background-color: rgb(253, 193, 240);
          color: rgb(231, 65, 176);
          border-radius: 50%;
          padding: 2/1920 * 100vw 2/1920 * 100vw;
        }
      }
      .user-message {
        .us-message {
          font-weight: 540;
          color: #444;
          font-size: 25/1920 * 100vw;
          display: flex;
          text-align: center;
          margin: 10/1920 * 100vw 0 10/1920 * 100vw 0;
          cursor: pointer;
          .div {
            font-weight: 300;
            font-size: 10/1920 * 100vw;
          }
          .us-left {
            padding: 0 30/1920 * 100vw 0 0;
          }
          .us-center {
            padding: 0 30/1920 * 100vw;
            border-right: 1px solid #ccc;
            border-left: 1px solid #ccc;
          }
          .us-right {
            padding-left: 30/1920 * 100vw;
          }
        }
      }
      .mesage-text {
        font-weight: 300;
        font-size: 10/1920 * 100vw;
      }
      .color-text {
        color: #666;
      }
      .text-over {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .user-footer {
    margin: 50/1920 * 100vw 0;
    .indexs {
      font-size: 18/1920 * 100vw;
    }
  }
  .el-image {
    margin: 3/1920 * 100vw 3/1920 * 100vw !important;
  }
}
</style>
