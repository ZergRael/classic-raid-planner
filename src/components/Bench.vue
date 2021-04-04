<template>
  <h2 class="text-xl">Bench</h2>
  <div class="border rounded p-1 m-0.5">
    <div class="">
      <Player
        v-if="this.$store.state.global.drag"
        class="bench-area"
        @drop="onBenchDrop($event)"
        @dragover.prevent
        @dragenter.prevent
      />
      <Player
        draggable="true"
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
  name: "Bench",
  components: {
    Player,
  },
  computed: {
    players: {
      get() {
        return this.$store.state.players.bench;
      },
    },
  },
  methods: {
    onDragStart(e, position) {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("groupId", null);
      e.dataTransfer.setData("position", position);
      // this.$store.commit("setDrag", true);
    },
    onDragEnd() {
      // this.$store.commit("setDrag", false);
    },
    onDrop(e, to) {
      const fromGroupId = intOrNull(e.dataTransfer.getData("groupId"));
      const fromPosition = intOrNull(e.dataTransfer.getData("position"));
      this.$store.commit("swap", {
        from: { groupId: fromGroupId, position: fromPosition },
        to: { groupId: null, position: to },
      });
    },
    onBenchDrop(e) {
      const groupId = intOrNull(e.dataTransfer.getData("groupId"));
      const position = intOrNull(e.dataTransfer.getData("position"));
      this.$store.commit("bench", {
        groupId,
        position,
      });
    },
  },
};
</script>
