<template>
  <div class="w-full md:w-1/4">
    <h3>Export</h3>
    <textarea readonly v-model="output"></textarea>
  </div>
</template>

<script>
export default {
  name: "Exporter",
  computed: {
    output: {
      get() {
        return this.$store.getters.rawPlayers.join("\n");
      },
    },
  },
};
</script>
