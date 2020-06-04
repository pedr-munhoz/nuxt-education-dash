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
  name: 'AverageStudent',

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
      if (allClasses[this.select.value.index]) {
        this.series = [];
        this.series.push({
          name: allClasses[this.select.value.index].title,
          data: [
            allClasses[this.select.value.index].first_test,
            allClasses[this.select.value.index].second_test,
            allClasses[this.select.value.index].third_test,
            allClasses[this.select.value.index].fourth_test,
            allClasses[this.select.value.index].final_score,
          ],
        });
      }
      this.trigger = true;
    },
  },
};
</script>
