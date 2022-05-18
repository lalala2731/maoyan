<template>
  <div>
    <film-swiper :key="imgList.length">
      <div class="swiper-slide" v-for="(item, index) in imgList1" :key="index">
        <!-- <div :style="{backgroundImage: 'url('+item+')'}" style="background-size:cover"></div> -->
        <img :src="item" alt="" style="height: calc(56vw)" />
      </div>
    </film-swiper>
    <film-header
      style="position: sticky; top: 0; background: white; z-index: 100"
    ></film-header>
    <router-view @handleImg="handleImg"></router-view>
  </div>
</template>
<script>
import filmHeader from './Film/filmHeader.vue'
import filmSwiper from './Film/FilmSwiper.vue'
// import http from '@/utils/http'
export default {
  data () {
    return {
      imgList: [],
      // imgList1: []// 顶部轮播图数据
      imgList1: [
        'https://static.maizuo.com/v5/upload/3a1c86ced250acdfcea2d0100d84f4f5.jpg?x-oss-process=image/quality,Q_70',
        'https://static.maizuo.com/v5/upload/3a1c86ced250acdfcea2d0100d84f4f5.jpg?x-oss-process=image/quality,Q_70',
        'https://static.maizuo.com/v5/upload/3a1c86ced250acdfcea2d0100d84f4f5.jpg?x-oss-process=image/quality,Q_70'
      ]
    }
  },
  components: {
    filmHeader,
    filmSwiper
  },
  methods: {
    handleImg (arr) {
      this.imgList = arr
      // console.log('film',this.imgList)
    }
  }
  // mounted () {
  //   http({
  //     // url: '/gateway?type=2&cityId=110100&k=7539986',
  //     url: '/gateway?type=2&cityId=110100&k=951291',
  //     headers: {
  //       'X-Host': 'mall.cfg.common-banner'
  //     }
  //   }).then(res => {
  //     console.log(res.data)
  //     this.imgList1 = res.data.data.map(item => {
  //       return item.imgUrl
  //     })
  //   })
  // }
}
</script>
<style scoped>
.swiper-slide > div {
  width: 100%;
  height: 200px;
}
</style>
