<template>
  <div class="page-aside">
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      background-color="#fff"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <el-menu-item index="1" @click="musicbtn">
        <span>发现音乐</span>
      </el-menu-item>
      <el-menu-item index="2" @click="URLbtn">
        <span>视频</span>
      </el-menu-item>
      <el-menu-item-group>
        <template #title>我的音乐</template>
        <el-menu-item index="1-3">本地下载</el-menu-item>
        <el-menu-item index="1-4">最近播放</el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import router from '@/router'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const store = useStore()
    const aside = computed(() => {
      return store.state.search.routeList
    })
    const musicbtn = () => {
      router.push({
        path: '/main/discovr/music/recommend'
      })
    }
    const URLbtn = () => {
      router.push({
        path: '/main/online/video'
      })
    }
    // 使用计算属性 判断 路由路径 nav-meun 跳转到那个页面  值 defalutValue
    const defalutValue = computed(() => {
      return 1
    })
    return {
      musicbtn,
      aside,
      URLbtn,
      defalutValue
    }
  }
})
</script>

<style lang="less">
.el-menu-item-group__title {
  text-align: left !important;
}
.el-menu-vertical {
  padding: 30/1920 * 100vw 5/900 * 100vw;
  padding-bottom: 10/900 * 100vw;
}
// 目录
.el-submenu {
  background-color: #fff !important;
  // 二级菜单 ( 默认背景 )

  .el-menu-item {
    padding-left: 50/1920 * 100vw !important;
    background-color: #fff !important;
  }
}

::v-deep .el-submenu__title {
  background-color: #fff !important;
}

// hover 高亮
.el-menu-item:hover {
  color: #000 !important; // 菜单
  background-color: #f6f6f7 !important;
}
.el-menu-item {
  border-radius: 5/1920 * 100vw;
  height: 20/900 * 100vw;
  margin: 1/900 * 100vw auto;
  line-height: 20/900 * 100vw;
  color: #000;
  text-align: left;
  font-size: 20/1920 * 100vw;
  background-color: #fff !important;
}

.el-menu-item.is-active {
  color: #000 !important;
  background-color: #f6f6f7 !important;
  font-size: 20/1920 * 100vw;
  font-weight: 600;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
