<template>
  <div>
    <h2 class="text-xl">Warnings</h2>
    <div>
      <div v-for="w in warnings" :key="w">
        {{ w }}
      </div>
    </div>
  </div>
</template>

<script>
import classes from "@/constants/classes";

export default {
  name: "Warnings",
  computed: {
    roster() {
      return this.$store.state.players.roster;
    },
  },
  data() {
    return {
      warnings: [],
    };
  },
  methods: {
    triggerScan(roster) {
      console.log('scan');
      this.warnings.splice(0, this.warnings.length);

      if (roster.length < this.$store.state.raid.playerCount) {
        this.w(
          `Roster is missing members (${roster.length}/${this.$store.state.raid.playerCount})`
        );
        return;
      }

      this.w(
        `Nice, full raid (${roster.length}/${this.$store.state.raid.playerCount})`
      );

      const classesCount = this.classCount(roster);
      for (const [key, value] of Object.entries(classesCount)) {
        if (value > 8) {
          this.w(`You may have too much of a specific class (${key}:${value})`);
        }
      }

      console.log('scan done');
    },
    classCount(roster) {
      const classesCount = classes
        .map((e) => {
          return { name: e.name, count: 0 };
        })
        .reduce(function (map, e) {
          map[e.name] = e.count;
          return map;
        }, {});

      for (let p of roster) {
        ++classesCount[p.pClass];
      }

      return classesCount;
    },
    w(msg) {
      this.warnings.push(msg);
    },
  },
  watch: {
    roster: {
      handler(val) {
        this.triggerScan(val);
      },
      deep: true,
    },
  }
};
</script>
