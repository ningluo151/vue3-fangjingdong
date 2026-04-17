<template>
    <!-- 返回顶部 -->
    <div class="backtop">
        <div class="back-item">
            <a href="javascript:;">
                <img src="/gwc2.png" alt="">
                <p>购物车</p>
            </a>
        </div>
        <div class="back-item">
            <a href="javascript:;">
                <img src="/wd.png" alt="">
                <p>我的</p>
            </a>
        </div>
        <div class="back-item">
            <a href="javascript:;">
                <img src="/kf.png" alt="">
                <p>客服</p>
            </a>
        </div>
        <div class="back-item">
            <a href="javascript:;">
                <img src="/cj.png" alt="">
                <p>插件版</p>
            </a>
        </div>
        <div class="back-item">
            <a href="javascript:;">
                <img src="/fk.png" alt="">
                <p>反馈</p>
            </a>
        </div>
        <div class="back-item">
            <a href="javascript:;">
                <img src="/ai.png" alt="">
                <p>AI调研</p>
            </a>
        </div>
        <div class="back-item back">
            <a href="javascript:;">
                <img src="/back.png" alt="">
                <p>回顶部</p>
            </a>
        </div>
    </div>
</template>

<script>


export default {
  name: 'HomeView',
  mounted() {
    this.initHomePageEvents();
  },
  methods: {
    initHomePageEvents() {
    
      //  返回顶部功能
      const back = document.querySelector('.back');
      if (back) {
        document.addEventListener('scroll', function() {
          if (window.pageYOffset > 0) {
            back.style.display = 'block';
          } else {
            back.style.display = 'none';
          }
        });
        
        back.addEventListener('click', function() {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    }
  }
}
</script>

<style scoped>
/* 组件内部样式 */
/* 返回顶部 */
.backtop{
    position: fixed;
    top: 20%;
    right: 0;
    background: white;
    box-shadow: 0 0 20px #888888;
    width: 50px;
    border-radius: 8px 0 0 8px;
    text-align: center;
    z-index: 999;
    overflow: hidden;
}
.backtop .back-item{
    padding: 10px 0;
    transition: background 0.3s ease; /* 添加悬停过渡 */
}
.backtop .back-item a{
    display: block;
}
.backtop .back-item img{
    color: #333;
    width: 20px;
    filter: brightness(30%);  /* 悬停时变全黑 */
    
}
.backtop .back-item p{
    text-align: center;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    width: 100%;
    color: #515256;
}
.backtop .back-item:hover{
    background: red;
}
.backtop .back-item:hover img{
    filter: brightness(100%);  /* 正常亮度 */
}
.backtop .back-item:hover p{
    color: white;
}
.back{
    display: none;
}
</style>