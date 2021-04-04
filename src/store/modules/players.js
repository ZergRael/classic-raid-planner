import { PLAYERS_BY_GROUP, MAX_PLAYERS } from "@/constants/global";
import { isPlayerNameValid } from "@/utils/utils";

const state = () => ({
  roster: Array(MAX_PLAYERS).fill(null),
  bench: [],
  players: {},
});

const emptyPlayer = {};

const getters = {
  playersByGroup: (state) => (groupId) => {
    return state.roster.slice(
      PLAYERS_BY_GROUP * groupId,
      PLAYERS_BY_GROUP * (groupId + 1)
    );
  },
  playerByName: (state) => (name) => {
    if (!isPlayerNameValid(name)) {
      return null;
    }

    return state.players[name.toLowerCase()] || emptyPlayer;
  },
  rawPlayers: (state) => {
    return state.roster.slice(0, MAX_PLAYERS);
  },
};

const actions = {};

function initPlayer(state, name) {
  if (!state.players[name]) {
    state.players[name] = {};
  }
}

const mutations = {
  setPlayersByGroup(state, { groupId, value }) {
    state.roster.splice(
      PLAYERS_BY_GROUP * groupId,
      PLAYERS_BY_GROUP,
      ...value.concat(
        Array(PLAYERS_BY_GROUP - value.slice(0, MAX_PLAYERS).length).fill(null)
      )
    );
  },
  import(state, { rawPlayers, bench }) {
    state.roster = rawPlayers
      .slice(0, MAX_PLAYERS)
      .map((name) => {
        if (!isPlayerNameValid(name)) {
          return null;
        }

        return name;
      })
      .concat(
        Array(MAX_PLAYERS - rawPlayers.slice(0, MAX_PLAYERS).length).fill(null)
      );

    state.bench = bench || [];
  },
  updatePlayerName(state, { from, to }) {
    const rosterPlayerPos = state.roster.indexOf(from);
    if (rosterPlayerPos > -1) {
      state.roster[rosterPlayerPos] = to;
    } else {
      const benchPlayerPos = state.bench.indexOf(from);
      if (benchPlayerPos > -1) {
        state.bench[benchPlayerPos] = to;
      }
    }
  },
  setPlayerPClass(state, { name, pClass }) {
    const lname = name.toLowerCase();
    initPlayer(state, lname);
    state.players[lname].pClass = pClass;
  },
  setPlayerSpec(state, { name, spec }) {
    const lname = name.toLowerCase();
    initPlayer(state, lname);
    state.players[lname].spec = spec;
  },
  setPlayerMisc(state, { name, misc }) {
    const lname = name.toLowerCase();
    initPlayer(state, lname);
    state.players[lname] = misc;
  },
  swap(state, { from, to }) {
    if (from.groupId == null) {
      // From BENCH
      const fromPos = from.position;
      if (to.groupId == null) {
        // To BENCH
        const toPos = to.position;
        const fromItem = state.bench[fromPos];
        state.bench[fromPos] = state.bench[toPos];
        state.bench[toPos] = fromItem;
      } else {
        // To ROSTER
        const toPos = PLAYERS_BY_GROUP * to.groupId + to.position;
        const toItem = state.roster[toPos];
        if (toItem) {
          const item = state.bench[fromPos];
          state.bench[fromPos] = state.roster[toPos];
          state.roster[toPos] = item;
        } else {
          state.roster[toPos] = state.bench.splice(fromPos, 1)[0];
        }
      }
    } else {
      // From ROSTER
      const fromPos = PLAYERS_BY_GROUP * from.groupId + from.position;
      if (to.groupId == null) {
        // To BENCH
        const toPos = to.position;
        const fromItem = state.roster[fromPos];
        state.roster[fromPos] = state.bench[toPos];
        state.bench[toPos] = fromItem;
      } else {
        // To ROSTER
        const toPos = PLAYERS_BY_GROUP * to.groupId + to.position;
        const fromItem = state.roster[fromPos];
        state.roster[fromPos] = state.roster[toPos];
        state.roster[toPos] = fromItem;
      }
    }
  },
  bench(state, { groupId, position }) {
    if (groupId == null) {
      // Cannot bench already benched player
      return;
    }

    const pos = PLAYERS_BY_GROUP * groupId + position;
    const name = state.roster.splice(pos, 1, null)[0];
    state.bench.push(name);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
