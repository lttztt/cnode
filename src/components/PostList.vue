<template>
  <div class="post">
    <div class="loading" v-if="loadingShow">
      Loading...
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
          <a href="#">
            <img :src="post.author.avatar_url" :title="post.author.loginname">
          </a>
          <span class="count-wrap">
            <span class="reply-count">{{post.reply_count}}</span>/{{post.visit_count}}
          </span>
          <span :class="['topic-tab', {'top-tab': post.top}]">
            {{post | formatWord}}
          </span>
          <a href="#" class="post-title">{{post.title}}</a>
          <span class="last-active-time">{{post.last_reply_at | formatTime}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PostList",
    data() {
      return {
        loadingShow: false,
        postList: []
      }
    },
    beforeMount() {
      this.getPost().then(({data}) => {
        setTimeout(() => {
          this.postList = data.data;
          this.loadingShow = false;
        }, 2000);
      })
    },
    methods: {
      getPost() {
        this.loadingShow = true;
        return this.$axios.get('https://cnodejs.org/api/v1/topics?limit=20&page=1')
      }
    }
  }
</script>

<style scoped lang="sass">
  .post
    .loading
      color: gold

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

          .topic-tab.top-tab
            background: #80bd01
            color: #fff

          .post-title
            color: #333

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
          &.active
            background: #80bd01
            color: #fff
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