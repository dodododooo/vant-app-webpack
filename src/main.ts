import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import {store, key} from './store';
import plugins from './plugins';

const app = createApp(App);
app.use(router).use(store, key).use(plugins).mount('#app');
