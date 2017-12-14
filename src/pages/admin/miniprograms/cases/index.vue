<template>
  <div>
    <div class="warp">
      <div class="">
        <div class="tableSearch">
        </div>
      </div>

      <div class="list">
        <ul>
          <!-- 新增按钮 -->
          <li class="addapps">
            <mu-icon-button @click="floatbox_state = true" icon="add" iconClass="addicon" class="addbtn" to="/admin/miniprograms/cases/add" />
          </li>

          <li v-for="(v,i) of list" @mouseover="$set(v, 'over', true)" @mouseout="$set(v, 'over', false)">
            <div class="thumb"><img :src="v.thumb" /></div>
            <div class="name">{{v.name}}</div>
            <div class="pop" v-if="v.over">
              <mu-icon-button icon="edit" @click="floatbox_state = true" :to="'/admin/miniprograms/cases/edit/' + v.id"/>
              <mu-icon-button icon="delete" @click="del(v.id)"/>
            </div>
          </li>
        </ul>
      </div>

      <el-floatbox :open="floatbox_state" :width="900" @close="floatbox_close">
        <router-view name="floatbox"></router-view>
      </el-floatbox>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import pjinfo from './components/pjinfo'
import floatbox from '@/components/floatbox'

export default {
  name: 'main',
  data () {
    return {
      pjinfo: {
        state: false,
        method: 'add'
      },
      searchname: null,
      editdata: {
        name: null,
        thumb: null,
        modules: [],
        description: null,
        images: [],
        content: null
      },
      list: [],
      appdata: {},
      editOpen: false,
      floatbox_state: false // 添加和修改窗口是否打开
    }
  },
  components: {
    'el-pjinfo': pjinfo,
    'el-floatbox': floatbox
  },
  beforeCreate: function () {
    this.floatbox_state = false
  },
  created: function () {
    this.floatbox_state = false
    this.get() // 加载数据
  },
  watch: {
    searchname: function () {

    }
  },
  methods: {
    floatbox_close: function () {
      this.floatbox_state = false
    },
    del: function (id) {
      this.message('正在删除')
      var url = this.api_path('miniprograms/delete/') + id
      axios.get(url)
      .then(res => {
        console.log(res)
        this.success(res.data.message)
        this.get()
      })
      .catch(res => {
        this.failed(res.data.message)
      })
    },
    get: function () {
      var url = this.api_path('miniprograms/cases')
      axios.get(url)
      .then(res => {
        this.list = res.data.data
      })
      .catch(e => {
        this.failed('数据加载失败，请刷新重试')
      })
    },
    add: function () {
      this.$set(this.pjinfo, 'method', 'add')
      this.editdata = {
        name: null,
        thumb: null,
        modules: [],
        description: null,
        images: [],
        content: null
      }
      this.pjinfo.state = true
    },
    edit: function (index) {
      this.pjinfo.method = 'edit'
      if (typeof this.list[index].images === 'string') {
        // this.list[index].images = []
        this.list[index].images = this.list[index].images.split(',')
      }

      if (typeof this.list[index].modules !== 'object') {
        this.list[index].modules = []
      }

      if (typeof this.list[index].modules !== 'object') {
        this.list[index].modules = []
      }

      this.editdata = this.list[index]
      this.pjinfo.state = true
    },
    closeInfo: function () {
      this.pjinfo.state = false
    },
    infoCallback: function (val) {
      if (val === 'success') {
        this.get()
        this.closeInfo()
      }
    }
  }
}
</script>

<style lang="scss">
  .addbtn {
    $size: 120;
    width: $size + 24 + px;
    height: $size + 24 + px;

    .addicon {
      font-size: $size + px;
      color: #9A9A9A;
    }
  }

  .pop {
    i {
      color: #2196F3;
    }
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .warp {
    margin: 20px;
  }

  .list {
    $width: 180px;
    $height: 210px;
    $thumbsize: 160px; // 缩略图尺寸

    margin-top: 20px;

    .addapps {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ul li {
      $radius1: 10px;
      
      box-sizing: content-box;
      float: left;
      padding: 20px;
      background-color: #f5f5f5;
      margin: 8px;
      border-radius: 10px;
      text-align: center;
      width: $width;
      height: $height;
      color: #444;
      position: relative;

      .thumb {
        width: $thumbsize;
        height: $thumbsize;
        border-radius: 30px;
        background-color: #fff;
        overflow: hidden;
        margin: 10px;
      }

      .thumb img {
        width: $thumbsize;
        height: $thumbsize;
      }

      .name {
        text-align: center;
        margin-top: 20px;
        color: #898989;
      }

      .pop {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        background-color: #f5f5f5;
        border-radius: 0 0 $radius1 $radius1;
        color: #266CD6;
        font-size: 22px;
        opacity: 0;
        line-height: 70px;
        transform: translate(0, 60px);
        z-index: 99;
        box-shadow: 0 0 1px #fff;
      }

    }

    ul li:hover {
      .pop {
        opacity: 1;
      }
    }
  }
</style>
