<template>
    <div>
        <van-index-bar :index-list="computedIndex" @select="handleSelect">
            <div v-for="item in cityList" :key="item.type">
                <van-index-anchor :index="item.type" />
                <van-cell :title="data.name" v-for="(data,index) in item.list" :key="index" @click="handleCinema(data.name,data.cityId)"></van-cell>
            </div>
        </van-index-bar>
    </div>
</template>
<script>
import Vue from 'vue'
import { IndexBar, IndexAnchor, Toast, Cell } from 'vant'
import http from '@/utils/http'
Vue.use(IndexBar).use(IndexAnchor).use(Cell)
export default {
  data () {
    return {
      cityList: []
    }
  },
  mounted () {
    http({
      url: '/gateway?k=4859632',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      this.handleCityData(res.data.data.cities)
    })
  },
  computed: {
    computedIndex () {
      return this.cityList.map(item => item.type)
    }
  },
  methods: {
    handleCityData (data) {
      const letterList = []
      const newCityList = []
      for (let code = 65; code < 91; code++) {
        letterList.push(String.fromCharCode(code))
      }
      letterList.forEach(letter => {
        const list = data.filter(item => item.pinyin.slice(0, 1).toUpperCase() === letter)
        if (list.length > 0) {
          newCityList.push({
            type: letter,
            list
          })
        }
      })
      this.cityList = newCityList
    },
    handleSelect (index) {
      Toast(index)
    },
    handleCinema (name, id) {
      console.log('cinema')
      // 直接修改无法监控
      // this.$store.state.cityName = name
      // this.$store.state.cityId = id
      // 采用集中式修改
      this.$store.commit('changeCityName', name)
      this.$store.commit('changeCityId', id)
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.van-toast--middle{
    width: 50px
}
</style>
