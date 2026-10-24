import axios from 'axios';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

createApp(App)
    .use(createPinia())
    .use(router)
    .use(vuetify)
    .mount('#app');