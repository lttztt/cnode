<template>
  <div class="autherinfo">
    <div class="loading" v-if="loadingShow"></div>
    <div v-else class="content">
      <div class="authersummay">
        <div class="topbar">作者</div>
        <router-link :to="{
            name:'userInfo',
            params:{
              name:userInfo.loginname
            }
            }">
          <img :src="userInfo.avatar_url" alt="">
        </router-link>
      </div>
      <div class="recent_topics">
        <div class="topbar">作者最近主题</div>
        <ul>
          <li v-for="list in topcilimitby5">
            <router-link :to="{
        name:'article',
        params:{
          id:list.id,
          name:list.author.loginname
        }
        }">
              {{list.title}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="recent_replies">
        <div class="topbar">作者最近回复</div>
        <ul>
          <li v-for="list in replylimitby5">
            <router-link :to="{
              name:'article',
              params:{
                id:list.id,
                name:list.author.loginname
              }
              }">
              {{list.title}}
            </router-link>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "SideBar",
    data() {
      return {
        loadingShow: false,
        userInfo: null
      }
    },
    methods: {
      getData() {
        this.$axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
            .then(res => {
              this.loadingShow = false; //加载成功，去除动画
              this.userInfo = res.data.data;
            })
            .catch(function (err) {
              //处理返回失败后的问题
              console.log(err)
            })
      }
    },
    computed:{
      topcilimitby5(){
        if(this.userInfo.recent_topics){
          return this.userInfo.recent_topics.slice(0,5);
        }
      },
      replylimitby5(){
        if(this.userInfo.recent_replies){
          return this.userInfo.recent_replies.slice(0,5);
        }
      }
    },
    beforeMount() {
      this.loadingShow = true;
      this.getData();
    }
  }
</script>

<style scoped>
  .authersummay, .recent_replies, .recent_topics {
    background-color: #fff;
  }

  .autherinfo {
    width: 328px;
    float: right;
    margin-top: 0;
  }

  li {
    padding: 3px 0;
  }

  .recent_replies ul, .recent_topics ul {
    margin-top: 0px;
    margin-bottom: 0px;
    list-style: none;
    padding-left: 14px;
  }

  ul a {
    font-size: 12px;
    text-decoration: none;
    color: #778087;
  }

  .topbar {
    padding: 10px;
    background-color: #f6f6f6;
    font-size: 12px;
    margin-top: 10px;
  }

  img {
    height: 48px;
    width: 48px;
    border-radius: 3px;
    margin: 10px;
  }

  .loginname {
    width: 100px;
    float: right;
    margin-top: 22px;
    margin-right: 159px;
    font-size: 14px;
  }

  .loginname a {
    text-decoration: none;
    color: #778087;
  }

  .authersummay .topbar {
    margin-top: 0px;
  }
</style>