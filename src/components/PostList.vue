<template>
  <div class="post">
    <div class="loading" v-if="loadingShow">
      <img src="../assets/loading.gif">
    </div>
    <div class="postlist" v-else>
      <div class="list-nav-bar">
        <ul>
          <li class="active"><a href="#">全部</a></li>
          <li><a href="#">精华</a></li>
          <li><a href="#">分享</a></li>
          <li><a href="#">问答</a></li>
          <li><a href="#">招聘</a></li>
          <li><a href="#">客户端测试</a></li>
        </ul>
      </div>
      <ul>
        <li v-for="post in postList">
          <router-link :to="{
              name: 'userInfo',
              params: {
                name: post.author.loginname
              }
            }">
            <img :src="post.author.avatar_url" :title="post.author.loginname">
          </router-link>
          <span class="count-wrap">
            <span class="reply-count">{{post.reply_count}}</span>/{{post.visit_count}}
          </span>
          <span :class="['topic-tab', {'top-tab': post.top}]">
            {{post | formatWord}}
          </span>
          <router-link :to="{name:'article', params: {id: post.id, name: post.author.loginname}}" class="post-title">{{post.title}}</router-link>
          <span class="last-active-time">{{post.last_reply_at | formatTime}}</span>
        </li>
      </ul>
    </div>
    <!-- 分页 -->
    <pagination @listenPage="getPage"/>
  </div>
</template>

<script>
  import pagination from './Pagination'
  export default {
    name: "PostList",
    components: {pagination},
    data() {
      return {
        loadingShow: false,
        postList: [],
        postPage: 1
      }
    },
    beforeMount() {
      this.loadingShow = true;
      this.getPost()
    },
    methods: {
      getPost() {
        this.$axios.get('https://cnodejs.org/api/v1/topics',{
          params: {
            limit: 20,
            page: this.postPage
          }
        }).then(({data}) => {
          this.loadingShow = false;
          this.postList = data.data;
        })
      },
      getPage(value){
        this.postPage = value;
        this.getPost()
      }
    }
  }
</script>

<style scoped lang="sass">
  .post
    .postlist
      border-radius: 4px

      > ul
        > li
          display: flex
          position: relative
          align-items: center
          background-color: #fff
          padding: 10px 0 10px 10px
          border-top: 1px solid #f0f0f0

          &:hover
            background-color: #f6f6f6

          .count-wrap
            display: inline-block
            width: 68px
            text-align: center
            margin: 0 10px
            font-size: 10px
            color: #b4b4b4
            @media (max-width: 500px)
              position: absolute
              bottom: 3px
              left: 100px
              text-align: left
              margin: 0

            .reply-count
              color: #9e78c0
              font-size: 14px

          img
            width: 30px
            height: 30px
            border-radius: 3px

          .topic-tab
            margin: 0 20px 0 10px
            background-color: #e5e5e5
            color: #999
            padding: 2px 4px
            border-radius: 3px
            font-size: 12px
            @media (max-width: 500px)
              flex-shrink: 0

          .topic-tab.top-tab
            background: #80bd01
            color: #fff

          .post-title
            color: #333
            max-width: 70%
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            @media (max-width: 500px)
              max-width: 60%
              align-self: start

    .postlist li:first-child
      border-top: none
    /* 顶部导航 */

    .list-nav-bar
      background: #f6f6f6

      ul
        display: flex
        padding: 10px 0 10px 10px

        li
          margin: 0 15px
          color: #80bd01
          padding: 3px 6px
          border-radius: 3px
          @media (max-width: 500px)
            flex-shrink: 0
            padding: 0

          &.active
            background: #80bd01
            color: #fff
            @media (max-width: 500px)
              a
                padding: 2px 6px

          a
            color: inherit
            font-size: 12px

            &:hover
              color: #00558f

    .last-active-time
      position: absolute
      font-size: 12px
      right: 10px
      top: 20px
</style>