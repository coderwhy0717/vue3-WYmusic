<template>
  <div class="com-artist-mv">
    <el-scrollbar :height="heights">
      <com-mv
        :mvurl="mvurl"
        :mvdetail="mvdetail"
        :similarmv="similarmv"
        @videodetail="videodetail"
        :urlid="urlid"
      />
    </el-scrollbar>
    <up-top upname=".com-artist-mv" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import comMv from './com-mv.vue'
import router from '@/router'
import Localcache from '@/utlis/caches'
import UpTop from '@/basse-ui/up-top/src/up-top.vue'
export default defineComponent({
  components: { comMv, UpTop },

  setup() {
    const route = useRoute()
    const store = useStore()
    const vid = ref()
    // 获取当前屏幕宽度
    const heights = ref(`${document.documentElement.clientHeight / 1.4}px`)

    const MVId = ref(route.path.split('/')[5])
    watch(
      () => route.path.split('/')[5],
      (newitem) => mvvideoUrl(newitem)
    )
    console.log(
      parseFloat(route.path.split('/')[5]),
      "parseFloat(route.path.split('/')[5])"
    )
    const urlid = ref()
    const mvvideoUrl = (id: any) => {
      // 当前 页面 urlid存入本地 用处获取评论用
      Localcache.setCache('pageUrlId', id)

      console.log(id, '判断')
      urlid.value = id
      if (id > 0) {
        console.log(id, '判断数字')
        store.dispatch('complexData/MVurl', id)
        store.dispatch('complexData/mvRemark', {
          mvId: id,
          limit: 60,
          offset: 0
        })
        store.dispatch('complexData/SimilarMV', id)
      } else {
        console.log(id, '判断不是数字')
        // 视频细节
        store.dispatch('complexData/detailvideo', id)
        // 视频评论
        store.dispatch('complexData/videoRemark', {
          vid: id,
          limit: 60,
          offset: 0
        })
        // 类似视频
        store.dispatch('complexData/SimilarMV', id)
      }
    }
    mvvideoUrl(MVId.value)
    console.log(MVId.value, 'MVId.value---------')

    const mvurl = computed(() => store.state.complexData.MVurl)
    const mvdetail = computed(() => store.state.complexData.mvdetail)
    // 相关mv视频
    const similarmv = computed(() => store.state.complexData.similarmv)

    //子组件点击视频事件
    const videodetail = (vids: string) => {
      vid.value = vids
      router.push({
        path: '/main/com/artist/video/' + vids
      })
    }

    return {
      urlid,
      videodetail,
      similarmv,
      mvdetail,
      mvurl,
      heights,
      vid
    }
  }
})
</script>

<style scoped lang="less"></style>
