<template>
  <div>
    <attendance-vs-iteration />
    <v-divider />
    <class-overview />
    <v-divider />
    <average-student />
    <v-divider />
    <average-vs-iteration />
  </div>
</template>

<script>
import AverageVsIteration from '@/components/AverageVsIteration.vue';
import AverageStudent from '@/components/AverageStudent.vue';
import ClassOverview from '@/components/ClassOverview.vue';
import AttendanceVsIteration from '@/components/AttendanceVsIteration.vue';

export default {
  name: 'HomePage',

  components: {
    AverageVsIteration,
    AverageStudent,
    ClassOverview,
    AttendanceVsIteration,
  },

  data: () => ({}),

  computed: {},

  mounted() {},

  methods: {},
};
</script>
