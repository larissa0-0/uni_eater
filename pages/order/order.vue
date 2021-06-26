<template>
  <view >
   <block v-for="(item,index) in neworder" :key="index">
   <view class="order-back">
   	<view class="order-view">
   		<view class="order-img">
   			<image :src="item.logo" mode="aspectFill"></image>
   		</view>
   		<view class="goods-commodity">{{item.body}}</view>
   		<view class="order-succ" v-if="item.status === 1">
   			付款成功
   		</view>
   		<view class="order-succ" v-else>
   			待付款
   		</view>
   	</view>
   	<!-- 2 -->
   	<view>
   		<block v-for="(itemdata,index) in item.Paymentinfor" :key="index">
   		<view class="order-dishes">
   			<text>{{itemdata.input}}</text>
   			<text>x{{itemdata.amount}}</text>
   		</view>
   		</block>
   	</view>
   	
   	<view class="order-Total">
   		<view class="order-left">
   			<text v-if="item.status === 1" @click="evaLuate(item.merchantid,item.body)">去评价</text>
   		</view>
   		<view class="order-right">
   			<text>共{{item.Paymentinfor.length}}件商品</text>
   			<text>合计：{{item.total_fee}}元</text>
   		</view>
   	</view>
   </view>
   </block>
    	
    	<!-- 提示 -->
    	<tips ref="tips"></tips>
    	
  </view>
</template>

<script>
  // 提示组件
  import tips from '../../element/tips.vue'
  // post请求
  import {publicing} from '../../api/api.js'
  // 地址
  import {wxpayingurl} from '../../api/request.js'
  import {fictpayurl} from '../../api/request.js'
  
  export default{
    components:{tips},
    data(){
      return {
        openid:'',
        orderShow:false,
        neworder:[]
        // neworder:[
        //   {
        //     merchantid:'5dfcf328da83f620e4077112',
        //     status:0,
        //     body:'九丰土菜馆',
        //     logo:'http://lstkk.oss-cn-beijing.aliyuncs.com/meituan/public/uploads/1583591740906.png',
        //     total_fee:'1.4',
        //     length:'1',
        //     input:'狮子头',
        //     amount:'3'
        //   },
        //   {
        //     merchantid:'5dfcf328da83f620e4077114',
        //     status:1,
        //     body:'深夜的喵烧烤(文一店)',
        //     logo:'http://lstkk.oss-cn-beijing.aliyuncs.com/meituan/public/uploads/1583595775146.png',
        //     total_fee:'5',
        //     length:'1',
        //     input:['招牌秘制烤羊肉串'],
        //     amount:'5'
        //   }
        // ]
      }
    },
    
    methods:{
     // 看订单的前提条件就是是否登录
     onShow() {
     	let setdata = uni.getStorageSync('usermen')
     	if(!setdata){
     		let bull = true
     		let tips = '请登录后再查看'
     		this.tising(bull,tips)
        
     	}else{
     		this.openid = setdata.openid
        console.log(setdata.openid)
     		let bull = false
     		let tips = ''
     		this.tising(bull,tips)
        this.orderShow = true
     		this.orderIng()
     	}	
     },
      
      orderIng(){
      	let data = {
      		type:'myorder',
      		openid:this.openid,
      	}
        console.log(data)
      	publicing(wxpayingurl,data).then(res=>{
          console.log(res)
          if(res.data.datas.length === 0){
          	let bull = true
          	let tips = '你还没有订单'
          	this.tising(bull,tips)
          }else{
          	let bull = false
          	let tips = ''
          	this.tising(bull,tips)
          	// 筛选需要的数据
          	let neworder = res.data.datas.map((item)=>{
          		let merchantid = item._merchantid
          		let openid = item._openid
          		let status = item.status
          		let body = item.wxorder.body
          		let logo = item.wxorder.logo
          		let total_fee = item.wxorder.total_fee
          		let Paymentinfor = item.wxorder.Paymentinfor.arrinfo
          		return{
          			merchantid,
          			openid,
          			status,
          			body,
          			logo,
          			total_fee,
          			Paymentinfor
          		}
          	})
          	console.log(neworder)
          	this.neworder = neworder
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      
      // 反馈提示
      tising(bull,tips){
      	this.$nextTick(()=>{
      		this.$refs.tips.init(bull,tips)
      	})
      },
      
      // 去评价
      evaLuate(ide,body){
        wx.navigateTo({
          
        	url:'../evaluate/evaluate?ide=' + ide + '&body=' + body
        })
      }
      
    }
  }
</script>

<style scoped>
  page{background: #f2f3f4;}
  .order-back{background: #FFFFFF;
  margin: 10upx;
  padding: 20upx 10upx;
  border-radius: 9upx;}
  .order-img{width: 100upx; height: 100upx; padding-right: 20upx;}
  .order-view image{width: 100upx; height: 100upx; border-radius: 10upx;}
  .order-view{height: 106upx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;}
  .goods-commodity{flex-grow: 1; font-size: 30upx; font-weight: bold;}
  .order-succ{font-size: 28upx; color: #666666;}
  .order-dishes{
  font-size: 28upx;
  color: #666666;
  display: flex; align-items: center; justify-content: space-between;
  height: 80upx;
  }
  .order-Total text{display: block;}
  .order-right text:nth-child(1){padding-right: 10upx;}
  .order-Total{ 
  font-size: 28upx;
  color: #666666;
  display: flex; align-items: center;
  justify-content: space-between;
  height: 80upx;
  }
  .order-right{display: flex; align-items: center;}
  .order-left text{background: #f2f3f4; border-radius: 10upx;
  padding: 5upx 10upx;}
</style>