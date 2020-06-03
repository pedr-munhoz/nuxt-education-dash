export const getters = {
  getSizes(state, getters, rootState, rootGetters) {
    const returnSizes = [];
    const { sizes } = rootGetters['charts/getLandmarks'];
    if (rootGetters['charts/getClassesPure'].length !== 0) {
      for (let index = sizes.low; index <= sizes.high; index++) {
        returnSizes.push(index);
      }
    }
    return returnSizes;
  },

  getAverages(state, getters, rootState, rootGetters) {
    const allAverages = Array(getters.getSizes.length).fill(0);
    const { sizes } = rootGetters['charts/getLandmarks'];
    const allClasses = rootGetters['charts/getClassesPure'];
    let allTimeAverage;
    allClasses.forEach((element, index) => {
      allTimeAverage = rootGetters['charts/getClassAverageAllTime'](index);
      element.data.forEach((e) => {
        const index = e.size - sizes.low;
        allAverages[index] = +(e.average - allTimeAverage).toFixed(2);
      });
    });
    return allAverages;
  },
};
