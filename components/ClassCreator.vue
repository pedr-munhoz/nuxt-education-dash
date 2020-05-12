<template>
  <v-dialog v-model="dialog" width="640px">
    <template #activator="{ on }">
      <v-btn icon outlined v-on="on">
        <v-icon>mdi-plus</v-icon>
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
