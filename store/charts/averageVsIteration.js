export const state = () => ({
  // classes [id,[{ year: number, semester: number(1/2), average: number' id: string}]]
  classes: [],
});

export const getters = {
  getClasses(state, getters) {
    const returnClasses = [];
    // criate an object for every year/semester in record
    const iterations = getters.getIterations;
    state.classes.forEach((element) => {
      returnClasses.push({ id: element.id, title: element.title });
    });
    returnClasses.forEach((returnClass) => {
      returnClass.data = [];
      iterations.forEach((category) => {
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
  getIterations(state) {
    if (state.classes.length === 0) {
      return [];
    }
    const sheets = [];
    state.classes.forEach((element) => {
      element.data.forEach((e) => {
        sheets.push({ year: e.year, semester: e.semester });
      });
    });
    sheets.sort(
      (a, b) => a.year + 0.5 * a.semester - (b.year + 0.5 * b.semester),
    );
    sheets.iterations = [];
    for (
      let year = sheets[0].year;
      year <= sheets[sheets.length - 1].year;
      year++
    ) {
      sheets.iterations.push(`${year}.1`);
      sheets.iterations.push(`${year}.2`);
    }
    const uniques = [...new Set(sheets.iterations)];
    return uniques;
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
    const average = sum / filteredAverages.length;
    const classIteration = {
      id: sheet.class.id,
      title: sheet.class.title,
      data: {
        year: sheet.year,
        semester: sheet.semester,
        average: average.toFixed(1),
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
