import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import LobbyView from '../views/LobbyView.vue'
import GameView from '../views/GameView.vue'
import HistoryView from '../views/HistoryView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // meta: { requiresAuth: true } // Temporarily commented out
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    // meta: { requiresAuth: true } // Temporarily commented out
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/lobbies',
    name: 'lobbies',
    component: LobbyView
  },
  {
    path: '/game/:gameId',
    name: 'game',
    component: GameView,
    props: true
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/* // Temporarily commented out navigation guard
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user-token'); 
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !loggedIn) {
    next('/login');
  } else if ((to.name === 'login' || to.name === 'register') && loggedIn) {
    next({ name: 'home' });
  } else {
    next();
  }
});
*/

export default router
