export const state = () => ({
  classes_list: [],
});

export const getters = {
  getClasses(state) {
    return state.classes_list;
  },
};

export const mutations = {
  ADD_CLASS(state, newClass) {
    state.classes_list.push({
      title: newClass.title,
    });
  },
};

export const actions = {
  createClass({ commit }, newClass) {
    commit('ADD_CLASS', newClass);
  },
};
