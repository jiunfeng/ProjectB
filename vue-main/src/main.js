import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserInfoStore } from "@/stores/userInfo";
import App from './App.vue'
import router from './router'

const app = createApp(App);
app.use(createPinia());
const userStore = useUserInfoStore();
app.config.globalProperties.userStore = userStore;
userStore._setTestAccount()//預塞測試帳號資料





app.use(router)

app.mount('#app')
