
export const state = () => ({
  value: true
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
  setValue (context, toggle) {
    context.commit('value', toggle)
  }
}
