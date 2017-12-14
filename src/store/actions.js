import * as types from './mutation-types'

export const login = ({ commit }, token) => {
  commit(types.LOGIN, token)
}

export const logout = ({ commit }, token) => {
  commit(types.LOGOUT)
}

export const message = ({ commit }, data) => {
  commit(types.MESSAGE, data)
  setTimeout(function () {
    commit(types.MESSAGE_CLOSE)
  }, 5000)
}

export const loading = ({ commit }) => {
  commit(types.LOADING)
}

export const loadingout = ({ commit }) => {
  commit(types.LOADINGOUT)
}
