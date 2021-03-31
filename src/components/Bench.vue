<template>
  <h2 class="text-xl">Bench</h2>
  <div class="border rounded p-1 m-0.5">
    <draggable
      class="bg-gray-100 justify-items-auto"
      v-model="players"
      :group="{
        name: 'raid-members',
      }"
      @start="onDragStart"
      @end="onDragEnd"
      item-key="id"
    >
      <template #item="{ element }">
        <Player :name="element" />
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Player from "@/components/Player.vue";

export default {
  name: "Bench",
  components: {
    draggable,
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
