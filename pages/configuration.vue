<template>
  <v-card>
    <v-card-title>
      <v-container>
        <v-row>
          <v-col>Configurações</v-col>
          <v-col />
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
    <v-data-table
      :headers="dataTable.headers"
      :items="fields"
      :search="dataTable.search"
    >
      <template #item.edit="{ item }">
        <configuration-dialog
          :title="item.title"
          @update="update(item, $event)"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import ConfigurationDialog from '@/components/ConfigurationDialog.vue';

export default {
  name: 'ConfigurationPage',

  components: {
    ConfigurationDialog,
  },

  data: () => ({
    dataTable: {
      headers: [
        { text: 'Campo', value: 'title' },
        { text: 'Literal na tabela', value: 'value' },
        { text: 'Editar', value: 'edit' },
      ],
      search: '',
    },
  }),

  computed: {
    fields() {
      // return [];
      return this.$store.getters['configuration/getFields'];
    },
  },

  methods: {
    update(field, value) {
      const copy = { ...field };
      copy.value = value;
      this.$store.dispatch('configuration/updateField', copy);
    },
  },
};
</script>

<style></style>
