<template>
    <div class="MovieShowingTimes_Wrapper">
      <label>Hora</label>
      <div v-if="showingTimes.length > 0">
        <span v-for="showingTime in showingTimes" @click="$emit('selectHour', showingTime.hour_to_show)" class="badge badge-danger">
          {{showingTime.hour_to_show}}
        </span>
      </div>
      <div v-else>No hay peliculas</div>
    </div>
</template>

<script>
    export default {
        name: "movie-showing-times",
        props: {
          showingTimes: {
            type: Array
          }
        }
    }
</script>

<style scoped>
  .badge-danger {
    background-color: #b94a48;
  }
  .badge-danger:hover {
    background-color: #953b39;
  }
  label {
    color: #fff;
  }
</style>
