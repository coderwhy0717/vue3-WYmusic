<template>
  <div class="remark">
    <div class="text-a" id="aa">
      {{ commentsname }}
      <i v-if="commentsname == '最新评论'">({{ remarknumbers }})</i>
    </div>

    <template v-for="item in comments" :key="item">
      <div class="bas-col" @contextmenu.prevent="contextmenu(item)">
        <div class="img-div">
          <img :src="item.user.avatarUrl" alt="" @click="userbtn(item)" />
          <img
            class="img-btm"
            v-if="item.user.avatarDetail"
            :src="item.user.avatarDetail.identityIconUrl"
            alt=""
            @click="userbtn(item)"
          />
        </div>
        <div class="bas-right">
          <div class="bas-nameA">
            <i class="bas-name" @click="userbtn(item)"
              >{{ item.user.nickname }}：</i
            ><i>{{ item.content }}</i>
          </div>
          <template v-for="items in item.beReplied" :key="items">
            <div class="bas-nameminibgc" v-if="items">
              <i class="bas-namemini" @click="userbtn(items)"
                >@{{ items.user.nickname }}：</i
              ><i>{{ items.content }}</i>
            </div>
          </template>
          <div class="bas-Tiem">
            <div>{{ $filters.formatTime(item.time) }}</div>
            <div class="bas-Tiem-right">
              <i class="report"> <i>举报 </i> <i class="gex"></i></i>
              <i @click="commentlike(item)" class="btnclick">
                <caret-top
                  style="width: 3em; height: 3em; margin-right: 0px"
                  :class="item.liked ? 'likered' : 'nolikered'"
                />
                <i style="margin-right: 4px" v-if="item.likedCount != 0">
                  {{ item.likedCount }}</i
                >
              </i>
              <i class="gex"></i>
              <share style="width: 2em; height: 2em; margin-right: 4px" />
              <i class="gex"></i>
              <a href="#bb">
                <chat-line-round
                  style="width: 2em; height: 2em; margin-right: 8px"
                  @click="remarkbtn(item)"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="footer-a" v-if="remarknumbers > 60">
      <!-- 锚点 -->
      <a href="#aa">
        <el-pagination
          v-if="commentsname == '最新评论'"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.conentpage"
          :page-size="pageInfo.pagesize"
          layout="prev, pager, next"
          :total="remarknumbers"
        >
        </el-pagination
      ></a>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'

import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
export default defineComponent({
  props: {
    comments: {
      type: Array,
      default: () => []
    },
    commentsname: {
      type: String,
      default: '最新评论'
    },
    // 动态ID
    commentThreadId: {
      type: String,
      default: ''
    },
    pageUrlId: {
      type: String,
      default: ''
    }
  },
  emits: ['player', 'remarkbtns', 'remarkdelete', 'commentRemark'],
  setup(props, { emit }) {
    const route = useRoute()
    const store = useStore()
    // 获取页面路由的id
    const defaultActive = parseInt(route.path.split('/')[3])
    // console.log(defaultActive, '当前的url3')
    // const defaultActivess = parseInt(route.path.split('/')[5])
    // console.log(defaultActivess, '当前的url5')

    // 点击用户名字/img跳转
    const userbtn = (item: any) => {
      router.push({
        path: '/main/user/playlist/' + item.user.userId
      })
    }
    // 获取评论总数
    const remarknumbers = computed(() => store.state.complexData.remarknumber)
    const ThreadId = computed(() => store.state.complexData.ThreadId)
    // 点击了点赞
    const commentlike = (item: any) => {
      if (item.liked) {
        const page = {
          threadId: props.commentThreadId,
          commentId: item.commentId,
          t: 0,
          type: 6
        }
        console.log(item, 'item')
        console.log(page, 'item')

        store.dispatch('complexData/commentlike', page)
      } else {
        const page = {
          threadId: props.commentThreadId,
          commentId: item.commentId,
          t: 1,
          type: 6
        }
        console.log(item, 'item')
        console.log(page, 'item')

        store.dispatch('complexData/commentlike', page)
      }
    }

    // 分页处理
    const pageInfo = ref({ conentpage: 1, pagesize: 60 })
    const handleCurrentChange = (conentpage: number) => {
      pageInfo.value = { ...pageInfo.value, conentpage }
    }
    const handleSizeChange = (pagesize: number) => {
      console.log(pagesize, 'pagesize')
      pageInfo.value = { ...pageInfo.value, pagesize }
    }
    const userIds = ref()
    // 监听 pageInfo 的变化 调用方法
    watch(pageInfo, () => getPageData())
    // 控制显示分页

    if (ThreadId.value > 0) {
      userIds.value = ThreadId.value
    } else {
      userIds.value = ThreadId.value
    }
    const getPageData = () => {
      emit('commentRemark', pageInfo.value)
      // 歌单的评论分页器
      // const pageInfo = ref({ conentpage: 1, pagesize: 60 })
      // store.dispatch('complexData/SongRemarkRemark', {
      //   id: userIds.value,
      //   pageindex: (pageInfo.value.conentpage - 1) * pageInfo.value.pagesize
      // })
      if (pageInfo.value.conentpage == 1) {
        emit('player', true)
      } else {
        emit('player', false)
      }
    }
    // 点击评论的icon
    const remarkbtn = (item: any) => {
      console.log(item, '点击了')
      emit('remarkbtns', item)
    }
    // 右击事件
    const contextmenu = (item: any) => {
      emit('remarkdelete', item)
    }
    // 判断页面是否跳转 还原page-------
    return {
      remarknumbers,
      contextmenu,
      remarkbtn,
      pageInfo,
      userbtn,
      commentlike,
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped lang="less">
.footer-a {
  margin-top: 35/1920 * 100vw;
  .el-pagination {
    text-align: center;
  }
}
.btnclick {
  display: flex;
  align-items: center;
}
.likered {
  color: red;
}
.nolikered {
  color: #ccc;
}
.bas-col {
  width: 100%;
  display: flex;
  font-size: 12/1920 * 100vw;
  padding: 22/1920 * 100vw 0;
  border-bottom: 1px solid #eee;
  .img-div {
    position: relative;
    height: 50/1920 * 100vw;
    .img-btm {
      position: absolute;
      bottom: -2/1920 * 100vw;
      right: -6/1920 * 100vw;
      width: 20/1920 * 100vw;
      height: 20/1920 * 100vw;
      border: 50%;
    }
  }
  img {
    width: 50/1920 * 100vw;
    height: 50/1920 * 100vw;
    border-radius: 50%;
    margin-left: 3/1920 * 100vw;
    margin-right: 18/1920 * 100vw;
    box-shadow: 1/1920 * 100vw 1/1920 * 100vw 4/1920 * 100vw 1/1920 * 100vw
      rgba(100, 100, 100, 0.5);
    cursor: pointer;
  }
}
.bas-right {
  width: 100%;
  .bas-nameA {
    margin-bottom: 10/1920 * 100vw;
  }
  .bas-name {
    display: inline-block;
    color: rgb(40, 105, 189);
    cursor: pointer;
  }
  .bas-nameminibgc {
    width: 100%;
    background-color: #eee;
    border-radius: 8/1920 * 100vw;
    font-size: 10/1920 * 100vw;
    color: #555;

    .bas-namemini {
      display: inline-block;
      margin: 10/1920 * 100vw 0;
      padding: 0 10/1920 * 100vw;
      color: rgb(40, 105, 189);
      cursor: pointer;
    }
  }
  .bas-Tiem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
    margin-top: 5/1920 * 100vw;
    font-size: 10/1920 * 100vw;
    .bas-Tiem-right {
      display: flex;
      align-items: center;
      cursor: pointer;
      .report {
        display: none;
        align-items: center;
        color: #555;
        font-size: 10/1920 * 100vw;
      }
      .gex {
        display: inline-block;
        height: 18/1920 * 100vw;
        margin: 0 10/1920 * 100vw 0 5/1920 * 100vw;
        border-right: 1px solid #999;
      }
    }
  }
}
.bas-col:hover .report {
  display: flex !important;
  margin-right: -5/1920 * 100vw;
}
</style>
<style lang="less">
.footer-a {
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: red;
    color: #fff;
  }
  .el-pagination {
    --el-pagination-hover-color: '';
  }
  .el-message-box__header {
    padding-bottom: 100/1920 * 100vw !important;
  }
  .el-button--primary.is-plain {
    --el-button-text-color: #fff !important;
    --el-button-bg-color: rgb(233, 33, 33) !important;
    --el-button-border-color: rgb(233, 35, 35) !important;
    --el-button-hover-bg-color: rgb(199, 41, 41) !important;
    --el-button-hover-border-color: rgb(228, 34, 34) !important;
  }
  .el-button.is-round {
    --el-button-active-bg-color: rgb(199, 41, 41) !important;
    --el-button-active-border-color: rgb(199, 41, 41) !important;
  }
}
</style>
