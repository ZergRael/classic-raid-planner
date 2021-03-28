<template>
  <div class="home-page flex">
    <RaidPlanner :group-count="8" />
    <Importer />
    <Exporter />
  </div>
</template>

<script>
import RaidPlanner from "@/components/RaidPlanner.vue";
import Importer from "@/components/Importer.vue";
import Exporter from "@/components/Exporter.vue";

export default {
  name: "HomePage",
  components: {
    RaidPlanner,
    Importer,
    Exporter,
  },
};
</script>
