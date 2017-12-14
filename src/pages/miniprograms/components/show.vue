<template>
  <div>
    <transition name="show">
      <div class="showwarp" v-if="state">
        <div class="header clearfix">
          <mu-icon-button class="close" icon="close" @click="close()"/>
        </div>
        <div class="showcontent">
          <div class="info">
            <div class="appimg">
              <img :src="data.thumb" />
            </div>
            <div class="infocont">
              <h2>{{data.name}}</h2>
              <p>{{data.description}}</p>
            </div>
          </div>

          <div class="imagelist">
            <swiper :options="swiperOption" ref="swiper">
              <!-- slides -->
              <swiper-slide>
                <div @click="imgshow()"><img :src="data.images[0]"/></div>
              </swiper-slide>
              <swiper-slide v-for="v of data.images">
                <div @click="imgshow()"><img :src="v"/></div>
              </swiper-slide>
            </swiper>
          </div>

            <div class="content" v-html="data.content"></div>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="state">
          <div class="bg" @click="close()">sdfsdfdsf</div>
        </div>
      </transition>
    </div>
  </template>

<script>
import axios from 'axios'

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'show',
  props: {
    open: Boolean,
    id: Number
  },
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      data: {},
      multiple: false,
      swiperOption: {
        slidesPerView: 3,
        centeredSlides: true,
        parallax: false,
        height: 100,
        preventClicks: false,
        preventLinksPropagation: false,
        spaceBetween: 10,
        initialSlide: 1,
        resistanceRatio: 0,
        slideToClickedSlide: true
      }
    }
  },
  watch: {
    id: function (id) {
      this.get(id)
    }
  },
  computed: {
    state: function () {
      return this.open
    },
    images: function () {
      if (typeof this.data.images !== 'string') {
        return
      }
      var r = []
      r = this.data.images.split(',')
      return r
    },
    imgshow: function () {
      alert('sdfds')
    }
  },
  methods: {
    get: function (id) {
      var url = this.api_path('miniprograms/') + id
      axios.get(url).then(res => {
        this.data = res.data.data
        console.log(this.data)
      })
    },
    close: function () {
      this.$emit('update:open', false)
    },
    imgtouch: function (params) {
      console.log(params.event.currentTarget)
    },
    // Listener event
    slide (data) {
      console.log(data)
    },
    onTap (data) {
      console.log(data)
    },
    onInit (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss">
@function rem($px) {
  @return $px*(1/100)*1rem;
}

.showwarp {
  background: #fff;
  position: fixed;
  width: 100%;
  z-index: 999;
  top: 100%;
  height: 85%;
  transform: translate(0, -100%);
  overflow: auto;

  .showcontent {
    z-index: 999;
    padding: rem(30);
    padding-top: rem(130);
    background: #fff;
    height: 100%;
    overflow: auto;

    .info {
      $h: 250;
      margin: rem(20) rem(10);
      height: rem($h);
      display: flex;

      .appimg {
        float: left;
        border-radius: 5px;
        overflow: hidden;
        width: rem($h);
        height: rem($h);
        box-shadow: 0 0 5px #ddd;
      }

      .appimg img {
        width: 100%;
        height: 100%;
      }

      .infocont {
        margin-left: rem(30);

        $h2_h: 60;
        h2 {
          height: rem($h2_h);
          font-size: rem(40);
          font-color: #333;
        }

        p {
          font-size: rem(40);
          line-height: rem($h - $h2_h)/2;
          height: rem($h - $h2_h);
          overflow: hidden;
          color: #444;
        }
      }
    }

    .imagelist {
      margin: rem(50) 0;
      overflow: hidden;
      overflow: hidden;
      width: 100%;

      img {
        width: 100%;
      }
    }
  }
}

.header {
  position: absolute;
  z-index: 999;
  width: 100%;

  .close {
    float: right;
  }
}

.content {
  p {
    margin: 1em 0;
    font-size: rem(30);
    color: #797979;
  }
  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }
}

.bg {
  background: #000;
  opacity: 0.3;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  position: fixed;
}

  // show transition
  .show-enter-active, .show-leave-active {
    transition: all 0.3s cubic-bezier(0.7, 0, 0.3, 1);
  }
  .show-enter, .show-leave-to {
    transform: translate(0, 0);
  }

  // fade transition
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.4s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  </style>