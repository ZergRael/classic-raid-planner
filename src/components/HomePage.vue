<template>
  <h1 class="text-xl block text-center">Classic Raid Planner</h1>
  <div class="home-page flex">
    <RaidPlanner class="w-3/4" :group-count="8" />
    <div class="w-1/4">
      <Importer />
      <Exporter />
      <Warnings />
    </div>
  </div>
</template>

<script>
import RaidPlanner from "@/components/RaidPlanner.vue";
import Importer from "@/components/Importer.vue";
import Exporter from "@/components/Exporter.vue";
import Warnings from "@/components/Warnings.vue";

export default {
  name: "HomePage",
  components: {
    RaidPlanner,
    Importer,
    Exporter,
    Warnings,
  },
};
</script>
