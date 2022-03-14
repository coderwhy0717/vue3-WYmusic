<template>
  <el-backtop
    :target="`${upname} ` + ' .el-scrollbar__wrap'"
    :bottom="200"
    :visibility-height="1000"
  >
    <div
      style="
         {
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        }
      "
      @click="btn"
    >
      UP
    </div></el-backtop
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    upname: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
