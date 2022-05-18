<template>
  <div id="app">
    <tab-bar style="background:white;" v-show="$store.state.isTabbarShow"></tab-bar>
    <section>
      <router-view/>
    </section>
  </div>
</template>
<script>
import tabBar from './components/tabBar.vue'
export default {
  components: {
    tabBar
  }
}
</script>
<style lang="scss">
ul,li{
  list-style: none;
}
*{
  margin: 0;
  padding: 0;
}
section{
  margin-bottom: 50px;
}
</style>
