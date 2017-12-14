<template>
  <div>
    <!-- 操作成功后显示 -->
    <transition name="success-handle">
      <div class="success-handle" v-if="successHandle">
          <mu-raised-button label="返回列表" to="/admin/miniprograms" class="success-handle-btn" icon="keyboard_backspace"/>
          <mu-raised-button label="继续修改" @click="successAdd" class="success-handle-btn" icon="playlist_add" primary/>
          <mu-raised-button v-if="this.id" label="添加" to="/admin/miniprograms/add" class="success-handle-btn" icon="edit" secondary/>
      </div>
    </transition>

    <div slot="content" class="content">

      <div class="leftwarp">
        <div class="showimages-warp">展示图片</div>
        <el-imgshower :images="info.images"></el-imgshower>
      </div>

      <div class="rightwarp">
        <div class="warp1">
          <div class="thumb clearfix">
            <div class="box">
              <img v-if="info.thumb" :src="info.thumb" />
              <div class="upload-thumb-warp">
                <mu-float-button v-if="info.thumb" @click="openupthumbState = true" icon="edit" mini class="demo-float-button"/>
                <mu-float-button v-else="info.thumb" @click="openupthumbState = true" icon="add" mini class="demo-float-button"/>
              </div>
            </div>
          </div>
          <div class="line2">
            <mu-text-field v-model="info.name" hintText="模块名称"/><br/>
            
            <div class="modules">
              <span v-if="info.modules.length === 0" class="tip">搭配模块</span>              
              
              <mu-chip v-for="(v,i) of info.modules" class="modules-chip" @delete="deletemodule(i)" showDelete>{{v.name}}</mu-chip>
             
              <div style="width: 100%"></div>
              <mu-float-button @click="selectsopen = true" icon="add" mini class="add-module-btn"/>
            </div>
            
          </div>
        </div>

        <mu-text-field hintText="模块简介" v-model="info.description" multiLine :rows="3" :rowsMax="6" fullWidth/><br/>
        <div id="editorElem" style="text-align:left"></div>

        <quill-editor v-model="info.content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)">
        </quill-editor>
        <br/>
        <mu-raised-button class="demo-raised-button" @click="submit" label="提交" primary/>
      </div>

    </div>

    <!-- 上传缩略图 -->
    <el-uploader :open.sync="openupthumbState" @insert="insertthumb"></el-uploader>

    <!-- 编辑器上传图片 -->
    <el-uploader :open.sync="editinsertimgOpen" @insert="upScuccess" multiple></el-uploader>

    <!-- 选择模块 -->
    <el-selects :state="selectsopen" :data="modulesData" @close="selectsopen = false" @insert="insertmodule" multiple></el-selects>
  </div>
</template>

<script>
import selects from '@/components/selects'
import imgshower from './components/imgshower'
import upload from '@/components/uploader'

// 编辑器开始
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import quill from 'quill'
// 编辑器结束

import floatbox from '@/components/floatbox'

export default {
  name: 'eidt',
  components: {
    'el-floatbox': floatbox,
    'el-selects': selects,
    'el-uploader': upload,
    'el-imgshower': imgshower,
    quillEditor
  },
  data: function () {
    return {
      openupthumbState: false,
      selectsopen: false,
      editorOption: {},
      editinsertimgOpen: false,
      addRange: [],
      info: {
        images: [],
        modules: []
      },
      modulesData: [],
      successHandle: false
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted () {
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
  },
  created: function () {
    this.get()
    // 获取模块选择数据
    var url = this.api_path('miniprograms/selects')
    this.axios.get(url)
    .then(res => {
      this.modulesData = res.data
    })
  },
  watch: {
  },
  methods: {
    // 获取当前信息
    get: function () {
      var id = this.$route.params.id
      var url = this.api_path('miniprograms/' + id)
      this.axios.get(url)
      .then(res => {
        console.log(res)
        this.info = res.data.data
      })
    },
    // 修改新增加
    edit: function () {
      this.$router.push(this.id.toString())
    },
    // 继续添加
    successAdd: function () {
      this.successHandle = false // 关闭成功窗口
    },
    upScuccess (res) {
      for (var v of res) {
        let url = v.src
        // API: https://segmentfault.com/q/1010000008951906
        // this.$refs.myTextEditor.quillEditor.getSelection();
        // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
        this.addRange = this.$refs.myQuillEditor.quill.getSelection()
        this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image', url, quill.sources.USER) // 调用编辑器的 insertEmbed 方法，插入URL
      }
    },
    imgHandler (state) {
      this.addRange = this.$refs.myQuillEditor.quill.getSelection()
      if (state) {
        this.editinsertimgOpen = true
      }
      this.uploadType = 'image'
    },
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    // 删除搭配模块
    deletemodule: function (index) {
      this.$delete(this.info.modules, index)
    },
    // 插入搭配模块
    insertmodule: function (modules) {
      this.info.modules = modules
    },
    uploadfile: function (file, insert) {
      const formData = new FormData()
      formData.append('file', file)
      var url = this.api_path('upload') // 上传地址
      this.axios({
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
      this.info.thumb = val.src
    },
    close: function () {
      this.$emit('close')
    },
    submit: function () {
      this.message('正在提交')
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

      // 提取图片所有地址
      var images = []
      for (var v of this.info.images) {
        images.push(v)
      }

      // 提取搭配模块id
      var modules = []
      for (var module of this.info.modules) {
        modules.push(module.value)
      }

      var postdata = {
        thumb: this.info.thumb,
        images: images,
        name: this.info.name,
        modules: modules,
        description: this.info.description,
        content: this.info.content
      }

      var url = this.api_path('miniprograms/add')
      this.axios.post(url, postdata).then(res => {
        this.id = res.data.data.id
        this.success('修改成功')
        this.successHandle = true // 打开成功后
      }, res => {
        this.failed(res.message, 'fail')
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
    display: flex;
    z-index: 99;
  }

  .leftwarp {
    width: 306px;
    position: relative;
    margin: 20px 15px;
    z-index: 99999;
    flex-shrink: 0;
  }

  .rightwarp {
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
    margin-right: 50px;

    .box {
      overflow: hidden;
      width: 150px;
      height: 150px;
      background: #f5f5f5;
      display: flex;
      position: relative;

      img {
        max-width: 100%;
        min-height: 100%;
      }
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

  .warp1 {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }

  .addmodule {
    color: #A6A6A6;
  }

  .modules {
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
    margin-top: 4px;
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

  .showimages-warp {
    line-height: 40px;
    background-color: #2196F3;
    color: #fff;
    padding: 0 15px;
    border-radius: 5px 5px 0 0;
    font-size: 16px;
  }

  .success-handle {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255,255,255,0.7);
    z-index: 999;

    .success-handle-btn {
      margin: 0 15px;
    }
  }

  .success-handle-enter-active, .success-handle-leave-active {
    transition: all .5s;

    .success-handle-btn {
      transition: all .5s cubic-bezier(0.25, -0.5, 0.25, 1.5);
    }
  }
  .success-handle-enter, .success-handle-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    background-color: rgba(255,255,255,0);

    .success-handle-btn {
      // transform: translate(0, -100%);
      transform:scale(0.5,0.5);
      opacity: 0;
    }
  }
</style>