<template>
  <mu-dialog :open="state" @close="close">
    <div class="content noselect">
      <ul v-if="selectData" class="sellist">
        <li v-for="(v,i) of selectData" :class="{selected: v.selected}" @click="select(i)">{{v.name}}</li>
      </ul>
    </div>

    <mu-flat-button slot="actions" @click="close" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="insert" label="确定"/>
  </mu-dialog>
</template>

<script>
import floatbox from './floatbox.vue'

export default {
  name: 'selects',
  components: {
    'el-floatbox': floatbox
  },
  props: {
    state: Boolean,
    data: Array,
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
    }
  },
  computed: {
    selectData: function () {
      return this.data
    }
  },
  created: function () {
  },
  methods: {
    close: function () {
      this.$emit('close')
    },
    select: function (index) {
      if (!this.multiple) {
        this.selreset()
      }
      this.$set(this.selectData[index], 'selected', !this.selectData[index].selected)
    },
    // 清空选中
    selreset: function () {
      for (var i in this.selectData) {
        this.$set(this.selectData[i], 'selected', false)
      }
    },
    insert: function () {
      var data, v
      // 获取选中数据
      if (this.multiple) /* 多选 */ {
        data = []
        for (v of this.selectData) {
          if (v.selected) {
            var item = {
              name: v.name,
              value: v.id
            }
            data.push(item)
          }
        }
      } else {
        for (v of this.selectData) {
          if (v.selected) {
            data = {
              name: v.name,
              value: v.id
            }
            break
          }
        }
      }
      this.$emit('insert', data)
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
  .sellist {
    li {
      float: left;
        padding: 3px 7px;
        background: #FFFFFF;
        border: 1px solid #ddd;
        margin: 5px;
        font-size: 12px;
        border-radius: 2px;
        color: #444;
        cursor: pointer;
    }

    li.selected {
      border: 1px solid #1D90E6;
    }
  }
</style>