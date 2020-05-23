export const getters = {
  getClasses(state, getters, rootState) {
    const returnClasses = [];
    // criate an object for every year/semester in record
    const iterations = getters.getIterations;
    rootState.charts.classes.forEach((element) => {
      returnClasses.push({ id: element.id, title: element.title });
    });
    returnClasses.forEach((returnClass) => {
      returnClass.data = [];
      iterations.forEach((category) => {
        // finds the class matching the current class.id
        const classObj = rootState.charts.classes.find(
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

  getIterations(state, getters, rootState) {
    const sheets = [];
    if (rootState.charts.classes.length === 0) {
      return [];
    }
    rootState.charts.classes.forEach((element) => {
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
