<template>
    <div>
      <label> Géneros </label>
      <div v-if="genres">
        <span class="badge badge-info" v-for="genre in genres">{{genre && genre.genre && genre.genre.name}}</span>
      </div>
      <div v-else>No hay ningujn género disponible</div>
    </div>
</template>

<script>
    export default {
        name: "movie-genre",
        props:{
          genres:{
            type: Array
          }
        }
    }
</script>

<style scoped>
  .badge-info {
    background-color: #3a87ad;
  }
  .badge-info:hover {
    background-color: #2d6987;
  }

  .badge-error {
    background-color: #b94a48;
  }
  .badge-error:hover {
    background-color: #953b39;
  }
  label {
    color: #fff;
  }
</style>
