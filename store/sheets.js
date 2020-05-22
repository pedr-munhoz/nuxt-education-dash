import { v4 as uuidv4 } from 'uuid';

export const state = () => ({
  sheets_list: [],
});

export const getters = {
  getSheets(state) {
    return state.sheets_list;
  },
};

export const mutations = {
  ADD_SHEET(state, newSheet) {
    state.sheets_list.push(newSheet);
  },
  REMOVE_SHEET(state, index) {
    state.sheets_list.splice(index, 1);
  },
};

export const actions = {
  saveSheet({ commit, dispatch }, newSheet) {
    const sheet = { ...newSheet, id: uuidv4() };
    commit('ADD_SHEET', sheet);
    dispatch('charts/parseSheet', sheet, { root: true });
  },
  deleteSheet({ commit, state }, oldSheet) {
    const index = state.sheets_list.indexOf(oldSheet);
    commit('REMOVE_SHEET', index);
  },
};
