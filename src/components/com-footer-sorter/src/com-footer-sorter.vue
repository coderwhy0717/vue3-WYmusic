<template>
  <div>
    <div class="footer-a">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'

export default defineComponent({
  props: {},
  setup(props) {
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
    // watch(pageInfo, () => getPageData())

    return {
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped lang="less">
.footer-a {
  .el-pagination {
    text-align: center;
  }
}
</style>
