// Vuex 설치 : npm install vuex@next
import { createStore } from "vuex";
import openWeatherApi from "./openWeatherApi";

export default createStore({
  modules: {
    openWeatherApi,
  }
});
