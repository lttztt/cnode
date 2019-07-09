<template>
  <div class="header">
    <img src="../assets/logo.svg" alt="cnode">
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
    height: 60px
    background: #444444
    display: flex
    justify-content: space-between
    img
      max-width: 120px
      margin-left: 30px
    ul
      display: flex
      margin-right: 30px
      li
        margin: 10px
        display: flex
        justify-content: center
        align-items: center
        a
          font-size: 14px
          color: #ccc
</style>