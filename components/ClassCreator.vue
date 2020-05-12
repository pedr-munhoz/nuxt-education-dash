<template>
  <v-dialog v-model="dialog" width="640px">
    <template #octivator="{ on }">
      <v-btn icon outlined v-on="on">
        <v-icon>fas fa-plus</v-icon>
      </v-btn>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: 'ClassCreator',

  data: () => ({
    dialog: false
  })
};
</script>
