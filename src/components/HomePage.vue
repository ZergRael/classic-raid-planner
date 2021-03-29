<template>
  <h1 class="text-xl block text-center">Classic Raid Planner</h1>
  <div class="home-page flex">
    <RaidPlanner class="w-3/4" :group-count="8" />
    <div class="w-1/4">
      <Importer />
      <Exporter />
      <Bench />
      <Warnings />
    </div>
  </div>
</template>

<script>
import RaidPlanner from "@/components/RaidPlanner.vue";
import Bench from "@/components/Bench.vue";
import Importer from "@/components/Importer.vue";
import Exporter from "@/components/Exporter.vue";
import Warnings from "@/components/Warnings.vue";

export default {
  name: "HomePage",
  components: {
    RaidPlanner,
    Bench,
    Importer,
    Exporter,
    Warnings,
  },
};
</script>
