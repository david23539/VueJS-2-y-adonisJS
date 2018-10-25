<template>
    <div class="col-md-12 col-xs-12 CinemaSingle_Wrapper">
      <div class="col-md-5 col-xs-12">
        <img :src="cinema.cinema_screenshot" class="img-responsive" alt="imagen cine">
      </div>
      <div class="col-mf-7 col-xs-12">
        <h2>
          <router-link :to="{name:'cinema', params: {id:cinema.id}}">
            Nombre del cine : {{cinema.cinema_name}}
          </router-link>
        </h2>
        <h3>
            Direccion del cine: {{cinema.cinema_address}}
        </h3>
        <p>
            Detalles: {{cinema.cinema_details}}
        </p>
        <p>
            Telefono: {{cinema.cinema_phone}}
        </p>
        <p>
            Asientos: {{cinema.cinema_seat_capacity}}
        </p>

        <p>
            Salas: {{cinema.__meta__.number_of_rooms}}
        </p>
      </div>
    </div>
  
</template>

<script src="./cinema-item.controller.js"></script>

<style src="../cinema.css">

</style>
