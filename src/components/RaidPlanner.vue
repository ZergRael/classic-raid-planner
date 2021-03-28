<template>
  <div class="grid grid-cols-2 w-full md:w-3/4">
    <GroupPlanner v-for="i in groupCount" :key="i" :group-number="i" />
  </div>
</template>

<script>
import GroupPlanner from "@/components/GroupPlanner.vue";

export default {
  name: "RaidPlanner",
  components: {
    GroupPlanner,
  },
  props: {
    groupCount: {
      type: Number,
      required: true,
    },
  },
};
</script>
