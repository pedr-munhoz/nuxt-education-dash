import { v4 as uuidv4 } from 'uuid';

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
  REMOVE_CLASS(state, index) {
    state.classes_list.splice(index, 1);
  },
};

export const actions = {
  createClass({ commit, state }, newClass) {
    const aux = { ...newClass, id: uuidv4() };
    commit('ADD_CLASS', aux);
  },
  updateClass({ commit }, newClass) {
    commit('SET_CLASS', newClass);
  },
  deleteClass({ commit, state }, currentClass) {
    const index = state.classes_list.indexOf(currentClass);
    commit('REMOVE_CLASS', index);
  },
};
