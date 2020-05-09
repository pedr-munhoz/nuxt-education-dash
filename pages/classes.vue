<template>
  <v-card>
    <v-card-title>Disciplinas</v-card-title>
    <v-divider />
    <v-data-table :headers="dataTable.headers" />
  </v-card>
</template>

<script>
export default {
  name: 'ClassesPage',

  data: () => ({
    dataTable: {
      headers: [{ text: 'Nome' }, { text: 'Ações', value: 'edit' }]
    }
  })
};
</script>

<style></style>
