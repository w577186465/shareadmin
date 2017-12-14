<template>
  <div id="industry">
    <!-- 添加行业窗口 -->
    <mu-dialog :open="add_dialog" title="新增行业" @close="add_close">
      <mu-text-field hintText="行业名称" v-model="add_name" fullWidth/><br/>
      <mu-flat-button slot="actions" @click="add_close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="add" label="确定"/>
    </mu-dialog>

    <!-- 修改行业窗口 -->
    <mu-dialog :open="edit_dialog" title="修改行业" @close="edit_close">
      <mu-text-field hintText="行业名称" v-model="editing.name" fullWidth/><br/>
      <mu-flat-button slot="actions" @click="edit_close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="editSubmit" label="确定"/>
    </mu-dialog>

    <!-- 删除行业提示框 -->
    <mu-dialog :open="del_dialog" title="删除行业" @close="del_close">
      确定删除{{deling.name}}吗？<br/>
      <mu-flat-button slot="actions" @click="del_close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="delSubmit" label="确定"/>
    </mu-dialog>

    <div class="warp">
      <div class="header">
        <!-- 搜索 -->
        <mu-text-field hintText="搜素" icon="search" class="search"/>
        <!-- 添加行业 -->
        <mu-float-button icon="add" mini class="demo-float-button" @click="add_dialog = true"/>
      </div>
      <!-- 行业列表 -->
      <div class="list">
        <el-chip v-for="(v,i) of data" @edit="edit(i, v)" class="item" @delete="del(i, v)">{{v.name}}</el-chip>
      </div>
    </div>
    
  </div>

</template>

<script>
import Chip from '@/components/chip'

export default {
  components: {
    'el-chip': Chip
  },
  data () {
    return {
      add_dialog: false, // 添加窗口状态
      chip_hover: '',
      add_name: '',
      data: [],
      edit_dialog: false, // 修改窗口状态
      editing: { // 当前修改信息
        index: -1,
        id: 0,
        name: ''
      },
      deling: { // 当前删除信息
        index: -1,
        id: 0,
        name: ''
      },
      del_dialog: false // 删除提示框状态
    }
  },
  created: function () {
    this.get()
  },
  methods: {
    editSubmit: function () {
      var index = this.editing.index
      var url = this.api_path('industry/update/') + this.editing.id
      this.axios.post(url, {
        id: this.editing.id,
        name: this.editing.name
      })
      .then(res => {
        this.$set(this.data[index], 'name', this.editing.name) // 更新列表
        this.success(res.data.message)
        this.edit_close()
      })
      .catch(err => {
        this.failed(err.data.message)
      })
    },
    edit: function (index, data) {
      this.editing = {
        index: index,
        id: data.id,
        name: data.name
      }
      this.edit_dialog = true
    },
    // 关闭修改窗口
    edit_close: function () {
      this.edit_dialog = false
    },
    // 提交删除
    delSubmit: function () {
      var index = this.deling.index // 当前删除index
      var id = this.deling.id // 当前删除id
      this.message('正在删除')
      var url = this.api_path('industry/del/') + id
      this.axios.get(url)
      .then(res => {
        this.$delete(this.data, index)
        this.success(res.data.message)
        this.del_close() // 关闭提示框
      })
      .catch(err => {
        this.del_close()
        this.failed(err.message)
      })
    },
    // 关闭删除提示框
    del_close: function () {
      this.del_dialog = false
    },
    del: function (index, industry) {
      this.deling = {
        index: index,
        id: industry.id,
        name: industry.name
      }
      this.del_dialog = true
    },
    get: function () {
      var url = this.api_path('industry')
      this.axios.get(url)
      .then(res => {
        this.data = res.data
      })
      .catch(res => {
        this.message('数据获取失败，请刷新重试！')
      })
    },
    add: function () {
      this.message('正在提交')
      var url = this.api_path('industry/add')
      this.axios.post(url, {name: this.add_name})
      .then(res => {
        this.add_name = ''
        this.get()
        this.add_close()
        this.success('添加成功')
      })
      .catch(err => {
        this.failed(err.message)
      })
    },
    hover: function () {
      // this.chip_hover = 'hover'
      alert('sdfdsfdsf')
    },
    handleClose () {
      window.alert('你点击了删除按钮')
    },
    add_close () {
      this.add_dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
#industry {
  margin: 20px;

  .warp {
    box-shadow: 0 1px 6px rgba(0,0,0,.117647),0 1px 4px rgba(0,0,0,.117647);
    border-radius: 5px;

    .header {
      background-color: #e8e8e8;
      height: 60px;
      border-radius: 5px 5px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 20px;

      .search {
        margin: 5px 0 0 0;
      }
    }

    .list {
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 0 0 5px 5px;

      .item {
        margin: 10px;
      }
    }
  }

}
</style>