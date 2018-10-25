<template>
    <div class="Filter_Wrapper">
      <div class="well">
        <h2 class="text-center">Filtro</h2>
        <label class="control-label">Buscar</label>
        <input type="text" v-model="search" placeholder="Buscar" class="form-control">
        <hr>
        <label class="contro-label">Salas</label>
        <select v-model="rooms" class="form-control">
          <option v-for="room in [5,10,15,20,25,30]" :value="room">{{room}}</option>
        </select>
        <hr>
        <label class="contro-label">Asientos</label>
        <select v-model="seats" class="form-control">
          <option v-for="seat in [50,100,150,600,650,3000]" :value="seat">{{seat}}</option>
        </select>
        <hr>
        <button
          class="btn btn-block btn-warning"
          @click="clearFilter"
        >
          Limpiar Filtros
        </button>
      </div>
    </div>


</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import cinemaTypes from '@/types/cinema';

  export default {
    name: "cinema-filter",
    methods: {
      ...mapMutations({
        setSearch: cinemaTypes.mutations.setSearch,
        setRooms: cinemaTypes.mutations.setRooms,
        setSeats: cinemaTypes.mutations.setSeats,
        clearFilter: cinemaTypes.mutations.clearFilter
      })
    },
    computed: {
      ...mapGetters({
        query:cinemaTypes.getters.search,
        numberOfRooms: cinemaTypes.getters.rooms,
        numberOfSeats: cinemaTypes.getters.seats
      }),
      search:{
        get() {
          return this.query;
        },
        set(value) {
          this.setSearch(value);
        }
      },
      rooms:{
        get() {
          return this.numberOfRooms;
        },
        set(value) {
          this.setRooms(value);
        }
      },
      seats:{
        get() {
          return this.numberOfSeats;
        },
        set(value) {
          this.setSeats(value);
        }
      }
    }
  }
</script>

<style src="../cinema.css"></style>
