<template>
    <div class="container">
        <!-- <p>{{ productList }}</p> -->
        <!-- 加载中状态 -->
        <div v-if="loading">加载中...</div>
        <!-- 错误状态 -->
        <div v-else-if="error">{{ error }}</div>
        <!-- 商品展示区域（仅在 product 存在时渲染） -->
        <div v-else-if="product">
            <div class="product-detail">
                <div class="product-content">
                    <!-- 商品图片区域 -->
                    <div class="product-images">
                        <!-- 可见区域宽度 -->
                        <div class="main-image">
                            <img :src="currentImgSrc" :alt="product.title" :id="product.id">
                        </div>
                        <div class="thumbnail-box">
                            <button class="thumbnail-box-prev" @click="prevImage" ref="thumbnailBoxPrev">
                                < </button>
                                    <div class="thumbnail-images" ref="scrollPosition">
                                        <!-- changeImage(index)函数传参 -->
                                        <div :class="['thumbnail', { active: activeImgIndex === index }]"
                                            v-for="(image, index) in product.images" @click="changeImage(index)">
                                            <img :src="image" alt="'商品图' + index">
                                        </div>
                                    </div>
                                    <button class="thumbnail-box-next" @click="nextImage" ref="thumbnailBoxNext"> >
                                    </button>
                        </div>
                    </div>

                    <!-- 商品信息区域 -->
                    <div class="product-info">
                        <h1 class="product-title">{{ product.title }}</h1>
                        <p class="product-subtitle">{{ product.subtitle }}</p>

                        <!-- 价格区域 -->
                        <div class="price-section">
                            <div class="price-label">京东价</div>
                            <div>
                                <span class="current-price">{{
                                    formatCurrency(specsAndServicesTotalPrice(this.selectedOptions, this.selectedServices))
                                }}</span>
                                <span class="original-price">{{
                                    formatCurrency(specsAndServicesTotalPrice(this.selectedOptions,
                                        this.selectedServices) * 1.2) }}</span>
                            </div>
                            <!-- 促销 -->
                            <div class="promotions">
                                <span class="promotion-item" v-for="service in product.promotions">{{ service }}</span>

                            </div>
                        </div>

                        <!-- 规格选择 -->
                        <div class="spec-section" v-for="spec in product.specifications" :key="spec.name">
                            <!-- 颜色，系列，尺寸，服务 -->
                            <div class="spec-title">{{ spec.name }}</div>
                            <div class="spec-options">
                                <!-- 根据 key 值渲染不同内容 -->
                                <!-- key等于1的时候，且不是服务 -->
                                <div v-if="spec.key === 1 && spec.name !== '服务'"
                                    :class="['spec-option', { selected: isOptionSelected(spec.name, option.value) }]"
                                    v-for="option in spec.options" @click="selectOption(spec.name, option)">
                                    {{ option.value }}
                                </div>
                                <!-- 服务文本，不可选 -->
                                <div v-else-if="spec.key === 1 && spec.name === '服务'" v-for="option in spec.options"
                                    :key="option.value" class="spec-option service-text">
                                    {{ option.value }}
                                </div>
                                <div v-else-if="spec.key === 2"
                                    :class="['spec-option', { selected: isOptionSelected(spec.name, option.value) }]"
                                    v-for="option in spec.options" @click="selectOption(spec.name, option)">
                                    {{ option.value }} {{ option.price }}
                                </div>
                                <!-- 增值服务类型 -->
                                <div v-else-if="spec.key === 3" v-for="group in spec.options" :key="group.value"
                                    class="nested-group">
                                    <!-- 意外换新 -->
                                    <div class="group-label">{{ group.value }}</div>
                                    <div class="spec-options">
                                        <div v-for="option in group.label" :key="option.value"
                                            @click="toggleService(spec.name, group.value, option)"
                                            :class="['spec-option', { selected: isServiceSelected(spec.name, group.value, option.value) }]">
                                            {{ option.value }}
                                            <span v-if="option.price" class="price-tag">{{ option.price }}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- 购买操作 -->
                        <div class="purchase-section">
                            <div class="quantity-selector">
                                <button class="quantity-btn" @click="decreaseQuantity(product)">-</button>
                                <input type="text" class="quantity-input" v-model.value="product.quantity"
                                    @change="validateInputQuantity(product)" id="quantity" ref="quantityInput">
                                <button class="quantity-btn" @click="increaseQuantity(product)">+</button>
                            </div>
                            <button class="buy-btn" @click="buyNow()">立即购买</button>
                            <button class="cart-btn" @click="addToCart(product)">加入购物车</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 商品详情区域 -->
            <div class="product-details">
                <div class="details-tabs">
                    <div :class="['tab', { active: activeTab === 'detail' }]" @click="switchTab('detail')">售后保障</div>
                    <div :class="['tab', { active: activeTab === 'spec' }]" @click="switchTab('spec')">商品详情</div>
                    <div :class="['tab', { active: activeTab === 'reviews' }]" @click="switchTab('reviews')">大家评</div>
                </div>

                <div class="tab-content">
                    <!-- 商品详情 -->
                    <div :class="['tab-pane', { active: activeTab === 'detail' }]" id="detail">
                        <div v-html="product.detailHtml"></div>
                    </div>

                    <!-- 规格参数 -->
                    <div :class="['tab-pane', { active: activeTab === 'spec' }]" id="spec">
                        <h2>规格参数</h2>
                        <table class="spec-table" v-for="prot in product.specTable">
                            <tr>
                                <td class="spec-label">{{ prot.label }}</td>
                                <td class="spec-value">{{ prot.value }}</td>
                            </tr>
                        </table>
                    </div>

                    <!-- 商品评价 -->
                    <div :class="['tab-pane', { active: activeTab === 'reviews' }]" id="reviews">
                        <h2>商品评价</h2>
                        <div class="reviews-summary">
                            <div class="rating-score">
                                <div class="score">4.9</div>
                                <div>综合评分</div>
                            </div>
                            <div class="reviews-distribution">
                                <div class="review-item">
                                    <div class="review-label">好评度</div>
                                    <div class="review-bar">
                                        <div class="review-fill" style="width: 95%"></div>
                                    </div>
                                    <div class="review-count">95%</div>
                                </div>
                                <div class="review-item">
                                    <div class="review-label">描述相符</div>
                                    <div class="review-bar">
                                        <div class="review-fill" style="width: 96%"></div>
                                    </div>
                                    <div class="review-count">4.8</div>
                                </div>
                                <div class="review-item">
                                    <div class="review-label">物流服务</div>
                                    <div class="review-bar">
                                        <div class="review-fill" style="width: 97%"></div>
                                    </div>
                                    <div class="review-count">4.9</div>
                                </div>
                            </div>
                        </div>
                        <h3>用户评价 (12345+)</h3>
                        <div class="comment" v-for="o in product.comment">
                            <h3>{{ o.commentator }}</h3>
                            <p>{{ o.content }}</p>
                            <p></p>
                        </div>
                    </div>


                </div>
            </div>
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
</template>

<script>
import { useRoute } from 'vue-router';//路由
import { useCartStore } from '@/stores/cart';//pinia状态管理,在组件中引入购物车仓库
import { defineComponent } from 'vue'
import { products, getProductById } from '@/data/products.js'; // 导入商品数据及筛选方式
// 在组件中引入单独计算规格和服务的价钱函数，要在export default defineComponent({})下的setup中return暴露出来才能用
import { specsTotalPrice, servicesTotalPrice, specsAndServicesTotalPrice } from '@/stores/cart'


export default defineComponent({
    name: 'ProductView',
    setup() {
        //购物车实例
        const cartStore = useCartStore()
        //数字转换为货币显示
        const formatCurrency = (number) => {
            return cartStore.formatCurrency(number)
        }
        //销量3000+格式
        const formatSales = (number) => {
            return cartStore.formatSales(number)
        }

        // 验证输入框输入
        const validateInputQuantity = (product) => {
            return cartStore.validateInputQuantity(product)
        }
        // 最大数量
        const getMaxQuantity = (product) => {
            return cartStore.getMaxQuantity(product)
        }
        //数量减少
        const decreaseQuantity = (product) => {
            cartStore.decreaseQuantity(product)
        }
        //数量增加
        const increaseQuantity = (product) => {
            cartStore.increaseQuantity(product)
        }
        return {
            specsTotalPrice, servicesTotalPrice, specsAndServicesTotalPrice,
            validateInputQuantity, cartStore, getMaxQuantity,
            decreaseQuantity, increaseQuantity,
            formatCurrency, formatSales,

        }
    },
    data() {
        return {
            // 使用所有商品
            productList: products,

            //商品数据存储，状态控制，错误信息
            product: null,//存储从数据源获取的单个商品的所有信息
            loading: true,
            error: null,

            //图片展示函数
            activeImgIndex: 0,
            currentImgSrc: '', // 当前显示的大图，局部变量，不能影响本地数据
            // 缩略图左右滑动函数
            scrollPosition: 0,//当前滚动位置

            //添加到购物车逻辑，信息弹出框
            showToast: false,// 控制提示框是否显示，初始值为false（隐藏）,布尔值，true=显示提示框，false=隐藏提示框
            toastMessage: '',// 提示框显示的文字内容，初始为空,字符串，要显示的文字信息

            //商品详情内容tab切换
            activeTab: 'detail',

            //规格选择
            // isSelected:0,//默认第一个
            isSelected: {},// 存储用户选择

            // 修改：存储每个规格的选择
            selectedOptions: {},  // 格式: { "系列品": {value: "...", price: 0}, "颜色": {value: "...", price: 0} }
            selectedServices: []  // 存储key=3的服务
        }
    },
    methods: {
        //从本地数据获取商品数据
        loadProductData() {
            try {
                //从路由中获取id
                const productId = this.$route.params.id
                console.log('productId', productId)

                // 2. 通过 id 获取商品数据
                const foundProduct = getProductById(Number(productId))
                if (foundProduct) {
                    this.product = foundProduct
                } else {
                    this.error = '未找到该商品'
                }
            } catch (err) {
                this.error = '加载失败: ' + err.message
            } finally {
                this.loading = false
            }
        },
        // 添加到购物车
        addToCart(product) {
            // 安全检查,防止商品没加载完就点按钮报错
            if (!this.product) return

            //防止数量卖超
            // console.log('this.getMaxQuantity', this.getMaxQuantity(product));
            // console.log('product.quantity', product.quantity);
            if (!this.validateInputQuantity(product)) {
                console.log('validateInputQuantity运行了');
                if (product.quantity === 1) {
                    alert(`商品"${product.title}"最多可购买0件`)
                }
                return
            }
            const ssTotalPrice = specsAndServicesTotalPrice(this.selectedOptions, this.selectedServices)
            // 组装带规格的商品对象
            const cartItem = {
                ...this.product,// 保留原字段
                specs: { ...this.selectedOptions },// 当前选中的规格
                services: [...this.selectedServices], // 当前选中的服务
                quantity: parseInt(this.$refs.quantityInput?.value) || 1,  // 选中的数量
                price: ssTotalPrice //价钱
            }
            // console.log('this.selectedOptions最终选择规格', this.selectedOptions);
            // console.log('cartItem最终选择规格', cartItem);
            // 获取购物车实例,存入 Pinia
            const cartStore = useCartStore()
            cartStore.addItem(cartItem)//调用js中addItem函数

            // 显示提示   先设置文字 → 再显示提示框，避免闪烁
            this.toastMessage = '商品已成功加入购物车'
            this.showToast = true
            // console.log('showToast 设为 true:', this.showToast) // 应该为 true
            // 5秒后自动关闭,setTimeout定时器，只执行一次
            setTimeout(() => {
                this.showToast = false
            }, 5000)
        },
        //图片切换
        changeImage(index) {
            this.activeImgIndex = index    // 更新当前激活的缩略图索引
            // console.log('index', index)
            this.currentImgSrc = this.product.images[index]
            // console.log('product.imgsrc', product.imgsrc);
        },

        //图片盒子左右滑动
        //按钮隐藏显示
        checkButtonState() {
            const scrollEl = this.$refs.scrollPosition
            if (!scrollEl) return

            const btnPrev = this.$refs.thumbnailBoxPrev//左按钮
            const btnNext = this.$refs.thumbnailBoxNext//右按钮

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
        //商品详情内容tab切换
        switchTab(tabName) {
            this.activeTab = tabName
        },
        // 判断选项是否被选中，class动态添加active类名
        //specName整个产品规格的name名称
        //optionValue这个规格下的Value值
        isOptionSelected(specName, optionValue) {
            // 检查这个规格是否被选中，并且选中的值等于当前选项值
            //格式: { "系列品": {value: "...", price: 0}, "颜色": {value: "...", price: 0} }
            //selectedOptions[specName] = "系列品"
            //selectedOptions[specName]?.value = "..."
            //?.value   ?可选链接符
            //optionValue选择的时候传递的规格选项
            //点击选择，当下的值是否等于以前选择存储起来的值
            return this.selectedOptions[specName]?.value === optionValue
        },

        // 选择规格选项，点击事件
        selectOption(specName, option) {
            // console.log('selectOption函数触发');
            //selectedOptions对象，存储选中的规格，格式: { "系列品": {value: "...", price: 0}, "颜色": {value: "...", price: 0} }
            //specName原始数据中的标题，name: "颜色",这里的selectedOptions[specName]等于selectedOptions["颜色"]，获取的是存储中的["颜色"]对应的值
            //option原始数据中每一条规格{ value: "【100%阻螨+防水透气】月光灰" }
            const currentSelection = this.selectedOptions[specName]
            // console.log('currentSelection',currentSelection)
            // 如果已经选中了同样的选项，取消选择
            if (currentSelection?.value === option.value) {
                console.log(currentSelection?.value === option.value)
                delete this.selectedOptions[specName]//可能不触发响应式
                // console.log('已取消:', specName, this.selectedOptions) // 确认删了
            } else {
                // 创建存储新的选项
                //selectedOptions对象，存储选中的规格，格式: { "系列品": {value: "...", price: 0}, "颜色": {value: "...", price: 0} }
                //向selectedOptions对象中添加{selectedOptions[specName]：{value: "...", price: 0}}
                this.selectedOptions[specName] = {
                    value: option.value,
                    price: option.price || 0
                }
            }



            console.log('this.selectedOptions当前选择的规格:', this.selectedOptions)
        },

        // 判断服务是否被选中(规格的名称,组别的名称,具体选项的值)
        isServiceSelected(specName, groupName, optionValue) {
            // console.log('isServiceSelected函数触发');
            // 在 selectedServices数组中查找，看是否存在一个服务对象，同时满足以下三个条件：
            // service.specName === specName：服务所属的规格名称要匹配
            // service.group === groupName：服务所属的组别名称要匹配
            // service.value === optionValue：服务的具体值要匹配
            // .some()方法：数组方法，检查数组中是否至少有一个元素满足指定条件
            // 条件判断：必须同时满足三个条件（specName、group、value完全匹配）
            // 返回值：
            // true：找到了匹配的服务
            // false：没有找到匹配的服务
            return this.selectedServices.some(service => {
                // 完整的逻辑是："检查数组中是否存在至少一个元素，这个元素同时满足三个条件"。
                // 1.some()方法：检查数组中是否有至少一个元素使回调函数返回 true，在这个数组里面是否有一个合格的元素
                // 2.回调函数的条件：对每个元素，需要三个条件都满足才返回 true,(规格的名称,组别的名称,具体选项的值)全部妈祖才行
                // 3.箭头函数语法：不加 { } 是隐式返回，箭头后面直接是返回值表达式
                // 4.逻辑关系：some是"存在一个"，回调函数内部是"必须全部"
                return service.specName === specName && service.groupName === groupName && service.optionValue === optionValue
            })
        },
        // 切换服务选项,key === 3的时候s,实现了多选/取消的功能逻辑
        toggleService(specName, groupName, option) {
            console.log('toggleService函数触发');
            //创建一个唯一标识符，用于区分不同的服务选项
            // 示例："优选服务-只换不修-3年全保换新"
            // 作用：确保即使不同规格、不同分组下有相同值的选项也能正确区分
            const serviceKey = `${specName}-${groupName}-${option.value}`
            // console.log('${specName}-${groupName}-${option}', serviceKey);
            // 查找已有选项索引,
            // findIndex()：查找数组中满足条件的元素的索引,
            // 如果找到：返回该元素在数组中的位置（0, 1, 2...）
            // 如果没找到：返回 -1
            const groupIndex = this.selectedServices.findIndex(s =>
                s.specName === specName &&
                s.groupName === groupName &&
                s.optionValue === option.value

            )

            //条件判断与处理
            //情况A：已选中
            // 如果当前组已经有选中的，先清空该组所有服务
            if (groupIndex > -1) {//条件：index > -1表示找到了这个服务（已选中）
                // console.log('groupIndex  > -1', groupIndex > -1);

                //操作：splice(index, 1)从数组中删除这个元素，（索引号，次数）
                //结果：从选中列表中移除该服务
                // console.log('selectedServices 删除前:', JSON.parse(JSON.stringify(this.selectedServices)))
                this.selectedServices.splice(groupIndex, 1)
                // console.log('selectedServices 删除后:', JSON.parse(JSON.stringify(this.selectedServices)))
            }
            // 如果当前点击的选项和之前选中的是同一个，就不重新添加（实现“点已选中的取消”）
            // groupIndex === -1没找到，不存在
            // this.selectedServices[groupIndex]找到同组已存在的服务对象（如果有的话）,上面groupIndex返回的是数字
            // optionValue !== option.value   选项值,具体的服务内容作为判断条件
            else {
                // 未选中 → 先清空同组的所有选项
                this.selectedServices = this.selectedServices.filter(s =>
                    // 保留其他组，只清空当前组
                    !(s.specName === specName && s.groupName === groupName)
                )
                // 情况B：未选中，把该服务添加到selectedServices数组中
                this.selectedServices.push({
                    key: serviceKey,//唯一标识
                    specName: specName,//规格名称
                    groupName: groupName,//分组名称
                    optionValue: option.value,//选项值,具体的服务内容
                    optionPrice: option.price || 0// 服务价格
                })
            }
            // console.log('this.selectedServices最终规格', this.selectedServices);
        },

    },
    //挂载后执行
    mounted() {
        this.loadProductData()

        // 等数据加载完再初始化规格（用 $nextTick 确保 DOM 和数据都好了）
        this.$nextTick(() => {
            // 初始化时用第一张图
            if (this.product?.images?.length) {
                this.currentImgSrc = this.product.imgsrc
            }

            // 修改：存储每个规格的选择
            //    selectedOptions: {},  // 格式: { "系列品": {value: "...", price: 0}, "颜色": {value: "...", price: 0} }
            //默认第一个规格
            // 如果有规格数据，遍历每一条
            if (this.product.specifications) {
                this.product.specifications.forEach(spec => {
                    // 如果当前规格有选项
                    if (spec.options?.length) {
                        const firstOpt = spec.options[0];// 取第一个选项
                        // console.log('spec.options[0]', spec.options[0]);
                        // 判断 key：1/2 是普通规格，3 是服务
                        if ([1, 2].includes(spec.key)) {
                            // 默认选第一个，加入规格defaultSpecs对象
                            // "颜色": { value: "月光灰", price: 0 },
                            this.selectedOptions[spec.name] = {
                                value: firstOpt.value,     // 选项文案
                                price: firstOpt.price || 0 // 价格（没写就0）
                            }
                        }
                        // key=3 的服务类，不自动选，不做操作
                    }
                })
            }
            // console.log('selectedOptions初始化：', this.selectedOptions);

            //等结构加载完成后，左右滑动初始化按钮状态
            this.checkButtonState()
            // 监听滚动
            this.$refs.scrollPosition.addEventListener('scroll', this.checkButtonState)
        })
    },
    // 组件销毁前清理监听，防止内存泄漏
    beforeUnmount() {

        //左右滑动按钮状态
        if (this.$refs.scrollPosition) {
            this.$refs.scrollPosition.removeEventListener('scroll', this.checkButtonState)
        }
    },
})
</script>

<style scoped>
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 15px;
}

/* 商品展示区域 */
.product-detail {
    background-color: #fff;
    margin-top: 20px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.product-content {
    display: flex;
    padding: 20px;
}

.product-images {
    width: 40%;
    padding-right: 20px;
}

.main-image {
    width: 100%;
    border: 1px solid #eee;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 10px;
}

.main-image img {
    width: 100%;
    display: block;
}

.thumbnail-box {
    width: 100%;
    overflow: hidden;
    display: flex;
    position: relative;
}

.thumbnail-box button {
    background: white;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
    z-index: 99;
}

.thumbnail-images {
    display: flex;
    margin: 0 10px;
    position: relative;
    white-space: nowrap;
    flex-wrap: nowrap;
    width: auto;
    overflow-x: auto;
    /* 允许横向滚动 */
    scrollbar-width: none;
    /* 隐藏滚动条 */
}

.thumbnail-images::-webkit-scrollbar {
    display: none;
}

/* 隐藏滚动条（Chrome/Safari） */
.thumbnail {
    width: 20%;
    flex: 0 0 20%;
    border: 1px solid #eee;
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;
    margin-right: 10px;
}

.thumbnail.active {
    border-color: #e33333;
}

.thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.product-info {
    width: 60%;
    padding-left: 20px;
}

.product-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}

.product-subtitle {
    font-size: 14px;
    color: #999;
    margin-bottom: 20px;
}

.price-section {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
}

.price-label {
    font-size: 14px;
    color: #999;
}

.current-price {
    color: #e33333;
    font-size: 28px;
    font-weight: bold;
}

.original-price {
    font-size: 14px;
    color: #999;
    text-decoration: line-through;
    margin-left: 10px;
}

.promotions {
    margin-top: 10px;
}

.promotion-item {
    display: inline-block;
    background-color: #ffe6e6;
    color: #e33333;
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 3px;
    margin-right: 8px;
    margin-bottom: 5px;
}

/* 商品规格选择 */
.spec-section {
    margin-bottom: 20px;
    display: flex;
}

.spec-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    flex: 90px 0 0;
}

.spec-options {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

/* 最后的增值服务类结构改变 */
.spec-options:has(.nested-group) {
    display: block;
}

.spec-option {
    padding: 8px 15px;
    border: 1px solid #ddd;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
}

.spec-option:hover {
    border-color: #e33333;
}

.service-text:hover {
    border-color: #ddd;
}

.spec-option.selected {
    border-color: #e33333;
    background-color: #ffe6e6;
    color: #e33333;
}

.spec-option.disabled {
    color: #ccc;
    border-color: #eee;
    cursor: not-allowed;
}

/* 增值服务 */
.group-label {
    margin-bottom: 10px;
}

.nested-group {
    margin-bottom: 20px;
}

/* 购买操作 */
.purchase-section {
    display: flex;
    align-items: center;
    margin-top: 20px;
}

.quantity-selector {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.quantity-input {
    width: 50px;
    height: 30px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 14px;
}

.buy-btn {
    background-color: #e33333;
    color: white;
    border: none;
    padding: 12px 25px;
    font-size: 16px;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 10px;
    font-weight: bold;
}

.buy-btn:hover {
    background-color: #c20e0e;
}

.cart-btn {
    background-color: #ff9500;
    color: white;
    border: none;
    padding: 12px 25px;
    font-size: 16px;
    border-radius: 3px;
    cursor: pointer;
    font-weight: bold;
}

.cart-btn:hover {
    background-color: #e68600;
}

/* 商品详情 */
.product-details {
    margin-top: 30px;
}

.details-tabs {
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #e0e0e0;
}

.tab {
    padding: 15px 25px;
    font-size: 16px;
    cursor: pointer;
    border-bottom: 3px solid transparent;
}

.tab.active {
    color: #e33333;
    border-bottom-color: #e33333;
    font-weight: bold;
}

.tab-content {
    background-color: #fff;
    padding: 30px;
    min-height: 400px;
}

.tab-pane {
    display: none;
}

.tab-pane.active {
    display: block;
}

.spec-table {
    width: 100%;
    border-collapse: collapse;
}

.spec-table tr {
    border-bottom: 1px solid #eee;
}

.spec-table td {
    padding: 12px 0;
}

.spec-label {
    color: #999;
    width: 100px;
    border: 1px;
}

.spec-value {
    color: #333;
}

/* 评论区域 */
.reviews-summary {
    display: flex;
    margin-bottom: 20px;
}

.rating-score {
    text-align: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    margin-right: 20px;
}

.score {
    font-size: 36px;
    color: #e33333;
    font-weight: bold;
}

.reviews-distribution {
    flex: 1;
}

.review-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.review-label {
    width: 60px;
    font-size: 14px;
}

.review-bar {
    flex: 1;
    height: 8px;
    background-color: #eee;
    border-radius: 4px;
    overflow: hidden;
    margin: 0 10px;
}

.review-fill {
    height: 100%;
    background-color: #e33333;
}

.review-count {
    width: 40px;
    font-size: 14px;
    color: #999;
}

.comment {
    margin: 20px auto;
}

/* 底部 */
.footer {
    background-color: #fff;
    margin-top: 40px;
    padding: 20px 0;
    border-top: 1px solid #e0e0e0;
    text-align: center;
    color: #999;
    font-size: 12px;
}

.footer-links a {
    color: #666;
    margin: 0 10px;
    text-decoration: none;
}

.footer-links a:hover {
    color: #e33333;
}

.copyright {
    margin-top: 10px;
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

/* 响应式 */
@media (max-width: 768px) {
    .product-content {
        flex-direction: column;
    }

    .product-images,
    .product-info {
        width: 100%;
        padding: 0;
    }

    .product-images {
        margin-bottom: 20px;
    }
}
</style>