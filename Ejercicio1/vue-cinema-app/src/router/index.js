import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import authTypes from '@/types/auth';
import globalTypes from '@/types/global';


import {store} from '@/main';

//components
import Login from '@/components/Auth/Login';
import Register from '@/components/Auth/Register';
//components

//configurar router
const router = new Router({
  routes: [
    {path: '/login', name:'login', component:Login, meta:{Auth:false, title:'Iniciar sesión'},
      beforeEnter:(to,from,next)=>{
      if(store.state.authModule.logged){
        next({path:'/'});
      } else {
        next();
      }
      }
    },
    {path: '/register', name:'register', component:Register, meta:{Auth:false, title:'Registrarse'},
      beforeEnter:(to,from,next)=>{
        if(store.state.authModule.logged){
          next({path:'/'});
        } else {
          next();
        }
      }
    }
  ]
});
//configurar router


//para cada cambio de ruta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if ( to.meta.Auth && !store.state.authModule.logged){
    next({path:'/login'});
  } else {
    if(store.state.authModule.logged) {
      store.commit(authTypes.mutations.setUser);
    }
    next()
  }
});
//para cada cambio de ruta

export default router;
