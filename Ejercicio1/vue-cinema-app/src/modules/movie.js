import types from '@/types/movie';
import globalTypes from '@/types/global';
import Vue from 'vue';

const state = {
  cinemaInfo: {},
  generes: [],
  query: {
    search: '',
    rows:null,
    seats:null,
    hour:null,
    genre:null,

  }
};

const actions = {
  [types.actions.fetchMovies]: ({commit}, cinemaId) => {
    commit(globalTypes.mutations.startProcessing);
    return new Promise((resolve, reject) => {
      Vue.http.get(`movies/${cinemaId}/byCinema`)
        .then( movies => {
          commit(types.mutations.receivedMovie, {apiResponse: movies})
        })
        .finally(() => {
          commit(globalTypes.mutations.stopProcessing)
        })
    })
  },
  [types.actions.fetchGenres]: ({commit}) => {
    commit(globalTypes.mutations.startProcessing);
    Vue.http.get('genres').then(genres => {
      commit(types.mutations.receivedGenres, {apiResponse: genres})
    })
      .finally(() => {
        commit(globalTypes.mutations.stopProcessing);
      })
  }
};

const getters = {
  [types.getters.movies]: (state)=>{
    let movies = state.cinemaInfo.movie_showings;
    if(state.query.search) {
      movies = movies.filter(movie => movie.movie.movie_name.toLowerCase().includes(state.query.search))
    }

    if(state.query.rows){
      movies = movies.filter(movie => movie.room.room_rows >= state.query.rows)
    }
    if(state.query.seats){
      movies = movies.filter(movie => movie.room.room_seats >= state.query.seats)
    }

    if(state.query.hour){
      movies = movies.filter(movie => movie.movie_showing_times.some(movie_showing_times => {
        const arrayHours = movie_showing_times.hour_to_show-split(':');
        return parseInt(arrayHours[0]) === state.query.hour;
      }))
    }

    if(state.query.genre){
      movies = movies.filter(movie => movie.movie.genres.some(genre => genre.pivot.genre_id === state.query.genre)
    }
    return movies;
  },
  [types.getters.genres]: state => state.generes,
  [types.getters.genre]: state => state.query.genere,
  [types.getters.search]: state => state.query.search,
  [types.getters.rows]: state => state.query.rows,
  [types.getters.seats]: state => state.query.seats,
  [types.getters.hour]: state => state.query.hour,
};

const mutations = {
  [types.mutations.receivedMovie]: (state, {apiResponse}) =>{
   state.cinemaInfo = apiResponse.data;
  },
  [types.mutations.receivedGenres]: (state, {apiResponse}) => {
   state.generes = apiResponse.data;
  },
  [type.mutations.setSearch]: (state, query) =>{
    state.query.search = query
  },
  [type.mutations.setGenre]: (state, query) =>{
    state.query.genere = query
  },
  [type.mutations.setSeat]: (state, query) =>{
    state.query.seats = query
  },
  [type.mutations.setRow]: (state, query) =>{
    state.query.rows = query
  },
  [type.mutations.setHour]: (state, query) =>{
    state.query.hour = query
  },
  [type.mutations.clearFilter]: (state, query) =>{
    state.query = {
      search: '',
      rows:null,
      seats:null,
      hour:null,
      genre:null,
    }
  },

};

export default {
  state,
  actions,
  getters,
  mutations
}
