<template>


  <div class="login col-md-6 col-md-offset-3">
    <h1 class="tex-center text-muted">
      <u>Registrase</u>
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
        <!--USERNAME-->
        <div class="form-group">
          <label for="username" class="contro-label col-md-4">username</label>
          <div class="col-md-8" :class="{'has-error':errors.has('username')}">
            <input type="text" autocomplete="off" name="username" v-model="username"
                   id="username" :placeholder="'username'"
                   :class="{'has-error':errors.has('username')}" class="form-control">
            <span v-show="errors.has('username')" class="text-danger">
              {{errors.first('username')}}
            </span>
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="contro-label col-md-4">Pasword</label>
          <div class="col-md-8" :class="{'has-error':errors.has('password')}">
            <input type="password" autocomplete="off" name="password" v-model="password"
                   data-vv-rules="required|min:6"
                   id="password" :placeholder="'password'"
                   :class="{'has-error':errors.has('password')}" class="form-control">
            <span v-show="errors.has('password')" class="text-danger">
              {{errors.first('password')}}
            </span>
          </div>
        </div>


        <div class="form-group">
          <label for="password_confirmation" class="contro-label col-md-4">password confirmation</label>
          <div class="col-md-8" :class="{'has-error':errors.has('password')}">
            <input type="password" autocomplete="off" name="password_confirmation" v-model="password_confirmation"
                   data-vv-rules="required|confirmed:password_confirmation"
                   id="password_confirmation" :placeholder="'password_confirmation'"
                   :class="{'has-error':errors.has('password_confirmation')}" class="form-control">
            <span v-show="errors.has('password_confirmation')" class="text-danger">
              {{errors.first('password_confirmation')}}
            </span>
          </div>
        </div>
        <hr>
        <button type="submit" class="btn btn-success btn-block">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script>
  import authTypes from '@/types/auth';
  import {mapActions} from 'vuex'
  export default {
    name: 'register',
    data () {
      return {
        email: '',
        password: '',
        password_confirmation: '',
        username: '',
        error: null
      }
    },
    methods: {
      ...mapActions({
        register:authTypes.actions.register
      }),
      validateBeforeSubmit(){
        this.$validator.validateAll()
          .then(result => {
            if(!result){

            } else {
              this.register({
                email: this.email,
                password: this.password,
                username: this.username
              })
                .then(res => {
                  this.$router.push('/login');
                }, err =>{
                  this.error = true;
                })
            }
          })
          .catch(error => {
            console.log(error);
            this.error = true;
          })
      }
    },

  }
</script>

<style scoped>

</style>
