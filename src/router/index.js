import { createRouter, createWebHistory } from 'vue-router'
import CategoriesView from '../views/CategoriesView.vue'
import DashboardView from '../views/DashboardView.vue'
import HomeView from '../views/HomeView.vue'
import LogInView from '../views/LogInView.vue'
import SettingsView from '../views/SettingsView.vue'
import ShopsView from '../views/ShopsView.vue'
import SignUpView from '../views/SignUpView.vue'
import StatisticsView from '../views/StatisticsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LogInView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
    {
      path: '/shops',
      name: 'shops',
      component: ShopsView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsView,
    },
  ],
})

export default router
