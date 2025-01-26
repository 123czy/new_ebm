import { createStore } from 'vuex'
import { State } from './types'

export default createStore<State>({
  state: {
    device: 'desktop'
  },
  mutations: {
    SET_DEVICE(state: State, device: 'mobile' | 'desktop') {
      state.device = device
    }
  },
  actions: {
    updateDeviceType({ commit }, width: number) {
      const device = width < 768 ? 'mobile' : 'desktop'
      commit('SET_DEVICE', device)
    }
  }
})