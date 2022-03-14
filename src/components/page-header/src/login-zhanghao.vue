<template>
  <div class="login-zhanghao">
    <el-form
      label-width="60px"
      :rules="rulesconfig"
      :model="accout"
      ref="formRef"
    >
      <el-form-item label="账号" prop="phone">
        <el-input v-model="accout.phone" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="accout.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { rulesconfig } from '../config/zhanghao-config'
// vuex
import { useStore } from 'vuex'
// 封装的存储本地工具
import localCache from '@/utlis/caches'
export default defineComponent({
  setup() {
    const store = useStore()

    const accout = reactive({
      phone: localCache.getCache('phone') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepassword) {
            // 做本地存储
            localCache.setCache('phone', accout.phone)
            localCache.setCache('password', accout.password)
          } else {
            // 不记住密码不保存删除本地数据
            localCache.deleteCache('phone')
            localCache.deleteCache('password')
          }
          // 2.开始进行登录验证vuex
          store.dispatch('login/getLogins', { ...accout })
        }
      })
    }

    return {
      accout,
      rulesconfig,
      formRef,

      loginAction
    }
  }
})
</script>

<style scoped lang="less"></style>
