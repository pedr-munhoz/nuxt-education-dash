export const state = () => ({
  classes: [],
  classes_alt: [
    { id: 'IA', year: 2010, semester: 2, average: 8, size: 28 },
    { id: 'IA', year: 2011, semester: 2, average: 7, size: 38 },
    { id: 'ED', year: 2010, semester: 2, average: 9, size: 20 },
  ],
});

export const getters = {
  getClassesPure(state) {
    return state.classes;
  },
  getClassIndex: (state, getters) => (possibleClass) => {
    const theClass = getters.getClassesPure.find(
      (element) => element.id === possibleClass.id,
    );
    return getters.getClassesPure.indexOf(theClass);
  },
};

export const mutations = {
  ADD_CLASS(state, newClass) {
    state.classes.push(newClass);
  },
  SET_CLASS(state, classIteration) {
    const theClass = state.classes.find(
      (element) => element.id === classIteration.id,
    );
    if (theClass) {
      classIteration.data.id = `${classIteration.data.year}.${classIteration.data.semester}`;
      theClass.data.push(classIteration.data);
    }
  },
  REMOVE_CLASS(state, index) {
    state.classes.splice(index, 1);
  },
};

export const actions = {
  parseSheet({ dispatch }, sheet) {
    const filteredAverages = sheet.data.filter(
      (element) => element.final_score,
    );
    const sum = filteredAverages.reduce((sum, element) => {
      return sum + element.final_score;
    }, 0);
    const classSize = filteredAverages.length;
    const average = sum / classSize;
    const classIteration = {
      id: sheet.class.id,
      title: sheet.class.title,
      data: {
        year: sheet.year,
        semester: sheet.semester,
        average: average.toFixed(1),
        size: classSize,
      },
    };
    dispatch('includeClassIteration', classIteration);
  },
  // recieves a class object (one year+semester instance) and adds it to the state
  includeClassIteration({ commit, getters }, classIteration) {
    if (getters.getClassIndex(classIteration) >= 0) {
      commit('SET_CLASS', classIteration);
    } else {
      classIteration.data.id = `${classIteration.data.year}.${classIteration.data.semester}`;
      commit('ADD_CLASS', {
        id: classIteration.id,
        title: classIteration.title,
        data: [classIteration.data],
      });
    }
  },
  // recieves a class object and deletes all data of it based on the .id attribute
  deleteClass({ commit, getters }, oldClass) {
    if (getters.getClassIndex(oldClass) >= 0) {
      commit('REMOVE_CLASS', getters.getClassIndex(oldClass));
    }
  },
};
