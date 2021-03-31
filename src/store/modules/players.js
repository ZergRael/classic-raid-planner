import { PLAYERS_BY_GROUP, MAX_PLAYERS } from "@/constants/global";
import { isPlayerNameValid } from "@/utils/utils";

const state = () => ({
  roster: Array(MAX_PLAYERS).fill(""),
  players: {},
});

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

    return state.players[name.toLowerCase()];
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
        Array(PLAYERS_BY_GROUP - value.slice(0, MAX_PLAYERS).length).fill("")
      )
    );
  },
  import(state, { rawPlayers }) {
    state.roster = rawPlayers
      .slice(0, MAX_PLAYERS)
      .map((name) => {
        if (!isPlayerNameValid(name)) {
          return null;
        }

        return name;
      })
      .concat(
        Array(MAX_PLAYERS - rawPlayers.slice(0, MAX_PLAYERS).length).fill("")
      );

    for (let name of state.roster) {
      initPlayer(state, name.toLowerCase());
    }
  },
  updateRosterPlayerName(state, { from, to }) {
    const playerPosition = state.roster.indexOf(from);
    if (playerPosition > -1) {
      state.roster[playerPosition] = to;
      initPlayer(state, to.toLowerCase());
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
