const state = () => ({
  saves: [],
});

const getters = {
  saves: (state) => {
    return state.saves;
  },
  getSaveByName: (state) => (name) => {
    return state.saves.find((e) => e.name == name);
  },
};

const actions = {};

const mutations = {
  save(state, { name, roster }) {
    const save = {
      roster,
      name,
      date: new Date(),
    };

    const pos = state.saves.findIndex((e) => e.name == name);
    if (pos > -1) {
      state.saves.splice(pos, 1, save);
    } else {
      state.saves.push(save);
    }
  },
  delete(state, { name }) {
    const pos = state.saves.findIndex((e) => e.name == name);
    if (pos > -1) {
      state.saves.splice(pos, 1);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
