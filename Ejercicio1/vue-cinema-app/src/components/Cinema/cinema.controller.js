import cinemaTypes from '@/types/cinema'
import {mapGetters} from 'vuex'
import CinemaItem from './cinema-item/cinemaItem'
import CinemaFilter from './cinema-filter/cinemaFilter'
import Vue from 'vue'


export default {
  name: "cinema-list",
  components:{CinemaItem, CinemaFilter},
  mounted() {
    this.$store.dispatch(cinemaTypes.actions.fetchCinemas);
  },
  computed: {
    ...mapGetters({
      cinemas: cinemaTypes.getters.cinema
    })
  }
}
