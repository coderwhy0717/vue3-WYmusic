<template>
  <div v-if="PlayRecord" class="com-myplayrecord">
    <el-scrollbar height="500px">
      <div class="playrecord-name">
        <h3>{{ username }}的听歌排行</h3>
      </div>
      <div class="playrecord-btn">
        <div
          @click="myplay(1)"
          class="playrecord-btn-a"
          :class="{ fw: index == 1 }"
        >
          最近一周
        </div>
        <div @click="myplay1(0)" :class="{ fw: index == 0 }">所有时间</div>
      </div>
      <bas-main-ui-plus
        :listdate="PlayRecord"
        :configMusic="configPlayRecord"
      />
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { musicMessageTime } from '@/utlis/map-menus'
import { configPlayRecord } from '../config/config-playrecord'
import basMainUiPlus from '@/basse-ui/bas-main-ui-plus'

export default defineComponent({
  components: {
    basMainUiPlus
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    // 获取页面路由的id
    const id = parseInt(route.path.split('/')[3])
    const index = ref(1)
    // 发送网络请求
    store.dispatch('pageMusic/getPlayRecord', { id, index: index.value })
    // 获取用户名
    const username = computed(
      () => store.state.pageMusic.userInfo.profile.nickname
    )
    // 获取音乐数据
    const PlayRecord = computed(() => store.state.pageMusic.mp3slist)
    console.log(PlayRecord, '数据')
    const myplay = (indexs: number) => {
      index.value = indexs
      store.dispatch('pageMusic/getPlayRecord', { id, index: indexs })
    }
    const myplay1 = (indexs: number) => {
      index.value = indexs
      store.dispatch('pageMusic/getPlayRecord', { id, index: indexs })
    }
    return {
      myplay,
      myplay1,
      index,
      username,
      PlayRecord,
      configPlayRecord
    }
  }
})
</script>

<style scoped lang="less">
.com-myplayrecord {
  font-size: 16px;
  color: #444;
  margin-bottom: 100/1920 * 100vw;
  .playrecord-btn {
    display: flex;
    font-size: 14px;
    cursor: pointer;
    .playrecord-btn-a {
      margin-right: 40/1920 * 100vw;
    }
  }
  .fw {
    font-weight: 600;
  }
}
</style>
