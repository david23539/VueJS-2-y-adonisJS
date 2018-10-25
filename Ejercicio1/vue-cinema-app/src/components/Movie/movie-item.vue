<template>
    <div class="col-md-12 col-xs-12 MovieItem_Wrapper">
      <div class="col-md-5 col-xs-12">
        <img :src="movie.movie.movie_screenshot" class="img-responsive"/>
        <div class="clearfix"></div>
        <br>
        <button v-if="canBooking && booking" @click="$emit('startReservation', movie.movie.id)"
        class="btn btn-warning btn-block">Hacer reservas</button>
      </div>
      <div class="col-md-7 col-xs-12">
        <h2>
          Titulo: {{movie.movie.movie_name}}
        </h2>
        <h3>
          Director: {{movie.movie.movie_director}}
        </h3>
        <p>
          Sipnosis: {{movie.movie.movie_synopsis}}
        </p>
        <p>
          Número de la Sala: {{movie.room.room_number}}
        </p>
        <p>
          Fila: {{movie.room.room_rows}}
        </p>
        <p>
          Asientos: {{movie.room.room_seats}}
        </p>
        <div class="col-md-6">
          <movie-genre :genres="movie.movie.genres"></movie-genre>
        </div>
        <div class="col-md-6">
          <movie-showing-times v-on:selectHour="$emit('selectHour', $event)"
                               :showing-times="movie.movie_showing_times"
          ></movie-showing-times>
        </div>
      </div>
    </div>
</template>

<script>
    import MovieGenre from "./movie-genre";
    import MovieShowingTimes from "./movie-showing-times";
    export default {
      name: "movie-item",
      components: {MovieShowingTimes, MovieGenre},
      props: {
          movie: {
            type: Object,
            required: true
          },
          booking:{
            type: Boolean,
            required: true
          }
        },
      computed: {
          canBooking () {
            return this.movie.movie_showing_times.length > 0;

          }
      }
    }
</script>

<style scoped>

  .MovieItem_Wrapper{
    background: #181D23 !important;
    padding: 10px;
  }

  MovieItem_Wrapper h2{
    margin-top: 0;
  }
</style>
