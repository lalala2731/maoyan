<template>
    <div>
        <form action="/">
        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel">
        </van-search>
        </form>
        <div class="cinema" :style="{height:height}">
                <van-list>
                    <van-cell v-for="item in computedCinemaList" :key="item.cinemaId">
                    <div> {{item.name}}</div>
                    <div class="address"> {{item.address}}</div>
                    </van-cell>
                </van-list>
            </div>
    </div>
</template>
<script>
import { Search, List, Cell } from 'vant'
import Vue from 'vue'
Vue.use(Search).use(List).use(Cell)
export default {
  data () {
    return {
      value: '',
      height: 300
    }
  },
  methods: {
    onSearch () {

    },
    onCancel () {
      this.$router.replace('/cinema')
    }
  },
  computed: {
    computedCinemaList () {
      if (this.value === '') return []
      return this.$store.state.cinemaList.filter(item => {
        return item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase())
      })
    }
  },
  mounted () {
    // 刷新后无法打印 因为必须先从cinema进来，不然数组里是没有数据的
    // console.log(this.$store.state.cinemaList)
    if (this.$store.state.cinemaList.length === 0) {
      this.$store.dispatch('getCinemaList', this.$store.state.cityId)
      // .then(res=>{
      //     console.log(this.$store.state.cinemaList)
      // })
    } else {
      // console.log('huancun')
    }
  }
}
</script>
<style scoped>
.cinema{
    /* // height: 300px; */
    overflow: hidden;
    position: relative;
}
.address{
        /* font-size: 13px; */
        /* color: gray; */
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
