import Vue from 'vue'
import VueRouter from 'vue-router'
import AiPartner from '@/views/AiPartner.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: AiPartner,
    meta: {
      title: 'AI伴侣' // 设置页面标题
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'AI伴侣';
  }
  next();
});

export default router
