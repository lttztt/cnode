import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.prototype.$axios = axios

import './assets/reset.css'
import './assets/global.css'

Vue.config.productionTip = false

Vue.filter('formatWord', (obj)=>{
  if(obj.top === true){
    return '置顶'
  }else if(obj.good === true){
    return '精华'
  }else if(obj.tab === 'ask'){
    return '问答'
  }else if(obj.tab === 'share'){
    return '分享'
  }else {
    return '招聘'
  }
});

Vue.filter('formatTime', (string)=>{
  if(!string) return ''
  let nowDate = new Date();
  let getDate = new Date(string);
  let timestamp = + nowDate.getTime() - getDate.getTime();
  let time = parseInt(timestamp / 1000, 10);

  if(time < 0){
    return ''
  }else if(time < 30){
    return '刚刚'
  }else if(time < 60){
    return time + '秒前'
  }else if(time < 60 * 60){
    return parseInt(time / 60, 10) + '分钟前'
  }else if(time < 60 * 60 * 24){
    return parseInt(time / 3600, 10) + '小时前'
  }else if(time < 60 * 60 * 24 * 30){
    return parseInt(time / 86400, 10) + '天前'
  }else if(time < 60 * 60 * 24 * 30 * 12){
    return parseInt(time / 2592000, 10) + '月前'
  }else {
    return parseInt(time / 31536000, 10) + '年前'
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
