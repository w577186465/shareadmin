<template>
  <transition name="fade">
    <div class="uploader">
      <transition name="fade">
        <div class="bg" @click="close" v-if="state"></div>
      </transition>
      <transition name="enlarge">
        <div class="warp" v-if="state">
          <mu-icon-button icon="close" class="close" @click="close()"/>

          <div class="files" v-if="images.length > 0">
            <div class="fileswarp">
              <ul class="clearfix">
                <li v-for="(v,i) of images" @click="selectfile(i)">
                  <em class="selected" v-if="v.selected">
                    <div class="selbg"></div>
                    <i class="material-icons">done</i>
                  </em>
                  <img :src="v.src">
                </li>
                <li>
                  <mu-icon-button icon="add" @click="clickupload" class="uploadadd" />
                  <input v-if="ifMultiple" type="file" style="display:none;" @change="upload" ref="upload" multiple/>
                  <input v-else type="file" style="display:none;" @change="upload" ref="upload" />
                </li>
              </ul>
            </div>
            
            <div class="bottom">
              <mu-raised-button @click="insert" class="insert" label="插入文件" icon="file_upload" primary/>
            </div>
          </div>

          <div class="nofile" v-if="images.length == 0">
            <mu-raised-button @click="clickupload" label="上传文件" icon="file_upload" primary/>
            <input v-if="ifMultiple" type="file" style="display:none;" @change="upload" ref="upload" multiple/>
            <input v-else type="file" style="display:none;" @change="upload" ref="upload"/>
          </div>
        </div>
      </transition>
      
    </div>
  </transition>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Uploader',
  props: {
    open: Boolean,
    multiple: Boolean
  },
  data () {
    return {
      images: [],
      selinfo: {}
    }
  },
  computed: {
    state: function () {
      return this.open
    },
    ifMultiple: function () {
      return this.multiple
    }
  },
  methods: {
    close: function () {
      this.$emit('update:open', false)
    },
    clickupload: function () {
      this.$refs.upload.click()
    },
    upload: function (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      if (typeof FileReader === 'undefined') {
        alert('您的浏览器不支持图片上传，请升级您的浏览器')
        return false
      }
      // var image = new Image()
      var leng = files.length
      for (var i = 0; i < leng; i++) {
        var reader = new FileReader()
        reader.readAsDataURL(files[i])
        this.uploadfile(files[i], res => {
          this.resetsel() // 清空已选中
          res.selected = true
          res.src = this.file_path(res.src)
          this.images.push(res)
          console.log(this.images)
        })
      }
    },
    uploadfile: function (f, callback) {
      const formData = new FormData()
      formData.append('file', f)

      // 设置所需缩略图尺寸
      var url = this.api_path('upload')
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
      }).then(function (res) {
        callback(res.data)
      }, function (res) {
        alert(res.status)
      })
    },
    selectfile: function (index) {
      // 多文件
      if (this.ifMultiple) {
        this.$set(this.images[index], 'selected', !this.images[index].selected)
      // 单文件
      } else {
        this.resetsel() // 删除其他选中项
        this.$set(this.images[index], 'selected', !this.images[index].selected)
      }
    },
    // 清空选中
    resetsel: function () {
      for (var i in this.images) {
        if (this.images[i].selected) {
          this.$set(this.images[i], 'selected', false)
        }
      }
    },
    insert: function () {
      if (this.ifMultiple) /* 插入多文件 */ {
        // 获取选中图片
        var v
        var files = []
        for (v of this.images) {
          if (v.selected) {
            files.push(v)
          }
        }
        console.log(files)
        this.$emit('insert', files)
      } else /* 插入单文件 */ {
        for (v of this.images) {
          if (v.selected) {
            this.$emit('insert', v)
            break
          }
        }
      }
      // 关闭窗口
      this.$emit('update:open', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
    .uploadadd {
      width: 80px;
      height: 80px;
      box-sizing: content-box;

      i {
        font-size: 80px;
        color: #979797;
      }
    }
</style>

<style lang="scss" scoped>
  .uploader {
    z-index: 999;
    background: #fff;
    position: fixed;

    $bottomh: 30px; // 底部高度

    .bg {
      background: #000;
      opacity: 0.1;
      top: 0;
      right:0;
      bottom: 0;
      left: 0;
      position: fixed;
    }

    .warp {
      top: 10%;
      right: 10%;
      bottom: 10%;
      left:10%;

      background: #fff;
      position: fixed;
      box-shadow: 0 0 10px #c1c1c1;
      border-radius: 5px;
    }

    .bottom {
      left: 20px;
      right: 20px;
      bottom: 20px;
      position: absolute;
      height: 30px;
    }

    .close {
      float: right;
      background: none;
      border: 0;
      color: #1D90E6;
      cursor: pointer;
      outline: none;
      padding: 0;
    }
  }

  // fade transition
  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  // enlarge transition
  .enlarge-enter-active, .enlarge-leave-active {
    transition: all .5s cubic-bezier(0.7, -0.3, 0.3, 1.3);
    transform: scale(1);
  }
  .enlarge-enter, .enlarge-leave-to {
    opacity: 0;
    transform: scale(0.3);
    -ms-transform: scale(0.3);
    -moz-transform: scale(0.3);
    -webkit-transform: scale(0.3);
    -o-transform: scale(0.3);
  }

  .files {
    padding: 45px 20px 20px 20px;
    box-sizing: border-box;
    height: 100%;
    
    .fileswarp {
      height: 100%;
      box-sizing: border-box;
      padding-bottom: 30px;
    }

    ul {
      overflow-x: auto;
      width: 100%;
    }

    ul li {
      float: left;
      width: 120px;
      height: 120px;
      overflow: hidden;
      margin: 5px;
      border: 1px solid #ddd;
      padding: 5px;
      border-radius: 5px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f2f2f2;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    ul li .selected {
      position: absolute;
      top:0;
      right: 0;
      bottom: 0;
      left: 0;

      .selbg {
        background: #000;
        opacity: 0.1;
        float: left;

      }

      i {
        font-size: 20px;
        background: #1D90E6;
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 17px;
        padding: 5px;
        border-radius: 5px;
        width: 30px;
        text-align: center;
      }

    }

    .insert {
        float: right;
      }

    ul li .additem {
      cursor: pointer;
    }
  }

  .nofile {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
