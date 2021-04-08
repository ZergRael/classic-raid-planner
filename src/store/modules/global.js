const state = () => ({
  drag: false,
  title: "",
  toasts: [],
});

const getters = {};

const actions = {
  success(store, message) {
    store.commit("toast", { type: "success", message });
  },
  info(store, message) {
    store.commit("toast", { type: "info", message });
  },
  warning(store, message) {
    store.commit("toast", { type: "warning", message });
  },
  error(store, message) {
    store.commit("toast", { type: "error", message });
  },
  dismissToast(store, id) {
    store.commit("removeToast", { id });
  },
};

let id = 0;
const mutations = {
  setDrag(state, drag) {
    state.drag = drag;
  },
  setTitle(state, title) {
    state.title = title;
  },
  toast(state, { type, message }) {
    state.toasts.push({ type, message, id: id++ });
  },
  removeToast(state, { id }) {
    const pos = state.toasts.findIndex((e) => e.id == id);
    if (pos > -1) {
      state.toasts.splice(pos, 1);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
