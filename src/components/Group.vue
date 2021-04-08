<template>
  <div class="border rounded p-1 m-0.5">
    <h3>G{{ groupNumber }}</h3>
    <div class="">
      <Player
        :draggable="!!name"
        v-for="(name, idx) in players"
        :key="name"
        :name="name"
        @dragstart="onDragStart($event, idx)"
        @dragend="onDragEnd"
        @drop="onDrop($event, idx)"
        @dragover.prevent
        @dragenter.prevent
      />
    </div>
  </div>
</template>

<script>
import Player from "@/components/Player.vue";
import { intOrNull } from "@/utils/utils";

export default {
  name: "GroupView",
  props: {
    groupNumber: {
      type: Number,
      required: true,
    },
  },
  components: {
    Player,
  },
  computed: {
    groupId() {
      return this.groupNumber - 1;
    },
    players: {
      get() {
        return this.$store.getters.playersByGroup(this.groupId);
      },
    },
  },
  methods: {
    onDragStart(e, position) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("groupId", this.groupId);
      e.dataTransfer.setData("position", position);
      console.log(this.groupId, position);
      this.$store.commit("setDrag", true);
    },
    onDragEnd() {
      this.$store.commit("setDrag", false);
    },
    onDrop(e, to) {
      const fromGroupId = intOrNull(e.dataTransfer.getData("groupId"));
      const fromPosition = intOrNull(e.dataTransfer.getData("position"));
      this.$store.commit("swap", {
        from: { groupId: fromGroupId, position: fromPosition },
        to: { groupId: this.groupId, position: to },
      });
    },
  },
};
</script>
