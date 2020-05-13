<template>
  <v-dialog v-model="dialog" width="640px">
    <template #activator="{ on }">
      <v-btn icon small v-on="on">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        {{ title }}
        <v-spacer />
        <v-btn small color="red" icon @click="close()">
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-10">
        <v-text-field v-model="value" outlined />
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
  name: 'ConfigurationDialog',

  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
  },

  data: () => ({
    dialog: false,
    value: '',
  }),

  methods: {
    close() {
      this.dialog = false;
    },

    confirm() {
      this.$emit('update', this.value);
      this.close();
    },
  },
};
</script>
