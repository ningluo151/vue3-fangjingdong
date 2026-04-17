<template>
  <!-- 整体布局 -->
  <div id="app">
    <!-- <button @click="goToHome">首页</button>
    <button @click="goToCart">购物车</button>
    <button @click="goToProduct">详情页</button> -->

    <!-- 头部导航（每个页面都显示） 应用文件 -->
    <Header />
    <Nav />
    <!-- 这里是页面显示的地方 -->
    <router-view></router-view>

    <!-- 底部（每个页面都显示） -->
    <Footer />
    
    <!-- 返回顶部（每个页面都显示） -->
    <Backtop />
  </div>
</template>
<script>
import { RouterView } from 'vue-router'
// 导入文件
import Header from '@/components/layout/Header.vue';
import Nav from '@/components/layout/Nav.vue';
import Footer from '@/components/layout/Footer.vue';
import HomeView from '@/views/HomeView.vue';
import ProductCard from '@/components/layout/ProductCard.vue';
import CartView from '@/views/CartView.vue';
import Backtop from '@/components/layout/Backtop.vue';

// 可以导入 CSS
import '@/assets/css/common.css';
import '@/assets/css/mediastyle.css';

export default {
  name: 'App',
  data() {
    return {
      cartArr: [],//存储加入购物车的商品
    }
  },
  methods: {
    cartArrHandle(product) {
      this.cartArr.push(product);
      console.log('收到商品:', product);
    },
    //数字转换为货币显示
    formatCurrency(number) {
      if (number) {
        // 确保是数字类型  9.9
        const num = parseFloat(number) || 0;

        // 转换为两位小数  9.90 字符串
        const fixed = num.toFixed(2);

        // 添加千分位分隔符，拆分整数和小数部分
        const parts = fixed.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        // 组合并添加货币符号
        return '¥' + parts.join('.');
      }
      return ''
    },
    //销量3000+格式
    formatSales(number) {
      if (number) {
        return '销量' + number + '+'
      }
      return ''
    },
    goToCart() {
      // 方法1：通过路由名称跳转
      this.$router.push({ name: 'CartView' })

      // 或方法2：通过路径跳转
      // this.$router.push('/cart')
    },
    goToProduct() {
      // 方法1：通过路由名称跳转
      this.$router.push({ name: 'ProductView' })

      // 或方法2：通过路径跳转
      // this.$router.push('/cart')
    },
    goToHome() {
      // 方法1：通过路由名称跳转
      this.$router.push({ name: 'HomeView' })

      // 或方法2：通过路径跳转
      // this.$router.push('/cart')
    },
  },
  components: {
    Header,
    Nav,
    Footer,
    Backtop,
    HomeView,
    CartView,
    ProductCard
  }
}
</script>



<style>
/* 全局样式 */
body {
  margin: 0;
  font-family: 'Microsoft YaHei', sans-serif;
  /* 防止页面横向滚动 */
  overflow-x: hidden;
}
/* App 容器 */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* 确保不超出视口宽度 */
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}
router-view {
  flex: 1; /* 关键：让路由视图占据剩余垂直空间 */
  /* 关键：限制宽度并处理溢出 */
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  /* 确保内部内容不溢出 */
  box-sizing: border-box;
}
/* 确保所有内部容器也正确处理宽度 */
router-view > * {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}
</style>