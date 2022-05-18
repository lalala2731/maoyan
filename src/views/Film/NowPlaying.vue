<template>
    <div>
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false">
            <van-cell v-for="item in dataList" :key=item.filmId @click="handleClick(item.filmId)">
                <img :src="item.poster" :alt="item.name" id='s'>
                <h3><span class="name">{{item.name}}</span> <span class="na">{{item.item.name}}</span></h3>
                <p>观众评分：{{item.grade | gradeFilter}}</p>
                <p>主演：{{item.actors | actorsFilter}}</p>
                <p>{{item.nation}}| {{item.runtime}}分钟</p>
            </van-cell>
        </van-list>
    </div>
</template>
<script>
import http from '@/utils/http'
import Vue from 'vue'
import { List, Cell } from 'vant'
Vue.use(List).use(Cell)
Vue.filter('actorsFilter', (actors) => {
  if (!actors) return '暂无主演'
  return actors.map(item => item.name + ' ').join('')
})
Vue.filter('gradeFilter', (grade) => {
  return grade === undefined ? '暂无评分' : grade
})
export default {
  data () {
    return {
      dataList: [],
      imgList: [],
      loading: false, // 是否正在加载中，防止多次触发
      finished: false,
      current: 1, // 当前的页数
      total: 0 // 一共多少条数据
    }
  },
  methods: {
    handleClick (id) {
      this.$router.push(`/detail/${id}`)
    },
    onLoad () {
      // 当在详情页面滚动条滚动后再返回列表界面时，列表界面会触发onload
      // 事件，这时dataList的长度和total的长度都是0，就会进入判断条件，讲finished更新为true，
      // 就会停止加载，需要皂基上dataList的长度不为0的条件
      if (this.dataList.length === this.total && this.dataList.length !== 0) {
        this.finished = true
        return
      }
      this.current++
      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=256017`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        this.dataList = [...this.dataList, ...res.data.data.films]
        this.loading = false
        this.total = res.data.data.total
      })
    }
  },
  mounted () {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=6253918`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      this.dataList = res.data.data.films
      this.imgList = this.dataList.map(item => {
        return item.poster
      }).slice(0, 4)
      this.$emit('handleImg', this.imgList)
    })
  }
}
</script>
<style scoped>
#s{
    float: left;
    width: 100px;
}
.van-cell{
    padding: 10px;
    overflow: hidden;
    /* height: 94px; */
}
p,h3{
    /* 文字溢出显示省略号 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 10px;
}
p{
    font-size: 13px;
    color:#797d82
}
h3>.na{
    font-size: 9px;
    color: white;
    background: #d2d6dc;
    font-weight: 400;
    line-height: 14px;
    height: 14px;
    padding: 0 2px;
    border-radius: 2px;
}
h3>span{
    display: inline-block;
    vertical-align: middle;
}
h3>.name{
    color:#191a1b;
    font-size: 16px;
    font-weight: 400;
}
</style>
