<template>
    <nav>
        <ul>
            <router-link to="/film" tag="li" active-class="myActive"><img src="../../public/film.png" alt=""><span>电影</span></router-link>
            <router-link to="/cinema" tag="li" active-class="myActive"><img src="../../public/cinema.png" alt=""><span>影院</span></router-link>
            <router-link to="/center" tag='li' active-class="myActive"><img src="../../public/my.png" alt=""><span>我的</span></router-link>
        </ul>
    </nav>
</template>
<style scoped>
nav{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:20;
    }
ul{
    display: flex;
    width: 100%;
}
ul>li{
    display: flex;
    flex: 1;
    font-size: 15px;
    cursor: pointer;
    flex-direction: column;
}
ul>li>img{
    height: 20px;
    width: 20px;
    margin: 3px auto ;
}
span{
    margin: 0 auto;
}
.myActive{
    color: green
}
</style>
