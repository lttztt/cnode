import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import PostList from './components/PostList'
import Article from './components/Article'
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
      path: '/topic/:id',
      name: 'article',
      components: {
        main: Article
      }
    }
  ]
})
