<template>
  <div>
    <div>
      <mu-appbar title="大连网龙科技">
        <mu-icon-button icon="home" slot="left" to="/miniprograms"/>
        <mu-icon-button icon="more_vert" @click="showselect = true" slot="right"/>
      </mu-appbar>

      <div class="mainwarp">
        <ul class="list clearfix">
          <li v-for="v of data" @click="showimgcode(v.codeimg)"><img :src="v.thumb"/></li>
        </ul>
      </div>

      <div class="floatbtn">
        <mu-float-button icon="widgets" to="/miniprograms"/>
      </div>

      <div class="bottom">
        大连网龙科技
      </div>
    </div>

    <div v-if="imgcodeshow" class="imgcode_warp" v-on:click="imgcodeshow = false">

      <div class="imgcode_box">
        <img :src="currimgcode" />
      </div>
    </div>

    <div v-if="showselect" class="indsel">
      <div class="indsel_warp">
        <h1>请选择行业</h1>
        <div class="type">
          <ul class="clearfix">
            <li v-for="(v,i) of tabs" :class="{selected: i == tabs_selindex}" @click="tabs_selindex = i">{{v}}</li>
          </ul>
        </div>
        <div class="warp clearfix">
          <!-- 行业筛选 -->
          <ul v-if="tabs_selindex == 0" class="clearfix industrys">
            <li v-for="(v,i) of industrys" :class="{selected: i == ind_selindex}" v-on:click="selectind(i)">{{v.name}}</li>
          </ul>
          <!-- 功能筛选 -->
          <ul v-if="tabs_selindex == 1" class="clearfix apps">
            <li v-for="(v,i) of apps" :class="{selected: i == app_selindex}" v-on:click="app_select(i)">{{v.name}}</li>
          </ul>
        </div>
        <mu-raised-button class="selbtn" label="筛选完成" @click="selectover()" fullWidth primary/>
      </div>
    </div>
  </div>
</template>

<script>
import show from './components/show'

export default {
  name: 'cases',
  data () {
    return {
      data: [],
      showselect: false, // 选择框状态
      // 筛选行业
      industrys: [],
      ind_selindex: -1,
      // 模块
      apps: [],
      app_selindex: -1,
      imgcodeshow: false,
      currimgcode: '',
      tabs: [
        '所属行业',
        '功能模块'
      ],
      tabs_selindex: 0
    }
  },
  components: {
    'el-top': top,
    'el-show': show
  },
  created: function () {
    this.get()
    this.getindustry()
    this.getapps()
  },
  watch: {
  },
  methods: {
    app_select: function (index) {
      this.app_selindex = index
      console.log(this.apps[index].id)
      this.$cookie.set('app_selid', this.apps[index].id, { expires: '1Y' })
    },
    // 切换筛选类型
    selecttabs: function () {

    },
    // 筛选完成
    selectover: function () {
      this.get()
      this.showselect = false
    },
    // 选择行业
    selectind: function (index) {
      this.ind_selindex = index
      this.$cookie.set('ind_selid', this.industrys[index].id, { expires: '1Y' })
    },
    showimgcode: function (img) {
      this.imgcodeshow = true
      this.currimgcode = img
    },
    get: function () {
      var industry = this.$cookie.get('ind_selid')
      var appid = this.$cookie.get('app_selid')
      var params = {}
      if (industry) {
        params.industry = industry
      }
      if (appid) {
        params.app = appid
      }

      var url = this.api_path('miniprograms/cases')
      this.axios.get(url, {
        params: params
      }).then(res => {
        this.data = res.data.data
      })
    },
    getindustry: function () {
      var url = this.api_path('industry')
      this.axios.get(url).then(res => {
        this.industrys = res.data
        console.log(this.industrys)
      })
    },
    getapps: function () {
      // 获取应用数据
      var url = this.api_path('miniprograms')
      this.axios.get(url).then(res => {
        this.apps = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@function rem( $px) {
    @return $px*(1/100)*1rem;
}

$toph: rem(400);

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
  display: flex;
  justify-content: space-between;

  h1 {
    font-size: 16px;
    color: #fff;
  }

  .select-btn {
    cursor: pointer;
    float: right;
    font-size: rem(200);
    color: #fff;
    padding: 0 rem(150);
  }
}

#app {
  height: 100%;
  box-sizing: border-box;
}

.imgcode_warp {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);

  .imgcode_box {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: rem(400);
    height: rem(400);
    padding: rem(20);
    background-color: #fff;
    border-radius: rem(10);
    box-shadow: 0 0 10px #BDBDBD;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.list {
  border-top: 1px solid #f5f5f5;

  li {
    float: left;
    width: 33.33%;
    background: #fff;
    box-sizing: border-box;
    border-right: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    position: relative;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
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
}

.indsel {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  background: #fff;
  padding: rem(30);
  box-sizing: border-box;
  z-index: 999;

  .indsel_warp {
    position: relative;
    height: 100%;

    .type {
      ul {

        li {
          float: left;
            font-size: rem(18);
            background: #CECECE;
            color: #fff;
            border-radius: 1.1rem;
            margin-right: rem(20);
            padding: rem(10) rem(25);
        }

        .selected {
          background-color: #2196f3;
        }
      }
    }

    .warp {
      ul {
        .selected {
          background-color: #3498DB;
          color: #fff;
          border: 1px solid #3498DB;
        }
      }
    }
  }

  h1 {
    color: #4A4A4A;
    border-bottom: rem(1) solid #f0f0f0;
    padding-bottom: 15px;
    margin-bottom: rem(40);
    margin-top: rem(40);
    font-size: rem(40);
    font-weight: 500;
  }

  .warp {
    width: 100%;
    overflow-y: auto;
    position: absolute;
    top: rem(220);
    bottom: rem(800);

    ul {
      overflow-y: scroll;

      li {
        float: left;
        font-size: rem(20);
        margin: rem(10);
        border-radius: 3px;
        border: 1px solid #E6E6E6;
        padding: rem(7) rem(25);
        color: #767676;
      }

      .current {
        background: #7790FC;
        color: #fff;
      }
    }
  }

  .selbtn {
    bottom: rem(40);
    position: absolute;
  }
}

</style>