export const getters = {
  getIterations: (state, getters, rootState, rootGetters) => (index) => {
    const theClass = rootGetters['charts/getClassesPure'][index];
    const iterations = [];
    if (theClass) {
      for (
        let index = theClass.data[0].year;
        index <= theClass.data[theClass.data.length - 1].year;
        index++
      ) {
        iterations.push(index);
      }
    }

    return iterations;
  },

  getOverview: (state, getters, rootState, rootGetters) => (index) => {
    const theClass = rootGetters['charts/getClassesPure'][index];
    const allIterations = getters.getIterations(index);
    const returnClass = [];
    if (theClass) {
      for (let index = 0; index < 5; index++) {
        returnClass.push({ data: Array(allIterations.length).fill(0) });
      }
      returnClass[0].title = rootGetters['configuration/getFields'][1].value;
      returnClass[1].title = rootGetters['configuration/getFields'][2].value;
      returnClass[2].title = rootGetters['configuration/getFields'][3].value;
      returnClass[3].title = rootGetters['configuration/getFields'][4].value;
      returnClass[4].title = rootGetters['configuration/getFields'][6].value;
      theClass.data.forEach((element) => {
        const index = element.year - allIterations[0];
        returnClass[0].data[index] = element.first_test;
        returnClass[1].data[index] = element.second_test;
        returnClass[2].data[index] = element.third_test;
        returnClass[3].data[index] = element.fourth_test;
        returnClass[4].data[index] = element.average;
      });
    }

    return returnClass;
  },
};
