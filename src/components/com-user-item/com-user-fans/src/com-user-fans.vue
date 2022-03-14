<template>
  <div class="com-user-fansConcern">
    <el-scrollbar height="500px">
      <h2 class="name-top">
        {{ nickname }}
        <i v-if="showye">的关注</i>
        <i v-else>的粉丝</i>
      </h2>
      <el-row :gutter="0">
        <template v-for="item in concernFans" :key="item.id">
          <el-col :span="8">
            <div class="user-div">
              <div class="img-div" @click="imgUrlbtn(item.userId)">
                <img :src="item.avatarUrl" alt="" class="img-plus" />
                <img
                  v-if="item.avatarDetail"
                  :src="item.avatarDetail.identityIconUrl"
                  alt=""
                  class="img-btm"
                />
              </div>
              <div class="user-text">
                <div>
                  {{ item.nickname }}
                  <i v-if="item.vipRights" class="vIP"
                    >VIP {{ item.vipRights.redVipLevel }}</i
                  >
                </div>
                <div class="concern">
                  <i class="signature">{{ item.signature }}</i
                  ><i class="concern-a" @click="Concernbtn">+关注</i>
                </div>
                <div class="concern-bm">
                  <i>歌单：{{ item.playlistCount }}</i
                  ><i class="gd-1">|</i><i>粉丝：{{ item.followeds }}</i>
                </div>
              </div>
            </div>
          </el-col>
        </template>
      </el-row>
      <div class="show-text">
        <i v-if="showye"> <i v-if="follows == 0">还没有关注~</i></i>
        <i v-else> <i v-if="followeds == 0">还没没有粉丝~</i></i>
      </div>

      <div>
        <div v-if="showye" class="footer-a">
          <el-pagination
            v-if="follows > 30"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.conentpage"
            :page-size="pageInfo.pagesize"
            layout="prev, pager, next"
            :total="follows"
          >
          </el-pagination>
        </div>
        <div v-else class="footer-b">
          <el-pagination
            v-if="followeds > 30"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.conentpage"
            :page-size="pageInfo.pagesize"
            layout="prev, pager, next"
            :total="followeds"
          >
          </el-pagination>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import router from '@/router'
export default defineComponent({
  setup() {
    const route = useRoute()
    const store = useStore()
    const urlId = route.path.split('/')[4]
    const a = urlId.indexOf('a')
    console.log(a, 'aaa')

    // if (a > 0) {
    //   let b = urlId.substr(0, urlId.length - 1)
    //   const id = parseInt(b)
    //   store.dispatch('login/getuserConcern', { id, pageindex: 0 })
    // } else {
    //   const id = parseInt(urlId)
    //   store.dispatch('login/getuserFans', { id, pageindex: 0 })
    // }

    //获取点击了关注/粉丝的数据
    const concernFans = computed(() => store.state.login.userFansConcern)
    // console.log(concernFans.value[3], '是')
    const imgUrlbtn = (id: number) => {
      store.dispatch('pageMusic/getUserPlaylists', id)
      router.push({
        path: '/main/user/playlist/' + id
      })
    }
    // 获取用户名
    const nickname = computed(
      () => store.state.pageMusic.userInfo.profile.nickname
    )
    // 获取用户关注数量
    const follows = computed(
      () => store.state.pageMusic.userInfo.profile.follows
    )
    // 获取用户粉丝数量
    const followeds = computed(
      () => store.state.pageMusic.userInfo.profile.followeds
    )
    // 分页处理
    const pageInfo = ref({ conentpage: 1, pagesize: 30 })

    const handleCurrentChange = (conentpage: number) => {
      console.log(conentpage, 'conentpage')
      pageInfo.value = { ...pageInfo.value, conentpage }
    }
    const handleSizeChange = (pagesize: number) => {
      console.log(pagesize, 'pagesize')
      pageInfo.value = { ...pageInfo.value, pagesize }
    }
    // 监听 pageInfo 的变化 调用方法
    watch(pageInfo, () => getPageData())
    // 控制显示分页
    const showye = ref(false)
    const getPageData = () => {
      // 对url的id做出判断点击了关注还是点击了粉丝 再发送网络请求
      if (a > 0) {
        let b = urlId.substr(0, urlId.length - 1)
        const id = parseInt(b)
        showye.value = true
        store.dispatch('login/getuserConcern', {
          id,
          pageindex: (pageInfo.value.conentpage - 1) * pageInfo.value.pagesize
        })
      } else {
        showye.value = false
        const id = parseInt(urlId)
        store.dispatch('login/getuserFans', {
          id,
          pageindex: (pageInfo.value.conentpage - 1) * pageInfo.value.pagesize
        })
      }
    }
    getPageData()
    return {
      handleCurrentChange,
      handleSizeChange,
      imgUrlbtn,
      concernFans,
      followeds,
      pageInfo,
      follows,
      showye,
      nickname
    }
  }
})
</script>

<style scoped lang="less">
.com-user-fansConcern {
  margin-bottom: 100/1920 * 100vw;
  .name-top {
    font-size: 26/1920 * 100vw;
    color: #444;
    margin-top: 0;
    margin-left: 20/1920 * 100vw;
  }
  .user-div {
    display: flex;

    font-size: 20/1920 * 100vw;
    color: #444;
    padding: 20/1920 * 100vw 0;

    .user-text {
      margin-top: 10/1920 * 100vw;
      cursor: default;
      .vIP {
        color: red;
        font-size: 14/1920 * 100vw;
      }
      .concern {
        display: flex;
        justify-content: space-between;
        padding: 5/1920 * 100vw 0;
        width: 330/1920 * 100vw;
        font-size: 10/1920 * 100vw;
        .concern-a {
          cursor: pointer;
          font-size: 14/1920 * 100vw;
          border: 1/1920 * 100vw solid #999;
          border-radius: 15/1920 * 100vw;
          padding: 3/1920 * 100vw 20/1920 * 100vw;
        }
      }
      .concern-bm {
        width: 220/1920 * 100vw;
        display: flex;
        justify-content: space-between;
        font-size: 10/1920 * 100vw;
      }
      .signature {
        width: 200/1920 * 100vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .gd-1 {
        color: #ccc;
      }
    }
  }

  .img-div {
    position: relative;
    cursor: pointer;
    img {
      border-radius: 50%;
      width: 120/1920 * 100vw;
      height: 120/1920 * 100vw;
      margin-right: 15/1920 * 100vw;
    }
    .img-plus {
      box-shadow: 2/1920 * 100vw 0 10/1920 * 100vw 1/1920 * 100vw
        rgba(100, 100, 100, 0.2);
    }
    .img-btm {
      position: absolute;
      bottom: 5/1920 * 100vw;
      right: 4/1920 * 100vw;
      width: 30/1920 * 100vw;
      height: 30/1920 * 100vw;
      border: 50%;
    }
  }
  .footer-a {
    .el-pagination {
      text-align: center;
    }
  }
  .footer-b {
    .el-pagination {
      text-align: center;
    }
  }
  .show-text {
    margin-top: 100/1920 * 100vw;
    text-align: center;
    font-size: 10/1920 * 100vw;
    color: #666;
  }
}
</style>
<style>
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: red;
  color: #fff;
}
.el-pagination {
  --el-pagination-hover-color: '';
}
</style>
