<template>
  <div class="user-info">
    <div class="loading" v-if="loadingShow">
      <img src="../assets/loading.gif">
    </div>
    <div v-else class="content">
      <section class="panel">
        <div class="panel-header">
          <span><router-link to="/">主页</router-link><span class="divider">/</span></span>
        </div>
        <div class="panel-content">
          <div class="img-name">
            <img :src="user.avatar_url" :title="user.loginname">
            <span v-text="user.loginname"></span>
          </div>
          <p class="score">{{user.score}} 积分</p>
          <p class="create-time">注册时间 {{user.create_at | formatTime}}</p>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          最近创建的话题
        </div>
        <div class="panel-content postList">
          <ul>
            <li v-for="post in user.recent_topics">
              <router-link :to="{
              name: 'userInfo',
              params: {
                name: post.author.loginname
              }
            }">
                <img :src="post.author.avatar_url" :title="post.author.loginname">
              </router-link>
              <router-link :to="{name:'article', params: {id: post.id}}" class="post-title">{{post.title}}</router-link>
              <span class="last-active-time">{{post.last_reply_at | formatTime}}</span>
            </li>
          </ul>
        </div>
      </section>
      <section class="panel">
        <div class="panel-header">
          最近参与的话题
        </div>
        <div class="panel-content postList">
          <ul>
            <li v-for="post in user.recent_replies">
              <router-link :to="{
              name: 'userInfo',
              params: {
                name: post.author.loginname
              }
            }">
                <img :src="post.author.avatar_url" :title="post.author.loginname">
              </router-link>
              <router-link :to="{name:'article', params: {id: post.id}}" class="post-title">{{post.title}}</router-link>
              <span class="last-active-time">{{post.last_reply_at | formatTime}}</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    data(){
      return {
        loadingShow: true,
        user: null
      }
    },
    beforeMount(){
      this.getUser()
          .then(({data})=>{
            this.user = data.data;
            this.loadingShow = false;
            console.log(this.user)
          })
    },
    methods: {
      getUser(){
        return this.$axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
      }
    }
  }
</script>

<style scoped lang="sass">
  .panel
    margin-bottom: 15px
    .panel-header
      background-color: #f6f6f6
      border-radius: 3px 3px 0 0
      padding: 10px
    .panel-content
      padding: 10px
      border-top: 1px solid #e5e5e5
      color: #ababab
      background-color: #fff
      border-radius: 0 0 3px 3px
      .img-name
        img
          width: 40px
          height: 40px
          border-radius: 3px
          margin-right: 10px
          float: left
      .score
        color: #555
        clear: left
        margin-top: 30px
      .create-time
        margin: 10px 0

  .divider
    color: #ccc
    padding: 0 5px


  .postList li
    display: flex
    position: relative
    align-items: center
    background-color: #fff
    padding: 10px 0 10px 10px
    border-top: 1px solid #f0f0f0
    &:first-child
      border-top: none

    &:hover
      background-color: #f6f6f6

    .count-wrap
      display: inline-block
      width: 68px
      text-align: center
      margin: 0 10px
      font-size: 10px
      color: #b4b4b4

      .reply-count
        color: #9e78c0
        font-size: 14px

    img
      width: 30px
      height: 30px
      border-radius: 3px
      margin-right: 20px


    .topic-tab
      margin: 0 20px 0 10px
      background-color: #e5e5e5
      color: #999
      padding: 2px 4px
      border-radius: 3px
      font-size: 12px

    .topic-tab.top-tab
      background: #80bd01
      color: #fff

    .post-title
      color: #333
      max-width: 70%
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
    .last-active-time
      position: absolute
      top: 10px
      right: 10px

</style>