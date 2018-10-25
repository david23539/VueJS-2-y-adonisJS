import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';


//vue resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'http://127.0.0.1:3333/api/v1/';
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('_token')}`);
  next();
});
//.vue resource


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
import authModule from '@/modules/auth';
import cinemaModule from '@/modules/cinema';
import movieModule from '@/modules/movie';
 //Modulos y tipos

//vee-validate
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import VeeValidate, {Validator} from 'vee-validate';
import validatorEs from '@/validator/es';
import validatorEn from '@/validator/en';
// Validator.localize('es', validatorEs);
Vue.use(VeeValidate, {
  i18nRootKey:'validations',
  dictionary: {
    es:validatorEs,
    en:validatorEn
  }
});
//vee-validate

//vue-tables-2
import {ClientTable} from 'vue-tables-2'
Vue.use(ClientTable, {}, false, 'bootstrap3', 'default');
//vue-tables-2

//global store
export const store = new Vuex.Store({
  state: {
    processing: false,
    language: 'es'
  },
  actions: {
    [globalTypes.actions.changeLanguage]: ({commit}, lang)=> {
      commit(globalTypes.mutations.setLanguage,lang);
      switch (lang) {
        case 'en':
          Validator.localize('en', validatorEn);
          break;
        default:
          Validator.localize('es', validatorEs);
          break;
      }
    }
  },
  getters: {
    [globalTypes.getters.processing]: state => state.processing,
    [globalTypes.getters.language]: state => state.language
  },
  mutations: {
    [globalTypes.mutations.startProcessing] (state) {
      state.processing = true
    },
    [globalTypes.mutations.stopProcessing] (state) {
      state.processing = false
    },
    [globalTypes.mutations.setLanguage] (state, lang) {
      state.language = lang
    }
  },
  modules: {
    authModule,
    cinemaModule,
    movieModule
  }
});
//global store


new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});
