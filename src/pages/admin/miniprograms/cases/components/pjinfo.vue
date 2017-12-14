<template>
  <div>
    <el-floatbox :width="1000" :height="600" :state="state" v-on:close="close()" :title="title" overflowx="auto">
      <div slot="content" class="content">
        <div class="leftwarp">
          <el-imgshower :images="images"></el-imgshower>
        </div>
        <div class="rightwarp">
          <div class="warp1">
            <div class="thumb clearfix">
              <div class="box"><img v-if="thumb" :src="thumb" /></div>
              <div class="box2">
                <mu-raised-button @click="openupthumbState = true" icon="backup" label="上传缩略图" primary/>
              </div>
            </div>
            <div class="line2">
              <mu-text-field v-model="name" hintText="模块名称"/><br/>
              
              <div class="modules">
                <span v-if="modules.length === 0" class="tip">搭配模块</span>
                <mu-chip v-for="(v,i) of modules" class="demo-chip"  @delete="deletemodule(i)" showDelete>{{v.name}}</mu-chip>
                <mu-icon-button @click="selectsopen = true" class="list" tooltip="添加搭配模块" touch icon="add_circle" primary/>
              </div>

            </div>
          </div>
          <mu-text-field hintText="模块简介" v-model="description" multiLine :rows="3" :rowsMax="6" fullWidth/><br/>
          <div id="editorElem" style="text-align:left"></div>
          <br/>
          <mu-raised-button class="demo-raised-button" @click="submit" label="提交" primary/>
        </div>
      </div>
    </el-floatbox>

    <!-- 上传缩略图 -->
    <el-uploader :open.sync="openupthumbState" @insert="insertthumb"></el-uploader>

    <!-- 选择模块 -->
    <el-selects :state="selectsopen" :data="list" @close="selectsopen = false" @insert="insertmodule" multiple></el-selects>
  </div>
</template>

<script>
import axios from 'axios'
import selects from '@/components/selects'
import imgshower from './imgshower'
import upload from '@/components/uploader'
import E from 'wangeditor'

import floatbox from '@/components/floatbox'

export default {
  name: 'pjinfo',
  components: {
    'el-floatbox': floatbox,
    'el-selects': selects,
    'el-uploader': upload,
    'el-imgshower': imgshower
  },
  props: {
    method: {
      type: String,
      default: 'add'
    },
    state: {
      type: Boolean,
      default: 0
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 360
    },
    title: String,
    moduledata: {
      type: Array,
      default: []
    }
  },
  data: function () {
    return {
      thumb: null,
      name: null,
      modules: [],
      description: null,
      content: '',
      images: [],
      openupthumbState: false,
      selectsopen: false
    }
  },
  mounted: function () {
    var editor = new E('#editorElem')
    editor.customConfig.onchange = (html) => {
      this.content = html
    }

    editor.customConfig.customUploadImg = (files, insert) => {
      for (var i = 0; i < files.length; i++) {
        this.uploadfile(files[i], insert)
      }
    }

    editor.create()
  },
  created: function () {
  },
  watch: {
  },
  methods: {
    // 删除搭配模块
    deletemodule: function (index) {
      this.$delete(this.modules, index)
    },
    // 插入搭配模块
    insertmodule: function (modules) {
      console.log(modules)
      this.modules = modules
    },
    uploadfile: function (file, insert) {
      const formData = new FormData()
      formData.append('file', file)
      var url = this.api_path('upload') // 上传地址
      axios({
        method: 'post',
        url: url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: function (progressEvent) {
          // 对原生进度事件的处理
          if (progressEvent.lengthComputable) {
          }
        }
      })
      .then(res => {
        insert(res.data.src)
      }, res => {
        alert(res.status)
      })
    },
    insertthumb: function (val) {
      this.thumb = val.src
    },
    close: function () {
      this.$emit('close')
    },
    submit: function () {
      if (this.method === 'add') {
        this.add()
      } else if (this.method === 'edit') {
        this.edit()
      }
    },
    add: function () {
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

      var images = []
      for (var v of this.images) {
        images.push(v.src)
      }
      var postdata = {
        thumb: this.thumb,
        images: images,
        name: this.name,
        modules: this.modules,
        description: this.description,
        content: this.content
      }

      var url = this.api_path('miniprograms/add')
      axios.post(url, postdata).then(res => {
        this.$emit('callback', 'success')
      }, res => {
        alert(res.message)
      })
      return true
    },
    edit: function () {
      if (this.name === null) {
        alert('请填写应用名称')
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

      axios.post('/admin/miniprogram/add', {
        name: this.name,
        thumb: this.thumburl,
        modules: this.modules,
        industrys: this.indid,
        description: this.description,
        content: this.content,
        images: this.images
      }).then(function (res) {
        if (res.code === 0) {
          alert(res.msg)
          return
        }
        alert('添加成功')
        this.$emit('callback', 'success')
      }, function (res) {
        alert('请求失败')
      })
      return true
    }
  }
}
</script>

<style lang="scss">
  .iscase {
    padding: 5px;
      background: #D8D8D8;
      border-radius: 5px;
      color: #696969;
      display: block;
      width: 245px;
      margin: 0 auto;
  }

  textarea {
    border: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
  }

  .content {
    position: relative;
    box-sizing: border-box;
  }

  .leftwarp {
    float: left;
    width: 270px;
    position: relative;
    margin: 20px 15px;
    z-index: 99999;
  }

  .rightwarp {
    margin-left: 290px;
    height: 552px;
    padding: 20px 20px 20px 10px;
    // overflow-x: hidden;
    overflow: auto;
  }

  .pichandle {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .thumb {
    display: flex;
    justify-content: center;
    align-items: center;

    .box {
      overflow: hidden;
      width: 120px;
      height: 120px;
      background: #f5f5f5;
      display: flex;

      img {
        max-width: 100%;
        min-height: 100%;
      }
    }

    .box2 {
      padding: 0 30px;
    }
  }

  .warp1 {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .addmodule {
    color: #A6A6A6;
  }

  .modules {
    display: flex;
    align-items: center;

    .tip {
      color: rgba(0, 0, 0, 0.38);
    }
  }
</style>