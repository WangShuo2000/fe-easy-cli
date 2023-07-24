// import './assets/main.css'
import 'ant-design-vue/dist/reset.css';
import 'virtual:uno.css';
import '@unocss/reset/normalize.css';
import Antd from 'ant-design-vue';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { setupRouterGuard } from './router/guard/index'

const app = createApp(App);

app.use(Antd);
app.use(createPinia());
app.use(router);
setupRouterGuard(router)

app.mount('#app');
