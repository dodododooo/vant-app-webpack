import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import {store, key} from './store';
import plugins from './plugins';

const app = createApp(App);
app.use(store, key).use(router).use(plugins).mount('#app');
