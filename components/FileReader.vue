<template>
  <label class="text-reader">
    <input type="file" @change="loadTextFromFile" />
  </label>
</template>

<script>
export default {
  methods: {
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => this.$emit('load', e.target.result);
      reader.readAsText(file);
    },
  },
};
</script>

<script>
import XLSX from 'xlsx';
export default {
  name: 'FileReader',
  methods: {
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = (e) => {
        var data = new Uint8Array(reader.result);
        var wb = XLSX.read(data, { type: 'array' });
        console.log(wb);
        var sheet = {};
        sheet.name = wb.SheetNames[0];
        sheet.data = wb.Sheets[sheet.name];
        var json = XLSX.utils.sheet_to_json(sheet.data);

        this.$emit('load', json);
      };
    },
  },
};
</script>
