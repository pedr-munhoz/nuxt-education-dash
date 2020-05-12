export const state = () => ({
  list: [
    { title: 'Inteligência Artifical' },
    { title: 'Estrutura de Dados I' },
    { title: 'Pesquisa Operacional' }
  ]
});

export const mutations = {
  add(state, newClass) {
    state.list.push({
      title: newClass.title
    });
  }
};
