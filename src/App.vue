<template>
  <div id="app">
    <!-- 消息组件 -->
    <el-message/>
    <router-view/>
  </div>
</template>

<script>
import message from '@/components/message'
export default {
  name: 'app',
  components: {
    'el-message': message
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  html, body {
    height: 100%;
  }

  body {
    width: 100%;
    font-family: "Microsoft Yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
  }

  h1 {
    margin: 0;
  }

  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
  }

  a {
    color: #4a70d6;
    text-decoration: none;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  #app {
    height: 100%;
  }

  .clearfix:after {
    content:" ";
    display:block;
    height:0;
    visibility:hidden;
    clear:both;
  }

  .icon{
    width:1em;
    height:1em;
    vertical-align:-.15em;
    fill:currentColor;
    overflow:hidden;
  }

  // 禁止选择
  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
    not supported by any browser */
  }
</style>