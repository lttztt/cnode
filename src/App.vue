<template>
  <div id="app">
    <Header />
    <div class="main">
      <router-view name="sideBar"></router-view>
      <router-view name="main"></router-view>
    </div>
  </div>
</template>
<script>
  import Header from './components/Header'
  export default {
    name: 'App',
    components: {
      Header
    }
  }
</script>

<style lang="sass">
  #app
    .main
      width: 80%
      margin: 20px auto
      @media (max-width: 500px)
        width: 95%
        margin: 0 auto
</style>
