import { App } from 'vue'
import registerElement from './register-element'
import registerPropertes from './register-propertes'
import infiniteScroll from 'vue-infinite-scroll'

export function globalRegister(app: App): void {
  app.use(registerElement)
  // app插入注册方法 调用全局
  app.use(registerPropertes)
  app.use(infiniteScroll)
}
