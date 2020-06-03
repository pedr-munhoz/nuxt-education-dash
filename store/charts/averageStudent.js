export const getters = {
  getStudents(state, getters, rootState, rootGetters) {
    const allClasses = rootGetters['charts/getClassesPure'];
    const averageStudents = [];
    allClasses.forEach((element, index) => {
      averageStudents.push({
        title: element.title,
        first_test: rootGetters['charts/getTestAverageAllTime'](
          index,
          'first_test',
        ),
        second_test: rootGetters['charts/getTestAverageAllTime'](
          index,
          'second_test',
        ),
        third_test: rootGetters['charts/getTestAverageAllTime'](
          index,
          'third_test',
        ),
        fourth_test: rootGetters['charts/getTestAverageAllTime'](
          index,
          'fourth_test',
        ),
        final_score: rootGetters['charts/getClassAverageAllTime'](index),
      });
    });
    return averageStudents;
  },
};
