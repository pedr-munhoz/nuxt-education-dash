<template>
  <v-card>
    <v-card-title>
      Disciplinas
    </v-card-title>
    <v-divider />
    <v-data-table :headers="dataTable.headers" :search="dataTable.search">
      <template #item.edit>
        <v-btn icon small>
          <v-icon>fas fa-pen</v-icon>
        </v-btn>
      </template>
      <template #item.delete>
        <v-btn icon small>
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'ClassesPage',

  data: () => ({
    dataTable: {
      headers: [
        { text: 'Nome' },
        { text: 'Editar', value: 'edit' },
        { text: 'Excluir', value: 'delete' }
      ],
      search: ''
    }
  })
};
</script>

<style></style>
