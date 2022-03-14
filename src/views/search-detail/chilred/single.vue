<template>
  <div class="single">
    <div class="single-top">找到 {{ singleMessage.songCount ?? 0 }} 首单曲</div>
    <bas-main-ui-plus
      :configMusic="singleconfig"
      :listdate="singleMessage.songs"
    />
    <pagination v-model:page="pageInfo" :totals="singleMessage.songCount" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import basMainUiPlus from '@/basse-ui/bas-main-ui-plus'
import { singleconfig } from '../chilred-config/singleconfig'
import { useStore } from '@/store'
import Pagination from '@/basse-ui/bas-comment/src/pagination.vue'
export default defineComponent({
  components: {
    basMainUiPlus,
    Pagination
  },
  props: {
    searchName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    // 获取vuex数据
    const singleMessage = computed(
      () => store.state.searchdetail.searchkeywords
    )
    // 分页处理
    const pageInfo = ref({ conentpage: 1, pagesize: 60 })
    // 监听 pageInfo 的变化 调用方法
    watch(pageInfo, () => getPageData())
    // 控制显示分页
    const getPageData = () => {
      store.dispatch('searchdetail/searchkeywords', {
        name: props.searchName,
        type: 1,
        limit: pageInfo.value.pagesize,
        offset: (pageInfo.value.conentpage - 1) * pageInfo.value.pagesize
      })
    }
    // 网络请求搜索框内容
    store.dispatch('searchdetail/searchkeywords', {
      name: props.searchName,
      type: 1,
      limit: 60,
      offset: 0
    })
    return {
      singleconfig,
      singleMessage,
      pageInfo
    }
  }
})
</script>

<style scoped lang="less">
.single {
  padding-bottom: 150/1920 * 100vw;
  .single-top {
    text-align: right;
    margin-right: 35/1920 * 100vw;
    font-size: 14/1920 * 100vw;
    color: #888;
    font-weight: 300;
  }
}
</style>
