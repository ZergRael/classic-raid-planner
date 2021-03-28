<template>
  <div>
    <h2 class="text-xl">Import</h2>
    <textarea class="w-1/2 border" v-model="input"></textarea>
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
