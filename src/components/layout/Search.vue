<template>
    <!-- logo 搜索栏 -->
    <div class="domebox-maxwhidth LogoSearch">
        <div>
            <a href="javascript:;" @click="goToHome"><img class="logo" src="/logo.png" alt="京东"></a>
        </div>
        <div class="search">
            <div class="ss">
                <div class="searchProduct">商品</div>
                <input type="text" class="search-text" value="请输入...">
                <img src="/zhaoxiangji.png" alt="">
                <input type="submit" value="搜索" class="search-submit">
                <div class="search-helper"></div>
            </div>
            <ul>
                <a href="javascript:;" class="remen">国补年终加磅倒计时</a>
                <a href="javascript:;" class="remen">看湖南跨晚 抽门票得周边</a>
                <a href="javascript:;">电动车挡风被加厚</a>
                <a href="javascript:;">佐罗打火机</a>
                <a href="javascript:;">煲汤炖汤一体电锅</a>
            </ul>
        </div>
        <div>
            <a href="" class="hongbaoimgs"><img src="/choujiang.gif" alt="抽奖"></a>

        </div>
    </div>
</template>

<script>
export default {

  methods: {
    goToHome(){
      // 方法1：通过路由名称跳转
      this.$router.push({ name: 'HomeView' })

      // 或方法2：通过路径跳转
      // this.$router.push('/cart')
    },
  }
}
</script>

<style scoped>
/* logo 搜索栏 */
.LogoSearch {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px auto;
}

.logo {
    max-width: 300px;
    width: 100%;
}

.search {
    border: 2px solid #fe0f24;
    background-color: white;
    height: 40px;
    line-height: 40px;
    border-radius: 6px;
    padding: 5px 10px;
}

.search div {
    float: left;
}
.ss{
    position: relative;
}
.search .search-text {
    width: 500px;
    float: left;
    padding: 8px 10px;
    margin: 5px;
    outline: none;
    border: 0;
}
.search .search-helper{
    clear: both;
    float: none;
    position: absolute;
    top: 45px;
    width: 100%;
    border: 1px solid #ccc;
    overflow: hidden;
    background: #fff;
    box-shadow: 1px 2px 1px rgba(255, 255, 255, 0.9);
    z-index: 99;
}
.search .search-helper p{
    padding:0 10px;
}
.search .search-helper p:hover{
    color: red;
    cursor: pointer;
    background: #f3f3f3;
}
.search img {
    width: 30px;
    float: left;
    margin: 5px 10px;
}

.search .search-submit {
    width: 80px;
    height: 40px;
    line-height: 40px;
    float: left;
    background: #fe0f24;
    color: white;
    border-radius: 6px;
    border: 0;
}

.search ul a {
    float: left;
    margin-right: 10px;
    color: #515256;
}

.search ul a.remen {
    color: red;
}

.hongbaoimgs img {
    max-width: 160px;
    width: 100%;
}

</style>