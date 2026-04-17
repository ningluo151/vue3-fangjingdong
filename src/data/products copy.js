// src/data/products.js
// 商品数据文件
export const products = [
  {
    id: 1,
    title: '八玺网红真花双层玻璃杯高颜值情侣果汁杯咖啡杯带把手高硼硅隔热杯子 粉白花 250ml 【2件95折·升级多花加厚】网红真花双层带把玻璃杯',
    subtitle: '256GB 原色钛金属',//小标题，副标题
    price: 8999,//售价
    originalPrice: 9999,//原价
    discount: 0.9,//折扣
    Inventory: 100,//库存
    sales: 1500,//销量
    quantity: 1,     // 数量
    selected: false,//是否选中
    imgsrc: '/c1.jpg',
    images: [
      '/xqy.jpg',
      '/x1.jpg',
      '/x2.jpg',
      '/x3.jpg',
      '/x4.jpg',
      '/x5.jpg',
      '/x6.jpg',
      '/x7.jpg',
      '/x8.jpg'
    ],
    description: '最新款iPhone手机，搭载A17 Pro芯片，钛金属边框，更轻更坚固。',//描述
    specifications: [//规格说明
      { name: '品牌', value: 'Apple' },
      { name: '型号', value: 'iPhone 15 Pro' },
      { name: '颜色', value: '原色钛金属' },
      { name: '内存', value: '256GB' },
      { name: '屏幕', value: '6.1英寸 Super Retina XDR' }
    ],
    category: '手机',//类别
    tags: ['热门', '新品', '旗舰'],//标签
    rating: 4.8,//评级
    reviewCount: 1250,
    services: ['7天无理由退货', '假一赔十', '急速发货']
  },
  {
    id: 2,
    title: 'MacBook Pro 16英寸',
    subtitle: 'M3 Pro芯片 36GB内存 1TB SSD',
    price: 19999,
    originalPrice: 21999,
    discount: 0.91,
    Inventory: 50,
    sales: 800,
    imgsrc: '/c1.jpg',
    images: [
      '/xqy.jpg',
      '/x1.jpg',
      '/x2.jpg',
      '/x3.jpg',
      '/x4.jpg',
      '/x5.jpg',
      '/x6.jpg',
      '/x7.jpg',
      '/x8.jpg'
    ],
    description: '高性能笔记本电脑，适合专业工作负载。',
    specifications: [
      { name: '品牌', value: 'Apple' },
      { name: '芯片', value: 'M3 Pro' },
      { name: '内存', value: '36GB' },
      { name: '硬盘', value: '1TB SSD' },
      { name: '屏幕', value: '16英寸 Liquid Retina XDR' }
    ],
    category: '笔记本电脑',
    tags: ['高性能', '办公', '设计'],
    rating: 4.9,
    reviewCount: 890,
    services: ['7天无理由退货', '保修3年', '免费刻字']
  },
  {
    id: 3,
    title: 'AirPods Pro (第二代)',
    subtitle: 'MagSafe充电盒',
    price: 1899,
    originalPrice: 1999,
    discount: 0.95,
    Inventory: 200,
    sales: 3200,
    imgsrc: '/c1.jpg',
    images: [
      '/xqy.jpg',
      '/x1.jpg',
      '/x2.jpg',
      '/x3.jpg',
      '/x4.jpg',
      '/x5.jpg',
      '/x6.jpg',
      '/x7.jpg',
      '/x8.jpg'
    ],
    description: '主动降噪无线耳机，空间音频，MagSafe充电。',
    specifications: [
      { name: '品牌', value: 'Apple' },
      { name: '型号', value: 'AirPods Pro (第二代)' },
      { name: '颜色', value: '白色' },
      { name: '续航', value: '最长30小时' },
      { name: '降噪', value: '主动降噪' }
    ],
    category: '耳机',
    tags: ['无线', '降噪', '便携'],
    rating: 4.7,
    reviewCount: 2100,
    services: ['7天无理由退货', '一年保修', '免费维修']
  },
  {
    id: 4,
    title: 'AirPods Pro (第二代)',
    subtitle: 'MagSafe充电盒',
    price: 1899,
    originalPrice: 1999,
    discount: 0.95,
    Inventory: 200,
    sales: 3200,
    imgsrc: '/c1.jpg',
    images: [
      '/xqy.jpg',
      '/x1.jpg',
      '/x2.jpg',
      '/x3.jpg',
      '/x4.jpg',
      '/x5.jpg',
      '/x6.jpg',
      '/x7.jpg',
      '/x8.jpg'
    ],
    description: '主动降噪无线耳机，空间音频，MagSafe充电。',
    specifications: [
      { name: '品牌', value: 'Apple' },
      { name: '型号', value: 'AirPods Pro (第二代)' },
      { name: '颜色', value: '白色' },
      { name: '续航', value: '最长30小时' },
      { name: '降噪', value: '主动降噪' }
    ],
    category: '耳机',
    tags: ['无线', '降噪', '便携'],
    rating: 4.7,
    reviewCount: 2100,
    services: ['7天无理由退货', '一年保修', '免费维修']
  },
  {
    id: 5,
    title: 'AirPods Pro (第二代)',
    subtitle: 'MagSafe充电盒',
    price: 1899,
    originalPrice: 1999,
    discount: 0.95,
    Inventory: 200,
    sales: 3200,
    imgsrc: '/c1.jpg',
    images: [
      '/xqy.jpg',
      '/x1.jpg',
      '/x2.jpg',
      '/x3.jpg',
      '/x4.jpg',
      '/x5.jpg',
      '/x6.jpg',
      '/x7.jpg',
      '/x8.jpg'
    ],
    description: '主动降噪无线耳机，空间音频，MagSafe充电。',
    specifications: [
      { name: '品牌', value: 'Apple' },
      { name: '型号', value: 'AirPods Pro (第二代)' },
      { name: '颜色', value: '白色' },
      { name: '续航', value: '最长30小时' },
      { name: '降噪', value: '主动降噪' }
    ],
    category: '耳机',
    tags: ['无线', '降噪', '便携'],
    rating: 4.7,
    reviewCount: 2100,
    services: ['7天无理由退货', '一年保修', '免费维修']
  }
  // 可以继续添加更多商品...
]

// 按ID获取商品
export function getProductById(id) {
  return products.find(product => product.id === Number(id))
}

// 按分类获取商品
export function getProductsByCategory(category) {
  return products.filter(product => product.category === category)
}

// 获取热门商品
export function getHotProducts(limit = 6) {
  return products
    .sort((a, b) => b.sales - a.sales)
    .slice(0, limit)
}

// 搜索商品
export function searchProducts(keyword) {
  return products.filter(product =>
    product.title.toLowerCase().includes(keyword.toLowerCase()) ||
    product.description.toLowerCase().includes(keyword.toLowerCase())
  )
}