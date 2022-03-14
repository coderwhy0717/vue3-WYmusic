<template>
  <div class="artist-detail">
    <div class="introduce-A">{{ albumName }}简介</div>
    <div style="white-space: pre-line" class="introduce">
      {{ artistDetail.briefDesc }}
    </div>
    <template v-for="item in artistDetail.introduction" :key="item.ti">
      <div class="introduce-A s">{{ item.ti }}</div>
      <div style="white-space: pre-line" class="introduce">
        {{ item.txt }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  props: {
    albumName: {
      type: String,
      required: true
    }
  },
  setup() {
    const store = useStore()

    // 歌手详情
    const artistDetail = computed(() => store.state.complexData.artistDetail)
    return {
      artistDetail
    }
  }
})
</script>

<style scoped lang="less">
.introduce-A {
  cursor: default;
  font-size: 20/1920 * 100vw;
  font-weight: 550;
  font-family: '幼圆';
  padding-bottom: 10/1920 * 100vw;
}
.introduce {
  cursor: default;

  font-family: '幼圆';
  font-size: 18/1920 * 100vw;
  color: #777;
  line-height: 30/1920 * 100vw;
  letter-spacing: 1/1920 * 100vw;
  text-indent: 2em;
}
.s {
  margin-top: 30/1920 * 100vw;
}
</style>
