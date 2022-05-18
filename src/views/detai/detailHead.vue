<template>
    <div>{{name}}</div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: '影片详情'
    }
  }
}
</script>
<style scoped>
div{
    position: fixed;
    left: 0;
    top: 0;
    background: white;
    width: 100%;
    height: 25px;
    text-align: center;
    line-height: 25px;
}
</style>
