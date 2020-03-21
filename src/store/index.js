import Vue from "vue";
import Vuex from "vuex";
import menu from "./menu";
import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menu,
    user
  }
});
