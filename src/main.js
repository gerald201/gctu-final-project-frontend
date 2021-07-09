import { createApp } from 'vue';
import App from '@/app';
import router from '@/router';
import store from '@/store';

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');

window.changeRoute = function(name) {
    return router.push({ name });
}