<template>
    <div class="MovieFilter_Wrapper">
      <div class="well">
        <h2 class="text-center">Películas</h2>
        <label class="contro-label"> Buscar</label>
        <input type="text" v-model="search" class="form-control" placeholder="Buscar Pelicula">
        <hr>
        <label class="control-label">
          Filtrar Filas
        </label>
        <select v-model="rows" class="form-control">
          <option v-for="row in [1,2,3,4,5,6,7,8,9,10,11,12]" :value="row">{{row}}</option>
        </select>
        <hr>
        <label class="control-label">
          Filtrar Asiento
        </label>
        <select v-model="seats" class="form-control">
          <option v-for="seat in [10,20,30,40,50,60,70,80,90,100]" :value="seat">{{seat}}</option>
        </select>
        <hr>
        <label class="control-label">
          Filtrar Género
        </label>
        <select v-model="genre" class="form-control">
          <option v-for="item in genre" :value="item">{{item.genre_name}}</option>
        </select>
        <hr>
        <label class="control-label">
          Filtrar Horas
        </label>
        <select v-model="hour" class="form-control">
          <option v-for="h in hours" :value="h">{{h.text}}</option>
        </select>
        <hr>
        <button class="btn btn-warning btn-block" @click="clearFilter">Limpiar Filtros</button>
      </div>
    </div>
</template>

<script>
  import movieTypes from '@/types/movie';
  import {mapGetters, mapActions, mapMutations} from 'vuex'
    export default {
        name: "movie-filter",
      methods:{
        ...mapActions({
          fetchGenres: movieTypes.actions.fetchGenres
        }),
        ...mapMutations({
          setSearch: movieTypes.mutations.setSearch,
          setRow: movieTypes.mutations.setRow,
          setSeat: movieTypes.mutations.setSeat,
          setHour: movieTypes.mutations.setHour,
          setGenre: movieTypes.mutations.setGenre,
          clearFilter: movieTypes.mutations.clearFilters,
        })

      },
      mounted () {
        this.fetchGenres();
      },
      computed:{
          hours () {
            let hours = [], i = 0;
            for(i; i <24; i++ ) {
              let hour = i <10?`0${i}`:i;
              hours.push({
                val: i, text: `${hour}:00`
              })
            }
            return hours;
          },
        ...mapGetters({
          query: [movieTypes.getters.search],
          numberOfRows: [movieTypes.getters.rows],
          numberOfSeats: [movieTypes.getters.seats],
          selectHour: [movieTypes.getters.hour],
          genre: [movieTypes.getters.genres],
          selectGenre: [movieTypes.getters.genre]
        }),
        hour: {
          get () {
            return this.selectedHour;
          },
          set (value) {
            this.setHour(value);
          }
        },
        search: {
          get () {
            return this.query;
          },
          set (value) {
            this.setSearch(value);
          }
        },
        rows: {
          get () {
            return this.numberOfRows;
          },
          set (value) {
            this.setRow(value);
          }
        },
        seats: {
          get () {
            return this.numberOfSeats;
          },
          set (value) {
            this.setSeat(value);
          }
        },
        genre: {
          get () {
            return this.selectedGenre;
          },
          set (value) {
            this.setGenre(value);
          }
        }
      }

    }
</script>

<style scoped>
.MovieFilter_Wrapper{
  margin-top: 0 !important;
}
</style>
