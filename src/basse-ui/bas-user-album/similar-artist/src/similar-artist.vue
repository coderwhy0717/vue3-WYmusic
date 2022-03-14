<template>
  <div class="similar-artist">
    <el-row :gutter="15">
      <template v-for="item in similarArtist" :key="item.id">
        <el-col :span="sapn" class="artist" @click="artistbtn(item.id)">
          <img class="img" :src="item.img1v1Url" alt="" />
          <div class="name">{{ item.name }}</div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import router from '@/router'
export default defineComponent({
  props: {
    // similarArtist: {
    //   type: Array,
    //   required: true
    // }
  },
  emits: ['first'],
  setup(props, { emit }) {
    const store = useStore()
    // 相似歌手
    const similarArtist = computed(() => store.state.complexData.SimilarArtist)
    const sapn = ref(4.5)
    if (document.documentElement.clientWidth < 700) {
      sapn.value = 8
    }
    const artistbtn = (id: number) => {
      router.push({
        path: '/main/com/userAlbum/' + id
      })
      emit('first', id)
    }
    return {
      artistbtn,
      similarArtist,
      sapn
    }
  }
})
</script>

<style scoped lang="less">
.similar-artist {
  margin-top: 10/1920 * 100vw;
}
.artist {
  margin-bottom: 35/1920 * 100vw;
  cursor: pointer;
  .img {
    width: 300/1920 * 100vw;
    height: 300/1920 * 100vw;
    border-radius: 5/1920 * 100vw;
    box-shadow: 1/1920 * 100vw 1/1920 * 100vw 5/1920 * 100vw 1/1920 * 100vw
      rgba(100, 100, 100, 0.5);
  }
  .name {
    font-size: 18/1920 * 100vw;
  }
}
</style>
