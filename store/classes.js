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
      id: newClass.id,
    });
  },
  SET_CLASS(state, newClass) {
    state.classes_list.find((element) => element.id === newClass.id).title =
      newClass.title;
  },
};

export const actions = {
  createClass({ commit, state }, newClass) {
    const aux = { ...newClass, id: state.classes_list.length };
    commit('ADD_CLASS', aux);
  },
  updateClass({ commit }, newClass) {
    commit('SET_CLASS', newClass);
  },
};
