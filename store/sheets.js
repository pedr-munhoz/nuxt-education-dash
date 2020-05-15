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
};

export const actions = {
  saveSheet({ commit }, newSheet) {
    const sheet = { ...newSheet, id: uuidv4() };
    commit('ADD_SHEET', sheet);
  },
};
