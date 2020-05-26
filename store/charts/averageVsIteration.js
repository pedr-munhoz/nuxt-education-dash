export const getters = {
  getAverages(state, getters, rootState, rootGetters) {
    const allIterations = getters.getIterations;
    const allClasses = rootGetters['charts/getClassesPure'];
    const allAverages = [];
    const { years } = rootGetters['charts/getLandmarks'];
    allClasses.forEach((element) => {
      const { data, ...thisClass } = element;
      thisClass.data = Array(allIterations.length).fill(0);
      element.data.forEach((e) => {
        const index = 2 * (e.year - years.low) + e.semester - 1;
        thisClass.data[index] = e.average;
      });
      allAverages.push(thisClass);
    });
    return allAverages;
  },

  getIterations(state, getters, rootState, rootGetters) {
    const iterations = [];
    const { years } = rootGetters['charts/getLandmarks'];
    if (rootGetters['charts/getClassesPure'].length !== 0) {
      for (let year = years.low; year <= years.high; year++) {
        iterations.push(`${year}.1`);
        iterations.push(`${year}.2`);
      }
    }
    return iterations;
  },
};
