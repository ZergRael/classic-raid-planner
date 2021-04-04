<template>
  <div class="grid grid-cols-2 lg:grid-cols-4">
    <Group v-for="i in groupCount" :key="i" :group-number="i" />
  </div>
</template>

<script>
import Group from "@/components/Group.vue";

export default {
  name: "RaidView",
  components: {
    Group,
  },
  props: {
    groupCount: {
      type: Number,
      required: true,
    },
  },
};
</script>
