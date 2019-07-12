import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import PostList from './components/PostList'
import Article from './components/Article'
import UserInfo from './components/UserInfo'
import SideBar from './components/SideBar'
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        main: PostList
      }
    },
    {
      path: '/topic/:id&author=:name',
      name: 'article',
      components: {
        main: Article,
        sideBar: SideBar
      }
    },
    {
      path: '/userInfo/:name',
      name: 'userInfo',
      components: {
        main: UserInfo
      }
    }
  ]
})
