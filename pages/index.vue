<template>
  <div>
    <apex-chart
      v-if="trigger"
      width="500"
      type="bar"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
// Include Dependencies (ERROR, lazy load fix)
// import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'HomePage',

  components: {
    // lazy load necessary, but component is only started on mounted
    apexChart: () => import('vue-apexcharts'),
  },

  data: () => ({
    // trigger used to activate the charts after the lazy load
    trigger: false,
    chartOptions: {
      chart: {
        id: 'vuechart-example',
      },
      xaxis: {
        categories: [],
      },
    },
    series: [],
    test: { v1: '', v2: '', v3: '' },
  }),

  computed: {},

  mounted() {
    this.mountChart();
    this.trigger = true;
  },

  methods: {
    mountChart() {
      // returs the year+semester combinations with avaliable data
      const categories = this.$store.getters[
        'charts/averageVsIteration/getCategories'
      ];
      // sets the year+semester combinations on the x axis
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: [],
          },
        },
      };
      this.chartOptions.xaxis.categories = [...categories];

      // returns the averages by year/semester on all avaliable classes
      const classes = this.$store.getters[
        'charts/averageVsIteration/getClasses'
      ];
      // sets each class with a series on the chart
      this.series = [];
      classes.forEach((element, index) => {
        this.series.push({ name: element.title, data: element.data });
      });
    },

    testFunction() {
      this.$store.dispatch('charts/averageVsIteration/parseSheet', {
        id: this.test.v1,
        data: { year: this.test.v3, semester: 1, average: this.test.v2 },
      });
    },
  },
};
</script>
