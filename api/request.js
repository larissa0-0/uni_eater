// 共用地址
let url='https://meituan.thexxdd.cn/api'

// 首页请求
// 为你优选
let getpreferurl=`${url}/forshop/getprefer`

// 附近商家
let getwxshopurl = `${url}/forshop/wxshop`

// 综合排序
let startingurl = `${url}/forshop/starting`

// 筛选 多选
let multipleurl =  `${url}/forshop/multiple`

// 搜索页面的接口
let searchurl = `${url}/forshop/search`


// 下单页面请求
// 商家介绍(头部商品信息以及商品详情页的信息)
let shopurl = `${url}/forshop/shop`
// 菜品商品
let getdishesurl =`${url}/forshop/getdishes`
//评论
let discussurl =`${url}/message/discuss`

// 登录
let wxloginurl = `${url}/wxuser/wxlogin`

// 虚拟支付接口
let fictpayurl =`${url}/wxpay/fictpay`

//我的订单接口
let wxpayingurl= `${url}/wxpay/wxpaying`

// 评论接口
let commenturl =`${url}/message/comment`

export{ getpreferurl, getwxshopurl, startingurl, multipleurl, searchurl, shopurl, getdishesurl, discussurl, wxloginurl, fictpayurl, wxpayingurl, commenturl}

