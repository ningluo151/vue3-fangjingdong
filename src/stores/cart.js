// stores/cart.js
import { defineStore } from 'pinia'


// 辅助函数：计算单个商品的规格总价{}，前头加export，函数导出，其他组件可以直接使用
export function specsTotalPrice(specs) {
    if (!specs) return 0
    let price = 0
    for (const k in specs) {
        price += specs[k]['price'] || 0
    }
    return price
}

// 辅助函数：计算单个商品的额外服务总价[]，前头加export，函数导出，其他组件可以直接使用
export function servicesTotalPrice(services) {
    if (!services) return 0
    let priceServices = 0
    services.forEach(services => {
        priceServices += services['optionPrice'] || 0
    })
    return priceServices
}

// 辅助函数：计算单个商品的“规格+服务”总加价，前头加export，函数导出，其他组件可以直接使用
export function specsAndServicesTotalPrice(specs, services) {
    return specsTotalPrice(specs) + servicesTotalPrice(services)
}

// 前头加export，函数导出，其他组件可以直接使用
// 1. 定义并导出一个“购物车仓库”，名字叫‘cart'
export const useCartStore = defineStore('cart', {
    // 2. 这里是仓库的“数据”（state），相当于购物车里的商品清单
    state: () => ({
        items: [], // 购物车商品列表，初始是空的
        totalPrice: 0, // 购物车总价
    }),
    // 添加持久化配置
    persist: {
        enabled: true, // 启用持久化
        strategies: [
            {
                key: 'cart',// localStorage 中的 key
                storage: localStorage,  // 存储位置
                // paths: ['items', 'totalPrice'],  // 可以指定只持久化某些字段
            }
        ]
    },
    // 3. 这里是“计算属性”（getters），用来从“数据”里算出一些值，响应式计算，提供只读的实时计算结果
    // 惰性求值，只在被访问时才会计算，如果多次访问且 items没有变化，计算结果会被缓存
    // getter 只能接收 state一个参数
    getters: {
        // 计算购物车里一个有多少件商品，包括不选中选中，初始值为0，一件一件加，quantity数量
        itemNum: (state) => {
            return state.items
                .reduce((total, item) => total + item.quantity, 0)

        },
        // 计算购物车里选中的有多少件商品，初始值为0，一件一件加，quantity数量
        itemCount: (state) => {
            return state.items
                .filter(item => item.selected)// 只筛选选中的商品
                .reduce((total, item) => total + item.quantity, 0)

        },
        // 计算总价（每个商品有price价钱和quantity数量）
        cartTotal: (state) => {
            return state.items
                .filter(item => item.selected)// 只筛选选中的商品
                .reduce((total, item) => total + (specsAndServicesTotalPrice(item.specs, item.services) * item.quantity), 0)

        },
    },

    // 4. 这里是“方法”（actions），用来修改“数据”
    actions: {
        // 添加商品到购物车
        addItem(product) {
            //生成“唯一键”：id + 规格字符串（避免不同规格合并）
            const specStr = JSON.stringify(product.specs)// {"颜色":{"value":"月光灰","price":0}}
            const servicesStr = JSON.stringify(product.services)
            const uniqueKey = `${product.id}_${specStr}_${servicesStr}`

            // 先看看购物车里有没有这个商品（用 uniqueKey 替代 id）
            const existingItem = this.items.find(item => {
                const itemSpecStr = JSON.stringify(item.specs)
                const itemSevicesStr = JSON.stringify(item.services)
                return `${item.id}_${itemSpecStr}_${itemSevicesStr}` === uniqueKey
            })

            const qty = product.quantity || 1
            const finalPrice = product.price
            if (existingItem) {
                // 如果有，就数量+1
                existingItem.quantity += qty // 如果ID相同，这里应该执行
                // 同步规格和服务（保持最新选择）
                existingItem.specs = { ...product.specs }
                existingItem.services = [...product.services]
                // 同步最新价格
                existingItem.price = finalPrice
                //默认不选中
                existingItem.selected = false
            } else {
                // 如果没有，就把新商品加进去，数量为1
                //第一步：{ ...product }（这是“展开运算符”）
                //简单说：{ ...product }就是复制一份商品的所有信息，防止直接修改原来的商品对象
                //第二步：{ ...product, selected: false }（添加新属性）  selected: false默认不选中
                this.items.push({ ...product, price: finalPrice, quantity: qty, selected: false })
            }
            // 每次添加，都重新计算总价
            this.calculateTotal()
        },

        // 从购物车移除商品
        removeItem(product) {
            // 用「ID + 规格字符串」精准匹配
            const specStr = JSON.stringify(product.specs)
            const servicesStr = JSON.stringify(product.services)
            const key = `${product.id}_${specStr}_${servicesStr}`
            // filter里返回 true的项保留，false的项删除；
            // 我们要删的是 itemKey === targetKey的那个，所以：
            // 相等 → 返回 false→ 删掉；
            // 不等 → 返回 true→ 留下。
            this.items = this.items.filter(item => {
                const itemSpecStr = JSON.stringify(item.specs)
                const itemSevicesStr = JSON.stringify(item.services)
                const itemKey = `${item.id}_${itemSpecStr}_${itemSevicesStr}`
                return itemKey !== key // 只删「同 ID + 同规格」
            })
            this.calculateTotal()// 重新计算总价
        },
        // 计算购物车中当前商品的总数量（私有方法，只在内部调用）
        getCartQuantity(id) {
            const proIdList = this.items.filter(p => p.id === id)
            const proIdListNum = proIdList.reduce((total, item) => total + item.quantity, 0)
            return proIdListNum
        },
        //最大数量
        getMaxQuantity(product) {
            const proIdListNum = this.getCartQuantity(product.id)// 计算购物车中当前商品的总数量
            // 当前商品最大数量 = 库存 - 购物车中这个商品的 总数量
            const otherItemsTotal = product.stock - proIdListNum
            return Math.max(0, otherItemsTotal)
        },
        // 验证输入框输入
        validateInputQuantity(product) {
            // 当前商品最大数量
            const max = this.getMaxQuantity(product)
            const currentQty = parseInt(product.quantity) || 1
            if (product.quantity > max && max !== 0) {
                product.quantity = max
                alert(`商品"${product.title}"最多可购买${max}件`)
                return true
            } else if (product.quantity < 1 || max === 0) {
                product.quantity = 1
                return false
            }else{
                product.quantity = currentQty
                return true
            }

           
        },
        //数量减少，购物车
        decreaseQuantity(product) {
            if (product.quantity <= 1) {
                // 弹出系统确认框
                const isConfirmed = window.confirm(`是否从购物车中删除商品"${product.title}"？`);
                if (isConfirmed) {// 用户点击“确定”，删除商品
                    this.removeItem(product);
                } else {// 用户点击“取消”，将数量重置为1
                    product.quantity = 1;
                }
            }
            product.quantity--;
        },
        //数量增加
        increaseQuantity(product) {
            const proIdListNum = this.getCartQuantity(product.id)// 计算购物车中当前商品的总数量

            if (proIdListNum >= product.stock) {
                // 弹出系统确认框
                const isConfirmed = window.confirm(`商品“${product.title}”库存为“${product.stock}”，不能再增加`);
                return
            }
            product.quantity++;
        },

        // 清除选中商品
        clearSelectedCart() {
            this.items = this.items.filter(item => item.selected === false)
        },

        // 计算总价（私有方法，只在内部调用）手动触发，调用后会主动更新​ state.totalPrice的值，主动更新状态值
        calculateTotal() {
            this.totalPrice = this.cartTotal // 直接复用 getter
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




    }
})