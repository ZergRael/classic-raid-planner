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
      <div class="quick-load divide-y">
        <div class="flex max-w-xs" v-for="s in saves" :key="s.name">
          <div class="inline-block flex-grow">{{ s.name }}</div>
          <div>
            <i
              class="gg-software-download inline-block mx-1 cursor-pointer"
              @click="load(s.name)"
              title="load"
            />
          </div>
          <!-- <i
          class="gg-software-upload inline-block mx-1 cursor-pointer"
          @click="save(s.name)"
          title="save"
        /> -->
          <div>
            <i
              class="gg-trash inline-block mx-1 cursor-pointer"
              @dblclick="del(s.name)"
              title="del"
            />
          </div>
        </div>
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
      const saveName = name || this.saveName;
      this.$store.commit("save", {
        roster: this.$store.getters.rawPlayers,
        bench: this.$store.state.players.bench,
        name: saveName,
      });
      this.$store.dispatch("success", "Saved");
      this.$store.commit("setTitle", saveName);
      this.saveName = "";
    },
    load(name) {
      const save = this.$store.getters.getSaveByName(name);
      if (!save) {
        return;
      }

      this.saveName = name;
      this.$store.commit("setTitle", name);
      this.$store.commit("import", {
        rawPlayers: save.roster,
        bench: save.bench,
      });
      this.$store.dispatch("success", "Loaded");
    },
    del(name) {
      this.$store.commit("delete", { name });
      this.$store.dispatch("success", "Deleted");
    },
  },
};
</script>
