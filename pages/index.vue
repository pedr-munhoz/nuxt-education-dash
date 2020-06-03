<template>
  <div>
    <average-student />
    <v-divider />
    <average-vs-class-size />
    <v-divider />
    <average-vs-iteration />
  </div>
</template>

<script>
import AverageVsIteration from '@/components/AverageVsIteration.vue';
import AverageVsClassSize from '@/components/AverageVsClassSize.vue';
import AverageStudent from '@/components/AverageStudent.vue';

export default {
  name: 'HomePage',

  components: {
    AverageVsIteration,
    AverageVsClassSize,
    AverageStudent,
  },

  data: () => ({}),

  computed: {},

  mounted() {},

  methods: {
    test() {},
  },
};
</script>
