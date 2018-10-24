import namespace from '@/utils/namespaces';

export default namespace('cinema', {
  getters:[
    'cinema',
    'search',
    'rooms',
    'seats'
  ],
  actions: [
    'fetchCinemas'
  ],
  mutations: [
    'receivedCinemas',
    'setSearch',
    'setRooms',
    'clearFilter'
  ]
})

