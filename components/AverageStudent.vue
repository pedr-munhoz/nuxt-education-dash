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
  name: 'AverageStudent',

  components: {
    // lazy load necessary, but component is only started on mounted
    apexChart: () => import('vue-apexcharts'),
  },

  data: () => ({
    // trigger used to activate the charts after the lazy load
    trigger: false,
    classSelct: 0,
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

  computed: {
    configurationFields() {
      const fields = [...this.$store.getters['configuration/getFields']];
      fields.splice(0, 1);
      fields.splice(4, 1);
      fields.splice(5);
      return fields.map((element) => element.title);
    },
  },

  mounted() {
    this.chartOptions = {
      ...this.chartOptions,
      ...{
        xaxis: {
          categories: [],
        },
      },
    };
    this.chartOptions.xaxis.categories = [...this.configurationFields];
    this.mountChart();
  },

  methods: {
    mountChart() {
      const allClasses = this.$store.getters[
        'charts/averageStudent/getStudents'
      ];
      if (allClasses[this.classSelct]) {
        this.series = [];
        this.series.push({
          name: allClasses[this.classSelct].title,
          data: [
            allClasses[this.classSelct].first_test,
            allClasses[this.classSelct].second_test,
            allClasses[this.classSelct].third_test,
            allClasses[this.classSelct].fourth_test,
            allClasses[this.classSelct].final_score,
          ],
        });
      }
      this.trigger = true;
    },
  },
};
</script>
