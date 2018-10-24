import types from '@/types/cinema';
import globalTypes from '@/types/global';
import Vue from 'vue';

const state = {
  cinemas: [],
  query: {
    searchs:'',
    rooms: null,
    seats: null
  }
};
const actions = {
  [types.actions.fetchCinemas]: ({commit}) => {
    commit(globalTypes.mutations.startProcessing);
    Vue.http.get('cinemas').then(cinemas => {
      commit(types.mutations.receivedCinemas, {apiResponse: cinemas});
      commit(globalTypes.mutations.stopProcessing);
    })
  }
};

const getters = {

};

const mutations = {
  [type.mutations.receivedCinemas]: (state, {apiResponse}) => {
    state.cinemas = apiResponse.data;
  }
  
};

export default {
  state,
  actions,
  getters,
  mutations
}
