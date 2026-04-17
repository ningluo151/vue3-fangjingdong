// <!-- src/router/index.js -->
import { createRouter, createWebHistory } from 'vue-router'

const routes= [
  {
    path:'/',// 访问路径
    name:'HomeView',// 路由名称
    component:() => import('@/views/HomeView.vue')// 对应的组件,懒加载
  },
  {
    path:'/product/:id?',// :id? id加?表示id参数是可选的
    name:'ProductView',
    component:() => import('@/views/ProductView.vue')
  },
  {
    path:'/cart',
    name:'CartView',
    component:() => import('@/views/CartView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
