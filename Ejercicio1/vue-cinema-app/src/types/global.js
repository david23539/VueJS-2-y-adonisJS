import namespace from '@/utils/namespaces';

export default namespace('global', {
  action: [
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
