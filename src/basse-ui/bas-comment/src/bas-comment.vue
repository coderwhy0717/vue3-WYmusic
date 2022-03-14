<template>
  <div class="bas-comment">
    <el-input
      type="textarea"
      placeholder=""
      v-model="text"
      maxlength="140"
      show-word-limit
      size="medium"
      id="bb"
    />
    <div class="text-ait">
      <div><i>@</i> <i>#</i></div>
      <div class="text-pin" @click="commentbtn">评论</div>
    </div>
    <div v-if="shows">
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
    <div
      v-if="Brilliant.length == 0 && newest.length == 0"
      class="commentsshow"
    >
      还没有评论，快来抢沙发~
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import remark from './remark.vue'
import { useStore } from '@/store'
import { ElMessageBox } from 'element-plus'
import { ElMessage, ElNotification } from 'element-plus'
import Localcache from '@/utlis/caches'

export default defineComponent({
  props: {
    // 获取评论数据 精彩/最新评论
    Brilliant: {
      type: Array,
      default: () => []
    },
    newest: {
      type: Array,
      default: () => []
    },
    // 动态id
    threadId: {
      type: String,
      default: ''
    }
  },
  components: {
    remark
  },
  emits: ['commentRemarkRemark'],
  setup(props, { emit }) {
    const store = useStore()
    const text = ref('')
    // ---------
    const shows = ref(true)
    const playerPlay = (show: boolean) => {
      console.log('show')
      // console.log(an, 'show')

      shows.value = show
    }

    const items = ref()
    const remarkbtnss = (item: any) => {
      items.value = item
      text.value = '回复' + `${item.user.nickname}` + '：'
    }
    // 点击评论了
    const as = computed(() => store.state.complexData.showloadings)
    const commentbtn = () => {
      const atext = text.value.slice(0, 2)
      if (atext == '回复') {
        const a = text.value.split('：'[0])
        console.log(a[1], 'aaas')
        const page = {
          t: 2,
          type: 6,
          threadId: props.threadId,
          content: a[1],
          commentId: items.value.commentId,
          urlId: userurlid.value
        }
        store.dispatch('complexData/commentReply', page)
      } else {
        console.log('评论了')
        if (!text.value) {
          ElNotification({
            title: '写点东西吧，内容不能为空哦~',
            type: 'warning'
          })
          return
        }
        const page = {
          t: 1,
          type: 6,
          threadId: props.threadId,
          content: text.value,
          urlId: userurlid.value
        }
        store.dispatch('complexData/commentsand', page)
      }
    }

    // 通过计算属性监听vuex里的true/false 使用wath监听计算属性的变化 去清空输入内容
    watch(as, () => abc())
    const abc = () => {
      if (as.value) {
        text.value = ''
        store.dispatch('complexData/show', false)
      }
    }
    // 右键删除评论
    const itemss = ref()
    const remarkdelete = (item: any) => {
      itemss.value = item
      // 判断留言的id 是否一致
      if (store.state.login.profiles.userId === item.user.userId) {
        console.log(item, 'contextmenu')
        ElMessageBox.confirm('确定删除改评论?', '', {
          confirmButtonText: '确定',
          showCancelButton: false,
          center: true,
          roundButton: true
        })
          .then((item: any) => {
            // ElMessage({
            //   type: 'success',
            //   message: '删除成功!'
            // })
            sbb()
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    }
    // 删除评论
    const userurlid = computed(() => store.state.pageMusic.playlist.id)
    const sbb = () => {
      const page = {
        t: 0,
        type: 6,
        threadId: props.threadId,
        commentId: itemss.value.commentId,
        urlId: userurlid.value
      }
      console.log(page, 'page')
      store.dispatch('complexData/remarkdeletea', page)
    }
    // 组件分页器传的事件
    const commentRemark = (pageInfo: any) => {
      console.log(pageInfo, '传进事件1')

      emit('commentRemarkRemark', pageInfo)
    }
    const pageUrlId = Localcache.getCache('pageUrlId')
    console.log(pageUrlId, 'pageUrlId')

    return {
      pageUrlId,
      commentRemark,
      remarkdelete,
      shows,
      text,
      playerPlay,
      remarkbtnss,
      commentbtn
    }
  }
})
</script>

<style scoped lang="less">
.commentsshow {
  margin: 50/1920 * 100vw auto;
  text-align: center;
  font-size: 12/1920 * 100vw;
  color: #999;
}
.bas-comment {
  margin-bottom: 100/1920 * 100vw;
  width: 100%;
  .text-ait {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12/1920 * 100vw 0 30/1920 * 100vw 0;
    cursor: pointer;

    .text-pin {
      font-size: 12/1920 * 100vw;
      border: 1px solid #ccc;
      border-radius: 10/1920 * 100vw;
      padding: 5/1920 * 100vw 15/1920 * 100vw;
    }
    .text-pin:hover {
      background-color: #eee;
    }
  }

  .grid-content {
    background-color: pink;
  }
}
</style>
<style lang="less"></style>
