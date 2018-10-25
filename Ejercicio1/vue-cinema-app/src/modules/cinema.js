import types from '@/types/cinema';
import globalTypes from '@/types/global';
import Vue from 'vue';


const state = {
  cinemas: [],
  query: {
    search:'',
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
  [types.getters.search] : state =>  state.search,

  [types.getters.rooms] : state => state.rooms,

  [types.getters.seats] : state => state.seats,
  [types.getters.cinema]: (state) => {
    let cinemas = state.cinemas;
    if(state.query.search) {
      cinemas = cinemas.filter(cinema => cinema.cinema_name.toLowerCase().includes(state.query.search))
    }
    if(state.query.rooms) {
      cinemas = cinemas.filter(cinema => cinema.__meta__.number_of_rooms >= state.query.rooms);
    }

    if(state.query.seats) {
      cinemas = cinemas.filter(cinema => cinema.cinema_seat_capacity >= state.query.seats);
    }
    return cinemas;
  }


};

const mutations = {
  [types.mutations.receivedCinemas]: (state, {apiResponse}) => {
    state.cinemas = apiResponse.data;
  },
  [types.mutations.setSearch]: (state, query) => {
    state.query.search = query;
  },
  [types.mutations.setRooms]: (state, room) => {
    state.query.rooms = room;
  },
  [types.mutations.setSeats]: (state, seat) => {
    state.query.seats = seat;
  },
  [types.mutations.clearFilter]: (state) => {
    state.query = {
      search:'',
      rooms: null,
      seats: null
    }

    }
}


export default {
  state,
  actions,
  getters,
  mutations
}
