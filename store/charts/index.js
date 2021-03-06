export const state = () => ({
  classes: [],
  years: {
    low: null,
    high: null,
  },
  sizes: {
    low: null,
    high: null,
  },
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
  getClassAverageAllTime: (state) => (index) => {
    const value = state.classes[index].sum / state.classes[index].data.length;
    return value;
  },
  getLandmarks(state) {
    return { years: state.years, sizes: state.sizes };
  },
  getTestAverageAllTime: (state) => (index, test) => {
    const sum = state.classes[index].data.reduce((sum, element) => {
      return sum + element[test];
    }, 0);
    return +(sum / state.classes[index].data.length).toFixed(1);
  },
};

export const mutations = {
  ADD_CLASS(state, newClass) {
    state.classes.push({ ...newClass, sum: newClass.data[0].average });
  },
  SET_CLASS(state, classIteration) {
    const theClass = state.classes.find(
      (element) => element.id === classIteration.id,
    );
    if (theClass) {
      classIteration.data.id = `${classIteration.data.year}.${classIteration.data.semester}`;
      theClass.data.push(classIteration.data);
      theClass.data.sort(
        (a, b) => a.year + 0.5 * a.semester - (b.year + 0.5 * b.semester),
      );
      theClass.sum += classIteration.data.average;
    }
  },
  REMOVE_CLASS(state, index) {
    state.classes.splice(index, 1);
  },
  SET_YEARS(state, years) {
    state.years = years;
  },
  SET_SIZES(state, sizes) {
    state.sizes = sizes;
  },
};

export const actions = {
  parseSheet({ commit, dispatch }, sheet) {
    const filteredAverages = sheet.data.filter(
      (element) => element.final_score,
    );
    const classSize = filteredAverages.length;
    const average = getAverage(filteredAverages, 'final_score');

    const classIteration = {
      id: sheet.class.id,
      title: sheet.class.title,
      data: {
        year: sheet.year,
        semester: sheet.semester,
        average,
        first_test: getAverage(filteredAverages, 'first_test'),
        second_test: getAverage(filteredAverages, 'second_test'),
        third_test: getAverage(filteredAverages, 'third_test'),
        fourth_test: getAverage(filteredAverages, 'fourth_test'),
        attendance: getAverage(filteredAverages, 'attendance'),
        size: classSize,
      },
    };
    getAverage(filteredAverages, 'first_test');
    dispatch('includeClassIteration', classIteration);
  },
  // recieves a class object (one year+semester instance) and adds it to the state
  includeClassIteration({ commit, getters, dispatch }, classIteration) {
    if (getters.getClassesPure.length > 0) {
      dispatch('updateHelpers', {
        year: classIteration.data.year,
        size: classIteration.data.size,
      });
    } else {
      dispatch('initiateHelpers', {
        year: classIteration.data.year,
        size: classIteration.data.size,
      });
    }

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

  // checks for helper update (years/sizes max/min)
  updateHelpers({ state, commit }, obj) {
    if (obj.year < state.years.low) {
      commit('SET_YEARS', {
        low: obj.year,
        high: state.years.high,
      });
    } else if (obj.year > state.years.high) {
      commit('SET_YEARS', {
        low: state.years.low,
        high: obj.year,
      });
    }

    if (obj.size < state.sizes.low) {
      commit('SET_SIZES', {
        low: obj.size,
        high: state.sizes.high,
      });
    } else if (obj.size > state.sizes.high) {
      commit('SET_SIZES', {
        low: state.sizes.low,
        high: obj.size,
      });
    }
  },

  // sets initial values for helpers (years/sizes max/min)
  initiateHelpers({ commit }, obj) {
    commit('SET_YEARS', {
      low: obj.year,
      high: obj.year,
    });

    commit('SET_SIZES', {
      low: obj.size,
      high: obj.size,
    });
  },

  // recieves a class object and deletes all data of it based on the .id attribute
  deleteClass({ commit, getters }, oldClass) {
    if (getters.getClassIndex(oldClass) >= 0) {
      commit('REMOVE_CLASS', getters.getClassIndex(oldClass));
    }
  },
};

function getAverage(students, param) {
  let sum = 0;
  let counter = 0;
  students.forEach((element) => {
    if (!isNaN(element[param])) {
      sum += element[param];
      counter++;
    }
  });
  return +(sum / counter).toFixed(1);
}
