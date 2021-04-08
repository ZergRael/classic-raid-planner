<template>
  <div>
    <h2 class="text-xl">Export</h2>
    <textarea class="w-1/2 border block" readonly v-model="output"></textarea>
    <button
      class="bg-green-100 rounded p-1 m-1 align-middle"
      @click="exportToClipboard"
    >
      Copy
    </button>
    <button
      class="bg-green-100 rounded p-1 m-1 align-middle"
      @click="sheetToClipboard"
    >
      Copy as Sheet
    </button>
  </div>
</template>

<script>
import { PLAYERS_BY_GROUP } from "@/constants/global";
import classes from "@/constants/classes";

export default {
  name: "Exporter",
  computed: {
    output: {
      get() {
        return this.$store.getters.rawPlayers.join("\n");
      },
    },
  },
  methods: {
    exportToClipboard() {
      navigator.clipboard.writeText(this.output);
    },
    sheetToClipboard() {
      const players = this.$store.getters.rawPlayers;
      const groupsCount = Math.ceil(players.length / PLAYERS_BY_GROUP);
      const lines = [[]];
      for (let i = 0; i < groupsCount; i++) {
        lines[0].push(`<td>G${i + 1}</td>`);
        for (let j = 0; j < PLAYERS_BY_GROUP; j++) {
          if (!lines[j + 1]) {
            lines[j + 1] = [];
          }
          const name = players[i * PLAYERS_BY_GROUP + j];
          const player = this.$store.getters.playerByName(name);
          let color = "#AAAAAA";
          if (player.pClass) {
            color = classes.find((e) => e.name == player.pClass).color;
          }

          lines[j + 1].push(
            `<td style="background-color: ${color}">${name}</td>`
          );
        }
      }

      const content = [
        "<table>",
        `<tr><th colspan="${groupsCount}">${this.$store.state.global.title}</th></tr>`,
      ];
      for (let l of lines) {
        content.push(`<tr>${l.join("")}</tr>`);
      }
      content.push("</table>");

      // eslint-disable-next-line no-undef
      let data = new ClipboardItem({
        "text/html": new Blob([content.join("")], { type: "text/html" }),
      });
      navigator.clipboard.write([data]);
    },
  },
};
</script>
