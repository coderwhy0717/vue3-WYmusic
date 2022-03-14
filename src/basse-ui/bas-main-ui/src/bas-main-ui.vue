<template>
  <div class="bas-main-ui">
    <el-table
      :data="listdates"
      stripe
      style="width: 100%"
      highlight-current-row
      @row-dblclick="rowblclick"
      empty-text="加载中..."
    >
      <el-table-column
        v-if="tablexuhao"
        type="index"
        width="60/1920*100vw"
        label=""
        align="left"
      >
        <template #default="scope">
          <div class="index-div">
            <slot name="index" :row="scope.row"> </slot>
            <star
              class="star"
              :class="scope.row.index == like"
              @click="likebtn(scope.row)"
            />
          </div>
        </template>
      </el-table-column>

      <!-- <el-table-column
        v-if="tablexuanze"
        label=""
        align="center"
        width="25/1920*100vw"
      >
      </el-table-column> -->

      <template v-for="propItem in propLista" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="left" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, ref } from 'vue'
export default defineComponent({
  props: {
    // 网络数据
    listdate: {
      type: Array,
      required: true
    },
    // 标题标签名字配置文件
    propLista: {
      type: Array,
      required: true
    },
    // 序号 v-band自动绑定
    tablexuhao: {
      type: Boolean,
      default: false
    },
    // 选中
    tablexuanze: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const store = useStore()
    const btn = (index: number) => {
      console.log(index)
    }
    const listdates = computed(() => props.listdate)
    const rowblclick = (event: any) => {
      console.log(event, '点击了')
      console.log(listdates.value, '点击了')
      store.dispatch('pageMusic/PlayMessage', {
        event,
        listdates: listdates.value
      })
    }
    // 点击喜欢
    const like = ref()
    const likebtn = (item: any) => {
      console.log(typeof item.index, 'index')
      like.value = item.index
      console.log(item, 'index')

      store.dispatch('searchdetail/LikeMusic', {
        id: item.id,
        like: false,
        userId: store.state.login.profiles.userId
      })
    }
    return {
      likebtn,
      like,
      listdates,
      rowblclick,
      btn
    }
  }
})
</script>

<style lang="less">
.index-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.star {
  width: 20/1920 * 100vw;
  color: red !important;
}
.name-wrapper {
  color: red !important;
}
.bas-main-ui {
  margin-bottom: 50/1920 * 100vw;
}
.el-table .cell {
  font-size: 16/1920 * 100vw !important;
  font-weight: normal !important;
}
.el-table .el-table__cell {
  padding: 5/1920 * 100vw 0 !important;
}
.el-table th.el-table__cell > .cell {
  font-size: 17/1920 * 100vw;
}
.el-tooltip {
  font-size: 16/1920 * 100vw;
}
.el-table {
  color: rgb(128, 128, 128);
  --el-table-border-color: '' !important;
}
.el-table .cell {
  font-weight: normal;
}
.el-table tr {
  cursor: pointer;
}

// 点击选中的背景
.el-table--striped
  .el-table__body
  tr.el-table__row--striped.current-row
  td.el-table__cell {
  background-color: rgb(235, 235, 235) !important;
}

.el-table__body tr.current-row > td.el-table__cell {
  background-color: rgb(231, 230, 230);
}

.el-table {
  --el-table-row-hover-background-color: rgb(241, 241, 241) !important;
}
</style>
