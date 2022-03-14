<template>
  <div class="xtx-infinite-loading" ref="container">
    <!-- 正在加载数据时显示 -->
    <div class="loading" v-if="isLoading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <!-- 数据全部加载完毕时显示 -->
    <div class="none" v-if="isFinished">
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>
<script>
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
import { useStore } from '@/store'

export default {
  name: 'xtxInfiniteLoading',
  props: {
    // 是否在加载中
    isLoading: {
      type: Boolean,
      default: false
    },
    // 数据全部加载完毕
    isFinished: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const container = ref(null)
    const { stop } = useIntersectionObserver(
      container,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 双重 判断 缺一不可
          if (props.isFinished === false && props.isLoading === false) {
            emit('doLoading')
            // store.dispatch('pageMusic/LoadMusic')
          }
        }
      }
    )
    return { container, stop }
  }
}
</script>

<style scoped lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
