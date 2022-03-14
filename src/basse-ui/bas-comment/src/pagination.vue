<template>
  <div class="pagination">
    <el-pagination
      v-if="totals > 60"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.conentpage"
      :page-size="page.pagesize"
      layout="prev, pager, next"
      :total="totals"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    totals: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({ conentpage: 0, pagesize: 10 })
    }
  },
  emits: ['update:page'],
  setup(props, { emit }) {
    const handleCurrentChange = (conentpage: number) => {
      emit('update:page', { ...props.page, conentpage })
    }
    const handleSizeChange = (pagesize: number) => {
      emit('update:page', { ...props.page, pagesize })
    }
    return {
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped></style>
<style lang="less">
.pagination {
  text-align: center;
  .el-pager li:not(.disabled).active {
    background-color: red !important;
    color: #fff;
  }
  .el-pager li {
    background-color: #eee;
    border-radius: 10/1920 * 100vw;
    color: #444;
  }
  .el-pager li:hover {
    color: #000;
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
