<template>
    <!-- 头部横条抢购 public/jingdong_top2.jpg-->
    <div class="top">
        <img src="/jingdong_top2.jpg" alt="">
        <div class="top_white">
            <img src="/jiaodai.jpg" alt="">
            <div>
                <p>京喜自营</p>
                <p>买一送一</p>
            </div>
        </div>
        <div class="top_white">
            <img src="/zhuji.jpg" alt="">
            <div>
                <p>办公爆品</p>
                <p>限时立减</p>
            </div>
        </div>
    </div>
</template>
  
<script setup>

</script>
  
<style scoped>
/* 组件内部样式 */
/* 头部横条抢购 */
.top {
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e30500;
}

.top>img {
    flex: 0 1 50%;
    max-width: 50%;
}

.top .top_white {
    width: 140px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.9);
    margin: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.top .top_white img {
    width: 50px;
    height: 50px;
    max-width: 55px;
}

.top .top_white>div {
    margin: 10%;
    padding: 1%;
    display: flex;
    flex-flow: column;
}

.top .top_white p {
    color: red;
    font-size: 14px;
}
</style>