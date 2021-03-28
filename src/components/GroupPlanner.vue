<template>
  <div class="border rounded p-1 m-0.5">
    <h3>G{{ groupNumber }}</h3>
    <draggable
      class="bg-gray-100 justify-items-auto"
      v-model="players"
      :group="{
        name: 'raid-members',
        put: (to, from) => to.el.children.length < 5,
      }"
      @start="onDragStart"
      @end="onDragEnd"
      item-key="id"
    >
      <template #item="{ element }">
        <Player :p="element" />
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
  data: () => {
    return {
      drag: false,
    };
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
    onDragStart() {
      this.drag = true;
    },
    onDragEnd() {
      this.drag = false;
    },
  },
};
</script>
