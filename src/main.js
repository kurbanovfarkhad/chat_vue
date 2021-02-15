import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import axios from "axios"
import { connect } from './util/ws'

connect();

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  axios,
}).$mount('#app')
