<template>
  <div class="com-user-dynamic">
    <el-scrollbar :height="heights">
      <div class="user-name" v-if="nickname">
        {{ nickname.profile.nickname }}的动态
      </div>
      <template v-for="item in userevents.events" :key="item.id">
        <usersingle :item="item" />
      </template>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import usersingle from './usersingle.vue'
import { useRoute } from 'vue-router'
import router from '@/router'
export default defineComponent({
  components: {
    usersingle
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    // 获取当前屏幕宽度
    const heights = ref(`${document.documentElement.clientHeight / 1.4}px`)
    const page = ref({
      uid: parseFloat(route.path.split('/')[4]),
      lasttime: -1
    })
    store.dispatch('searchdetail/userevent', page.value)
    // 用户名字
    const nickname = computed(() => store.state.pageMusic.userInfo)
    // 用户动态信息
    const userevents = computed(() => store.state.searchdetail.userevents)
    return {
      heights,
      nickname,
      userevents
    }
  }
})
</script>

<style scoped lang="less">
.com-user-dynamic {
  cursor: default;
  .user-name {
    font-weight: 600;
    font-size: 26/1920 * 100vw;
    margin-bottom: 30/1920 * 100vw;
  }
}
</style>
