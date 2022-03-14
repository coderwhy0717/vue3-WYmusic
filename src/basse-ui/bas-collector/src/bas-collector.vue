<template>
  <div class="bas-collector" v-if="collector">
    <el-row>
      <template v-for="(item, index) in collectors" :key="item">
        <el-col :span="8">
          <div class="collectorA" @click="clickcomment(item, index)">
            <img :src="item.avatarUrl" alt="" class="su" />
            <div class="collectorA-meassge">
              <i class="su"
                >{{ item.nickname }}
                <male v-if="item.gender == 1 || item.gender == 0" class="man" />
                <female v-else class="nv" />
              </i>
              <div class="collectorA-text">{{ item.signature }}</div>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>
  </div>
  <div v-else>暂无收藏者</div>
</template>

<script lang="ts">
import store from '@/store'
import { computed, defineComponent } from 'vue'
import router from '@/router'
import { useStore } from '@/store'
export default defineComponent({
  props: {
    collector: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const store = useStore()
    const collectors = computed(() => {
      return props.collector ?? []
    })
    // 点击某个 收藏者
    const clickcomment = (item: any, index: number) => {
      console.log(item, 'item')
      store.dispatch('pageMusic/getUserPlaylists', item.userId)
      console.log(index, 'index')

      // 跳转到用户信息页面
      router.push({
        path: '/main/user/playlist/' + item.userId
      })
    }
    return {
      collectors,
      clickcomment
    }
  }
})
</script>

<style scoped lang="less">
.bas-collector {
  .su {
    cursor: pointer;
  }
  .collectorA:hover {
    background-color: rgb(252, 249, 249);
    border-radius: 10/1920 * 100vw;
  }
  .collectorA {
    display: flex;
    align-items: center;
    margin: 20/1920 * 100vw 0;
    font-size: 20/1920 * 100vw;
    img {
      width: 100/1920 * 100vw;
      height: 100/1920 * 100vw;
      border-radius: 50%;
    }
    .collectorA-meassge {
      margin-left: 10/1920 * 100vw;
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
      .collectorA-text {
        margin-top: 15/1920 * 100vw;
        font-size: 10/1920 * 100vw;
        font-weight: 300;
        width: 400/1920 * 100vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
