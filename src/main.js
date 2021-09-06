import { createApp } from 'vue';
import App from '@/app.vue';
import bootstrap from '@/bootstrap';
import router from '@/router';
import store from '@/store';

const app = createApp(App);

bootstrap(router, store);

app.use(store);
app.use(router);
app.mount('#app');
