import { createStore, useStore as useVuexStore, Store } from 'vuex'
import type { IDtype, IStoreType } from './type'
import search from './search/search'
import pageMusic from './pageMusic/pageMusic'
import login from './login/login'
import complexData from './complexData/complexData'
import searchdetail from './searchdetail/searchdetail'
const store = createStore<IDtype>({
  state: () => {
    return {
      songnumber: 0
    }
  },
  mutations: {
    songnumber(state, a) {
      state.songnumber = a
    },
    adds(state) {
      state.songnumber--
    },
    addss(state) {
      state.songnumber++
    }
  },
  actions: {
    songnumbers({ commit }) {
      if (this.state.songnumber > 0) {
        commit('adds')
      }
    },
    songnumberss({ commit }) {
      if (this.state.songnumber < 3) {
        commit('addss')
      }
    }
  },
  modules: {
    login,
    search,
    pageMusic,
    complexData,
    searchdetail
  }
})
//用户刷新调用 在main.ts里调用 把数据存入vuex中
export function setupStore() {
  store.dispatch('search/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
