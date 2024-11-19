import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'

sessionStorage.setItem(
  'tasks',
  JSON.stringify([
    {
      id: 'dasff3vrw',
      title: 'Fix bugs',
      status: 'todo',
      reporter: 'Miranda',
      assignees: ['Charlotte'],
      priority: 'high',
    },
    {
      id: 'f2lgn23knf',
      title: 'Implement form',
      status: 'inProgress',
      reporter: 'Miranda',
      assignees: ['Sam', 'Miranda'],
      priority: 'medium',
    },
    {
      id: 'f32gm2',
      title: 'Init vue project',
      status: 'done',
      reporter: 'admin',
      assignees: ['Miranda', 'Sam', 'Charlotte'],
      priority: 'low',
    },
  ]),
)

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})
const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.mount('#app')
