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
  getClassesPure(state) {
    return state.classes;
  },
  getClassIndex: (state, getters) => (possibleClass) => {
    const theClass = getters.getClassesPure.find(
      (element) => element.id === possibleClass.id,
    );
    return getters.getClassesPure.indexOf(theClass);
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
  ADD_CLASS(state, newClass) {
    newClass.data.id = `${newClass.data.year}.${newClass.data.semester}`;
    newClass.data = [newClass.data];
    state.classes.push(newClass);
  },
  SET_CLASS(state, newClass) {
    const currentClass = state.classes.find(
      (element) => element.id === newClass.id,
    );
    if (currentClass) {
      newClass.data.id = `${newClass.data.year}.${newClass.data.semester}`;
      currentClass.data.push(newClass.data);
    }
  },
  REMOVE_CLASS(state, index) {
    state.classes.splice(index, 1);
  },
};

export const actions = {
  parseSheet() {},
  // recieves a class object (one year+semester instance) and adds it to the state
  includeClass({ commit, getters }, newClass) {
    if (getters.getClassIndex(newClass) >= 0) {
      commit('SET_CLASS', newClass);
    } else {
      commit('ADD_CLASS', newClass);
    }
  },
  // recieves a class object and deletes all data of it based on the .id attribute
  deleteClass({ commit, getters }, oldClass) {
    if (getters.getClassIndex(oldClass) >= 0) {
      commit('REMOVE_CLASS', getters.getClassIndex(oldClass));
    }
  },
};
