<template>
  <div class="grid grid-cols-2 lg:grid-cols-4">
    <GroupView v-for="i in groupCount" :key="i" :group-number="i" />
  </div>
</template>

<script>
import GroupView from "@/components/GroupView.vue";

export default {
  name: "RaidView",
  components: {
    GroupView,
  },
  props: {
    groupCount: {
      type: Number,
      required: true,
    },
  },
};
</script>
