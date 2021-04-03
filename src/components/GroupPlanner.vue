<template>
  <div class="border rounded p-1 m-0.5">
    <h3>G{{ groupNumber }}</h3>
    <div class="">
      <Player
        :draggable="!!name"
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
  name: "GroupPlanner",
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
      set(value) {
        this.$store.commit("setPlayersByGroup", {
          groupId: this.groupId,
          value,
        });
      },
    },
  },
  methods: {
    onDragStart(e, item) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("item", item);
      this.$store.commit("setDrag", true);
    },
    // this.$store.state.global.drag
    onDragEnd() {
      this.$store.commit("setDrag", false);
    },
    onDrop(e, to) {
      const item = e.dataTransfer.getData("item");
      this.$store.commit("swap", { from: item, to });
    },
  },
};
</script>
