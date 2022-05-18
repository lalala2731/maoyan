import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/http'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityId: '110100',
    cityName: '北京',
    isTabbarShow: true,
    cinemaList: [],
    cinema: ''
  },
  // 集中式修改状态，被监控
  mutations: {
    changeCityName (state, name) {
      state.cityName = name
    },
    changeCityId (state, id) {
      state.cityId = id
    },
    hide (state) {
      state.isTabbarShow = false
    },
    show (state) {
      state.isTabbarShow = true
    },
    changeCinemaList (state, data) {
      state.cinemaList = data
    },
    changeStatus (state) {
      state.cinemaList = []
    },
    changeCinema (state, name) {
      state.cinema = name
    }
  },
  actions: {
    getCinemaList (store, id) {
      return http({
        url: `/gateway?cityId=${id}&ticketFlag=1&k=8603860`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        store.commit('changeCinemaList', res.data.data.cinemas)
      })
    }
  },
  modules: {}
})
