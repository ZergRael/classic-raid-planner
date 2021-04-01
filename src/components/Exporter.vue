<template>
  <div>
    <h2 class="text-xl">Export</h2>
    <textarea class="w-1/2 border" readonly v-model="output"></textarea>
    <button
      class="bg-green-100 rounded p-1 m-1 align-middle"
      @click="exportToClipboard"
    >
      Copy
    </button>
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
  methods: {
    exportToClipboard() {
      navigator.clipboard.writeText(this.output);
    },
  },
};
</script>
