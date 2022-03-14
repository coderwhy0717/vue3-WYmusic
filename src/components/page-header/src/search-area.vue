<template>
  <div class="search-area" :style="{ height: heights }">
    <el-scrollbar height="200">
      <div v-if="seartchmessage">
        <div class="search-top">热搜榜</div>
        <template v-for="(item, index) in seartchmessage" :key="item">
          <div class="search-item" @click="itembtn(item)">
            <div class="index" :class="index < 3 ? 's' : ''">
              {{ index + 1 }}
            </div>
            <div class="search-text">
              <div class="text-top">
                <i :class="index < 3 ? 'texts' : ''">{{ item.searchWord }}</i>
                &nbsp;
                <img
                  v-if="item.iconUrl"
                  :src="item.iconUrl"
                  class="text-biao"
                  alt=""
                />
                &nbsp;
                <i class="text-text"> {{ item.score }}</i>
              </div>
              <div class="text-text">{{ item.content }}</div>
            </div>
          </div>
        </template>
      </div>
      <div v-else>加载中...</div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['searchcontent'],
  setup(props, { emit }) {
    const store = useStore()
    // 获取当前屏幕宽度
    const heights = ref(`${document.documentElement.clientHeight / 1.4}px`)
    //获取热搜热表
    const seartchmessage = computed(() => store.state.searchdetail.searchdetail)
    // 点击热搜榜
    const itembtn = (item: any) => {
      console.log(item)
      emit('searchcontent', item.searchWord)
    }

    return {
      seartchmessage,
      itembtn,
      heights
    }
  }
})
</script>

<style scoped lang="less">
.search-area {
  width: 500/1920 * 100vw;
  border-radius: 10/1920 * 100vw;
  background-color: #fff;
  box-shadow: 0 0 5/1920 * 100vw 2/1920 * 100vw rgba(100, 100, 100, 0.5);
  .search-top {
    padding: 15/1920 * 100vw 30/1920 * 100vw;
    font-weight: 300;
    font-size: 20/1920 * 100vw;
    text-align: left;
    color: #555;
  }
  .search-item {
    display: flex;
    padding: 10/1920 * 100vw 0;

    .index {
      font-size: 25/1920 * 100vw;
      margin: 0 25/1920 * 100vw;
      width: 30/1920 * 100vw;
    }
    .texts {
      font-weight: 550;
    }
    .s {
      color: red;
    }
    .search-text {
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      .text-top {
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 16/1920 * 100vw;
        padding-bottom: 5/1920 * 100vw;
        .text-biao {
          width: 40/1920 * 100vw;
          height: 20/1920 * 100vw;
        }
      }
    }
    .text-text {
      color: #ccc;
      font-size: 10/1920 * 100vw;
      font-weight: 300;
    }
  }
  .search-item:hover {
    cursor: pointer;
    background-color: #eee;
  }
}
</style>
