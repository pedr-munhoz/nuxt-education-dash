export const state = () => ({
  fields: [
    { title: 'ID aluno', id: 1, value: '' },
    { title: 'Primeira avaliação', id: 2, value: '' },
    { title: 'Segunda avaliação', id: 3, value: '' },
    { title: 'Terceira avaliação', id: 4, value: '' },
    { title: 'Presença', id: 5, value: '' },
    { title: 'Média', id: 6, value: '' },
    { title: 'Aprovação', id: 7, value: '' }
  ]
});

export const mutations = {
  set(state, field) {
    state.fields.find((f) => f.id === field.id).value = field.value;
  }
};
