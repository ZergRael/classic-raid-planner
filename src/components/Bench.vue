<template>
  <h2 class="text-xl">Bench</h2>
  <div class="border rounded p-1 m-0.5">
    <div class="bg-gray-100 justify-items-auto">
      <Player
        draggable="true"
        v-for="name in players"
        :key="name"
        :name="name"
        @dragstart="onDragStart($event, name)"
        @dragend="onDragEnd"
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
  data() {
    return {
      players: [],
    };
  },
  methods: {
    onDragStart() {
      this.$store.commit("setDrag", true);
    },
    // this.$store.state.global.drag
    onDragEnd() {
      this.$store.commit("setDrag", false);
    },
  },
};
</script>
