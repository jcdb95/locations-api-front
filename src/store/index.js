import Vue from "vue";
import Vuex from "vuex";
import stations from "./stations";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		stations,
	},
});
