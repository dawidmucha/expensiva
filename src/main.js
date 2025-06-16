import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(
  createAuth0({
    domain: 'dev-jss3a55q8a50osst.us.auth0.com',
    clientId: 'xfS3sqK53VDh2daOijUxJamaVyOnJ9wH',
    authorizationParams: {
      redirect_uri: 'http://localhost:5173/auth',
    },
  }),
)
app.use(createPinia())
app.use(router)

app.mount('#app')
