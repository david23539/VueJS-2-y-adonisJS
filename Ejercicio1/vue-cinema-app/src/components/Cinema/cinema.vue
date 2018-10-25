<template>
    <div>
      <div class="col-md-3 col-xs-12" id="filters">
        <cinema-filter></cinema-filter>
      </div>
      <div class="col-md-9 col-xs-12" id="cinemas">
        <div v-if="cinemas.length > 0">
          <div v-for="(cinema, index) in cinemas">

            <cinema-item :cinema="cinema" :key="index"></cinema-item>
            <div class="clearFix"></div>
            <hr>
          </div>
        </div>
        <div v-else>
          <div class="alert alert-danger">
            No hay cines
          </div>
        </div>
      </div>
    </div>

</template>

<script src="./cinema.controller.js">
// <script>

</script>

<style src="./cinema.css">

</style>
