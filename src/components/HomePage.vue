<template>
  <h1 class="text-xl block text-center">Classic Raid Planner</h1>
  <h2 class="text-center">{{ $store.state.global.title }}</h2>
  <div class="home-page">
    <div class="flex">
      <RaidPlanner class="w-3/4" :group-count="8" />
      <div class="w-1/4">
        <Importer />
        <Exporter />
        <SaveLoad />
        <Bench />
      </div>
    </div>
    <Analyzer class="w-full" />
  </div>
</template>

<script>
import RaidPlanner from "@/components/RaidPlanner.vue";
import Bench from "@/components/Bench.vue";
import SaveLoad from "@/components/SaveLoad.vue";
import Importer from "@/components/Importer.vue";
import Exporter from "@/components/Exporter.vue";
import Analyzer from "@/components/Analyzer.vue";

export default {
  name: "HomePage",
  components: {
    RaidPlanner,
    SaveLoad,
    Bench,
    Importer,
    Exporter,
    Analyzer,
  },
};
</script>
