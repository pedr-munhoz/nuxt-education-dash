<template>
  <v-dialog v-model="dialog" width="640px">
    <template #activator="{ on }">
      <v-btn icon outlined v-on="on">
        <v-icon>mdi-file-upload</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        Carregar nova tabela
        <v-spacer />
        <v-btn small color="red" icon @click="close()">
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text class="mt-10">
        <v-container>
          <v-row>
            <v-col>
              <v-select
                v-model="file.class"
                :items="classes"
                item-text="title"
                label="Disciplina"
                outlined
              />
            </v-col>
            <v-col>
              <file-reader @load="load($event)" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="file.year" label="Ano" outlined />
            </v-col>
            <v-col>
              <v-select
                v-model="file.semester"
                :items="possibleSemesters"
                label="Semestre"
                outlined
              />
            </v-col>
          </v-row>
        </v-container>
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
import FileReader from '@/components/FileReader.vue';

export default {
  name: 'FileUploader',

  components: {
    FileReader
  },

  data: () => ({
    dialog: false,
    file: {
      class: '',
      year: '',
      semester: '',
      data: ''
    },
    possibleSemesters: [1, 2]
  }),

  computed: {
    classes() {
      return this.$store.state.classes.list;
    }
  },

  methods: {
    load(file) {
      this.trigger = true;
      this.file.data = file;
    },

    close() {
      this.dialog = false;
    },

    confirm() {
      this.$store.commit('sheets/add', this.file);
      this.close();
    }
  }
};
</script>

<style></style>
