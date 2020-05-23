export const getters = {
  getSizes(state, getters, rootState) {
    const returnSizes = [];
    if (rootState.charts.classes.length !== 0) {
      for (
        let i = rootState.charts.sizes.low;
        i <= rootState.charts.sizes.high;
        i++
      ) {
        returnSizes.push(i);
      }
    }
    return returnSizes;
  },

  getAverages(state, getters, rootState) {
    const allAverages = Array(getters.getSizes.length).fill(0);
    rootState.charts.classes.forEach((element) => {
      element.data.forEach((e) => {
        const index = e.size - rootState.charts.sizes.low;
        allAverages[index] = e.average;
      });
    });
    return allAverages;
  },
};
