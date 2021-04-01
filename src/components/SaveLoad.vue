<template>
  <div>
    <h2 class="text-xl">Save/Load</h2>
    <div>
      <input
        class="border"
        type="text"
        v-model="saveName"
        @keyup.enter="save()"
      />
      <button class="ring-1" @click="save()">Save</button>
      <div class="quick-load" v-for="s in saves" :key="s.name">
        {{ s.name }}
        <i
          class="gg-software-download inline-block mx-1 cursor-pointer"
          @click="load(s.name)"
          title="load"
        />
        <!-- <i
          class="gg-software-upload inline-block mx-1 cursor-pointer"
          @click="save(s.name)"
          title="save"
        /> -->
        <i
          class="gg-trash inline-block mx-1 cursor-pointer"
          @dblclick="del(s.name)"
          title="del"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SaveLoad",
  data() {
    return {
      saveName: "",
    };
  },
  computed: {
    saves() {
      return this.$store.getters.saves;
    },
  },
  methods: {
    save(name) {
      this.$store.commit("save", {
        roster: this.$store.getters.rawPlayers,
        name: name || this.saveName,
      });
      this.saveName = "";
    },
    load(name) {
      const save = this.$store.getters.getSaveByName(name);
      if (!save) {
        return;
      }

      this.saveName = name;
      this.$store.commit("setTitle", name);
      this.$store.commit("import", { rawPlayers: save.roster });
    },
    del(name) {
      this.$store.commit("delete", { name });
    },
  },
};
</script>
