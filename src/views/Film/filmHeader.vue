<template>
    <ul>
        <router-link tag="li" to="/film/NowPlaying" active-class="active">正在热映</router-link>
        <router-link tag="li" to="/film/ComingSoon" active-class="active">即将上映</router-link>
    </ul>
</template>
<style scoped>
ul{
    display: flex;
}
ul>li{
    display: flex;
    flex:1;
    cursor: pointer;
    font-size: 20px;
}
.active{
    color: red;
    border-bottom: 3px solid red;
}
</style>
