<template>
  <!-- 用户 -->
  <div class="consumer" v-if="searchUser">
    <div class="consumer-top">
      找到 {{ searchUser.userprofileCount ?? 0 }} 位用户
    </div>
    <div class="singer-text">
      <template v-for="item in searchUser.userprofiles" :key="item.id">
        <div class="singer-message" @click="userbtn(item.userId)">
          <div class="consumer-A">
            <img
              class="consumer-img"
              :src="item.avatarUrl + '?param=100y100'"
              alt=""
            />
            <div class="color">
              <i class="nickname"> {{ item.nickname }}</i>
              <male v-if="item.gender == 1 || item.gender == 0" class="man" />
              <female v-else class="nv" />
            </div>
          </div>
          <div v-if="item.signature" class="a">
            {{ item.signature }}
          </div>
        </div>
      </template>
    </div>
  </div>
  <div v-else>加载中...</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import router from '@/router'
export default defineComponent({
  props: {
    searchName: {
      type: String,
      reuiqred: true
    }
  },
  setup(props) {
    const store = useStore()
    const searchUser = computed(() => store.state.searchdetail.searchUser)

    // 点击跳转到 user详情页面
    const userbtn = (id: number) => {
      router.push({
        path: '/main/user/playlist/' + id
      })
    }
    return {
      userbtn,
      searchUser
    }
  }
})
</script>

<style scoped lang="less">
.consumer {
  padding-bottom: 150/1920 * 100vw;
  .consumer-A {
    display: flex;
    align-items: center;
  }
  .consumer-top {
    text-align: right;
    margin-right: 35/1920 * 100vw;
    font-size: 14/1920 * 100vw;
    color: #888;
    font-weight: 300;
  }
  .singer-text {
    .singer-message {
      padding: 10/1920 * 100vw 0 10/1920 * 100vw 10/1920 * 100vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .consumer-img {
      width: 80/1920 * 100vw;
      height: 80/1920 * 100vw;
      border-radius: 50%;
      box-shadow: 0 0 5/1920 * 100vw 1/1920 * 100vw rgba(100, 100, 100, 0.5);
      margin-right: 20/1920 * 100vw;
    }
    .color {
      font-size: 18/1920 * 100vw;
      color: #444;
      .nickname:hover {
        color: #000;
      }
      .man {
        width: 1em;
        margin-left: 10/1920 * 100vw;
        font-size: 16/1920 * 100vw;
        background-color: rgb(193, 224, 253);
        color: rgb(119, 119, 247);
        border-radius: 50%;
        padding: 2/1920 * 100vw 2/1920 * 100vw;
      }
      .nv {
        width: 1em;
        margin-left: 10/1920 * 100vw;
        font-size: 16/1920 * 100vw;
        background-color: rgb(253, 193, 240);
        color: rgb(231, 65, 176);
        border-radius: 50%;
        padding: 2/1920 * 100vw 2/1920 * 100vw;
      }
    }
  }
  .a {
    padding-right: 30/1920 * 100vw;
    text-align: right;
    font-size: 14/1920 * 100vw;
    width: 1200/1920 * 100vw;
    color: #888;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .singer-message:hover {
    background-color: rgb(238, 238, 238);
    cursor: pointer;
  }
  .singer-message:nth-child(2n) {
    background-color: rgb(247, 247, 247);
  }
  .singer-message:nth-child(2n):hover {
    background-color: rgb(241, 241, 241);
  }
}
</style>
