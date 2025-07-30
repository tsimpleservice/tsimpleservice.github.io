
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  { path: '/', component: App },
  { path: '/dashboard', component: { template: '<div>Tableau de bord</div>' } }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
