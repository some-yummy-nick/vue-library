import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Item from '../views/Item.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/item/:id',
    name: 'item',
    component: Item,
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
