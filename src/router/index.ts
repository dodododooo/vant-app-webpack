import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { store } from '@/store';

const aliveComponents: string[] = [];
const files = require.context('../views', true, /\.vue$/);
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home'
  },
]


files.keys().forEach(key => {
  const module = files(key).default;
  if (/component|module|util/i.test(key)) return; // 过滤组件, hooks
  if (!module.name) throw new Error('page module must have a name');
  const name = module.name;
  const meta = Object.assign({title: name}, module.routeMeta);
  if (meta.keepAlive) aliveComponents.push(name);
  routes.push({
    path: `/${name}`,
    name: name,
    component: module,
    meta,
  })
})

// 初始化全局state keepAliveComponents
store.state.keepAliveComponents = aliveComponents.join(',');

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let pos: any = null;
    if (to.hash) {
      pos = { el: to.hash }
    } else if (savedPosition) {
      pos = savedPosition
    } else {
      pos = { top: 0 }
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pos)
      }, 300)
    })
  },
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    document.title = '登录';
    return {
      path: '/Login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath },
    }
  }
  document.title = <string>to.meta.title;
})

export default router
