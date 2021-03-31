<template>
  <div class="border rounded p-1 m-0.5">
    <h3>G{{ groupNumber }}</h3>
    <draggable
      class="bg-gray-100 justify-items-auto"
      v-model="players"
      :group="{
        name: 'raid-members',
        //put: (to, from) => to.el.children.length < 5,
      }"
      @start="onDragStart"
      :move="onMove"
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
  name: "GroupPlanner",
  props: {
    groupNumber: {
      type: Number,
      required: true,
    },
  },
  components: {
    draggable,
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
    // this.$store.state.global.drag
    onDragStart() {
      this.$store.commit("setDrag", true);
    },
    onMove(e) {
      const { index, futureIndex } = e.draggedContext;
      this.$store.commit("setMove", { index, futureIndex });
      return false;
    },
    onDragEnd() {
      this.$store.commit("setDrag", false);
      this.$store.dispatch("swap");
    },
  },
};
</script>
