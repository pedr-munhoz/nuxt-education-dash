<template>
  <v-dialog v-model="dialog" width="640px">
    <template #activator="{ on }">
      <v-btn icon outlined v-on="on">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Nova disciplina
        <v-spacer />
        <v-btn small color="red" icon @click="close()">
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-10">
        <v-text-field v-model="value" label="Nome" outlined />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn outlined @click="confirm()">
          <v-icon>mdi-check-bold</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ClassCreator',

  data: () => ({
    dialog: false,
    value: ''
  }),

  methods: {
    close() {
      this.dialog = false;
    },

    confirm() {
      this.$emit('update', this.value);
      this.close();
    }
  }
};
</script>
