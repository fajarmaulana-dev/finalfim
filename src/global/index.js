import { createStore } from "vuex";
import Local from "../api/local";

const store = createStore({
  state() {
    return {
      user: Local.getLocalData("user")
        ? Local.getLocalData("user")
        : { userId: "", name: "", email: "" },
    };
  },
  mutations: {
    setAuth(state, payload) {
      state.user = payload.current;
    },
  },
  actions: {
    login(context) {
      context.commit("setAuth", { current: Local.getLocalData("user") });
    },
    logout(context) {
      context.commit("setAuth", {
        current: { userId: "", name: "", email: "" },
      });
    },
  },
  getters: {},
});

export default store;
