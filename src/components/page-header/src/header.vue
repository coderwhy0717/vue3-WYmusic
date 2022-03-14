<template>
  <div class="header">
    <div class="left">
      <img src="~@/assets/img/logo.png" alt="logo" class="img" />

      <div class="center">
        <el-icon style="align-items: center; display: flex">
          <arrow-left-bold class="btn" @click="handleChange" />
        </el-icon>

        <el-icon style="align-items: center; display: flex">
          <arrow-right-bold class="btn" @click="handleChange2" />
        </el-icon>
      </div>
      <!-- <el-input class="input" prefix-icon="el-icon-search" placeholder="搜索" /> -->

      <div class="input-search">
        <input
          class="input"
          @focus="focusbtn"
          @blur="blurbtn"
          prefix-icon=""
          placeholder="搜索"
          v-model="content"
          @keyup.enter="enterbtn($event)"
        />
        <transition
          appear
          enter-active-class="animate__animated animate__bounceIn"
          leave-active-class="animate__animated animate__zoomOut"
          mode="out-in"
        >
          <search-area
            class="search-area"
            v-if="showSearch"
            @searchcontent="searchcontent"
          />
        </transition>
      </div>
    </div>

    <div v-if="login">
      <!--  -->
      <div class="right-center" @click="dialogFormVisible = true">
        <img src="~@/assets/img/test.jpg" alt="" class="right-img" />
        <text class="text">点击头像登录</text>
      </div>
    </div>
    <div v-else>
      <el-col :span="24" class="right-center">
        <el-dropdown trigger="click">
          <div class="el-dropdown-link">
            <img :src="userInfo.avatarUrl" alt="" class="right-img" />
            <text class="text">{{ userInfo.nickname }}</text>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="right-item">
              <el-dropdown-item @click="tuibtn">退出登录</el-dropdown-item>
              <el-dropdown-item @click="userbtn"> 用户信息</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </div>
    <!--  -->
    <el-dialog title="登录" center v-model="dialogFormVisible">
      <loginiphone ref="loginzhsRef" />
      <div class="accout">
        <el-checkbox v-model="isKeepassword">记住密码</el-checkbox>
        <el-link type="primary" class="ma">忘记密码</el-link>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="butclick">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!--  -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import router from '@/router'
import { useStore } from '@/store'
import loginiphone from './login-zhanghao.vue'
import Localcache from '@/utlis/caches'
import SearchArea from './search-area.vue'
export default defineComponent({
  components: {
    loginiphone,
    SearchArea
  },
  setup() {
    const store = useStore()
    store.dispatch('searchdetail/searchmessage')
    const handleChange = () => {
      store.dispatch('songnumbers')
      router.go(-1)
    }
    const handleChange2 = () => {
      store.dispatch('songnumberss')
      router.go(1)
    }
    // 显示/隐藏登录
    // 属性
    const isKeepassword = ref(true)
    // <InstanceType<typeof loginzh>> 获取组件的类型 loginzh
    const loginzhsRef = ref<InstanceType<typeof loginiphone>>()
    // 方法
    const butclick = () => {
      // console.log('立即登录');
      // 获取组件，调用组件里的方法 ref
      loginzhsRef.value?.loginAction(isKeepassword.value)
      dialogFormVisible.value = !dialogFormVisible.value
    }
    //登录成功
    const login = computed(() => !store.state.login.token)
    const userInfo = computed(() => store.state.login.profiles)

    const dialogFormVisible = ref(false)
    const tuibtn = () => {
      Localcache.deleteCache('token')
      Localcache.deleteCache('userInfo')
      store.dispatch('login/outLogin')
      router.push('/main')
    }
    // 显示隐藏搜索内容
    const showSearch = ref(false)
    // 获取焦点
    const focusbtn = () => {
      showSearch.value = true
      console.log('获取焦点')
      store.dispatch('searchdetail/searchmessage')
    }
    const blurbtn = () => {
      console.log('失去焦点')
      showSearch.value = false
    }
    // 搜索框 内容 获取
    const content = ref()
    const searchcontent = (item: string) => {
      content.value = item
      // 跳转搜索界面
      router.push({
        path: '/search/detail/' + item
      })

      // // 网络请求搜索框内容 默认搜索单曲
      // store.dispatch('searchdetail/searchkeywords', {
      //   name: item,
      //   type: 1,
      //   limit: 60,
      //   offset: 0
      // })
    }
    // 搜索输入框内容
    const enterbtn = (event: any) => {
      console.log(event.target.value, 'evnent')
      // 跳转搜索界面
      showSearch.value = false
      router.push({
        path: '/search/detail/' + event.target.value
      })
    }
    const userbtn = () => {
      router.push({
        path: '/main/user/playlist/' + userInfo.value.userId
      })
    }
    return {
      userbtn,
      enterbtn,
      searchcontent,
      content,
      showSearch,
      blurbtn,
      focusbtn,
      tuibtn,
      login,
      userInfo,
      dialogFormVisible,
      butclick,
      loginzhsRef,
      isKeepassword,
      handleChange,
      handleChange2
    }
  }
})
</script>

<style lang="less" scoped>
.accout {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ma {
}
.input-search {
  position: relative;
}
.search-area {
  position: absolute;
  margin: 0 auto;
  top: 80/1920 * 100vw;
  right: -120/1920 * 100vw;
  text-align: center;
  z-index: 9999;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80/1920 * 100vw;
  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .input {
      background-color: #e13e3e;
      border: 0;
      border-radius: 20/1920 * 100vw;
      width: 200/1920 * 100vw;
      height: 44/1920 * 100vw;
      padding: 0 0 0 35/1920 * 100vw;
      font-size: 12/1920 * 100vw;
      color: #eee !important;
    }

    input:focus {
      outline: medium;
    }
    .img {
      width: 180/1920 * 100vw;
      margin-right: 80/1920 * 100vw;
    }
    .center {
      display: flex;
      align-items: center;
      width: 56/1920 * 100vw;
      color: #fff;
      cursor: pointer;
      margin-right: 70/1920 * 100vw;
      .btn {
        width: 1em;
        font-size: 20px;
        padding: 2px;
        background-color: #e13e3e;
        margin-right: 20px;
        border-radius: 50%;
      }
    }
  }
  .right-center {
    padding-right: 200/1920 * 100vw;
    display: flex;
    align-items: center !important;
  }

  .right-img {
    width: 48/1920 * 100vw;
    height: 22/900 * 100vw;
    border-radius: 50%;
    margin-right: 10/1920 * 100vw;
  }
}
</style>
<style lang="less" scoped>
@media screen and (max-width: 600px) {
  .header {
    display: flex;
    justify-content: space-between !important;

    .left {
      display: flex;
      justify-content: space-between;
      margin-right: 2/1280 * 100rem !important;
      .img {
        width: 50/1280 * 100rem;
        margin-right: 5/1280 * 100rem;
      }
      .center {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 20/1280 * 100rem;
        color: #fff;
        cursor: pointer;
        margin-right: 35/1280 * 100rem;
        .btn {
          margin-right: 5/1280 * 100rem;
          border-radius: 50%;
          padding: 0.1/1280 * 100rem;
          background-color: #e13e3e;
        }
      }
    }

    .right-center {
      padding-left: 60/1280 * 100rem;
    }

    .right-img {
      width: 23/1280 * 100rem;
      height: 23/1280 * 100rem;
      border-radius: 50%;
      margin-right: 1/1280 * 100rem;
    }
    .text {
      font-size: 12/1280 * 100rem !important;
    }
  }
}
</style>
<style lang="less" scoped>
.el-textarea__inner,
.el-input__inner {
  background-color: #e13e3e;
  border: 0px;
  border-radius: 20/1920 * 100vw;
  width: 250/1920 * 100vw;
  height: 45/1920 * 100vw;
}
.el-link {
  --el-link-default-active-color: '';
}
.el-overlay {
  // position: unset !important;
}
.el-dialog {
  width: 500px !important;
  padding-bottom: 20/1920 * 100vw;
}
.el-dialog--center .el-dialog__body {
  padding: 0 50/1920 * 100vw;
}
.el-dialog--center .el-dialog__footer {
  margin: 0;
  padding: 0;
}
.el-dropdown-link {
  display: flex;
  align-items: center !important;
}
</style>
<style lang="less">
@media screen and (max-width: 600px) {
  .el-textarea__inner,
  .el-input__inner {
    background-color: #e13e3e;
    border: 0px;
    border-radius: 20/1280 * 100rem;
    width: 60/1280 * 100rem;
    height: 18/1280 * 100rem;
    font-size: 0.1/1280 * 100rem;
    padding-left: 5/1280 * 100rem !important;
    padding-right: 1/1280 * 100rem;
  }
  .el-link {
    --el-link-default-active-color: '';
  }
  .el-overlay {
    // position: unset !important;
  }
  .el-dialog {
    width: 500px !important;
    padding-bottom: 20/1280 * 100rem;
  }
  .el-dialog--center .el-dialog__body {
    padding: 0 50/1280 * 100rem;
  }
  .el-dialog--center .el-dialog__footer {
    margin: 0;
    padding: 0;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center !important;
  }
  .el-header {
    --el-header-padding: 5/1280 * 100rem;
  }
}
</style>
