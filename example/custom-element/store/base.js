
export const state = () => ({
  value: true
});

export const mutations = {
  value (scope, data) {
    scope.value = Boolean(data);
  }
};

export const getters = {
  value (scope) {
    return scope.value;
  }
};

export const actions = {
  setValue (context, toggle) {
    context.commit('value', toggle);
  }
};
