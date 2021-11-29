import Vue from 'vue'
import Vuex from 'vuex'
import Songs from "../library/Songs.json"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenSize: 'Desktop',
    Songs: Songs
  },
  getters: {
    ScreenSize: state => {
      return state.screenSize;
    },
    GetAllSongs: state => {
      return state.Songs;
    }
  },
  mutations: {
    CHANGE_SCREEN_SIZE(state, payload) {
      state.screenSize = payload
    }
  },
  actions: {
    updateScreenSize({ commit }, viewportWidth) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('CHANGE_SCREEN_SIZE', viewportWidth)
          resolve();
        }, 1)
      });
    }
  },
  modules: {
  }
})
