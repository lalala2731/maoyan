<template>
  <div>
    <van-nav-bar
      title="影院"
      @click-left="onClickLeft()"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="23" color="black" />
      </template>
      <template #left>
        {{ $store.state.cityName
        }}<van-icon name="arrow-down" color="black" size="15" />
      </template>
    </van-nav-bar>
    <div class="cinema" :style="{ height: height }">
      <!-- <ul>
        <li v-for="(item, index) in this.$store.state.cinemaList" :key="index" :click='handleClickdiv(item,index)'>
          <div class="price">
            <span>{{ item.name }}</span>
            <span>{{ item.address }}</span>
          </div>
          <div class="p">￥{{ item.lowPrice / 100 }}元起</div>
        </li>
      </ul> -->
      <van-list>
        <van-cell v-for="(item, index) in this.$store.state.cinemaList" :key="index" @click="handleClickdiv(item, index)">
          <div class="price" >
            <span>{{ item.name }}</span>
            <span>{{ item.address }}</span>
          </div>
          <div class="p">￥{{ item.lowPrice / 100 }}元起</div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
// import BetterScroll from "better-scroll";
import Vue from 'vue'
import { NavBar, Icon, List, Cell } from 'vant'
Vue.use(NavBar).use(Icon).use(List).use(Cell)
export default {
  data () {
    return {
      height: 300 + 'px',
      list: [1, 2, 3]
    }
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 100 + 'px'
    // console.log(this.height)
    if (this.$store.state.cinemaList.length === 0) {
      this.$store
        .dispatch('getCinemaList', this.$store.state.cityId)
        .then((res) => {
          // betterScroll和van-cell的click事件冲突，有betterScroll无法正常触发van-cell的click事件
        //   this.$nextTick(() => {
        //     new BetterScroll(".cinema", {
        //       scrollbar: {
        //         fade: true,
        //       },
        //     });
        //   });
        })
    } else {
    //   this.$nextTick(() => {
    //     new BetterScroll(".cinema", {
    //       scrollbar: {
    //         fade: true,
    //       },
    //     });
    //   });
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/city')
      this.$store.commit('changeStatus')
    },
    onClickRight () {
      this.$router.push('/cinema/search')
    },
    handleClickdiv (item, index) {
      // console.log(item, index);
      this.$router.push('/film/NowPlaying')
    }
  }
}
</script>
<style scoped>
li {
  justify-content: space-between;
  padding: 5px;
  margin-bottom: 10px;
}
.price {
  width: calc(100% - 80px);
  float: left;
}
div.price > span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 80%;
}
div.price > span:nth-child(2) {
  font-size: 12px;
  color: gray;
}
.p {
  width: 80px;
  margin-right: -5px;
  float: right;
  text-align: center;
}
.cinema {
  /* height: 300px; */
  overflow: hidden;
  position: relative;
}
</style>
