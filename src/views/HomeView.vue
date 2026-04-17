<template>
    <!-- src/views/HomeView.vue -->
    <Search />
    <!-- 热门导航 -->
    <div class="remennavitems">
        <ul>
            <li><a href="javascript:;"><img src="/zhuangji.png" alt="">装机空间</a></li>
            <li><a href="javascript:;"><img src="/sifa.png" alt="">司法拍卖</a></li>
            <li><a href="javascript:;"><img src="/qiye.png" alt="">企业购</a></li>
            <li><a href="javascript:;"><img src="/dapai.png" alt="">大牌奥莱</a></li>
            <li><a href="javascript:;"><img src="/paihang.png" alt="">排行榜</a></li>
            <li><a href="javascript:;"><img src="/diannao.png" alt="">电脑馆</a></li>
            <li><a href="javascript:;"><img src="/zhubao.png" alt="">珠宝馆</a></li>
            <li><a href="javascript:;"><img src="/kanbing.png" alt="">看病买药</a></li>
            <li><a href="javascript:;"><img src="/tushu.png" alt="">京东图书</a></li>
            <li><a href="javascript:;"><img src="/quanbu.png" alt="">全部频道</a></li>
        </ul>
    </div>
    <!-- 竖向导航 登入 -->
    <div class="domebox-maxwhidth shuxiangnavitems">
        <div class="shuxiangnavleft">
            <ul>
                <li><img src="/shuxiang01.png" alt=""><a href="javascript:;"> 冰洗</a> / <a href="javascript:;">空调</a> / <a
                        href="javascript:;">电视</a>
                    /
                    <a href="javascript:;">厨卫大电</a>
                </li>
                <li><img src="/shuxiang02.png" alt=""><a href="javascript:;"> 电脑</a> / <a href="javascript:;">办公</a> / <a
                        href="javascript:;">文具用品</a>
                </li>
                <li><img src="/shuxiang03.png" alt=""><a href="javascript:;"> 手机</a> / <a href="javascript:;">运营商</a> / <a
                        href="javascript:;">数码</a>
                </li>
                <li><img src="/shuxiang04.png" alt=""><a href="javascript:;"> 生活电器</a> / <a href="javascript:;">厨房小电</a> /
                    <a href="javascript:;">个护健康</a>
                </li>
                <li><img src="/shuxiang05.png" alt=""><a href="javascript:;"> 食品</a> / <a href="javascript:;">酒类</a> / <a
                        href="javascript:;">生鲜</a>
                    /
                    <a href="javascript:;">特产</a>
                </li>
                <li><img src="/shuxiang06.png" alt=""><a href="javascript:;"> 美妆</a> / <a href="javascript:;">个护清洁</a> / <a
                        href="javascript:;">宠物</a>
                </li>
                <li><img src="/shuxiang07.png" alt=""><a href="javascript:;"> 元器件</a> / <a href="javascript:;">劳保物资</a> / <a
                        href="javascript:;">五金机电</a></li>
                <li><img src="/shuxiang08.png" alt=""><a href="javascript:;"> 家装</a> / <a href="javascript:;">建材</a> / <a
                        href="javascript:;">家具</a>
                </li>
                <li><img src="/shuxiang09.png" alt=""><a href="javascript:;"> 家居日用</a> / <a href="javascript:;">厨具</a></li>
                <li><img src="/shuxiang10.png" alt=""><a href="javascript:;"> 男鞋</a> / <a href="javascript:;">运动</a> / <a
                        href="javascript:;">户外</a>
                </li>
                <li><img src="/shuxiang11.png" alt=""><a href="javascript:;"> 男装</a> / <a href="javascript:;">女装</a> / <a
                        href="javascript:;">童装</a>
                    /
                    <a href="javascript:;">内衣</a>
                </li>
                <li><img src="/shuxiang12.png" alt=""><a href="javascript:;"> 京东买药</a> / <a href="javascript:;">计生情趣</a>
                </li>
                <li><img src="/shuxiang13.png" alt=""><a href="javascript:;"> 房产</a> / <a href="javascript:;">汽车</a> / <a
                        href="javascript:;">汽车用品</a>
                </li>
                <li><img src="/shuxiang14.png" alt=""><a href="javascript:;"> 图书</a> / <a href="javascript:;">文娱</a> / <a
                        href="javascript:;">教育</a>
                    /
                    <a href="javascript:;">电子书</a>
                </li>
                <li><img src="/shuxiang15.png" alt=""><a href="javascript:;"> 女鞋</a> / <a href="javascript:;">箱包</a> / <a
                        href="javascript:;">钟表</a>
                    /
                    <a href="javascript:;">珠宝</a>
                </li>
                <li><img src="/shuxiang16.png" alt=""><a href="javascript:;"> 母婴</a> / <a href="javascript:;">玩具乐器</a></li>
                <li><img src="/shuxiang17.png" alt=""><a href="javascript:;"> 机票</a> / <a href="javascript:;">酒店</a> / <a
                        href="javascript:;">旅游</a>
                    /
                    <a href="javascript:;">生活</a>
                </li>
                <li><img src="/shuxiang18.png" alt=""><a href="javascript:;"> 艺术</a> / <a href="javascript:;">礼品鲜花</a> / <a
                        href="javascript:;">农牧园艺</a>
                </li>
                <li><img src="/shuxiang19.png" alt=""><a href="javascript:;"> 安装</a> / <a href="javascript:;">维修</a> / <a
                        href="javascript:;">清洗</a>
                    /
                    <a href="javascript:;">二手</a>
                </li>
                <li><img src="/shuxiang20.png" alt=""><a href="javascript:;"> 支付</a> / <a href="javascript:;">白条</a> / <a
                        href="javascript:;">保险</a>
                    /
                    <a href="javascript:;">企业金融</a>
                </li>
            </ul>
        </div>
        <div class="shuxiangnavcenter">
            <div class="shuxiangnavcentertop">
                <Lunbotu />
                <div class="butie">
                    <div class="butie-top">
                        <a href="javascript:;">
                            <p>国家补贴 × 百亿补贴</p>
                            <p>限时补贴</p>
                        </a>
                    </div>
                    <ul id="butieul">
                        <li><a href="javascript:;"><img src="/bt1.jpg" alt=""><span>￥339</span>
                                <p>已补110元</p>
                            </a></li>
                        <li><a href="javascript:;"><img src="/bt2.jpg" alt=""><span>￥167</span>
                                <p>已补5.12元</p>
                            </a></li>
                        <li><a href="javascript:;"><img src="/bt3.jpg" alt=""><span>￥27.99</span>
                                <p>已补1.91元</p>
                            </a></li>
                        <li><a href="javascript:;"><img src="/bt4.jpg" alt=""><span>￥358</span>
                                <p>已补140.68元</p>
                            </a></li>
                    </ul>
                </div>
            </div>
            <div class="shuxiangnavcenterbottom">
                <div class="butie paipaiershou">
                    <div class="butie-top">
                        <a href="javascript:;">
                            <p>拍拍二手</p>
                            <p>爆款好物低价</p>
                        </a>
                    </div>
                    <ul>
                        <li>
                            <span>低价数码</span>
                            <div>
                                <a href="javascript:;">大牌捡漏</a>
                                <a href="javascript:;">品质精选</a>
                                <a href="javascript:;">严选质检</a>
                            </div>
                        </li>
                        <li><a href="javascript:;"><img src="/shouji.jpg" alt=""><span>￥5794</span></a>
                        </li>
                    </ul>
                </div>
                <div class="butie zhibo">
                    <div class="butie-top">
                        <a href="javascript:;">京东直播</a>
                    </div>
                    <ul>
                        <li><a href="javascript:;"><img src="/zhibo.png" alt="">
                                <p>京喜甄选直播间</p>
                            </a></li>
                    </ul>
                </div>
                <div class="butie miaosha">
                    <div class="butie-top">
                        <a href="javascript:;">
                            <p>京东秒杀</p>
                            <p>18点场限时秒杀</p>
                        </a>
                    </div>
                    <ul>
                        <li><a href="javascript:;"><img src="/miaosha1.jpg" alt="">
                                <div><span>￥28.5</span>
                                    <p>&nbsp;&nbsp;&nbsp;秒杀价</p>
                                </div>
                            </a></li>
                        <li><a href="javascript:;"><img src="/miaosha2.jpg" alt="">
                                <div><span>￥35.9</span>
                                    <p>&nbsp;&nbsp;&nbsp;秒杀价</p>
                                </div>
                            </a></li>
                    </ul>
                </div>
                <div class="butie baoyou">
                    <div class="butie-top">
                        <a href="javascript:;">
                            <p>9.9包邮</p>
                            <p>1元特价</p>
                        </a>
                    </div>
                    <ul>
                        <li><a href="javascript:;"><img src="/baoyou.jpg" alt=""><span>￥22</span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 登入 -->
        <div class="shuxiangnavdengru">
            <div class="dengru">
                <div>
                    <img src="/logotouxiang.png" alt="登入">
                    <span>Hi~ 上午好</span>
                </div>
                <div>
                    <div>
                        <img src="/5yuan.png" alt="">
                        <img src="/xinren.png" alt="">
                        <img src="/jingdou.jpg" alt="">
                    </div>
                    <p><a href="zhuce.html">登入并领取</a></p>
                </div>
            </div>
            <div class="pinpai">
                <div>
                    <div>品牌团<span>HOT</span></div>
                    <div>查看全部</div>
                </div>
                <div>
                    <a href="javascript:;"><img src="/pinpai1.jpg" alt="">
                        <p>进入品牌</p>
                    </a>
                    <a href="javascript:;"><img src="/pinpai2.jpg" alt="">
                        <p>进入品牌</p>
                    </a>
                    <a href="javascript:;"><img src="/pinpai3.jpg" alt="">
                        <p>进入品牌</p>
                    </a>
                    <a href="javascript:;"><img src="/pinpai4.jpg" alt="">
                        <p>进入品牌</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <!-- 热门导航2 -->
    <div class="remennavitems remennavitems2">
        <ul ref="scrollPosition">
            <li v-for="cate in categories" :key="cate.id"><a href="javascript:;"><img :src="cate.icon" alt="">{{ cate.name
            }}</a></li>
        </ul>
        <a href="javascript:;" class="remennav2-prev" @click.prevent="prevImage()" ref="remennav2Prev">&lt;</a>
        <a href="javascript:;" class="remennav2-next" @click.prevent="nextImage()" ref="remennav2Next">&gt;</a>
    </div>

    <!-- 产品列表 -->
    <!-- 这里动态生成商品 -->
    <div>父组件</div>
    <ProductCard />
</template>

<script>
import Lunbotu from '@/components/layout/Lunbotu.vue';

import Search from '@/components/layout/Search.vue';
import ProductCard from '@/components/layout/ProductCard.vue';

import { useCartStore } from '@/stores/cart';//pinia状态管理,在组件中引入购物车仓库
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'HomeView',
    setup() {
        //购物车实例
        const cartStore = useCartStore()
        //调取useCartStore中函数使用
        //数字转换为货币显示
        const formatCurrency = (number) => {
            return cartStore.formatCurrency(number)
        }
        //销量3000+格式
        const formatSales = (number) => {
            return cartStore.formatSales(number)
        }

        //把函数暴露出来，模版才能使用
        return {
            formatCurrency, formatSales,
        }
    },
    data() {
        return {
            // 分类数据
            categories: [
                { id: 1, name: '为你推荐', icon: '/tuijian.png', path: '/recommend' },
                { id: 2, name: '家居百货', icon: '/baihuo.png', path: '/home-goods' },
                { id: 3, name: '家用电器', icon: '/dianqi.png', path: '/appliances' },
                { id: 4, name: '五金机电', icon: '/wujin.png', path: '/hardware' },
                { id: 5, name: '五金机电', icon: '/miao.png', path: '/hardware2' },
                { id: 6, name: '个护美妆', icon: '/meizhuang.png', path: '/beauty' },
                { id: 7, name: '母婴亲子', icon: '/muying.png', path: '/baby' },
                { id: 8, name: '萌宠护理', icon: '/mengchong.png', path: '/pets' },
                { id: 9, name: '教育文娱', icon: '/jiaoyu.png', path: '/education' },
                { id: 10, name: '农资园艺', icon: '/yuanyi.png', path: '/garden' },
                { id: 11, name: '健康保养', icon: '/jiankang.png', path: '/health' },
                { id: 12, name: '运动户外', icon: '/yundong.png', path: '/sports' },
                { id: 13, name: '服饰鞋包', icon: '/fushi.png', path: '/clothing' },
                { id: 14, name: '电脑数码', icon: '/shuma.png', path: '/digital' },
                { id: 15, name: '文具办公', icon: '/wenju.png', path: '/stationery' },
                { id: 16, name: '手机通讯', icon: '/shouji.jpg', path: '/mobile' },
                { id: 17, name: '汽车服务', icon: '/qiche.png', path: '/car' },
                { id: 18, name: '粮油调味', icon: '/liangyou.png', path: '/grocery' },
                { id: 19, name: '食品酒饮', icon: '/jiuyin.png', path: '/food-drinks' },
                { id: 20, name: '小家电', icon: '/jiadian.png', path: '/small-appliances' },
                { id: 21, name: '家具建材', icon: '/jiaju.png', path: '/furniture' }
            ],
            jumps: 200,//跳转步数
            cartArr: [],//存储加入购物车的商品

            // 左右滑动函数
            scrollPosition: 0,//当前滚动位置
        }
    },
    components: {
        Lunbotu,
        Search,
        ProductCard

    },
    methods: {
        //按钮隐藏显示
        checkButtonState() {
            const scrollEl = this.$refs.scrollPosition
            if (!scrollEl) return

            const btnPrev = this.$refs.remennav2Prev//左按钮
            const btnNext = this.$refs.remennav2Next//右按钮

            if (!btnPrev || !btnNext) return

            const currentScroll = scrollEl.scrollLeft  //现在的位置,0 ← 当前位置 → max
            // scrollWidth元素内容的总宽度（包括不可见部分）
            // clientWidth元素可见区域的宽度
            const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth //最大滚动距离

            // 左按钮：滚动到最左边时隐藏
            btnPrev.style.display = currentScroll > 0 ? 'flex' : 'none'
            btnNext.style.display = currentScroll < maxScroll - 1 ? 'flex' : 'none'
        },
        // 向左滑动（上一张，可见盒子一半距离）
        prevImage() {
            console.log('prevImage函数运行了');
            const scrollEl = this.$refs.scrollPosition
            //如果滚动盒子没有 或者 大图片盒子的宽度为0 则返回
            if (!scrollEl || scrollEl.clientWidth <= 0) return
            //滑动距离
            const scrollAmount = scrollEl.clientWidth / 2
            // 更新滚动位置：当前位置 - 滑动距离，最小为 0（不能反向滚动）
            // Math.max(a, b)  // 返回 a 和 b 里较大的那个
            this.scrollPosition = Math.max(0, this.scrollPosition - scrollAmount)

            // 应用滚动效果
            this.$refs.scrollPosition.scrollTo({
                left: this.scrollPosition,
                behavior: 'smooth'// 平滑滚动
            })
        },
        // 向右滑动（下一张，可见盒子一半距离）
        nextImage() {
            console.log('nextImage函数运行了');
            const scrollEl = this.$refs.scrollPosition
            if (!scrollEl || scrollEl.clientWidth <= 0) return
            const scrollAmount = scrollEl.clientWidth / 2
            // 剩余最大可滚动距离 = 自身总宽度 - 自身可视宽度（约等于containerWidth）
            const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth
            // 更新滚动位置：当前位置 + 滑动距离，不超过最大值
            // Math.min(a, b)  // 返回 a 和 b 里较小的那个 
            this.scrollPosition = Math.min(maxScroll, this.scrollPosition + scrollAmount)

            // 应用滚动效果
            this.$refs.scrollPosition.scrollTo({
                left: this.scrollPosition,
                behavior: 'smooth'//平滑滚动
            })
        },
    },
    //挂载后
    mounted() {
        //等结构加载完成后，初始化按钮状态
        this.$nextTick(() => {
            this.checkButtonState()
            // 监听滚动
            this.$refs.scrollPosition.addEventListener('scroll', this.checkButtonState)
        })
    },
    //销毁前
    beforeUnmount() {
        if (this.$refs.scrollPosition) {
            this.$refs.scrollPosition.removeEventListener('scroll', this.checkButtonState)
        }
    },
})
</script>

<style scoped>
@import '@/assets/css/homeview.css';
</style>