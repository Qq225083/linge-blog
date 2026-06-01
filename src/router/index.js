import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Blog from '../views/Blog.vue'
import BlogDetail from '../views/BlogDetail.vue'
import Anime from '../views/Anime.vue'
import Games from '../views/Games.vue'
import Friends from '../views/Friends.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { title: '林哥の次元' } },
  { path: '/about', name: 'About', component: About, meta: { title: '关于我 | 林哥の次元' } },
  { path: '/blog', name: 'Blog', component: Blog, meta: { title: '博客 | 林哥の次元' } },
  { path: '/blog/:id', name: 'BlogDetail', component: BlogDetail, meta: { title: '文章详情 | 林哥の次元' } },
  { path: '/anime', name: 'Anime', component: Anime, meta: { title: '追番看板 | 林哥の次元' } },
  { path: '/games', name: 'Games', component: Games, meta: { title: '游戏库 | 林哥の次元' } },
  { path: '/friends', name: 'Friends', component: Friends, meta: { title: '友链 | 林哥の次元' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title || '林哥の次元'
})

export default router
