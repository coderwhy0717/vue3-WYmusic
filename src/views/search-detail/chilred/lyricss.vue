<template>
  <!-- 歌词 -->
  <div class="lyricss">
    <div class="lyricss-top">找到 {{ searchLyrics.songCount ?? 0 }} 首歌词</div>
    <bas-lyrics-ui :listdate="searchLyrics.songs" :config="lyricsconfig" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import basLyricsUi from '@/basse-ui/bas-main-ui-plus/src/bas-lyrics-ui.vue'
import { lyricsconfig } from '../chilred-config/lyricsconfig'
import { useStore } from '@/store'
export default defineComponent({
  components: {
    basLyricsUi
  },
  setup() {
    const store = useStore()
    const searchLyrics = computed(() => store.state.searchdetail.searchLyrics)
    return {
      lyricsconfig,
      searchLyrics
    }
  }
})
</script>

<style scoped lang="less">
.lyricss {
  padding-bottom: 150/1920 * 100vw;
  .lyricss-top {
    text-align: right;
    margin-right: 35/1920 * 100vw;
    font-size: 14/1920 * 100vw;
    color: #888;
    font-weight: 300;
  }
}
</style>
