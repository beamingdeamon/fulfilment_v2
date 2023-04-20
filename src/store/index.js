import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    changeGoodStatus: 100
  },
  getters: {
    getStatus: (state) => state.changeGoodStatus,
  },
  mutations: {
    SET_CHANGE_GOOD_STATUS(state, value) {
      state.changeGoodStatus = value;
  },
  },
  actions: {
  },
  modules: {
  }
})
