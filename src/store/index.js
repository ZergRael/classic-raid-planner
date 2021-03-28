import { createStore, createLogger } from "vuex";
import VuexPersistence from "vuex-persist";

import players from "./modules/players";
import raid from "./modules/raid";

const debug = process.env.NODE_ENV !== "production";
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  modules: { players, raid },
  strict: debug,
  plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin],
});
