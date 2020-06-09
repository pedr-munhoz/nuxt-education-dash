<template>
  <div>
    <class-overview />
    <v-divider />
    <average-student />
    <v-divider />
    <average-vs-class-size v-if="false" />
    <v-divider />
    <average-vs-iteration />
  </div>
</template>

<script>
import AverageVsIteration from '@/components/AverageVsIteration.vue';
import AverageVsClassSize from '@/components/AverageVsClassSize.vue';
import AverageStudent from '@/components/AverageStudent.vue';
import ClassOverview from '@/components/ClassOverview.vue';

export default {
  name: 'HomePage',

  components: {
    AverageVsIteration,
    AverageVsClassSize,
    AverageStudent,
    ClassOverview,
  },

  data: () => ({}),

  computed: {},

  mounted() {},

  methods: {
    test() {
      const x = this.$store.getters['charts/classOverview/getIterations'](0);
      console.log(x);
    },
  },
};
</script>
