<template>
  <v-card>
    <v-card-title>
      Configurações
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
      :items="fields"
      :search="dataTable.search"
    >
      <template #item.edit="{ item }">
        <configuration-dialog :title="item.title" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ConfigurationDialog from '@/components/ConfigurationDialog.vue';

export default {
  name: 'ConfigurationPage',

  components: {
    ConfigurationDialog
  },

  data: () => ({
    dataTable: {
      headers: [
        { text: 'Campo', value: 'title' },
        { text: 'Literal na tabela', value: 'value' },
        { text: 'Editar', value: 'edit' }
      ],
      search: ''
    },

    fields: [
      { title: 'ID aluno', value: '' },
      { title: 'Primeira avaliação', value: '' },
      { title: 'Segunda avaliação', value: '' },
      { title: 'Terceira avaliação', value: '' },
      { title: 'Quarta avaliação', value: '' },
      { title: 'Presença', value: '' },
      { title: 'Média', value: '' },
      { title: 'Aprovação', value: '' }
    ]
  })
};
</script>

<style></style>
