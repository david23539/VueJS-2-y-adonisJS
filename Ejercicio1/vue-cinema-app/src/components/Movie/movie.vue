<template>
    <div class="Movies_Wrapper">
      <div class="col-md-3 col-xs-12">
        <movie-filter></movie-filter>
      </div>
      <div class="col-md-9 col-xs-12">
        <div v-if="movies && movies.length > 0">
          <div v-for="(movie, index) in movies" class="movie">
            <movie-item :movie="movie" :booking="true" v-on:startReservation="reservetion($event)"
                        :key="index">

            </movie-item>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import movieTypes from '@/types/movie';
  import MovieItem from "./movie-item";
  import MovieFilter from "./movie-filter";
    export default {
      name: "movie-list",
      components: {MovieFilter, MovieItem},
      mounted () {
        const cinemaId = this.$route.params.id;
        this.fetchMovies(cinemaId);
      },
      methods:{
        ...mapActions({
          fetchMovies: movieTypes.actions.fetchMovies
        }),
        reservetion(movieId) {
          this.$router.push({name: '/booking',  params: movieId})
        }
      },
      computed: {
        ...mapGetters({
          movies: movieTypes.getters.movies
        })
      }

    }
</script>

<style scoped>
.Movie_Wrapper{

}
</style>
