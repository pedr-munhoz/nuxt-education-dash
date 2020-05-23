export const state = () => ({
  configuration_fields: [
    { title: 'ID aluno', id: 'studant_id', value: '' },
    { title: 'Primeira avaliação', id: 'first_test', value: '' },
    { title: 'Segunda avaliação', id: 'second_test', value: '' },
    { title: 'Terceira avaliação', id: 'third_test', value: '' },
    { title: 'Quarta avaliação', id: 'fourth_test', value: '' },
    { title: 'Presença', id: 'attendance', value: '' },
    { title: 'Média', id: 'final_score', value: 'MÉDIA' },
    { title: 'Aprovação', id: 'approval', value: '' },
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
