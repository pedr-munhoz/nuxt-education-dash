export const state = () => ({
  categories: [
    { year: 2011, semester: 2 },
    { year: 2012, semester: 1 },
    { year: 2015, semester: 2 },
  ],
  classes: [
    {
      title: 'Estrutura de dados I',
      data: [6, 7, 8],
    },
    {
      title: 'Inteligência Artificial',
      data: [4, 5, 6],
    },
    {
      title: 'Compiladores',
      data: [8, 9, 10],
    },
  ],
});

export const getters = {
  getCategories(state) {
    return state.categories.map(
      (element) => `${element.year}.${element.semester}`,
    );
  },
  getClasses(state) {
    return state.classes;
  },
};
