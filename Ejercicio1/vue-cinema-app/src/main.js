import Vue from 'vue'
import App from '@/App.vue'


//vue resource
import VueResource from 'vue-resource';
Vue.use(VueResource);//para hacer peticiones
Vue.http.options.root='http://127.0.0.1:3333/api/v1';
Vue.http.interceptors.push((request, next)=> {
  request.headers.set('Authorization',`Bearer ${window.localStorage('_token')}`);
  next();
});
//vue resource


//Vuex
import Vuex from 'vuex';
Vue.use(Vuex);
//Vuex

//blockui
import BlockUI from 'vue-blockui';
Vue.use(BlockUI);
//blockui

//Modulos y tipos
import globalTypes from '@/types/global';
//Modulos y tipos

//vee-validate
import VeeValidate, {Validator} from 'vee-validate';

//TODO validator con traducciones
Vue.use(VeeValidate);
//vee-validate

//vue-tables-2
import {ClientTable} from 'vue-tables-2'
Vue.use(ClientTable, {}, false, 'bootstrap3', 'default');
//vue-tables-2

//global store
export const store = new Vuex.Store({
  state: {

  },
  actions: {

  },
  getters: {

  },
  mutations: {

  },
  modules: {

  }
})
//global store



new Vue({
  el: '#app',
  render: h => h(App),
  store
})
