
export const namespaced = true
export const state = () => ({
  value: false
})

export const mutations = {
  value (state, data) {
    state.value = Boolean(data)
  }
}

export const getters = {
  value (state) {
    return state.value
  }
}

export const actions = {
  value (context, toggle) {
    context.commit('value', toggle)
  }
}
