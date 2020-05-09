<template>
  <v-card>
    <v-card-title>Configurações</v-card-title>
    <v-divider />
    <v-data-table :headers="dataTable.headers" :items="fields" :item-key="id">
      <template #item.edit>
        <v-btn outlined small>
          editar
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'ConfigurationPage',

  data: () => ({
    dataTable: {
      headers: [
        { text: 'Campo', value: 'title' },
        { text: 'Literal na tabela', value: 'value' },
        { text: 'Editar', value: 'edit' }
      ]
    },

    fields: [
      { title: 'ID aluno', id: 1, value: '' },
      { title: 'Presença', id: 2, value: '' },
      { title: 'Média', id: 3, value: '' },
      { title: 'Aprovação', id: 4, value: '' }
    ]
  })
};
</script>

<style></style>
