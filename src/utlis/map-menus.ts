import { RouteRecordRaw } from 'vue-router'
import { ref } from 'vue'
import { formatUtcString } from '@/utlis/data-formatTime'
import store from '@/store'

// let firstMenu: any = null
// export function mapMenusToRouters(menus: any[]): RouteRecordRaw[] {
//   const routes: RouteRecordRaw[] = []
//   // 1.
//   const allRoutes: RouteRecordRaw[] = []
//   const routeFiles = require.context('../router/main', true, /\.ts/)
//   routeFiles.keys().forEach((key) => {
//     const routesss = require('../router/main' + key.split('.')[1])

//     allRoutes.push(routesss.default)
//   })

//   // 2.
//   const _recurseGetRoutes = (menuts: any[]) => {
//     for (const menu of menuts) {
//       if (menu.type === 2) {
//         const route = allRoutes.find((rout) => rout.path === menu.url)
//         if (route) routes.push(route)
//         if (!firstMenu) {
//           firstMenu = menu
//         }
//       } else if (menu.type === 1) {
//         _recurseGetRoutes(menu.children)
//       }
//     }
//   }
//   _recurseGetRoutes(menus)
//   return routes
// }

// export { firstMenu }
// 对播放量的处理
export function formatNumber(num: number) {
  if (num == 0 || num < 10000) {
    return num + ''
  } else if (num > 1 && num < 10000) {
    return num + ''
  } else if (num >= 100000000) {
    return (num / 100000000).toFixed(2) + '亿'
  } else {
    return (num / 10000).toFixed(2) + '万'
  }
}

// 对获取所有歌曲信息与歌曲的时间的处理
export function musicMessageTime(tracks: any[]) {
  const playermesage: any[] = []
  // 对时间做个转化
  for (const item in tracks) {
    const index = item
    const dts = formatUtcString(tracks[item].dt, 'mm:ss')
    const Singer = tracks[item].ar[0].name
    const Album = tracks[item].al.name
    playermesage.push({ ...tracks[item], dts, index, Singer, Album })
  }

  // console.log(playermesage, 'ssssssssssssss')

  return playermesage
}
// 对序号处理
export function formatserial(value: any) {
  const a = parseFloat(value)
  if (a < 9) {
    return '0' + (a + 1)
  } else {
    return a + 1
  }
}
// 对用户动态信息处理
export function userevent(events: any[]) {
  const userevent: any[] = []
  for (const item of events) {
    userevent.push({ jsons: JSON.parse(item.json), ...item })
  }
  return userevent
}
// export function _getmenus(list:any[],length:number) {

//   if(list.length <= 20) {
//     return list
//   }else {
//     const son:any[] = []
//     for(let i = 0;i <= 20; i++) {
//       // const a = await getMusicName(traIds[i].id)
//       son.push(...a.songs)
//     }
//     // commit('addtrackmusics', son)
//     // traIds.splice(0,20)
//   }
// }
