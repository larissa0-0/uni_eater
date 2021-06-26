import Vue from 'vue'
import App from './App'
import store from "store/store.js"

Vue.prototype.$store = store
Vue.config.productionTip = false

// 引入loading
import homeload from './element/loading.vue'
Vue.component('home-load',homeload)
App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
