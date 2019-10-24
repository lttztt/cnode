<template>
  <div class="header">
    <router-link to="/" class="logo">
      <img src="../assets/logo.svg" alt="cnode">
    </router-link>
    <ul>
      <li><a href="#">首页</a></li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped lang="sass">
  .header
    background: #444444
    display: flex
    justify-content: space-between
    @media (max-width: 500px)
      flex-wrap: wrap
    
    .logo
      margin-left: 30px
      @media (max-width: 500px)
        width: 100%
      img
        margin: 15px auto
        @media (max-width: 500px)
          margin: 5px auto
    a
      display: flex
      align-items: center
      img
        width: 120px
        margin-left: 30px
    ul
      display: flex
      margin-right: 30px
      @media (max-width: 500px)
        margin-right: 0
        width: 100%
        justify-content: center
      li
        margin: 10px
        display: flex
        justify-content: center
        align-items: center
        flex-shrink: 0;
        a
          font-size: 14px
          color: #ccc

</style>