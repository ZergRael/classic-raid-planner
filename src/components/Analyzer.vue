<template>
  <div>
    <h2 class="text-xl">Analyzer</h2>
    <div>
      <div v-for="e in errors" :key="e">
        {{ e }}
      </div>
      <div v-for="w in warnings" :key="w">
        {{ w }}
      </div>
      <div v-for="i in info" :key="i">
        {{ i }}
      </div>
      <div class="text-sm" v-for="d in debug" :key="d">
        {{ d }}
      </div>
    </div>
  </div>
</template>

<script>
import { round } from "@/utils/utils";
import classes from "@/constants/classes";
import { PLAYERS_BY_GROUP } from "@/constants/global";

export default {
  name: "Analyzer",
  computed: {
    roster() {
      return this.$store.state.players.roster;
    },
  },
  data() {
    return {
      errors: [],
      warnings: [],
      info: [],
      debug: [],
    };
  },
  methods: {
    cleanupMessages() {
      this.errors = [];
      this.warnings = [];
      this.info = [];
      this.debug = [];
    },
    triggerScan(roster) {
      this.cleanupMessages();
      console.log("scan");
      const start = performance.now();

      const realRosterCount = roster.filter((e) => e).length;
      if (realRosterCount < this.$store.state.raid.playerCount) {
        this.e(
          `Roster is missing members (${realRosterCount}/${this.$store.state.raid.playerCount})`
        );
        return;
      }

      this.i(
        `Nice, full raid (${realRosterCount}/${this.$store.state.raid.playerCount})`
      );

      const classesCount = this.classCount(roster);
      for (const [key, value] of Object.entries(classesCount)) {
        if (value > 8) {
          this.w(`You may have too much of a specific class (${key}:${value})`);
        }
      }

      for (
        let gid = 0;
        gid < this.$store.state.raid.playerCount / PLAYERS_BY_GROUP;
        gid++
      ) {
        const classesCount = classes.reduce(function (map, e) {
          map[e.name] = 0;
          return map;
        }, {});

        for (let name of roster.slice(
          PLAYERS_BY_GROUP * gid,
          PLAYERS_BY_GROUP * (gid + 1)
        )) {
          const player = this.$store.getters.playerByName(name);
          if (player) {
            ++classesCount[player.pClass];
          }
        }

        if (classesCount.hunter == 0) {
          if (classesCount.rogue > 0) {
            this.w(`G${gid + 1} has a rogue but no hunter`);
          }
          if (classesCount.warrior > 0) {
            this.w(`G${gid + 1} has a warrior but no hunter`);
          }
        }

        if (classesCount.warrior == 0) {
          if (classesCount.rogue > 0) {
            this.w(`G${gid + 1} has a rogue but no warrior`);
          }
        }

        if (classesCount.priest > 1) {
          this.w(`Stacking priests is not recommanded (G${gid + 1})`);
        }
      }

      this.d(`Took ${round(performance.now() - start, 3)}ms`);
      console.log("scan done");
    },
    classCount(roster) {
      const classesCount = classes.reduce(function (map, e) {
        map[e.name] = 0;
        return map;
      }, {});

      for (let name of roster) {
        const player = this.$store.getters.playerByName(name);
        ++classesCount[player.pClass];
      }

      return classesCount;
    },
    e(msg) {
      this.errors.push(msg);
    },
    w(msg) {
      this.warnings.push(msg);
    },
    i(msg) {
      this.info.push(msg);
    },
    d(msg) {
      this.debug.push(msg);
    },
  },
  watch: {
    roster: {
      handler(val) {
        this.triggerScan(val);
      },
      deep: true,
    },
  },
};
</script>
