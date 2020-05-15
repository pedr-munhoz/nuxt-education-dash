export const state = () => ({
  configuration_fields: [
    { title: 'ID aluno', id: 1, value: '' },
    { title: 'Primeira avaliação', id: 2, value: '' },
    { title: 'Segunda avaliação', id: 3, value: '' },
    { title: 'Terceira avaliação', id: 4, value: '' },
    { title: 'Presença', id: 5, value: '' },
    { title: 'Média', id: 6, value: '' },
    { title: 'Aprovação', id: 7, value: '' },
  ],
});

export const getters = {
  getFields(state) {
    return state.configuration_fields;
  },
};

export const mutations = {
  SET_FIELD(state, field) {
    state.configuration_fields.find(
      (element) => element.id === field.id,
    ).value = field.value;
  },
};

export const actions = {
  updateField({ commit }, field) {
    commit('SET_FIELD', field);
  },
};
