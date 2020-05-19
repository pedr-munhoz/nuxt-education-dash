<template>
  <div>
    <!--
    -->
    <apex-chart
      v-if="trigger"
      width="500"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apex-chart>
  </div>
</template>

<script>
// Include Dependencies
// import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'HomePage',

  components: {
    // eslint-disable-next-line vue/no-unused-components
    apexChart: () => import('vue-apexcharts'),
  },

  data: () => ({
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
    loadTest: [],
  }),

  computed: {
    averageVsIteration() {
      return this.$store.getters['charts/averageVsIteration/getClasses'];
    },
  },

  mounted() {
    this.mountChart();
    this.trigger = true;
  },

  methods: {
    mountChart() {
      const categories = this.$store.getters[
        'charts/averageVsIteration/getCategories'
      ];
      const classes = this.$store.getters[
        'charts/averageVsIteration/getClasses'
      ];
      this.chartOptions.xaxis.categories = [...categories];
      classes.forEach((element, index) => {
        this.series.push({ name: element.title, data: element.data });
      });
    },
  },
};
</script>
