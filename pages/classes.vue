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
      <template #item.edit="{ item }">
        <class-creator update @update="updateClass(item, $event)" />
      </template>
      <template #item.delete="{ item }">
        <v-btn icon small @click="deleteClass(item)">
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
    ClassCreator,
  },

  data: () => ({
    dataTable: {
      headers: [
        { text: 'Nome', value: 'title' },
        { text: 'Editar', value: 'edit' },
        { text: 'Excluir', value: 'delete' },
      ],
      search: '',
    },
  }),

  computed: {
    classes() {
      return this.$store.getters['classes/getClasses'];
    },
  },

  methods: {
    createClass(newClass) {
      this.$store.dispatch('classes/createClass', { title: newClass });
    },
    updateClass(currentClass, newClass) {
      this.$store.dispatch('classes/updateClass', {
        title: newClass,
        id: currentClass.id,
      });
    },
    deleteClass(currentClass) {
      this.$store.dispatch('classes/deleteClass', currentClass);
    },
  },
};
</script>
