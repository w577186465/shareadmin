import * as types from '../mutation-types'

const state = {
  state: false,
  text: '',
  type: 'normal'
}

const mutations = {
  [types.MESSAGE] (state, data) {
    state.state = data.state
    state.text = data.text
    state.type = data.type
  },
  [types.MESSAGE_CLOSE] (state) {
    state.state = false
    state.text = ''
    state.type = ''
  }
}

export default {
  state,
  mutations
}
