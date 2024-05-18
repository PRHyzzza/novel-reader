import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
    children: [
      {
        path: '/book',
        name: 'Book',
        component: () => import('../views/home/book/Book.vue'),
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/home/user/User.vue'),
      }
    ]
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
