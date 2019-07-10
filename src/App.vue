<template>
  <div id="app">
    <Header />
    <div class="main">
      <Postlist />
    </div>
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <!--<router-view/>-->
  </div>
</template>
<script>
  import Header from './components/Header'
  import Postlist from './components/PostList'
  export default {
    name: 'App',
    components: {
      Header,
      Postlist
    }
  }
</script>

<style lang="sass">
  #app
    .main
      width: 80%
      margin: 20px auto
</style>
