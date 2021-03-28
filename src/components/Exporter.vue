<template>
  <div>
    <h2 class="text-xl">Export</h2>
    <textarea class="w-1/2 border" readonly v-model="output"></textarea>
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
