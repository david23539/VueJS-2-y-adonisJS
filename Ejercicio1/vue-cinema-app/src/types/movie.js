import namespace from '@/utils/namespaces';

export default namespace ('movie', {
  getters:[
    'movies',
    'search',
    'rows',
    'seats',
    'genres',
    'genre',
    'hour'
  ],
  actions: [
    'fetchMovies',
    'fetchGenres'
  ],
  mutations:[
    'receivedMovies',
    'receivedGenres',
    'setSearch',
    'setRow',
    'setSeat',
    'setHour',
    'setGenre',
    'clearFilters',
  ]



})
