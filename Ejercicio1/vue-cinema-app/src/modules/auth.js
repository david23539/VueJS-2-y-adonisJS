import types from '@/types/auth';
import globalTypes from '@/types/global';
import Vue from 'vue';
const jwtdecode = require('jwt-decode');

const state = {
  user: null,
  logged: !!window.localStorage.getItem('_token')
};

const actions = {
  [types.actions.login]: ({commit}, userInput) => {
    commit(globalTypes.mutations.startProcessing);
    return new Promise((resolve, reject) => {
      Vue.http.post('login', {user: userInput})
        .then(user => {
          window.localStorage.setItem('_token', user.body.token);
          commit(types.mutations.setUser);
          resolve(user);
        })
        .catch(error => {
          reject(error);
        })
        .finally(() => {
          commit(globalTypes.mutations.stopProcessing);
        })
    })
  },
  [types.actions.register]: ({commit}, userInput)=>{
    commit(globalTypes.mutations.startProcessing);
    return new Promise((resolve, reject) =>{
      Vue.http.post('register', {user: userInput})
        .then(user => {
          resolve(user)
        })
        .catch(error => {
          reject(error)
        })
        .finally(()=> {
          commit(globalTypes.mutations.stopProcessing)
        });
    })
  },
  [types.actions.updateProfile]: ({commit}, userInput) => {
    commit(globalTypes.mutations.startProcessing);
    return new Promise((resolve, reject) => {
      Vue.http.put('profile',{user:userInput})
        .then(user => {
          window.localStorage.setItem('_token', user.body.token);
          commit(types.mutations.setUser);
          resolve(user);
        })
        .catch(error => {
          reject(error);
        })
        .finally(()=> {
          commit(globalTypes.mutations.stopProcessing)
        })
    })
  },
  [types.actions.logout]: ({commit}) => {
    window.localStorage.removeItem('_token');
    commit(types.mutations.setUser)
  }
};

const getters = {
  [types.getters.user]: (state) => {
    return state.user;
  },
  [types.getters.logged]: (state)=> {
    return state.logged;
  }
};

const mutations = {
  [types.mutations.setUser]: (state) => {
    if(window.localStorage.getItem('_token')){
      const token = window.localStorage.getItem('_token');
      state.logged = true;
      state.user = jwtdecode(token);
    }else{
      state.logged = false;
      state.user = null;
    }
  },
  //establecemos el estado
  [types.mutations.setLogged]: (state, logged) => {
    state.logged = logged;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
}
