export const getters = {
  getSizes(state, getters, rootState) {
    if (rootState.charts.classes.length === 0) {
      return [];
    }
    const allSizes = [];
    rootState.charts.classes.forEach((element) => {
      element.data.forEach((e) => {
        allSizes.push(e.size);
      });
    });
    allSizes.sort((a, b) => a - b);
    const returnSizes = [];
    for (let i = allSizes[0]; i <= allSizes[allSizes.length - 1]; i++) {
      returnSizes.push(i);
    }
    return returnSizes;
  },

  getClassesAlt(state, getters, rootState) {
    const returnSizes = [];
    const allSizes = [];
    const allClasses = rootState.charts.classes_alt;
    if (allClasses.length === 0) {
      return [];
    }
    allClasses.forEach((element) => {
      allSizes.push(element.size);
    });
    allSizes.sort();
    for (
      let index = allSizes[0];
      index <= allSizes[allSizes.length - 1];
      index++
    ) {
      returnSizes.push(index);
    }
    return { categories: returnSizes };
  },

  getClasses(state, getters, rootState) {
    const returnClasses = [];
    const allSizes = getters.getSizes;
    const smallerSize = allSizes[0];
    const data = [];
    const trigger = false;
    for (let index = 0; index < allSizes.length; index++) {
      data.push(0);
    }
    if (rootState.charts.classes.length === 0) {
      return [];
    }
    rootState.charts.classes.forEach((element) => {
      const aClass = {
        id: element.id,
        title: element.title,
        data: [...data],
      };
      element.data.forEach((e) => {
        const i = e.size - smallerSize;
        if (aClass.data[i] === 0) {
          aClass.data[i] = e.average;
        } else if (!trigger) {
          const aux = aClass.data[i];
          aClass.data[i] = [];
          aClass.data[i] = [aux, e.average];
        } else {
          aClass.data[i].push(e.average);
        }
        if (trigger) {
          const sum = aClass.data[i].reduce((sum, value) => {
            return sum + value;
          }, 0);
          aClass.data[i] = sum / aClass.length;
        }
      });
      returnClasses.push(aClass);
    });
    return returnClasses;
  },
};
