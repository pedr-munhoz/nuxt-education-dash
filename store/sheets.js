export const state = () => ({
  list: [],
});

export const mutations = {
  add(state, newSheet) {
    state.list.push(newSheet);
  },
};
