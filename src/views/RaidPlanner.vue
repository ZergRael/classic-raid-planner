<template>
  <h2 class="text-center">{{ $store.state.global.title }}</h2>
  <div class="raid-planner">
    <div class="flex">
      <div class="w-3/4">
        <Roster :group-count="8" />
        <Analyzer class="w-full" />
      </div>
      <div class="w-1/4">
        <Importer />
        <Exporter />
        <SaveLoad />
        <Bench />
      </div>
    </div>
  </div>
</template>

<script>
import Roster from "@/components/Roster.vue";
import Bench from "@/components/Bench.vue";
import SaveLoad from "@/components/SaveLoad.vue";
import Importer from "@/components/Importer.vue";
import Exporter from "@/components/Exporter.vue";
import Analyzer from "@/components/Analyzer.vue";

export default {
  name: "HomePage",
  components: {
    Roster,
    SaveLoad,
    Bench,
    Importer,
    Exporter,
    Analyzer,
  },
};
</script>
