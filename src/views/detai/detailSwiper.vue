<template>
    <div class="swiper-container" :class="myClass">
        <div class="swiper-wrapper">
            <slot></slot>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css'
export default {
  props: {
    mySlide: {
      type: Number,
      default: 2
    },
    myClass: {
      type: String,
      default: 'swiper-container'
    }
  },
  mounted () {
    new Swiper('.' + this.myClass, {
      slidesPerView: this.mySlide,
      spaceBetween: 30,
      freeMode: true
    })
  }
}
</script>
