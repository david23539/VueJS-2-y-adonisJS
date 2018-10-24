import namespace from '@/utils/namespaces';

export default namespace('global', {
  actions: [
    'changeLanguage'
  ],
  getters: [
    'processing',
    'language'
  ],
  mutations: [
    'startProcessing',
    'stopProcessing',
    'setLanguage'
  ]
});
