<template>
  <div id="admin">
    <!-- <div id="loading" v-if="$store.getters.loading">
      <mu-circular-progress :size="60" :strokeWidth="3" color="#949494"/>
    </div> -->

    <mu-appbar title="大连网龙科技" class="header">
      <mu-icon-button icon="menu" slot="left"/>
      <mu-flat-button label="expand_more" slot="right"/>
      <mu-icon-button icon="expand_more" slot="right"/>
    </mu-appbar>

    <div class="warp">
      <div class="menu">
        <mu-list>
          <mu-list-item title="小程序" toggleNested value="miniprograms">
            <mu-icon slot="left" value="inbox"/>
            <mu-list-item slot="nested" title="应用" value="apps" to="/admin/miniprograms">
              <mu-icon slot="left" value="grade"/>
            </mu-list-item>
            <mu-list-item slot="nested" title="案例" value="cases" to="/admin/miniprograms/cases">
              <mu-icon slot="left" value="inbox"/>
            </mu-list-item>
          </mu-list-item>

          <mu-list-item title="行业管理" to="/admin/industry">
            <mu-icon slot="left" value="inbox"/>
          </mu-list-item>
        </mu-list>
      </div>

      <div class="main">
        <router-view name="main"></router-view>
      </div>
      
    </div>

  </div>
</template>

<script>
export default {
  name: 'main',
  components: {
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js'
    }
  },
  created: function () {
    console.log('this.$store.getters.loading')
    console.log(this.$store.getters.loading)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#admin {
  display: flex;
  flex-wrap: wrap;
  height: 100%;

  .header {
    flex-grow: 0;
  }

  .warp {
    display: flex;
    flex-grow: 1;
    justify-content: flex-start;
    height: 100%;
  }
}

.menu {
  width: 270px;
  flex-grow: 0;
}

.mu-item-title {
  font-size: 14px;
}

.main {
  flex-grow: 1;
  width: 100%;
  height: 100%;
}

#loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
