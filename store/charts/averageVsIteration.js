export const state = () => ({
  // classes [{ year: number, semester: number(1/2), average: number' id: string}]
  classes: [
    {
      id: 'IA',
      data: [
        { year: 2011, semester: 1, average: 1, id: '2011.1' },
        { year: 2012, semester: 1, average: 2, id: '2012.1' },
        { year: 2013, semester: 1, average: 3, id: '2013.1' },
      ],
    },
    {
      id: 'ED',
      data: [
        { year: 2009, semester: 1, average: 5, id: '2009.1' },
        { year: 2010, semester: 1, average: 6, id: '2010.1' },
        { year: 2011, semester: 1, average: 7, id: '2011.1' },
      ],
    },
    {
      id: 'Calculo',
      data: [
        { year: 2010, semester: 1, average: 8, id: '2010.1' },
        { year: 2011, semester: 1, average: 9, id: '2011.1' },
        { year: 2012, semester: 1, average: 10, id: '2012.1' },
      ],
    },
  ],
});

export const getters = {
  getClasses(state, getters) {
    const returnClasses = [];
    // criate an object for every year/semester in record
    const categories = getters.getCategories;
    state.classes.forEach((element) => {
      returnClasses.push({ id: element.id });
    });
    returnClasses.forEach((returnClass) => {
      returnClass.data = [];
      categories.forEach((category) => {
        // finds the class matching the current class.id
        const classObj = state.classes.find(
          (element) => element.id === returnClass.id,
        );
        // finds the register of the class in this year/semester
        const value = classObj.data.find((x) => x.id === category);
        // check to avoid undefined.push()
        if (value) {
          returnClass.data.push(value.average);
        } else {
          returnClass.data.push(0);
        }
      });
    });
    return returnClasses;
  },
  getCategories(state) {
    const sheets = [];
    state.classes.forEach((element) => {
      element.data.forEach((e) => {
        sheets.push({ year: e.year, semester: e.semester });
      });
    });
    sheets.sort(
      (a, b) => a.year + 0.5 * a.semester - (b.year + 0.5 * b.semester),
    );
    sheets.categories = [];
    sheets.forEach((element) => {
      sheets.categories.push(`${element.year}.${element.semester}`);
    });
    const uniques = [...new Set(sheets.categories)];
    return uniques;
  },
};

export const mutations = {
  ADD_CLASS(state) {},
  SET_CLASSES(state) {},
  REMOVE_CATEGORY(state) {},
  REMOVE_CLASS(state) {},
};

export const actions = {
  includeClass({ commit, getters }, newClass) {},
  includeCategory({ commit, getters }, category) {},
};
