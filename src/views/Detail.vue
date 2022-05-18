<template>
        <div v-if="dataList">
            <detail-head v-top :name="dataList.name"></detail-head>
            <div style="background:white;margin-bottom:10px">
                <div :style="{backgroundImage: 'url('+dataList.poster+')'}" style="height:200px;background-size:cover;background-position:center"></div>
            <h3>{{dataList.name}}--{{dataList.item.name}}</h3>
            <div>{{dataList.category}}</div>
            <div>{{dataList.premiereAt | timeFilter}}</div>
            <div>{{dataList.nation}} | {{dataList.runtime}}分钟</div>
            <div :class="direction?'synopsis':''">{{dataList.synopsis}}</div>
            <!-- <img src="../../public/down.png" alt=""> -->
            <div :class="direction?'down':'up'" @click="changePic" id="dd">
                <img src="../../public/down.png" v-show="direction">
                <img src="../../public/up.png" v-show="!direction">
            </div>
            </div>
            <div style="background:white;margin-bottom:10px">
                <h3>演职人员</h3>
            <detail-swiper  :mySlide="4" myClass="actors">
                <div class="swiper-slide" v-for="(item,index) in dataList.actors" :key="index">
                    <div :style="{backgroundImage: 'url('+item.avatarAddress+')'}" style="height:150px;background-size:cover;background-position:center;"></div>
                    <div style="text-align:center;">
                    <div>{{item.name}}</div>
                    <div>{{item.role}}</div>
                    </div>
                </div>
            </detail-swiper>
            </div>
            <div style="margin-bottom:10px">
                <h3>剧照</h3>
                <detail-swiper :mySlide="3" myClass="photos">
                    <div class="swiper-slide"  v-for="(item,index) in dataList.photos" :key="index" @click="handlePhotos(index)">
                        <div :style="{backgroundImage: 'url('+item+')'}" style="height:100px;background-size:cover;background-position:center"></div>
                    </div>
                </detail-swiper>
                <div style="height:10px"></div>
            </div>
            <div class="select" @click="login">选座购票</div>
            <!-- <van-button type="info" class='select'>选座购票</van-button> -->
        </div>
</template>
<script>
import http from '@/utils/http'
import Vue from 'vue'
import detailSwiper from './detai/detailSwiper.vue'
import detailHead from './detai/detailHead.vue'
import { ImagePreview, Button } from 'vant'
Vue.use(Button)
Vue.filter('timeFilter', (timer) => {
  // 日期处理函数 可以使用moment.js处理
  const time = new Date(timer * 1000)
  let month = time.getMonth() + 1
  month = month >= 10 ? month : '0' + month
  let day = time.getDate()
  day = day >= 10 ? day : '0' + day
  return time.getFullYear() + '-' + month + '-' + day + '上映'
})
Vue.directive('top', {
  inserted (el) {
    el.style.display = 'none'
    window.onscroll = () => {
      if ((document.documentElement.scrollTop || document.body.scrollTop) > 20) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
export default {
  data () {
    return {
      dataList: null,
      direction: true
    }
  },
  mounted () {
    this.$store.commit('hide')
    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=3615788`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      this.dataList = res.data.data.film
    })
    // 当前路由对象的动态路由参数
    // console.log(this.$route.params.myid)
  },
  beforeDestroy () {
    this.$store.commit('show')
  },
  methods: {
    changePic () {
      // console.log(this.$refs.img)
      this.direction = !this.direction
      // this.$refs.img.src = '../../public/up.png'
    },
    handlePhotos (index) {
      ImagePreview({
        images: this.dataList.photos,
        startPosition: index,
        loop: false,
        closeable: true,
        closeIconPosition: 'top-left'
      })
    },
    login () {
      this.$router.push('/login')
    }
  },
  components: {
    detailSwiper,
    detailHead
  }
}
</script>
<style scoped>
.synopsis{
    height: 50px;
    overflow: hidden;
}
#dd{
    transition: height 1s linear;
}
#dd>img{
    height: 15px;
    margin: 0 auto;
}
.down,.up{
    height: 15px;
    display: flex;
}
.swiper-slide>img{
    height: 150px;
    width: 100%;
}
/* .swiper-slide{
    display: flex;
    flex-direction: column;
} */
body{
    background: #F4F4F4;
}
.select{
    position: fixed;
    bottom: 0;
    left: 0;
    height: 49px;
    width: 100%;
    text-align: center;
    background-color: #ff5f16;
    color: #fff;
    font-size: 16px;
    line-height: 49px;
    z-index: 99;
}
</style>
