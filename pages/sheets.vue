<template>
  <v-card>
    <v-card-title>
      <v-container>
        <v-row>
          <v-col>Tabelas</v-col>
          <v-col>
            <file-uploader />
          </v-col>
          <v-col>
            <v-text-field
              v-model="dataTable.search"
              label="Pesquisar"
              outlined
              append-icon="mdi-magnify"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-divider />
    <v-data-table
      :headers="dataTable.headers"
      :items="sheets"
      :search="dataTable.search"
    >
      <template #item.delete="{ item }">
        <v-btn icon small @click="deleteSheet(item)">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import FileUploader from '@/components/FileUploader.vue';

export default {
  name: 'SheetsPage',

  components: {
    FileUploader,
  },

  data: () => ({
    dataTable: {
      headers: [
        { text: 'Disciplina', value: 'class' },
        { text: 'Ano', value: 'year' },
        { text: 'Semestre', value: 'semester' },
        { text: 'Excluir', value: 'delete' },
      ],
      search: '',
    },
  }),

  computed: {
    sheets() {
      return this.$store.getters['sheets/getSheets'];
    },
  },

  methods: {
    deleteSheet(oldSheet) {
      this.$store.dispatch('sheets/deleteSheet', oldSheet);
    },
  },
};
</script>

<style></style>
