import { createStore, createLogger } from "vuex";
import VuexPersistence from "vuex-persist";

import players from "./modules/players";

const debug = process.env.NODE_ENV !== "production";
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  modules: { players },
  strict: debug,
  plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin],
});
