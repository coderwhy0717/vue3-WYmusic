import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/index.less'
import 'animate.css'
import { globalRegister } from './global/index'
// 测试
// import { useStore } from '@/store'
// const stores = useStore()
// import '@/utlis/map-menus'
import { setupStore } from './store'
// import infiniteScroll from 'vue-infinite-scroll'
// import scroll from 'vue-seamless-scroll'
import { userConcern } from '@/network/login/login'
import scroll from 'vue-seamless-scroll'
const app = createApp(App)
app.use(globalRegister)
app.use(router)
app.use(store)
setupStore()
// app.use(infiniteScroll)
app.use(scroll)
// app.use(scroll)
app.mount('#app')
store.dispatch('search/getSearch')
console.log(
  document.documentElement.scrollTop,
  'document.documentElement.scrollTop'
)
// window.onresize = function () {
//   console.log('宽度', document.documentElement.clientWidth)
// console.log('高度', document.documentElement.clientHeight)
// }
// console.log('高度', document.body.clientWidth)
// const aaa = [
//   { names: '1asda' },
//   { names: '2asd' },
//   { names: '3asd' },
//   { names: '4ad' }
// ]
// const baa = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

// const c = [
//   { name: '1', id: 1 },
//   { name: '2', id: 2 },
//   { name: '3', id: 3 },
//   { name: '4', id: 4 }
// ]
// const ab = []
// for (let i = 0; i <= aaa.length; i++) {
//   const a = { ...aaa[i], ...baa[i] }
//   ab.push(a)
// }
// console.log(ab, 'ab')
// const ass = [{ 0: 'a' }, { 1: 'c' }, { 2: 'b' }]
// const asss = [{ 0: 'a' }, { 1: 'c' }]
// const a = ass[0]
// ass.splice(0, asss.length)
// console.log(a, 'maina')

// console.log(ass, 'mainass')
// const a = userConcern(278293380, 0)
// console.log(a, 'yonghu ')
// 2001627520
// 5297154043
// 5439834541
