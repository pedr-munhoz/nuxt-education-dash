export const state = () => ({});

export const actions = {
  parseSheet({ dispatch }, sheet) {
    dispatch('averageVsIteration/parseSheet', sheet);
  },
};
