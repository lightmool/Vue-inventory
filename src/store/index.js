import { createStore } from "vuex";


export default createStore({
  state: {
    rotes: []
  },
  getters: {},
  /**
   * 同步执行
   */
  mutations: {
    initRouters(state, data) {
      state.rotes = dada
    }
  },
  /**
   * 异步执行
   */
  actions: {},
  modules: {},
});
