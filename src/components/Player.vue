<template>
  <div class="m-1 border rounded bg-red-400">
    <div class="p-1" v-if="editMode">
      <input
        type="text"
        class="w-full"
        ref="playerNameInput"
        v-model="newName"
        @keyup.enter="saveNameChange"
        @keyup.esc="editMode = false"
      />
    </div>
    <div
      class="p-1"
      v-else-if="player"
      :class="bgClass"
      @dblclick="onDoubleClick"
    >
      <ClassSelect
        class="px-0.5"
        :p-class="player.pClass"
        @pclass-select="onPClassSelect"
      />
      <SpecSelect
        class="px-0.5"
        :p-class="player.pClass"
        :spec="player.spec"
        @spec-select="onSpecSelect"
      />
      <span class="player-name">{{ name }}</span>
    </div>
    <div class="p-1" v-else-if="name">__{{ name }}</div>
    <div class="p-1" v-else @dblclick="onDoubleClick">
      <i class="inline-block" />
    </div>
  </div>
</template>

<script>
import ClassSelect from "@/components/ClassSelect.vue";
import SpecSelect from "@/components/SpecSelect.vue";

export default {
  name: "Player",
  props: {
    name: String,
  },
  data() {
    return {
      editMode: false,
      newName: this.name,
    };
  },
  components: {
    ClassSelect,
    SpecSelect,
  },
  computed: {
    bgClass() {
      return this.player.pClass ? "bg-" + this.player.pClass : "bg-gray-200";
    },
    player() {
      return this.$store.getters.playerByName(this.name);
    },
  },
  methods: {
    onClick() {},
    onDoubleClick() {
      this.editMode = true;
      this.$nextTick(() => {
        this.$refs.playerNameInput.focus();
      });
    },
    saveNameChange() {
      this.$store.commit("updateRosterPlayerName", {
        from: this.name,
        to: this.newName,
      });
      this.editMode = false;
    },
    onPClassSelect(pClass) {
      if (!this.player) {
        return;
      }

      this.$store.commit("setPlayerPClass", {
        name: this.name,
        pClass,
      });
    },
    onSpecSelect(spec) {
      if (!this.player) {
        return;
      }

      this.$store.commit("setPlayerSpec", {
        name: this.name,
        spec,
      });
    },
  },
};
</script>
