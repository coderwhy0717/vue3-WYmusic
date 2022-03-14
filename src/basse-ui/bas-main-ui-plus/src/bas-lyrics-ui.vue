<template>
  <div>
    <bas-main-ui :listdate="listdates" v-bind="config">
      <!-- 序号 -->
      <template #index="scope">
        <div class="index">{{ $filters.formatSerial(scope.row.index) }}</div>
      </template>
      <!-- text标题 -->
      <template #name="scope">
        <div class="album-top">{{ scope.row.name }}</div>
        <div
          class="title"
          :style="
            scope.row.index == indexzhan ? 'display: block;height:auto;' : ''
          "
        >
          <template v-for="item in scope.row.lyrics" :key="item">
            <div :class="scope.row.index == indexzhan ? '' : 'divitem'">
              {{ item }}
            </div>
          </template>
        </div>
      </template>
      <!-- 歌手 -->
      <template #Singers="scope"
        ><i class="index singfer" @click="singerbtn(scope.row.ar[0].id)"
          >{{ scope.row.Singer }}
        </i></template
      >
      <!-- 专辑 -->
      <template #Album="scope"
        ><i class="index album-top s" @click="userAlbumbtn(scope.row.al.id)"
          >{{ scope.row.Album }}
        </i></template
      >
      <!-- 时长 -->
      <template #dts="scope">
        <div class="index">
          <div class="sj">{{ scope.row.dts }}</div>
          <button
            class="zhan"
            v-if="scope.row.index == indexzhan"
            @click="zhanbtns(scope.row)"
          >
            收起歌词
          </button>
          <button class="zhan" v-else @click="zhanbtn(scope.row)">
            展开歌词
          </button>

          <button class="zhan" @click="fuzhibtn(scope.row.lyrics)">
            复制歌词
          </button>
        </div>
      </template>
    </bas-main-ui>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import basMainUi from '@/basse-ui/bas-main-ui'
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
    config: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // 控制变量
    const listdates = computed(() => props.listdate)
    // 点击展开
    const indexzhan = ref(99999999)
    const showbtm = ref(true)
    const zhanbtn = (item: any) => {
      console.log(item, '展开数据')
      indexzhan.value = parseFloat(item.index)
      showbtm.value = !showbtm.value
    }
    const zhanbtns = (item: any) => {
      console.log(item, '展开数据')
      indexzhan.value = parseFloat(item.index) + 999999
      showbtm.value = !showbtm.value
    }
    // 复制歌词
    const fuzhibtn = (item: any) => {
      console.log(item, '复制歌词')
    }
    // 点击歌手跳转到用户所有的专辑页面
    const singerbtn = (id: any) => {
      router.push({
        path: '/main/com/userAlbum/' + id
      })
    }
    // 点击专辑跳转到专辑详情页
    const userAlbumbtn = (id: any) => {
      router.push({
        path: '/main/com/userAlbumItem/' + id
      })
    }
    return {
      zhanbtn,
      fuzhibtn,
      zhanbtns,
      singerbtn,
      userAlbumbtn,
      listdates,
      indexzhan,
      showbtm
    }
  }
})
</script>

<style scoped lang="less">
.index {
  position: absolute !important;
  top: 0 !important;
  margin-top: 5/1920 * 100vw !important;
  font-weight: 300 !important;
}
.singfer:hover {
  color: #000;
}
.album-top {
  display: inline-block;
  color: rgb(31, 112, 194);
  margin-bottom: 10/1920 * 100vw;
}
.s {
  width: 290/1920 * 100vw;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
.sj {
  margin-bottom: 10/1920 * 100vw;
}
.title {
  height: 127/1920 * 100vw;
  overflow: hidden;
}
.divitem:nth-child(4) {
  padding-bottom: 30/1920 * 100vw;
}
.as {
  display: block !important;
}
.zhan {
  width: 100/1920 * 100vw;
  height: 30/1920 * 100vw;
  font-size: 10/1920 * 100vw;
  margin-right: 5/1920 * 100vw;
  border-radius: 20/1920 * 100vw;
  border: 0.5px solid #999;
  background-color: rgb(245, 243, 243);
}
.zhan:hover {
  background-color: rgb(236, 234, 234);
  cursor: pointer;
}
</style>
