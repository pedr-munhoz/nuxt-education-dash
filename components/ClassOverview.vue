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
    <v-card-actions>
      <v-select
        v-model="select.value"
        :items="select.items"
        item-text="title"
        return-object
        label="Matéria"
        @change="mountChart()"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
// Include Dependencies (ERROR, lazy load fix)
// import VueApexCharts from 'vue-apexcharts';

export default {
  name: 'ClassOverview',

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
    select: {
      items: [],
      value: { index: 0 },
    },
  }),

  computed: {},

  mounted() {
    this.chartOptions = {
      ...this.chartOptions,
      ...{
        xaxis: {
          categories: [],
        },
      },
    };
    this.select.value.index = 0;
    this.mountChart();
  },

  methods: {
    mountChart() {
      const allClasses = this.$store.getters[
        'charts/averageStudent/getStudents'
      ];
      this.select.items = [];
      allClasses.forEach((element, index) => {
        this.select.items.push({ title: element.title, index });
      });
      this.chartOptions = {
        ...this.chartOptions,
        ...{
          xaxis: {
            categories: [],
          },
        },
      };
      this.chartOptions.xaxis.categories = [
        ...this.$store.getters['charts/classOverview/getIterations'](
          this.select.value.index,
        ),
      ];
      this.series = [];
      const scores = this.$store.getters['charts/classOverview/getOverview'](
        this.select.value.index,
      );
      scores.forEach((element, index) => {
        this.series.push({ name: element.title, data: element.data });
      });
      this.trigger = true;
    },
  },
};
</script>
