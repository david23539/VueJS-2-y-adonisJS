import namespace from '@/utils/namespaces';

export default namespace('auth', {
  getters: [
    'user',
    'logged'
  ],
  actions: [
    'login',
    'register',
    'logout',
    'updateProfile'
  ],
  mutations: [
    'setUser',
    'setLogged'
  ]
});
