<template>
  <v-card>
    <v-card-title>Tabelas</v-card-title>
    <v-divider />
    <v-data-table :headers="dataTable.headers" />
  </v-card>
</template>

<script>
export default {
  name: 'SheetsPage',

  data: () => ({
    dataTable: {
      headers: [
        { text: 'Disciplina' },
        { text: 'Ano' },
        { text: 'Semestre' },
        { text: 'Excluir', value: 'delete' }
      ]
    }
  })
};
</script>

<style></style>
