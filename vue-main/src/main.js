import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import Phaser from 'vue-phaser';
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
// app.use(VuePhaser)
app.use(router)

app.mount('#app')
