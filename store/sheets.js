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
    commit('ADD_SHEET', newSheet);
  },
};
