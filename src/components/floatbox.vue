<template>
  <transition name="fade">
    <div v-if="open" class="floatbox_warp" :class="{opshow: open}" @click="close()">
      <div @click.stop="" class="floatbox" :class="{ show: open }" :style="{width: getwidth}">
        <div class="floatboxtop">
          <mu-icon-button icon="close" class="close" @click="close()"/>
          <div class="floatboxname">{{ title }}</div>
        </div>
        <slot class="content"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'floatbox',
    props: {
      width: {
        type: Number,
        default: 500
      },
      open: {
        type: Boolean,
        default: false
      },
      title: String
    },
    data () {
      return {
      }
    },
    created: function () {
      this.getsize()
    },
    computed: {
    },
    methods: {
      getsize: function () {
        var width = this.width - window.innerWidth >= -20 ? window.innerWidth - 20 : this.width
        var height = this.height - window.innerHeight >= -20 ? window.innerHeight - 20 : this.height
        console.log(window.innerHeight)
        this.getml = -width / 2 + 'px'
        this.getmt = -height / 2 + 'px'
        this.getwidth = width + 'px'
        this.getheight = height + 'px'
      },
      close: function () {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
.floatboxtop {
  height: 48px;
  background: #1D90E6;
  border-radius: 5px 5px 0 0;
}

.floatbox_warp {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.2);
}

.floatbox {
  box-shadow: 0px 0px 10px #A9A9A9;
  border-radius: 5px;
  background: #fff;
  z-index: 999;
  transition: all 0.5s;
  max-height: 100%;
}

.floatbox .floatboxname {
  display: inline-block;
  padding: 9px;
  padding-left: 22px;
  font-size: 16px;
  color: cornflowerblue;
}

.floatbox table td {
  padding-top: 5px;
  padding-left: 30px;
  padding-bottom: 5px;
}

.floatbox table tr {
  height: 45px;
}

.floatbox table tr:hover {
  background: #ddd;
}

.floatbox table th {
  width: 200px;
  text-align: left;
  color: #fff;
  padding-left: 30px;
}

.floatbox table input[type="button"] {
  outline: none;
  background: #5bc1df;
  height: 30px;
  border-radius: 4px;
  color: white;
  border: none
}

.floatbox table input[type="button"]:last-child {
  background: #da524e;
}

.floatbox table input[type="button"]:nth-child(2) {
  background: #20a0ff;
}

.close {
  color: #fff;
  float: right;
  font-size: 27px;
}

.show {
  opacity: 1;
  transition: all 0.5s;
  transform: scale(1);
  display: block;
}

.opshow {
  /*display: block;*/
  opacity: 1;
  transition: all 0.5s;
}
.managetable{
  color: #1d9fff;
}

/* 过渡 */
.fade-enter-active, .fade-leave-active {
  transition: all .5s;

  .floatbox {
    transition: all .5s cubic-bezier(0.25, -0.5, 0.25, 1.5);
  }
}
.fade-enter, .fade-leave-to {
  background-color: rgba(0,0,0,0);

  .floatbox {
    opacity: 0;
    transform: scale(0.5,0.5);
  }
}
</style>