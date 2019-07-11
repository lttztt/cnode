<template>
  <div class="user-info">
    {{username}}
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    data(){
      return {
        username: null
      }
    },
    beforeMount(){
      this.getUser()
          .then(({data})=>{
            console.log(data.data)
          })
    },
    methods: {
      getUser(){
        return this.$axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
      }
    }
  }
</script>

<style scoped>

</style>