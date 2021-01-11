<template>
  <v-card>
    <apex-chart
      v-if="trigger"
      width="90%"
      height="300px"
      type="line"
      :options="chartOptions"
      :series="series"
    />
  </v-card>
</template>

<script>
// Include Dependencies (ERROR, lazy load fix)
// import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'AverageVsIteration',

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
  }),

  computed: {},

  mounted() {
    this.mountChart();
  },

  methods: {
    mountChart() {
      // returs the year+semester combinations with avaliable data
      const categories = this.$store.getters[
        'charts/averageVsIteration/getIterations'
      ];

      // returns the averages by year/semester on all avaliable classes
      const classes = this.$store.getters[
        'charts/averageVsIteration/getAverages'
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
      // sets each class with a series on the chart
      this.series = [];
      classes.forEach((element, index) => {
        this.series.push({ name: element.title, data: element.data });
      });
      this.trigger = true;
    },
  },
};
</script>
