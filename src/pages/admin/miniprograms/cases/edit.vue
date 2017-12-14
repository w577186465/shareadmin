<template>
  <div class="edit">
    <div slot="content" class="content">

      <div class="warp1">
        <div class="left">
          <!-- 小程序缩略图 -->
          <div class="thumb clearfix">
            <div class="box" @mouseover="thumb_addshow = true" @mouseout="thumb_addshow = false">
              <img v-if="info.thumb" :src="info.thumb" />
              <span v-else>展示图片</span>
              <div class="upload-thumb-warp" v-show="thumb_addshow">
                <mu-float-button v-if="info.thumb" @click="thumb_open = true" icon="edit" mini class="demo-float-button"/>
                <mu-float-button v-else="info.thumb" @click="thumb_open = true" icon="add" mini class="demo-float-button"/>
              </div>
            </div>
          </div>

          <!-- 二维码 -->
          <div class="thumb clearfix">
            <div class="box" @mouseover="codeimg_addshow = true" @mouseout="codeimg_addshow = false">
              <img v-if="info.codeimg" :src="info.codeimg" />
              <span v-else>二维码</span>

              <!-- 编辑添加按钮 -->
              <div class="upload-thumb-warp" v-show="codeimg_addshow">
                <mu-float-button v-if="info.codeimg" @click="codeimg_upload = true" icon="edit" mini/>
                <mu-float-button v-else="info.codeimg" @click="codeimg_upload = true" icon="add" mini/>
              </div>
            </div>
          </div>
        </div>

        <div class="line2">
          <!-- 模块名称 -->
          <mu-text-field v-model="info.name" :maxLength="20" hintText="模块名称" fullWidth /><br/><br/>

          <!-- 应用模块 -->
          <div class="chipbox modules">
            <span class="tip">搭配模块</span>
            <mu-chip v-for="(v,i) of info.modules" class="modules-chip" @delete="deletemodule(i)" showDelete>{{v.name}}</mu-chip>
            <!-- 添加模块按钮 -->
            <mu-float-button @click="module_select_open = true" icon="add" mini class="add-module-btn"/>
          </div>

          <!-- 所属行业 -->
          <div class="chipbox industry">
            <span class="tip">所属行业</span>
            <mu-chip v-if="info.industry.name" class="modules-chip" @delete="industry_delete()" showDelete>{{info.industry.name}}</mu-chip>
            <!-- 添加行业按钮 -->
            <mu-float-button @click="industry_select_open = true" icon="add" mini class="add-module-btn"/>
          </div>
        </div>

      </div>

      <div class="handle">
        <mu-flat-button @click="submit" label="提交" primary/>
      </div>

    </div>

    <!-- 上传缩略图 -->
    <el-uploader :open.sync="thumb_open" @insert="insertthumb"></el-uploader>

    <!-- 上传二维码 -->
    <el-uploader :open.sync="codeimg_upload" @insert="codeimg_inster"></el-uploader>

    <!-- 选择模块 -->
    <el-selects :state="module_select_open" :data="modulesData" @close="module_select_open = false" @insert="insertmodule" multiple></el-selects>

    <!-- 选择行业 -->
    <el-selects :state="industry_select_open" :data="industryData" @close="industry_select_open = false" @insert="industry_insert"></el-selects>
  </div>
</template>

<script>
import selects from '@/components/selects'
import upload from '@/components/uploader'

import floatbox from '@/components/floatbox'

export default {
  name: 'eidt',
  components: {
    'el-floatbox': floatbox,
    'el-selects': selects,
    'el-uploader': upload
  },
  data: function () {
    return {
      modulesData: [], // 小程序模块全部数据
      industryData: [], // 全部行业数据
      thumb_open: false, // 插入缩略图窗口状态
      module_select_open: false, // 选择模块窗口状态
      industry_select_open: false,
      info: { // 录入信息
        images: [],
        industry: [], // 选中行业
        modules: [] // 选中小程序模块
      },
      thumb_addshow: false, // 缩略图按钮显示状态
      codeimg_upload: false, // 二维码上传窗口状态
      codeimg_addshow: false, // 二维码按钮显示状态
      id: this.$route.params.id // 添加成功返回id
    }
  },
  created: function () {
    this.$store.dispatch('loadingout')
    this.load_data() // 加载数据
    this.load_modules() // 获取模块数据
    this.load_industry() // 获取行业数据
  },
  methods: {
    load_data: function () {
      var url = this.api_path('miniprograms/cases/') + this.id
      this.axios.get(url)
      .then(res => {
        this.init_data(res.data)
      })
      .catch(e => {
        this.failed('数据加载失败，请刷新重试')
      })
    },
    // 初始化数据
    init_data: function (data) {
      console.log(data.industry)
      this.info = data
    },
    // 删除行业
    industry_delete: function () {
      this.$set(this.info, 'industry', {})
    },
    // 插入行业
    industry_insert: function (data) {
      this.$set(this.info.industry, 'id', data.value)
      this.$set(this.info.industry, 'name', data.name)
    },
    // 获取行业数据
    load_industry: function () {
      var url = this.api_path('industry')
      this.axios.get(url)
      .then(res => {
        this.industryData = res.data
      })
      .catch(e => {
        this.failed('行业数据获取失败，请刷新重试')
      })
    },
    // 获取小程序模块数据
    load_modules: function () {
      var url = this.api_path('miniprograms/selects')
      this.axios.get(url)
      .then(res => {
        this.modulesData = res.data
      })
      .catch(e => {
        this.failed('模块数据获取失败，请刷新重试')
      })
    },
    // 删除模块
    deletemodule: function (index) {
      console.log(this.info.modules)
      this.$delete(this.info.modules, index)
      console.log(this.info.modules)
    },
    // 插入二维码
    codeimg_inster: function (data) {
      console.log(data)
      this.$set(this.info, 'codeimg', data.src)
    },
    // 插入搭配模块
    insertmodule: function (modules) {
      this.info.modules = modules
    },
    // 插入缩略图
    insertthumb: function (val) {
      this.info.thumb = val.src
    },
    submit: function () {
      if (this.name === null) {
        alert('请填写模块名称')
        return
      }

      if (this.indid === 0) {
        alert('请选择适用行业')
        return
      }

      if (this.description === null) {
        alert('请填写应用简介')
        return
      }

      this.message('正在提交')

      // 提取搭配模块id
      var modules = []
      for (var module of this.info.modules) {
        modules.push(module.id)
      }

      var postdata = {
        thumb: this.info.thumb,
        codeimg: this.info.codeimg,
        name: this.info.name,
        modules: modules,
        industry: this.info.industry.id
      }

      var url = this.api_path('miniprograms/cases/update/') + this.id
      this.axios.post(url, postdata).then(res => {
        this.id = res.data.data.id
        this.success()
        // 清空数据
        this.info = {
          images: [],
          modules: []
        }
      }, res => {
        this.failed()
      })
      return true
    }
  }
}
</script>

<style lang="scss">
  .ql-editor {
    min-height: 300px;
  }
</style>

<style lang="scss" scoped>
.edit {
  .handle {
    padding: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .warp1 {
    display: flex;
    padding: 20px;

    .left {
      margin-right: 30px;

      .thumb {
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;        
        background: #f5f5f5;
        position: relative;
        border-radius: 5px;
        width: 150px;
        height: 150px;

        .box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        span {
          color: #999;
        }

        img {
          max-width: 100%;
          min-height: 100%;
        }

        .upload-thumb-warp {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;

          .add-thumb-icon {
            color: #929292;
          }
        }
      }
    }

    .line2 {
      width: 100%;
    }
  }

  .addmodule {
    color: #A6A6A6;
  }

  .modules {
    margin-bottom: 10px;
  }

  .chipbox {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    line-height: 40px;

    .tip {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.38);
      margin: 4px 10px 4px 0
    }

    .modules-chip {
      margin: 4px 10px 4px 0
    }
  }

  .uploadbtn {
    width: 130px;
  }

  .add-module-btn {
    margin: 8px 0;
  }

  .add-module-icon {
    color: #929292;
  }

  // 模块过渡
  .modules-enter-active, .modules-leave-active {
    transition: opacity 1.5s
  }
  .modules-enter, .modules-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
}
</style>