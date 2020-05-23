<template>
  <v-card>
    <apex-chart
      v-if="trigger"
      width="90%"
      height="300px"
      type="bar"
      :options="chartOptions"
      :series="series"
    />
  </v-card>
</template>

<script>
// Include Dependencies (ERROR, lazy load fix)
// import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'AverageVsClasssize',

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
    this.trigger = true;
  },

  methods: {
    mountChart() {
      const categories = this.$store.getters[
        'charts/averageVsClassSize/getSizes'
      ];
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: [...categories],
          },
        },
      };
      const classes = this.$store.getters[
        'charts/averageVsClassSize/getClasses'
      ];
      this.series = [];
      classes.forEach((element, index) => {
        this.series.push({ name: element.title, data: element.data });
      });
    },
  },
};
</script>
