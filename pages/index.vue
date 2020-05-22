<template>
  <div>
    <average-vs-class-size />
    <v-divider />
    <average-vs-iteration />
  </div>
</template>

<script>
import AverageVsIteration from '@/components/AverageVsIteration.vue';
import AverageVsClassSize from '@/components/AverageVsClassSize.vue';

export default {
  name: 'HomePage',

  components: {
    AverageVsIteration,
    AverageVsClassSize,
  },

  data: () => ({}),

  computed: {},

  mounted() {},

  methods: {},
};
</script>
