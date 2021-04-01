import { createStore, createLogger } from "vuex";
import VuexPersistence from "vuex-persist";

import players from "./modules/players";
import raid from "./modules/raid";
import saves from "./modules/saves";
import global from "./modules/global";

const debug = process.env.NODE_ENV !== "production";
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  modules: { players, raid, saves, global },
  strict: debug,
  plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin],
});
