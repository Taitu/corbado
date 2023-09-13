export const initialState = {
  user: null,
  session: null
}

export const state = () => ({
  ...initialState
})

export const getters = {
  user (state) {
    return state.user
  }
}

export const mutations = {
  SET_USER (state, payload) {
    state.user = payload.user
    state.session = payload.session
  },
  RESET (state) {
    state.user = null
    state.session = null
  }
}

export const actions = {
  async logout ({ state, commit }) {
    await state.session.logout()
    commit('RESET')
  }
}
