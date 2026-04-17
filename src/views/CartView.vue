<template>
    <!-- src/views/CartView.vue -->
    <!-- 购物车数据 -->
    <!-- 购物车头部 -->
    <div class="cart-header">
        <h2 class="cart-title">购物车</h2>
        <div class="cart-nav">
            <span class="active">全部商品</span>
            <span>降价商品</span>
            <span>库存紧张</span>
        </div>
    </div>
    <!-- 购物车主体 -->
    <div class="cart-main">


        <!-- 购物车有商品时的显示 -->
        <div v-if="cartStore.items.length > 0">
            <div id="cart-content">
                <!-- 表头 -->
                <div class="cart-table-header">
                    <div class="select-all">
                        <input type="checkbox" id="select-all" v-model="isAllSelected">
                        <label for="select-all">全选</label>
                    </div>
                    <div>商品信息</div>
                    <div>单价</div>
                    <div>数量</div>
                    <div>小计</div>
                    <div>操作</div>
                </div>

                <!-- 商品列表 -->
                <div class="cart-items" id="cart-items">
                    <!-- 商品模版 -->
                    <div class="cart-item" v-for="product in cartStore.items" :key="product.id" data-price="product.price">
                        <!-- 单选框 -->
                        <div class="item-check">
                            <input type="checkbox" class="item-select" v-model="product.selected">
                        </div>

                        <!-- 图片，标题 -->
                        <div class="product-info">
                            <div class="product-img">
                                <img :src="product.imgsrc" width='80' height='80' alt="商品图片"
                                    @click.prevent="toProductDetailsPage(product.id)">
                            </div>
                            <div class="product-detail">
                                <h4>{{ product.title }}</h4>
                                <!-- 显示规格
                                    {
                                "颜色": { value: "月光灰", price: 0 },
                                "尺码": { value: "180 * 200cm", price: 1039 }
                                } 
                            v-for="(值, 键) in product.specs"
                            -->

                                <div class="spec-line">

                                    <p class="spec-value" v-for="(spec, name) in product.specs" :key="name">{{ spec.value }}
                                    </p>
                                </div>
                                <!-- 额外服务 -->
                                <!-- <p>额外服务：</p> -->
                                <div v-for="service in product.services" :key="service.key" class="service-line">
                                    {{ service.optionValue }}<span v-if="service.optionPrice > 0">(+{{ service.optionPrice
                                    }})</span>
                                </div>
                            </div>
                        </div>

                        <!-- 单价 -->
                        <div class="price">
                            {{ formatCurrency(getFinalPrice(product)) }}
                        </div>

                        <!-- 数量 -->
                        <div class="quantity">
                            <button class="quantity-btn minus" @click="decreaseQuantity(product)">-</button>
                            <input type="number" class="quantity-input" value="1" min="1" max="getMaxQuantity(product)"
                                v-model="product.quantity" @change="validateInputQuantity(product)">
                            <button class="quantity-btn plus" @click="increaseQuantity(product)">+</button>
                        </div>

                        <!-- 小计 -->
                        <div class="subtotal">
                            {{ formatCurrency(getFinalPrice(product) * product.quantity) }}
                            <!-- {{ formatCurrency(specsAndServicesTotalPrice(product.specs,product.services) * product.quantity) }} -->
                        </div>

                        <div class="actions">
                            <a href="#" class="delete" @click="removeItem(product)">删除</a>
                            <a href="#" class="favorite" @click="addToFavorites(product)">移入收藏</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 购物车为空时的显示 -->
        <div v-else>
            <div id="empty-cart" class="cart-empty">
                <img src="/gwckong.png" width='200' height='200' alt="空购物车">
                <p>您的购物车还是空的，赶紧去选购吧！</p>
                <button href="#" class="go-shopping" @click="gogwc">去购物</button>
            </div>
        </div>
        <!-- 购物车底部结算 -->
        <div class="cart-footer" id="cart-footer">
            <div class="footer-left">
                <div class="select-all">
                    <input type="checkbox" id="select-all-bottom" v-model="isAllSelected">
                    <label for="select-all-bottom">全选</label>
                </div>
                <a href="#" class="delete-selected" @click.prevent="clearSelectedCart">删除选中商品</a>
                <a href="#" class="clear-favorites" @click.prevent>清空失效商品</a>
            </div>
            <div class="footer-right">
                <div class="total-info">
                    已选 <span id="selected-count">{{ itemCount }}</span> 件商品
                    合计：<span id="total-price">{{ formatCurrency(cartTotal) }}</span>
                </div>
                <!-- 传入参数cartTotal总价钱    itemCount总件数-->
                <button class="checkout-btn" id="checkout-btn" @click="makeThepayment(itemCount, cartTotal)">去结算</button>
            </div>
        </div>
    </div>


    <div style="height: 80px; width: 100%;"></div>
</template>

<script>
import { defineComponent, onMounted, computed } from 'vue'
// 在组件中引入购物车仓库
import { useCartStore } from '@/stores/cart'
// 在组件中引入计算规格和服务的价钱函数，要在setup中return暴露出来才能用
import { specsAndServicesTotalPrice } from '@/stores/cart'

//defineComponent是 Vue 3 组合式 API 中的一个辅助函数，主要用于为 TypeScript 提供更好的类型推断支持
export default defineComponent({
    name: 'CartView',
    // props: ['cartArr'],
    setup() {
        // 获取购物车实例
        const cartStore = useCartStore()

        // 调用pinia中的函数
        //数字转换为货币显示
        const formatCurrency = (number) => {
            return cartStore.formatCurrency(number)
        }
        //销量3000+格式
        const formatSales = (number) => {
            return cartStore.formatSales(number)
        }
        // 最大数量
        const getMaxQuantity = (product) => {
            return cartStore.getMaxQuantity(product)
        }
        //删除商品
        const removeItem = (product) => {
            cartStore.removeItem(product)//调用js中removeItem函数
        }
        //输入数量最大值
        const validateInputQuantity = (product) => {
            cartStore.validateInputQuantity(product)
        }
        //数量减少
        const decreaseQuantity = (product) => {
            cartStore.decreaseQuantity(product)
        }
        //数量增加
        const increaseQuantity = (product) => {
            cartStore.increaseQuantity(product)
        }
        // 清除选中商品
        const clearSelectedCart = () => {
            cartStore.clearSelectedCart()
        }

        // 获取计算属性
        const cartTotal = computed(() => cartStore.cartTotal)//总价格
        const itemCount = computed(() => cartStore.itemCount)//总件数

        return {
            cartStore,
            removeItem,
            clearSelectedCart,
            itemCount,
            cartTotal,
            specsAndServicesTotalPrice,
            validateInputQuantity,
            decreaseQuantity,
            increaseQuantity,
            formatCurrency, formatSales,
            getMaxQuantity,
        }
    },
    data() {
        return {

        }
    },
    computed: {
        // 控制全选状态
        // 全选按钮通过:checked="isAllSelected"来控制，isAllSelected函数返回值为true勾选状态，返回 false不勾选
        // isAllSelected: { get(), set() }是一个对象，用来定义“可读可写”的计算属性，Vue 规定必须用 :和 {}包裹；   普通函数，只读不写，直接写成方法形式
        isAllSelected: {
            // 1. 当获取 selectAll 的值时调用，控制全选按钮的显示状态，get()回答"全选按钮当前是否全选？"
            get() {
                // 遍历购物车中所有商品，检查每一个是否都被选中
                // 如果所有商品都选中 → 返回 true（勾选全选）
                // 如果有任何商品没选中 → 返回 false（不勾选全选）
                // .every()是 JavaScript 数组的一个内置方法，用于检测数组中的所有元素是否都满足指定条件
                // 布尔值：所有元素都通过测试返回 true，否则返回 false
                if (this.cartStore.items.length === 0) return false
                return this.cartStore.items.every(item => item.selected)
            },
            // set(value) 中的value值就是get()返回的布尔值，true或false
            // 2. 当设置 selectAll 的值时调用，用户点击"全选"按钮时，批量设置所有商品，set()执行单选按钮"全选/取消"操作
            // 接收点击后的新值（true或 false），然后：
            // 遍历购物车中每一个商品
            // 将每个商品的 selected属性设置为相同的值
            // 点击"全选" → 所有商品都选中
            // 取消"全选" → 所有商品都不选中
            set(value) {
                this.cartStore.items.forEach(item => {
                    item.selected = value
                })
            }
        }
    },
    methods: {
        //路由跳转页面
        gogwc() {
            this.$router.push({ name: 'HomeView' })
        },
        //标题图片路由跳转详情页
        toProductDetailsPage(id) {
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
        //移入收藏
        addToFavorites(product) {
            const isConfirmed = window.confirm(`商品“${product.title}”,移入收藏!`);
            if (isConfirmed) {
                this.removeItem(product);// 用户点击“确定”，删除商品
            }
            // 调用收藏函数
        },
        //结算,itemCount总件数，cartTotal总价钱
        makeThepayment(itemCount, cartTotal) {
            const isConfirmed = window.confirm(`共“${itemCount}”件，“${cartTotal}”,确定结算`);
            if (isConfirmed) {
                this.clearSelectedCart();// 用户点击“确定”，删除选中商品
            }
        },
        //单规格对应单服务价钱
        // 模板里写长表达式（尤其是循环内）可能触发频繁计算。
        getFinalPrice(product) {
            return specsAndServicesTotalPrice(product.specs, product.services)
        },

    }
})
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "Microsoft YaHei", sans-serif;
    background-color: #f5f5f5;
    color: #333;
}

a {
    text-decoration: none;
    color: #333;
    cursor: pointer;
}

button {
    border: 0;
    cursor: pointer;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* 头部导航 */
.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 2px solid #e4393c;
}

.cart-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
}

.cart-nav span {
    margin-right: 20px;
    cursor: pointer;
    color: #666;
}

.cart-nav span.active {
    color: #e4393c;
    font-weight: bold;
}

/* 购物车主体 */
.cart-main {
    margin-top: 20px;
}

/* 购物车头部 - 改为 flex 布局 */
.cart-table-header {
    display: flex;
    background: #fff;
    padding: 15px;
    border: 1px solid #e8e8e8;
    font-weight: bold;
    color: #666;
    text-align: center;
}

/* 为每个表头项设置宽度，保持和原来一样的宽度比例 */
.cart-table-header .select-all {
    width: 50px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cart-table-header>div:nth-child(2) {
    flex: 1;
    /* 商品信息占满剩余空间 */
    text-align: left;
    padding-left: 20px;
}

.cart-table-header>div:nth-child(3) {
    width: 100px;
    flex-shrink: 0;
}

.cart-table-header>div:nth-child(4) {
    width: 150px;
    flex-shrink: 0;
}

.cart-table-header>div:nth-child(5) {
    width: 100px;
    flex-shrink: 0;
}

.cart-table-header>div:nth-child(6) {
    width: 100px;
    flex-shrink: 0;
}

/* 全选 */
.select-all {
    display: flex;
    align-items: center;
    justify-content: center;
}

.select-all input {
    margin-right: 8px;
}

/* 商品列表 */
.cart-items {
    margin-top: 10px;
}

/* 商品项 - 改为 flex 布局 */
.cart-item {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 20px 15px;
    margin-bottom: 10px;
    border: 1px solid #e8e8e8;
    transition: all 0.3s;
}

.cart-item:hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.cart-item.selected {
    background-color: #fff9f9;
}

/* 为每个子项设置宽度，保持和表头一致 */
.cart-item .item-check {
    width: 50px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cart-item .product-info {
    flex: 1;
    /* 商品信息占满剩余空间 */
    display: flex;
    align-items: center;
    min-width: 0;
    /* 防止内容溢出 */
    padding-right: 20px;
}

.cart-item .price {
    width: 100px;
    flex-shrink: 0;
    text-align: center;
    color: #e4393c;
    font-weight: bold;
    font-size: 12px;
}

.cart-item .quantity {
    width: 150px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cart-item .subtotal {
    width: 100px;
    flex-shrink: 0;
    text-align: center;
    color: #e4393c;
    font-weight: bold;
    font-size: 12px;
}

.cart-item .actions {
    width: 100px;
    flex-shrink: 0;
    text-align: center;
}

/* 商品信息 */
.product-info {
    display: flex;
    align-items: center;
}

.product-img {
    width: 80px;
    height: 80px;
    min-width: 80px;
    background: #f5f5f5;
    border: 1px solid #eee;
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
}

.product-img img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

.product-detail {
    flex: 1;
    min-width: 0;
    /* 重要：允许文本溢出 */
}

.product-detail h4 {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 5px;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.product-detail p,
.product-info .specs {
    font-size: 12px;
    color: #999;
}

/* 规格行 */
.spec-line {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    margin-bottom: 5px;
}

.spec-value {
    white-space: nowrap;
    margin-right: 5px;
    font-size: 12px;
    color: #999;
    flex-shrink: 0;
}

/* 服务行 */
.service-line {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    font-size: 12px;
    color: #999;
    margin-bottom: 3px;
}

.service-line:last-child {
    margin-bottom: 0;
}

/* 数量选择器 */
.quantity {
    display: flex;
    align-items: center;
    justify-content: center;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.quantity-btn:hover {
    background: #eee;
}

.quantity-input {
    width: 50px;
    height: 30px;
    border: 1px solid #ddd;
    text-align: center;
    margin: 0 5px;
}

/* 操作 */
.actions a {
    color: #666;
    text-decoration: none;
    font-size: 12px;
    margin: 0 5px;
    display: inline-block;
}

.actions a:hover {
    color: #e4393c;
}

/* 购物车底部 */
.cart-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    border-top: 2px solid #e4393c;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.footer-left {
    display: flex;
    align-items: center;
}

.footer-left a {
    margin: 0 5px;
    color: #333;
    text-decoration: none;
}

.footer-right {
    display: flex;
    align-items: center;
}

/* 统计信息 */
.total-info {
    margin-left: 30px;
    font-size: 14px;
}

.total-info span {
    color: #e4393c;
    font-size: 20px;
    font-weight: bold;
    margin: 0 5px;
}

/* 结算按钮 */
.checkout-btn {
    background: #e4393c;
    color: white;
    border: none;
    padding: 12px 40px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 2px;
    margin-left: 20px;
}

.checkout-btn:hover {
    background: #d93639;
}

.checkout-btn.disabled {
    background: #ccc;
    cursor: not-allowed;
}

/* 空购物车 */
.cart-empty {
    text-align: center;
    padding: 100px 0;
    background: white;
}

.cart-empty img {
    width: 200px;
    margin-bottom: 20px;
}

.cart-empty p {
    color: #999;
    margin-bottom: 20px;
}

.cart-empty .go-shopping {
    display: inline-block;
    background: #e4393c;
    color: white;
    padding: 10px 30px;
    text-decoration: none;
    border-radius: 2px;
    border: none;
    cursor: pointer;
}

/* 弹出框提示 */
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

/* 推荐商品 */
.recommendations {
    margin: 40px auto;
}

.recommend-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.recommend-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.recommend-item {
    background: white;
    border: 1px solid #eee;
    padding: 10px;
    text-align: center;
    flex: 1 1 calc(20% - 20px);
    /* 5个一行，减去间隙 */
    min-width: 200px;
}

.recommend-img {
    height: 150px;
    background: #f5f5f5;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.recommend-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.recommend-name {
    font-size: 12px;
    margin-bottom: 8px;
    height: 36px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

.recommend-price {
    color: #e4393c;
    font-weight: bold;
    font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {

    /* 调整表头 */
    .cart-table-header {
        font-size: 12px;
        padding: 10px 5px;
    }

    .cart-table-header .select-all {
        width: 40px;
    }

    .cart-table-header>div:nth-child(2) {
        flex: 1;
        padding-left: 10px;
    }

    .cart-table-header>div:nth-child(3) {
        width: 80px;
    }

    .cart-table-header>div:nth-child(4) {
        width: 100px;
    }

    .cart-table-header>div:nth-child(5) {
        width: 80px;
    }

    .cart-table-header>div:nth-child(6) {
        width: 60px;
    }

    /* 调整商品项 */
    .cart-item {
        padding: 10px 5px;
        font-size: 12px;
    }

    .cart-item .item-check {
        width: 40px;
    }

    .cart-item .product-info {
        padding-right: 10px;
    }

    .cart-item .price {
        width: 80px;
    }

    .cart-item .quantity {
        width: 100px;
    }

    .cart-item .subtotal {
        width: 80px;
    }

    .cart-item .actions {
        width: 60px;
    }

    .product-img {
        width: 50px;
        height: 50px;
        min-width: 50px;
        margin-right: 10px;
    }

    .quantity-input {
        width: 40px;
    }

    .footer-right {
        flex-direction: column;
        align-items: flex-end;
    }

    .total-info {
        margin: 10px 0;
    }

    .checkout-btn {
        padding: 8px 20px;
        font-size: 16px;
    }

    .recommend-item {
        flex: 1 1 calc(50% - 20px);
        /* 移动端2个一行 */
    }
}
</style>