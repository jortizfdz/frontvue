import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import createPersistedState from 'pinia-plugin-persistedstate'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'


window.axios = axios
window.axios.defaults.baseURL = 'http://api.library.test/api'
window.axios.defaults.headers.common['Accept'] = 'application/json'
window.axios.defaults.headers.common['Content-Type'] = 'application/json'

const pinia = createPinia()
pinia.use(({store}) =>{
    store.router = markRaw(router)
})
pinia.use(createPersistedState)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
