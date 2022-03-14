<template>
  <div>
    <bas-main-ui :listdate="listdates" v-bind="configMusic">
      <!-- 序号 -->
      <template #index="scope">
        <sunny
          class="el-icon-sunny"
          :class="{ biaoti: scope.row.id == indexId }"
          v-if="scope.row.id == indexId"
        />

        <i v-else>{{ $filters.formatSerial(scope.row.index) }}</i>
      </template>
      <!-- text标题 -->
      <template #name="scope">
        <i
          :class="{
            biaoti: scope.row.id == indexId,
            color: scope.row.id != indexId
          }"
        >
          {{ scope.row.name }} aa
          <i v-if="scope.row.mv !== 0" class="MV" @click="mvbtn(scope.row.mv)"
            >MV<i class="MV-c">▶</i>
          </i>
        </i>
      </template>
      <!-- 歌手 -->
      <template #Singers="scope"
        ><i :class="{ biaoti: scope.row.id == indexId }"
          >{{ scope.row.Singer }}
        </i></template
      >
    </bas-main-ui>
    <div class="text-loading" v-if="showloading">
      <p v-if="loading">没有更多了</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import basMainUi from '@/basse-ui/bas-main-ui'
import { useStore } from '@/store'
import router from '@/router'

export default defineComponent({
  components: {
    basMainUi
  },
  props: {
    // 网络数据
    listdate: {
      type: Array,
      required: true
    },
    configMusic: {
      type: Object,
      required: true
    },
    showloading: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const store = useStore()
    // 控制变量
    const listdates = computed(() => props.listdate)
    // 控制播放color 变色
    const indexId = computed(() => {
      const a = ref(store.state.pageMusic.currentMusicId.id)
      // console.log(store.state.pageMusic.currentMusicId.id, 's')

      return a.value
    })
    const loading = computed(
      () =>
        store.state.pageMusic.mp3slist.length ==
        store.state.pageMusic.playlist.trackCount
    )
    // 判断
    const itemsss = computed(() => {
      const b = store.state.pageMusic.currentMusicId
      const a = store.state.pageMusic.mp3s.find((item: any) => {
        item.id == b.id
      })
      console.log(a)

      return a
    })
    // console.log(itemsss, 'itemssss')
    // 点击了MV
    const mvbtn = (mvId: number) => {
      console.log(mvId, 'MV的ID 跳转到MV页面')
      router.push({
        path: '/main/com/artist/MV/' + mvId
      })
    }
    return {
      mvbtn,
      loading,
      listdates,
      indexId
    }
  }
})
</script>

<style scoped lang="less">
.biaoti {
  color: red;
}
.color {
  font-family: 'YouYuan';
  color: #333;
  font-weight: 500 !important;
}
.el-icon-sunny {
  width: 1em;
}
.text-loading {
  margin: 0 auto;
  text-align: center;
  color: #999;
}
.MV {
  overflow: hidden;
  display: inline-block;
  width: 40/1920 * 100vw;
  height: 15/1920 * 100vw;
  border: 1px solid red;
  font-size: 8/1920 * 100vw;
  align-items: center;
  color: red;
  line-height: 15/1920 * 100vw;
  border-radius: 3/1920 * 100vw;
  .MV-c {
    font-size: 2/1920 * 100vw;
  }
}
.MV:hover {
  color: rgb(252, 109, 109);
}
</style>
