<template>
  <div>
    <!-- 标签 -->
    <div class="navBarContainer">
      <div class="navBar">
        <div
          class="barItem"
          :class="index === activeNum ? 'active' : ''"
          v-for="(item, index) in navBarData"
          :key="index"
          @click="clickBarItem(item.path, index)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- 轮播图 推荐歌曲等-->
    <el-scrollbar :height="heights" class="scr">
      <router-view />
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import { useStore } from '@/store'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const store = useStore()
    // 网络数据
    const navBarData = [
      { name: '个性推荐', path: '/main/discovr/music/recommend', id: 0 },
      { name: '歌单', path: '/main/discovr/music/musiclist', id: 1 },
      { name: '排行榜', path: '/main/discovr/music/ranking', id: 2 },
      { name: '歌手', path: '/main/discovr/music/singer', id: 3 }
    ]

    const activeNum = computed(() => {
      return store.state.songnumber
    })

    const clickBarItem = (path: any, index: number) => {
      store.commit('songnumber', index)
      router.push({
        path: path
      })
    }

    // 点击轮播图
    const imgclick = (url: string) => {
      // 直接跳转新页面
      window.open(url, '_blank')
    }
    const widths = ref()
    // 获取当前屏幕宽度
    const heights = ref(`${document.documentElement.clientHeight / 1.4}px`)

    //获取当前可视区域
    window.onresize = function () {
      console.log('宽度', document.documentElement.clientWidth)
      console.log('高度', document.documentElement.clientHeight)
    }

    console.log('宽度aa', document.documentElement.clientWidth)
    console.log('高度aa', document.documentElement.clientHeight)
    return {
      navBarData,
      clickBarItem,
      imgclick,
      activeNum,
      heights
    }
  }
})
</script>

<style scoped lang="less">
.navBarContainer {
  height: 40/1920 * 100vw;
  width: 100%;
  position: relative;
  margin-bottom: 40/1920 * 100vw;
}

.navBar {
  display: flex;
  position: relative;
  left: 0px;
  top: 0;
  background-color: #fff;
  z-index: 100;
  width: 100%;
  color: rgb(49, 49, 49);
  align-items: center;
  padding: 10/1920 * 100vw 0 20/1920 * 100vw 20/1920 * 100vw;
}

.barItem {
  font-size: 13px;
  margin: 0 10px;
  text-align: center;
  cursor: pointer;
}

.active {
  font-size: 16px;
  color: black;
  font-weight: 600;
  padding-bottom: 5px;
  border-bottom: 3px solid #ec4141;
  transform: translateY(4px);
}
</style>

<style scoped lang="less">
@media screen and (max-width: 600px) {
  .navBarContainer {
    height: 25/1280 * 100rem;
    width: 100%;
    position: relative;
    margin-bottom: 10/1280 * 100rem;
  }

  .navBar {
    display: flex;
    position: relative;
    left: 0px;
    top: 0;
    background-color: #fff;
    z-index: 100;
    width: 100%;
    color: rgb(49, 49, 49);
    align-items: center;
    padding: 10/1280 * 100rem 0 0/1280 * 100rem 20/1280 * 100rem;
  }

  .barItem {
    font-size: 8/1280 * 100rem;
    margin: 0 10px;
    display: flex;
    text-align: center;
    cursor: pointer;
  }

  .active {
    font-size: 10/1280 * 100rem;
    color: black;
    font-weight: 600;
    padding-bottom: 1/1280 * 100rem;
    border-bottom: 2/1280 * 100rem solid #ec4141;
    transform: translateY(4/1280 * 100rem);
  }
}
</style>
