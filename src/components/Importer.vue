<template>
  <div class="w-full md:w-1/4">
    <h3>Import</h3>
    <textarea v-model="input"></textarea>
  </div>
</template>

<script>
export default {
  name: "Importer",
  computed: {
    input: {
      get() {
        return "";
      },
      set(value) {
        this.$store.commit("import", { rawPlayers: value.split(/\s/) });
      },
    },
  },
};
</script>
