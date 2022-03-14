<template>
  <!-- 滚动 -->
  <div class="user-album" @scroll="hedeScroll">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped>
.user-album::-webkit-scrollbar {
  display: none;
}

.user-album {
  height: 450/1920 * 100vw;
  overflow-y: scroll;
}
</style>
