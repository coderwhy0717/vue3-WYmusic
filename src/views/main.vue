<template>
  <div class="main-a">
    <el-container class="conraoner">
      <el-header class="Header">
        <page-header />
      </el-header>
      <el-container>
        <el-aside width="200/1920*100vw" class="Aside">
          <page-aside />
        </el-aside>
        <el-container>
          <el-main class="mains">
            <router-view />
          </el-main>
        </el-container>
      </el-container>
      <el-footer class="footer">
        <footer-w />
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import pageHeader from '@/components/page-header'
import pageAside from '@/views/page-aside'
import footerW from './footer'
import router from '@/router'
export default defineComponent({
  name: 'main',
  components: {
    pageHeader,
    pageAside,
    footerW
  },
  setup() {
    const store = useStore()

    return {}
  }
})
</script>
<style lang="less" scoped>
.el-main {
  --el-main-padding: 10px !important;
}
.conraoner {
  width: 100%;
  overflow: hidden;
  // background-color: red;
  .Header {
    height: 80/1920 * 100vw;
    background-color: #ec4141;
  }
  .Aside {
    width: 250/1920 * 100vw;
    background-color: #ccc;
  }

  .footer {
    position: fixed;
    width: 100%;
    z-index: 999;
    bottom: 0/1920 * 100vw;
    height: 100/1920 * 100vw;
    box-shadow: -1px 0 2px 0px rgba(100, 100, 100, 0.5);
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
@media screen and (max-width: 600px) {
  .conraoner {
    width: 100%;
    height: 100%;
    // background-color: red;
    .Header {
      display: flex;
      align-items: center;
      height: 13/600 * 100rem;
      background-color: #ec4141;
    }
    .Aside {
      width: 450/600 * 100px;
      background-color: #ccc;
    }
    .mains {
      padding: 0 100/600 * 100px 0 !important;
    }
    .footer {
      position: fixed;
      width: 100%;
      z-index: 999;
      bottom: 80/1280 * 100rem;
      height: 50/1280 * 100rem;
      box-shadow: -1px 0 2px 0px rgba(100, 100, 100, 0.5);
      background-color: #eee;
    }
  }
  .el-main {
    --el-main-padding: 0 !important;
  }
}
</style>
