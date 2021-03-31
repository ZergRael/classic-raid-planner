const state = () => ({
  drag: false,
  index: null,
  futureIndex: null,
});

const getters = {};

const actions = {};

const mutations = {
  setDrag(state, drag) {
    state.drag = drag;
  },
  setMove(state, { index, futureIndex }) {
    state.index = index;
    state.futureIndex = futureIndex;
  },
  unsetMove(state) {
    state.index = null;
    state.futureIndex = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
