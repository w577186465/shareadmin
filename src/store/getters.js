export const user = state => {
  return state.auth.user
}

export const accessToken = state => {
  return state.auth.token
}

export const message = message => {
  return message.message
}

export const loading = state => {
  return state.loading.state
}
