<template>
  <v-card>
    <v-card-title>
      <v-container>
        <v-row>
          <v-col>Disciplinas</v-col>
          <v-col>
            <class-creator @update="createClass($event)" />
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
      :items="classes"
      :headers="dataTable.headers"
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
import ClassCreator from '@/components/ClassCreator.vue';

export default {
  name: 'ClassesPage',

  components: {
    ClassCreator
  },

  data: () => ({
    dataTable: {
      headers: [
        { text: 'Nome', value: 'title' },
        { text: 'Editar', value: 'edit' },
        { text: 'Excluir', value: 'delete' }
      ],
      search: ''
    },
    classes: []
  }),

  methods: {
    createClass(newClass) {
      this.classes.push({ title: newClass });
    }
  }
};
</script>
