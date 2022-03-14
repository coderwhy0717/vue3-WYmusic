<template>
  <div class="recommend">
    <div class="main">
      <!-- 轮播图 -->
      <el-carousel :interval="interval" type="card" :height="heights">
        <el-carousel-item
          v-for="item in banners"
          :key="item"
          class="main-zmd"
          @click="imgclick(item.url)"
        >
          <img :src="item.imageUrl" alt="" class="medium" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <page-main-item
      :topName="'推荐歌单'"
      :personalized="personalized"
      :isshow="true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import pageMainItem from '@/components/page-mainItem'
export default defineComponent({
  name: 'recommend',
  components: {
    pageMainItem
  },
  setup() {
    const store = useStore()
    store.dispatch('search/getRecommended', { limit: 20 })
    const personalized = computed(() => {
      return store.state.search.recommend
    })
    console.log(personalized, '比较的mainitem数据')

    // 获取轮播图数据
    const banners = computed(() => {
      const banness = store.state.search.bannergoods.map((item: any) => {
        return { imageUrl: item.imageUrl, url: item.url }
      })
      return banness
    })
    const interval = ref(0)
    const heights = ref(0 + 'px')
    if (document.documentElement.clientWidth > 700) {
      interval.value = 4000
      heights.value = 200 + 'px'
    }
    if (document.documentElement.clientWidth < 700) {
      interval.value = 1000
      heights.value = 100 + 'px'
    }
    console.log('高度1', document.body.clientWidth)
    return {
      interval,
      heights,
      banners,
      personalized
    }
  }
})
</script>

<style scoped lang="less">
.main {
  width: 1371/1920 * 100vw;
  margin: 0 auto;
  .main-zmd {
    border-radius: 10px;
  }
  .medium {
    width: 100%;
    height: 100%;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<style scoped lang="less">
@media screen and (max-width: 600px) {
  .main {
    margin: 0 auto;
  }
  .el-carousel {
    --el-carousel-arrow-font-size: 10/1280 * 100rem;
    --el-carousel-arrow-size: 36/1280 * 100rem;
    --el-carousel-indicator-width: 30/1280 * 100rem;
    --el-carousel-indicator-padding-vertical: 14/1280 * 100rem;
  }
  .el-carousel__indicators--outside {
    position: '';
  }
}
</style>
