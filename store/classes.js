export const state = () => ({
  list: [],
});

export const mutations = {
  add(state, newClass) {
    state.list.push({
      title: newClass.title,
    });
  },
};
