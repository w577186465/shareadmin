<template>
  <div class="shower">
    <div class="showbox noselect">
      <ul>
        <li v-for="(v,i) of images" v-show="i === currect"><img :src="v"></li>
      </ul>
      <em v-if="total > 1" @click="prev" class="prev">
        <mu-icon value="keyboard_arrow_left" color="#fff" :size="50"/>
      </em>
      <em v-if="total > 1" @click="next" class="next">
        <mu-icon value="keyboard_arrow_right" color="#fff" :size="50"/>
      </em>
    </div>

    <div class="pichandle">
      <mu-raised-button @click="openUppicState = true" tooltip="尺寸" tooltipPosition="尺寸" label="添加" icon="add" primary/>
      <mu-raised-button @click="del()" label="删除" icon="delete" secondary/>
    </div>

    <el-uploader :open.sync="openUppicState" @insert="insertimages" :multiple="true"></el-uploader>
  </div>
</template>

<script>
import upload from '@/components/uploader'

export default {
  name: 'imgshower',
  components: {
    'el-uploader': upload
  },
  props: {
    images: Array
  },
  data: function () {
    return {
      currect: 0,
      openUppicState: false // 上开窗口显示状态
    }
  },
  created: function () {
  },
  computed: {
    total: function () {
      return this.images.length
    }
  },
  methods: {
    // 上传图片插入
    insertimages: function (data) {
      for (var v of data) {
        var length = this.images.length
        this.$set(this.images, length, v.src)
      }
    },
    next: function () {
      if (this.currect === this.total - 1) {
        this.currect = 0
        return
      }
      this.currect++
    },
    prev: function () {
      if (this.currect === 0) {
        this.currect = this.total - 1
        return
      }
      this.currect--
    },
    del: function () {
      if (this.total === 1) {
        this.images.splice(this.currect, 1)
        return
      }
      this.images.splice(this.currect, 1)
      if (this.currect === this.total - 1) {
        this.currect--
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .pichandle {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .shower {
    position: relative;

    .handle {
      position: absolute;
      top: 0;
      left: 0;
    }

    .showbox {
      width: 306px;
      height: 544px;
      overflow: hidden;
      background: #f5f5f5;

      ul li {
        width: 306px;
        height: 544px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      ul li img {
        max-width: 100%;
        max-height: 100%;
      }

      em {
        position: absolute;
        top: 50%;
        cursor: pointer;
        transform: translate(0, -100%);
      }

      .prev {
        left: 0;
      }

      .next {
        display: block;
        right: 0;
      }
    }
  }
</style>