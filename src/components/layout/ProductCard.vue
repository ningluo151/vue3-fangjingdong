<template>
    <!-- src/components/layout/ProductCard.vue -->
    <div class="domebox-maxwhidth productitems">
        <div class="proitem" v-for="pro in proArr" :key="pro.id">
            <a href="CartView" @click.prevent="toProductDetailsPage(pro.id)">
                子组件
                <!-- 图片 -->
                <img :src="pro.imgsrc" alt="pro.title">
                <!-- 标题 -->
                <p>{{ pro.title }}</p>
                <!-- 服务项目 -->
                <div class="proitem-info"><span>{{ pro.service }}</span><span>{{ pro.installation }}</span></div>
                <!-- 价格  销量  加购物车 -->
                <!-- @事件修饰符    阻止默认事件.prevent 
                addcart(pro)点击传递整个商品信息到父组件
            cartStore.addItem(pro)使用pinia传递参数，点击加入购物车    -->
                <div class="proitem-price">
                    <span>{{ formatCurrency(pro.price) }}</span>{{ formatSales(pro.sales) }}
                    <span @click.stop.prevent="addToCart(pro)">+</span>
                </div>
            </a>
        </div>
        <!-- 加入购物车提示框,自动关闭提示框 -->
        <div class="toast-container">
            <transition name="slide-fade">
                <div v-if="showToast" class="toast-notification">
                    {{ toastMessage }}
                </div>
            </transition>
        </div>
    </div>
    <!-- 商品模版 -->
</template>
  
<script>
import { defineComponent } from 'vue'
// 在组件中引入购物车仓库
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'
import { products } from '@/data/products.js'; // 导入商品数据及筛选方式

// 在组件中引入计算单个商品的规格总价{}，要在setup中return暴露出来才能用
import { specsTotalPrice } from '@/stores/cart'


export default defineComponent({
    name: 'ProductCard',
    // emits: ['addcartEvent'],  // 声明自定义事件
    setup() {
        // 获取购物车实例
        const cartStore = useCartStore()
        //数字转换为货币显示
        const formatCurrency = (number) => {
            return cartStore.formatCurrency(number)
        }
        //销量3000+格式
        const formatSales = (number) => {
            return cartStore.formatSales(number)
        }

        // 提示框
        const showToast = ref(false)// 控制提示框是否显示，初始值为false（隐藏）,布尔值，true=显示提示框，false=隐藏提示框
        const toastMessage = ref('')// 提示框显示的文字内容，初始为空,字符串，要显示的文字信息

        //加入购物车
        const addToCart = (product) => {
            const defaultSpecs = {};// 存“规格”：颜色/尺码/款式等
            // const defaultServices = [];// 存“服务”：保险/延保等（key=3）
            console.log('product.specifications', product.specifications);
            // 如果有规格数据，遍历每一条
            if (product.specifications) {
                product.specifications.forEach(spec => {
                    // 如果当前规格有选项
                    if (spec.options?.length) {
                        const firstOpt = spec.options[0];// 取第一个选项
                        console.log('spec.options[0]', spec.options[0]);
                        // 判断 key：1/2 是普通规格，3 是服务
                        if ([1, 2].includes(spec.key)) {
                            // 默认选第一个，加入规格defaultSpecs对象
                            // "颜色": { value: "月光灰", price: 0 },
                            defaultSpecs[spec.name] = {
                                value: firstOpt.value,     // 选项文案
                                price: firstOpt.price || 0 // 价格（没写就0）
                            }
                        }
                        // key=3 的服务类，首页不自动选，所以不做操作
                    }
                })
            }
            const defaultPrice = specsTotalPrice(defaultSpecs);//该规格选项对应的总价钱
            
            // 组装最终购物车商品
            const cartItem = {
                ...product,// 保留原商品所有字段
                specs: defaultSpecs,       // 加上默认规格
                services: [],  // 服务默认为空
                quantity: 1,
                price:defaultPrice
            }
            console.log('组装最终购物车商品cartItem', cartItem);
            console.log('组装最终购物车商品defaultSpecs', defaultSpecs);
            // 存进 Pinia
            cartStore.addItem(cartItem)//调用本地数据js中addItem函数
            // 模拟加入购物车逻辑
            // console.log('商品已加入购物车')
            // console.log('添加商品，ID为:', product.id)
            console.log('完整商品对象:', product)//这里打印的是“原始商品对象”
            console.log('当前购物车:', cartStore.items)//打印存进去之后的购物车
            // 显示提示   .value：访问 ref 包装的变量必须用 .value,先设置文字 → 再显示提示框，避免闪烁
            toastMessage.value = '商品已成功加入购物车'
            showToast.value = true
            // 3秒后自动关闭,setTimeout定时器，只执行一次
            setTimeout(() => {
                showToast.value = false  // 3秒后执行：隐藏提示框
            }, 3000)
        }
        // 暴露给模板使用
        return {
            cartStore,
            showToast,
            toastMessage,
            addToCart,
            specsTotalPrice,
            formatCurrency,formatSales,
        }
    },
    data() {
        return {
            // 使用所有商品
            proArr: products,
        }
    },
    //函数，方法
    methods: {
        // addcart(pro) {
        //     const proid = pro.id;
        //     alert(proid + '已加入购物车');
        //     console.log(proid, '已加入购物车');
        //     //触发自定义事件，子传父
        //     this.$emit("addcartEvent", pro)
        // }
        //进入详情页
        toProductDetailsPage(id) {
            console.log('toProductDetailsPage函数触发了');
            console.log(id);
            this.$router.push({
                name: 'ProductView',
                params: { id: id }// 只传ID
            }).then(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'instant'//没有动画
                })
            })
        },

    },

})
</script>
  
<style scoped>
/* 产品列表 */
.productitems {
    clear: both;
    overflow: hidden;
}

.proitem {
    width: 18%;
    float: left;
    margin: 1%;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 8px;
}

.proitem:hover {
    border: 1px solid red;
}

.proitem p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    margin-bottom: 6px;
    color: #333;
}

.proitem img {
    border-radius: 8px;
    width: 100%;
    aspect-ratio: 1 / 1;
    /* 宽高比 1:1，高度自动等于宽度 */
}

.proitem .proitem-info {
    height: 22px;
}

.proitem .proitem-info>span {
    font-size: 12px;
    color: #ff0f23;
    border: 1px solid #ffb7bd;
    margin-right: 6px;
    padding: 2px 4px;
    border-radius: 2px;
}

/* 空内容的 span 隐藏 */
.proitem .proitem-info>span:empty {
    opacity: 0;
}

.proitem .proitem-price {
    font-size: 14px;
    color: #8c8c8c;
    margin-top: 6px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
}

.proitem .proitem-price>span {
    font-size: 22px;
    font-weight: 500;
    color: #ff0f23;
}

.proitem .proitem-price>span:nth-child(1) {
    margin-right: 5px;
}

.proitem .proitem-price>span:nth-child(2) {
    float: right;
    color: #d14f5b;
    background: #ffebf2;
    border-radius: 20px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    margin-left: auto;
}

/* 弹出框样式 */
.product-page {
    padding: 20px;
    background-color: #f5f5f5;
    min-height: 100vh;
}

.product-card {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    max-width: 400px;
}

.add-to-cart-btn {
    background-color: #ff4444;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.add-to-cart-btn:hover {
    background-color: #ff3333;
}

.toast-container {
    position: fixed;
    top: 10%;
    left: 45%;
    z-index: 1000;
}

.toast-notification {
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 16px 24px;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin-bottom: 10px;
}

/* 过渡动画 */
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>