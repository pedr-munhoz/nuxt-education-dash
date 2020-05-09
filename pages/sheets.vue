<template>
  <v-card>
    <v-card-title>
      Tabelas
      <v-spacer />
      <v-btn icon outlined>
        <v-icon>fas fa-file-upload</v-icon>
      </v-btn>
      <v-spacer />
      <v-text-field
        v-model="dataTable.search"
        label="Pesquisar"
        outlined
        append-icon="fas fa-search"
      />
    </v-card-title>
    <v-divider />
    <v-data-table
      :headers="dataTable.headers"
      :items="dataTable.test"
      :search="dataTable.search"
    >
      <template #item.edit>
        <v-btn icon small>
          <v-icon>mdi-pencil-outline</v-icon>
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
  name: 'SheetsPage',

  data: () => ({
    dataTable: {
      headers: [
        { text: 'Disciplina', value: 'class' },
        { text: 'Ano', value: 'year' },
        { text: 'Semestre', value: 'semester' },
        { text: 'Editar', value: 'edit' },
        { text: 'Excluir', value: 'delete' }
      ],
      search: '',
      test: [
        { class: 'Geometria Analítica', year: '2019', semester: '1' },
        { class: 'Geometria Analítica', year: '2018', semester: '1' },
        { class: 'Cálculo II', year: '2018', semester: '1' }
      ]
    }
  })
};
</script>

<style></style>
