import * as types from '../mutation-types'

const state = {
  state: false
}

const mutations = {
  [types.LOADING] (state) {
    state.state = true
  },
  [types.LOADINGOUT] (state) {
    state.state = false
  }
}

export default {
  state,
  mutations
}
