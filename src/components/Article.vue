<template>
  <div class="article">
    <div class="loading" v-if="loadingShow">
      <img src="../assets/loading.gif">
    </div>
    <div class="article-content" v-else>

      <div class="panel">
        <div class="article-header">
          <h3 class="topic-full-title">{{post.title}}</h3>
          <p class="topic-tags">
            <span> 发布于 {{post.last_reply_at | formatTime}}</span>
            <span> 作者 {{post.author.loginname}}</span>
            <span> {{post.visit_count}}次浏览</span>
            <span> 来自 {{post | formatWord}}</span>
          </p>
        </div>
        <div class="article-content" v-html="post.content">

        </div>
      </div>
      <div class="panel reply-panel" v-if="post.replies.length > 0">
        <div class="reply-header">{{post.replies.length}} 回复</div>
        <div class="reply-area" v-for="(reply,index) in post.replies">
          <router-link :to="{
              name: 'userInfo',
              params: {
                name: reply.author.loginname
              }
            }" class="reply-avatar">
            <img :src="reply.author.avatar_url">
          </router-link>
          <div class="reply-info">
            <div class="info-title">{{reply.author.loginname}} <span
              class="reply-msg"><span>{{index + 1}}楼</span>*<span>{{reply.create_at | formatTime}}</span></span></div>
            <div class="reply-main" v-html="reply.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Article",
    data() {
      return {
        loadingShow: false,
        post: {}
      }
    },
    beforeMount() {
      this.loadingShow = true;
      this.getArticleData();
    },
    methods: {
      getArticleData() {
        this.$axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
            .then(({data}) => {
              this.post = data.data;
              this.loadingShow = false;
            })
      }
    }
  }
</script>

<style lang="sass">
  @import "../assets/markdown-github.css"
  .markdown-text > :first-child
    margin-top: 0

  .markdown-text > :last-child
    margin-bottom: 1em

  .article-header
    background-color: #fff
    padding: 10px
    border-radius: 3px 3px 0 0

    .topic-full-title
      font-size: 22px
      font-weight: 700
      margin: 8px 0
      display: inline-block
      vertical-align: bottom
      width: 75%
      line-height: 130%

  .article-content
    padding: 10px
    border-top: 1px solid #e5e5e5
    background: #fff

  .markdown-text img
    width: 92% !important

  /*回复区*/
  .reply-panel
    margin-top: 20px

    .reply-header
      border-radius: 3px 3px 0 0
      background: #f6f6f6
      padding: 10px

    .reply-area
      background: #fff
      border-top: 1px solid #f0f0f0
      padding: 10px
      display: flex

      .reply-avatar img
        width: 30px
        height: 30px
        margin-right: 10px

      .reply-info
        .info-title
          font-size: 12px
          color: #333

          .reply-msg
            color: #094e99

        .reply-main
          margin-top: 10px
          padding-left: 10px

  .topic-tags
    font-size: 12px
    color: #838383
    span
      margin: 0 5px
      &::before
        content: '•'
</style>