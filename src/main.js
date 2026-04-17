import { createApp } from 'vue'
import { createPinia } from 'pinia'//导入pinia
import { createPersistedState } from 'pinia-plugin-persistedstate'  // 导入持久化插件

import App from './App.vue'
import router from './router'// 导入路由配置

// 创建 Pinia 实例
const pinia = createPinia()

// 使用持久化插件
pinia.use(createPersistedState({
  storage: localStorage,  // 使用 localStorage
  // 或者使用 sessionStorage（浏览器关闭后数据消失）
  // storage: sessionStorage,
  
  // 全局配置，所有 store 都启用持久化
  auto: true,
  
  // 还可以配置其他选项
  // key: (storeId) => `__persisted__${storeId}`,
  // paths: ['cart'],  // 只持久化特定的状态
}))


const app = createApp(App)
app.use(pinia)//使用pinia
app.use(router)// 使用路由
app.mount('#app')
