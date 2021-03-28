import { PLAYERS_BY_GROUP, MAX_PLAYERS } from "@/constants/global";

const state = () => ({
  roster: Array(MAX_PLAYERS).fill({ empty: true }),
  knownPlayers: {},
});

const getters = {
  playersByGroup: (state) => (groupId) => {
    return state.roster.slice(
      PLAYERS_BY_GROUP * groupId,
      PLAYERS_BY_GROUP * (groupId + 1)
    );
  },
  rawPlayers: (state) => {
    return state.roster.map((e) => e.name).slice(0, MAX_PLAYERS);
  },
};

const actions = {};

const mutations = {
  setPlayersByGroup(state, { groupId, value }) {
    state.roster.splice(PLAYERS_BY_GROUP * groupId, PLAYERS_BY_GROUP, ...value);
  },
  import(state, { rawPlayers }) {
    state.roster = rawPlayers
      .slice(0, MAX_PLAYERS)
      .map((name) => {
        if (!name) {
          return { empty: true };
        }

        if (name in state.knownPlayers) {
          return { name, ...state.knownPlayers[name] };
        }

        return { name, pClass: null, spec: null, misc: null };
      })
      .concat(
        Array(MAX_PLAYERS - rawPlayers.slice(0, MAX_PLAYERS).length).fill({
          empty: true,
        })
      );
  },
  setPlayerPClass(state, { name, pClass }) {
    const player = state.roster.find((e) => e.name == name);
    if (!player) {
      return;
    }

    player.pClass = pClass;
    if (!state.knownPlayers[player.name]) {
      state.knownPlayers[player.name] = {};
    }
    state.knownPlayers[player.name].pClass = pClass;
  },
  setPlayerSpec(state, { name, spec }) {
    const player = state.roster.find((e) => e.name == name);
    if (!player) {
      return;
    }

    player.spec = spec;
    if (!state.knownPlayers[player.name]) {
      state.knownPlayers[player.name] = {};
    }
    state.knownPlayers[player.name].spec = spec;
  },
  setPlayerMisc(state, { name, misc }) {
    const player = state.roster.find((e) => e.name == name);
    if (!player) {
      return;
    }

    player.misc = misc;
    if (!state.knownPlayers[player.name]) {
      state.knownPlayers[player.name] = {};
    }
    state.knownPlayers[player.name] = misc;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
