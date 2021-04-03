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
        v-for="name in players"
        :key="name"
        :name="name"
        @dragstart="onDragStart($event, name)"
        @dragend="onDragEnd"
        @drop="onDrop($event, name)"
        @dragover.prevent
        @dragenter.prevent
      />
    </div>
  </div>
</template>

<script>
import Player from "@/components/Player.vue";

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
    onDragStart(e, item) {
      console.log("dragStart-bench", item);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("item", item);
      this.$store.commit("setDrag", true);
    },
    onDragEnd() {
      this.$store.commit("setDrag", false);
    },
    onBenchDrop(e) {
      const item = e.dataTransfer.getData("item");
      console.log(item);
    },
    onDrop(e, to) {
      const item = e.dataTransfer.getData("item");
      this.$store.commit("swap", { from: item, to });
    },
  },
};
</script>
