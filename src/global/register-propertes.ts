import { App } from 'vue'
// 调用方法
// 播放数量格式化
import { formatNumber, formatserial } from '@/utlis/map-menus'
// 时间格式化
import { formatUtcString } from '@/utlis/data-formatTime'
// 城市转化
import { convertData } from './utils/convert-data'
import { dataLyric } from '@/utlis/dataLyric'
// 需要在./index.ts   app原型中use插入registerPropertes方法 注册
// 创建方法 registerPropertes 传入App 创建全局 $filters 都可以调用的对象向方法
export default function registerPropertes(app: App) {
  // 在views\main\system\user\user.vue 中调用 $filters
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo')
    },
    // 数字转换成 万
    formatnumber(value: number) {
      return formatNumber(value)
    },
    formatTime(value: string, gehsi?: string) {
      // 调用方法传值 进入 格式化utc
      return formatUtcString(value, gehsi)
    },
    // 序号 转化
    formatSerial(value: any) {
      // 调用方法传值 进入 格式化序号
      return formatserial(value)
    },
    // 城市 转化
    City(id: number) {
      return convertData(id)
    },
    // 歌词转化
    dataLyrics(lyric: any) {
      return dataLyric(lyric)
    }
  }
}
// ----------------------全局注册

// 调用方法
