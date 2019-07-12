<template>
  <div class="pagination">
    <button @click="homePage">首页</button>
    <button @click="prevPage">上一页</button>
    <button class="pageBtn" v-if="jduge">...</button>
    <button v-for="button in buttons"
            :class="['pageBtn', {'currentPage': button === currentPage}]"
            @click="changePage(button)"
    >{{button}}
    </button>
    <button @click="nextPage">下一页</button>
  </div>
</template>

<script>
  export default {
    name: "pagination",
    data() {
      return {
        buttons: [1, 2, 3, 4, 5, '...'],
        currentPage: 1,
        jduge: false
      }
    },
    methods: {
      homePage() {
        this.currentPage = 1;
        this.buttons = [1, 2, 3, 4, 5, '...'];
        this.jduge = false
      },
      nextPage() {
        if (this.currentPage === this.buttons[3]) {
          this.buttons.shift();
          this.buttons.splice(4, 0, this.buttons[3] + 1)
        }
        this.currentPage += 1;
        this.emitEvent();
      },
      prevPage() {
        if (this.currentPage === 1) {
          return
        }
        if (this.currentPage === this.buttons[1] && this.currentPage !== 2) {
          this.buttons.unshift(this.buttons[0] - 1);
          this.buttons.splice(5, 1)
        }
        this.currentPage -= 1;
        this.emitEvent();
      },
      emitEvent() {
        this.$emit('listenPage', this.currentPage);
      },
      changePage(button) {
        if(button === '...'){
          return
        }
        if (button > 4) {
          this.jduge = true;
        } else {
          this.jduge = false
        }
        this.currentPage = button;
        if (button === this.buttons[4]) {
          this.buttons.shift();
          this.buttons.splice(4, 0, this.buttons[3] + 1)
        } else if (button === this.buttons[0] && button !== 1) {
          this.buttons.unshift(this.buttons[0] - 1)
          this.buttons.splice(5, 1)
        }
        this.emitEvent()
      }
    }
  }
</script>

<style scoped lang="sass">
  .pagination
    padding: 5px 0

    button
      background-color: #fff
      border: 1px solid #ddd
      color: #778087
      border-radius: 3px
      outline: none
      cursor: pointer
      padding: 0 2px
      width: 55px
      height: 29px

    .pageBtn
      position: relative
      bottom: 1px
      width: 40px
      margin: 0 4px

    .currentPage
      color: white
      background-color: #1f1b1b
</style>