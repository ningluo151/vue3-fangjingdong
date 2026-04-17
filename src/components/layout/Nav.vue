<template>
    <div class="nav">
        <div class="domebox-maxwhidth navbox">
            <div class="nav_l">
                <ul class="navlist">
                    <li class="btli" v-if="isLook"><a href="javascript:;" @click="goHome">首页</a></li>
                    <li class="btli"><a href="javascript:;">中国大陆版 - 浙江∨</a>
                        <ul class="droplist">
                            <li><a href="javascript:;">中國港澳版</a></li>
                            <li><a href="javascript:;">中國台湾版</a></li>
                            <li><a href="javascript:;">京东全球版</a></li>
                        </ul>
                    </li>
                    <li class="btli"><a href="./../html/zhuce.html">登入</a></li>
                    <li class="btli"><a href="javascript:;">切换至企业版</a></li>
                    <li class="btli"><a href="javascript:;">找同款比价神器</a></li>
                </ul>
            </div>
            <div class="nav_r">
                <ul class="navlist">
                    <li class="btli"><a class="gwc" href="javascript:;" @click="gogwc">购物车{{ itemNum }}</a></li>
                    <li class="btli"><a href="javascript:;">我的订单</a></li>
                    <li class="btli"><a href="javascript:;">我的京东</a></li>
                    <li class="btli"><a href="javascript:;">企业采购</a></li>
                    <li class="btli"><a href="javascript:;">网站导航</a>
                        <div class="Website_navigation">
                            <div class="navigation">
                                <h2><a class="a_bolded" href="javascript:;">特色主题</a></h2>
                                <ul>
                                    <li><a href="javascript:;">京东金融</a></li>
                                    <li><a href="javascript:;">京东拍卖</a></li>
                                    <li><a href="javascript:;">装机大师</a></li>
                                    <li><a href="javascript:;">京东秒杀</a></li>
                                    <li><a href="javascript:;">出海招商</a></li>
                                    <li><a href="javascript:;">拍拍二手</a></li>
                                    <li><a href="javascript:;">全球售</a></li>
                                    <li><a href="javascript:;">台湾售</a></li>
                                    <li><a href="javascript:;">港澳售</a></li>
                                    <li><a href="javascript:;">全球购</a></li>
                                    <li><a href="javascript:;">云游戏</a></li>
                                </ul>
                            </div>
                            <div class="navigation">
                                <h2><a class="a_bolded" href="javascript:;">行业频道</a></h2>
                                <ul>
                                    <li><a href="javascript:;">手机数码</a></li>
                                    <li><a href="javascript:;">服饰美妆</a></li>
                                    <li><a href="javascript:;">家电家居</a></li>
                                    <li><a href="javascript:;">办公好物</a></li>
                                    <li><a href="javascript:;">京东生鲜</a></li>
                                    <li><a href="javascript:;">京东图书</a></li>
                                    <li><a href="javascript:;">京东超市</a></li>
                                    <li><a href="javascript:;">奢品馆</a></li>
                                    <li><a href="javascript:;">手机馆</a></li>
                                    <li><a href="javascript:;">电脑馆</a></li>
                                    <li><a href="javascript:;">宠物馆</a></li>
                                    <li><a href="javascript:;">家电馆</a></li>
                                    <li><a href="javascript:;">元器件</a></li>
                                    <li><a href="javascript:;">五金城</a></li>
                                    <li><a href="javascript:;">整车</a></li>
                                </ul>
                            </div>
                            <div class="navigation">
                                <h2><a class="a_bolded" href="javascript:;">生活服务</a></h2>
                                <ul>
                                    <li><a href="javascript:;">京东金融App</a></li>
                                    <li><a href="javascript:;">京东小金库</a></li>
                                    <li><a href="javascript:;">京东小家</a></li>
                                    <li><a href="javascript:;">充值中心</a></li>
                                    <li><a href="javascript:;">油卡充值</a></li>
                                    <li><a href="javascript:;">机票酒店</a></li>
                                    <li><a href="javascript:;">京东到家</a></li>
                                    <li><a href="javascript:;">拍拍回收</a></li>
                                    <li><a href="javascript:;">京东快递</a></li>
                                    <li><a href="javascript:;">水电煤</a></li>
                                    <li><a href="javascript:;">电影票</a></li>
                                    <li><a href="javascript:;">买车险</a></li>
                                    <li><a href="javascript:;">白条</a></li>
                                    <li><a href="javascript:;">彩票</a></li>
                                    <li><a href="javascript:;">游戏</a></li>
                                </ul>
                            </div>
                            <div class="navigation">
                                <h2><a class="a_bolded" href="javascript:;">商家服务</a></h2>
                                <ul>
                                    <li><a href="javascript:;">京麦工作台</a></li>
                                    <li><a href="javascript:;">合作招商</a></li>
                                    <li><a href="javascript:;">学习中心</a></li>
                                    <li><a href="javascript:;">商家后台</a></li>
                                    <li><a href="javascript:;">商家帮助</a></li>
                                    <li><a href="javascript:;">规则平台</a></li>
                                </ul>
                            </div>
                            <div class="navigation">
                                <h2><a class="a_bolded" href="javascript:;">更多精选</a></h2>
                                <ul>
                                    <li><a href="javascript:;">知识产权维权</a></li>
                                    <li><a href="javascript:;">京东安联保险</a></li>
                                    <li><a href="javascript:;">京东保险代理</a></li>
                                    <li><a href="javascript:;">京东零售云</a></li>
                                    <li><a href="javascript:;">合作招商</a></li>
                                    <li><a href="javascript:;">京东通信</a></li>
                                    <li><a href="javascript:;">京东E卡</a></li>
                                    <li><a href="javascript:;">企业采购</a></li>
                                    <li><a href="javascript:;">服务市场</a></li>
                                    <li><a href="javascript:;">校园加盟</a></li>
                                    <li><a href="javascript:;">关于我们</a></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li class="btli"><a href="javascript:;">手机京东</a></li>
                    <li class="btli"><a href="javascript:;">网站无障碍</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, computed } from 'vue'
// 在组件中引入购物车仓库
import { useCartStore } from '@/stores/cart'
//引入路由
import { useRoute } from 'vue-router'
//defineComponent是 Vue 3 组合式 API 中的一个辅助函数，主要用于为 TypeScript 提供更好的类型推断支持
export default defineComponent({
    name: 'Nav',
    methods: {
        //路由跳转页面，购物车
        gogwc() {
            this.$router.push({ name: 'CartView' })
        },
        goHome(){
            this.$router.push({name:'HomeView'})
        }
    },
    setup() {
        // 获取购物车实例
        const cartStore = useCartStore()
        // 计算属性computed
        const itemNum = computed(() => cartStore.itemNum)//总件数

        // 判断是否显示首页链接
        const route = useRoute()
        // 计算属性：判断是否显示首页链接
        const isLook = computed(() => {
            return route.path !== '/' && route.path !== '/home'
        })

        return {
            cartStore,
            itemNum,
            isLook,
        }
    }
})
</script>
  
<style scoped>
/* 导航 */
.nav {
    clear: both;
    height: 40px;
    border-bottom: 1px solid rgb(214, 214, 214);
    background-color: #f9f9f9;
    position: relative;
    z-index: 1000;  /* 设置较高层级的基准 */
}

.navbox {
    clear: both;
    margin: 0 auto;
    overflow: visible;
}

.nav_l {
    float: left;
}

.nav_r {
    float: right;
    overflow: visible;
}

.btli {
    position: relative;
    float: left;
    min-width: 50px;
    line-height: 40px;
    text-align: center;
    padding: 0 10px;
}

.navlist {
    overflow: visible;
}
.navlist li {
    padding: 0 10px;
}

.navlist a {
    color: #333;
    display: block;
    transition: all 0.3s ease;
}

/* .navlist .gwc{ width: 20px;} */
.navlist .gwc {
    background: url(./../public/gwc.png);
    background-repeat: no-repeat;
    background-size: 25%;
    padding-left: 25px;
    background-position: left center;
}

.navlist a:hover {
    color: red;
}

.droplist {
    position: absolute;
    background-color: #f9f9f9;
    display: none;
    border-radius: 6px;
    overflow: hidden;
}

.droplist li {
    border-top: 1px solid rgb(214, 214, 214);
}

.btli:hover .droplist {
    display: block;
}

.a_bolded {
    font-weight: 700;
}

.Website_navigation {
    width: 1005px;
    min-width: 900px;
    max-height: 320px;
    position: absolute;
    right: 0;
    top: 100%;  /* 从父元素底部开始 */
    box-shadow: 0px 0px 5px #888888;
    background-color: #f9f9f9;
    border-radius: 6px;
    display: flex;
    /* 透明度为0 */
    opacity: 0;
    /* 不显示依旧占据 */
    visibility: hidden;
    /* visibility: visible; */
    transition: all 0.3s ease;
    z-index: 1000;  /* 提高到更高的层级 */
}

/* li.btli滑过，显示下拉 */
.btli:hover .Website_navigation {
    opacity: 1;
    visibility: visible;
}

.navigation {
    /* 不缩小 */
    flex-shrink: 0;
    max-height: 320px;
    float: left;
    border-right: 1px solid #b9b8b8;
    padding: 0 20px;
    text-align: left;
}

.navigation:last-child {
    border: 0;
}

.navigation h2 {
    padding: 0 10px;
}

.navigation ul {
    margin: 0 auto;
    max-height: 280px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.navigation ul li {
    line-height: 30px;
    margin: 0px 10px 3px 0;
}

.navigation ul li a {
    font-size: 14px;
    white-space: nowrap;

}
</style>