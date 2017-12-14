<template>
  <div>
    <mu-appbar title="大连网龙科技">
      <mu-icon-button icon="home" slot="left"/>
      <mu-icon-menu icon="more_vert" slot="right">
        <mu-menu-item title="菜单 1"/>
        <mu-menu-item title="菜单 2"/>
        <mu-menu-item title="菜单 3"/>
        <mu-menu-item title="菜单 4"/>
        <mu-menu-item title="菜单 5"/>
      </mu-icon-menu>
    </mu-appbar>

    <div class="mainwarp">
      <ul class="list clearfix">
        <li v-for="v of list" v-on:click="show(v.id)"><img :src="v.thumb"/></li>
      </ul>
    </div>

    <div class="floatbtn">
      <mu-float-button icon="stay_primary_portrait" to="/miniprograms/cases"/>
    </div>

    <el-show :open.sync="isShow" :id="showid"></el-show>

    <div class="bottom">
      大连网龙科技
    </div>
  </div>

</template>

<script>
import show from './components/show'

export default {
  name: 'main',
  data () {
    return {
      list: [],
      isShow: false,
      showid: 0
    }
  },
  components: {
    'el-show': show
  },
  created: function () {
    this.get()
  },
  watch: {
  },
  computed: {
  },
  methods: {
    get: function () {
      var url = this.api_path('miniprograms')
      this.axios.get(url).then(res => {
        this.list = res.data.data
      })
    },
    show: function (id) {
      this.isShow = true
      this.showid = id
    }
  }
}
</script>

<style lang="scss" scoped>
body, html {
  max-width: 640px;
}

@function rem( $px) {
  @return $px*(1/100)*1rem;
}

$toph: rem(150);
.floatbtn {
  right: rem(30);
  bottom: rem(30);
  position: fixed;
}

.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $toph;
  line-height: $toph;
  background: #5272F9;
  text-align: center;

  h1 {
    font-size: 16px;
    color: #fff;
  }
}

#app {
  height: 100%;
  box-sizing: border-box;
}

.list {
  border-top: 1px solid #f5f5f5;
  display: flex;
  flex-wrap: wrap;

  li {
    background: #fff;
    box-sizing: border-box;
    border-right: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    flex: 0 0 33%;

    img {
      float: left;
      width: 100%;
    }
  }

  li:after {
    content: '';
    display: block;
    margin-top: 100%;
  }

  li:nth-child(3n + 0) {
    border-right: 0;
  }
}

.bottom {
  text-align: center;
  color: #9F9F9F;
  line-height: 45px;
  background: #fff;
  font-size: rem(20);
}
</style>