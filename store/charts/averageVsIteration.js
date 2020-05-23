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
    const iterations = [];
    if (rootState.charts.classes.length !== 0) {
      for (
        let year = rootState.charts.years.low;
        year <= rootState.charts.years.high;
        year++
      ) {
        iterations.push(`${year}.1`);
        iterations.push(`${year}.2`);
      }
    }
    return iterations;
  },
};
