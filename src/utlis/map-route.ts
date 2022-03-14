import { RouteRecordRaw } from 'vue-router'
export function mapMenuseRouters(menus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.加载项目文件路径
  const xianmo: RouteRecordRaw[] = []
  const xiangm = require.context('../router/main', true, /\.ts/)
  xiangm.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    xianmo.push(route.default)
  })

  // 2.处理数据路径
  const _getmenus = (menusa: any[]) => {
    for (const menu of menusa) {
      if (menu.type === 2) {
        const routea = xianmo.find((route) => route.path === menu.url)
        if (routea) routes.push(routea)
      } else {
        _getmenus(menu.children)
      }
    }
  }
  _getmenus(menus)
  return routes
}
