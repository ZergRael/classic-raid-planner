const state = () => ({
  drag: false,
  title: "",
});

const getters = {};

const actions = {};

const mutations = {
  setDrag(state, drag) {
    state.drag = drag;
  },
  setTitle(state, title) {
    state.title = title;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
