import { createApp } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import App from './App.vue'
import { routes } from './router'

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

// 5. Create and mount the root instance.
const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount('#app')
