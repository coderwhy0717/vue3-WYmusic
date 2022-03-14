<template>
  <div class="search-detail">
    <!-- 单曲  -->

    <!-- 歌手 -->
    <!-- 专辑 -->
    <!-- 视频 -->
    <!-- 歌单 -->
    <!-- 歌词 -->
    <!-- 播客 -->
    <!-- 声音 -->
    <!-- 用户 -->
    <el-scrollbar :height="heights">
      <div>搜索 &nbsp; {{ searchName }}</div>

      <div class="header-top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="单曲" name="first">
            <single :searchName="searchName" />
          </el-tab-pane>
          <el-tab-pane label="歌手" name="second">
            <singer :searchName="searchName" />
          </el-tab-pane>
          <el-tab-pane label="专辑" name="third">
            <album :searchName="searchName" />
          </el-tab-pane>
          <el-tab-pane label="视频" name="fourth">
            <video-mv :searchName="searchName" />
          </el-tab-pane>
          <el-tab-pane label="歌单" name="fifth">
            <song :searchName="searchName" />
          </el-tab-pane>
          <el-tab-pane label="歌词" name="sixth">
            <lyricss :searchName="searchName" />
          </el-tab-pane>
          <el-tab-pane label="播客" name="seventh"> 播客 </el-tab-pane>
          <el-tab-pane label="声音" name="eighth"> 声音 </el-tab-pane>
          <el-tab-pane label="用户" name="ninth">
            <consumer :searchName="searchName" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import single from '../chilred/single.vue'
import singer from '../chilred/singer.vue'
import album from '../chilred/album.vue'
import videoMv from '../chilred/video-mv.vue'
import song from '../chilred/song.vue'
import lyricss from '../chilred/lyricss.vue'
import consumer from '../chilred/consumer.vue'
export default defineComponent({
  components: {
    single,
    singer,
    album,
    videoMv,
    song,
    lyricss,
    consumer
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    // 获取当前屏幕宽度
    const heights = ref(`${document.documentElement.clientHeight / 1.4}px`)
    const activeName = ref('first')
    const searchName = ref(route.path.split('/')[3])
    console.log(searchName.value)
    //  监听url的改变
    watch(
      () => route.path.split('/')[3],
      (newitem) => netqingqiu(newitem)
    )
    const netqingqiu = (name: any) => {
      activeName.value = 'first'
      searchName.value = name
      console.log(name, '搜索路由***************')

      // 网络请求搜索框内容 默认搜索单曲
      store.dispatch('searchdetail/searchkeywords', {
        name: name,
        type: 1,
        limit: 60,
        offset: 0
      })
    }
    netqingqiu(searchName.value)
    const handleClick = (tab: any, event: any) => {
      console.log(tab, '....')
      if (tab.index == 0) {
        store.dispatch('searchdetail/searchkeywords', {
          name: searchName.value,
          type: 1,
          limit: 60,
          offset: 0
        })
      } else if (tab.index == 1) {
        store.dispatch('searchdetail/searchSinger', {
          name: searchName.value,
          type: 100,
          limit: 60,
          offset: 0
        })
      } else if (tab.index == 2) {
        store.dispatch('searchdetail/searchAlbum', {
          name: searchName.value,
          type: 10,
          limit: 60,
          offset: 0
        })
      } else if (tab.index == 3) {
        store.dispatch('searchdetail/searchMV', {
          name: searchName.value,
          type: 1004,
          limit: 60,
          offset: 0
        })
      } else if (tab.index == 4) {
        store.dispatch('searchdetail/searchSong', {
          name: searchName.value,
          type: 1000,
          limit: 60,
          offset: 0
        })
      } else if (tab.index == 5) {
        store.dispatch('searchdetail/searchLyrics', {
          name: searchName.value,
          type: 1006,
          limit: 60,
          offset: 0
        })
      } else if (tab.index == 6) {
        store.dispatch('searchdetail/searchsynthesis', {
          name: searchName.value,
          type: 1018,
          limit: 60,
          offset: 0
        })
      } else if (tab.index == 7) {
        console.log('暂无声音')
      } else if (tab.index == 8) {
        store.dispatch('searchdetail/searchUser', {
          name: searchName.value,
          type: 1002,
          limit: 60,
          offset: 0
        })
      }
    }
    //获取 搜索多少首歌
    const songCount = computed(() => store.state.searchdetail.searchkeywords)
    return {
      heights,
      songCount,
      searchName,
      activeName,
      handleClick
    }
  }
})
</script>

<style scoped lang="less">
.search-detail {
}
</style>
<style lang="less">
.header-top {
  .el-tabs__item:hover {
    color: #000 !important;
  }
  // 设置点击显示
  .el-tabs__item.is-active {
    font-size: 22/1920 * 100vw;
    font-weight: 600 !important;
    color: #000 !important;
  }
  // 设置下面红线的灰色虚线
  .el-tabs__nav-wrap::after {
    height: 0 !important;
  }
  // 设置下面的红线
  .el-tabs__active-bar {
    background-color: #ec4141 !important;
    height: 4/1920 * 100vw !important;
  }
  .el-tabs__item {
    padding: 0 18/1920 * 100vw !important;
  }
}
</style>
