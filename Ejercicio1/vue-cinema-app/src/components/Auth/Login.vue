<template>


  <div class="login col-md-6 col-md-offset-3">
    <h1 class="tex-center text-muted">
      <u>Iniciar Sesión</u>
    </h1>

    <div class="alert alert-danger" v-if="error">Error procesando el formulario</div>
    <hr>
    <div class="well">
      <form autocomplete="off" @submit.prevent="validateBeforeSubmit">
        <div class="form-group">
          <label for="email" class="contro-label col-md-4">Email</label>
          <div class="col-md-8" :class="{'has-error':errors.has('email')}">
            <input type="text" autocomplete="off" name="email" v-model="email" v-validate="'required|email'"
                   id="email" :placeholder="'email'"
                   :class="{'has-error':errors.has('email')}" class="form-control">
            <span v-show="errors.has('email')" class="text-danger">
              {{errors.first('email')}}
            </span>
          </div>
        </div>
        <div class="form-group">
          <label for="password" class="contro-label col-md-4">Pasword</label>
          <div class="col-md-8" :class="{'has-error':errors.has('password')}">
            <input type="password" autocomplete="off" name="password" v-model="password" data-vv-rules="required|min:6"
                   id="password" :placeholder="'password'"
                   :class="{'has-error':errors.has('password')}" class="form-control">
            <span v-show="errors.has('password')" class="text-danger">
              {{errors.first('password')}}
            </span>
          </div>
        </div>

        <hr>
        <button type="submit" class="btn btn-success btn-block">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
  import authTypes from '@/types/auth';
  import {mapActions} from'vuex'
  export default {
    name: 'login',
    data () {
      return {
        email: 'a',
        password: '',
        error: null
      }
    },
    methods: {
      ...mapActions({
        login: authTypes.actions.login
      }),
      validateBeforeSubmit() {
        this.$validator.validateAll()
          .then(result => {
            if(!result) {
              //fallan las validaciones
            } else {
              this.login({
                email: this.email,
                password: this.password
              })
                .then(user => {
                  this.$router.push('/')
                },
                error =>{
                  this.error = true;
                })
            }
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }
</script>

<style scoped>

</style>
