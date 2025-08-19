import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import router from "@/router/index.js";
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const vuetify = createVuetify({
    components,
    directives
})

createApp(App)
    .use(router)
    .use(vuetify)
    .use(ToastPlugin)
    .mount('#app')