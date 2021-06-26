<template>
 <view class="placeorder">
   <view class="place-view">
   			<view class="place-addres" v-if="addreing" @click="addRess()">
   				+ 新增收货地址
   			</view>
   			<!-- 已选中收货地址 -->
   			<view class="goods-address" v-if="!addreing" @click="addRess()">
   				<view class="goods-address-left">
   					<image src="../../static/coen/address.png" mode="widthFix"></image>
   				</view>
           <!-- 收货人地址 -->
   				<view class="goods-address-in">
   					<view>{{addressing.detailInfo}} </view>
   					<view class="goods-address-name">
           <!-- 收货人名字和手机号码 -->
   						<text>{{addressing.userName}} </text>
   						<text>{{addressing.telNumber}} </text>
   					</view>
   				</view>
   				<view class="goods-address-right">
   					<image src="../../static/coen/jiantou.png" mode="widthFix"></image>
   				</view>
   			</view>
        
   			<view class="place-time">
   				<image src="../../static/coen/times.png" mode="widthFix"></image>
   				<text>立即送出</text>
   			</view>
   		</view>
   		<!-- 菜单 -->
   		<view class="place-view">
   			<view>
   				<block v-for="(item,index) in allorder" :key="index">
   					<view class="order-view">
   						<view class="order-img">
   							<image :src="item.image" mode="aspectFill"></image>
   						</view>
   						<view class="order-title">
   							<text>{{item.input}}</text>
   							<text>x{{item.amount}}</text>
   						</view>
   						<view class="order-price">
   							单价:¥{{item.price}}
   						</view>
   					</view>
   				</block>
   			</view>
   		</view>
   		<!-- 配送费 -->
   		<view class="place-view">
   			<view class="Delivery">配送费：¥{{physical}}</view>
   		</view>
   <!-- 		高度 -->
   		<view style="height: 140upx;"></view>
   		<!-- 支付-->
   		<view class="payment">
   			<view class="payment-left">
   				<text>合计</text>
   				<text>¥{{payment}}</text>
   			</view>
   			<view class="payment-right" @click="toPay()">
   				去支付
   			</view>
   		</view>
   		<!-- 提示组件-->
   		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
 </view>
</template>

<script>
  import {publicing} from '../../api/api.js'
  import {fictpayurl} from '../../api/request.js'
  
  // 引入提示组件
  import HMmessages from "@/components/HM-messages/HM-messages.vue"
  export default{
    components: {HMmessages},
    data(){
      return {
        addreing:true,
        allorder:[],
        openid:'',
        payment:'',
        physical:'',
        MerchantId:'',
        logo:'',
        nameshop:'',
        addressing:{}
      }
    },
    methods:{
      addRess(){
        // 选择收货地址
        wx.chooseAddress({
          success:res=>{
            console.log(res)
            this.addressing = res
            this.addreing = false
          }
        })
      },
      
      // 去支付
      toPay(){
        if(this.addreing == true){
          console.log('没有选择收货地址')
          let succ = '请选择收货地址'
          let ico = 'error'
          this.tIps(succ,ico)
          return false
        }
        console.log('可以支付')
        this.wxPay()
      },
      
      // 微信支付
      wxPay(){
        // 客户信息
        let peopleobj = {
        	address:this.addressing.detailInfo,
        	name:this.addressing.userName,
        	iphone:this.addressing.telNumber
        }
        // 商家标识
        let merchantid = this.MerchantId
        // 截取商家标识字符串
        let ide = this.MerchantId.slice(0,7)
        // 商家名称
        let commod = this.nameshop
        // 商家logo
        let logo = this.logo
        // 把要发送到后台的数据以对象形式存储
        let Paymentinfor = {
        	type:'placeOrder',
        	peopleobj,
        	arrinfo:this.allorder,
        	merchantid,
        	ide,
        	commod,
        	logo,
        	useropenid:this.openid,
        	payment:this.payment
        }
        console.log(Paymentinfor)
        this.fictPay(Paymentinfor)
      },
      
      
      // 虚拟支付
      fictPay(Paymentinfor){
      	return new Promise((resolve,reject)=>{
      		publicing(fictpayurl,Paymentinfor)
      		.then((res)=>{
      			console.log(res)
      			resolve(res)
            let succ = '支付成功'
            let ico = 'success'
            this.tIps(succ,ico)
       
      		})
      		.catch((err)=>{
      			console.log(err)
      			reject('支付错误')
            let succ = '支付失败'
            let ico = 'error'
            this.tIps(succ,ico)
      		})
      	})
      },
   
      
      
      // 提示
      tIps(succ,ico){
      	this.HMmessages.show(succ,{icon:ico,fontColor:"#ffffff",iconColor:"#ffffff",background:"rgba(156, 74, 7, 0.8)"})
      },
      
      
    },
      
    onLoad(e) {
      console.log(e)
      let ordermen =JSON.parse(e.ide)
      console.log(ordermen)
      this.allorder = ordermen.allorder
      this.openid = ordermen.openid
      this.payment =ordermen.payment
      this.physical =ordermen.physical
      this.MerchantId =ordermen.MerchantId
      this.logo =ordermen.logo
      this.nameshop =ordermen.nameshop
    }
  }
</script>

<style>
  page{
    background: #F4f4f4;
    }
  .place-view{
    background: #FFFFFF;
    margin: 20upx;
    border-radius: 9upx;
    padding: 35upx 15upx;
  }
  .place-addres{
    border: 1rpx solid #ffb000;
    width: 400upx;
    height: 80upx;
    line-height: 80upx;
    border-radius: 50upx;
    text-align: center;
    color: #ffb000;
    margin: 0 auto;
    font-size: 30upx;
  }
  /* 收货地址 */
  .goods-address{
    display: flex; 
    align-items: center;
    }
  .goods-address-left{width: 40upx; height: 40upx; padding-right: 20upx;}
  .goods-address-left image{width: 40upx; height: 40upx;}
  .goods-address-in{flex-grow: 1; font-size: 30upx;}
  .goods-address-name{display: flex; align-items: center; font-size: 28upx;
  padding-top: 10upx;}
  .goods-address-name text:nth-child(1){padding-right: 10upx;}
  .goods-address-right{width: 40upx; height: 40upx;}
  .goods-address-right image{width: 40upx; height: 40upx;}

  .place-time{
    display: flex;
    align-items: center; 
    font-size: 30upx;
    border-top: 1rpx solid #F4f4f4;
    padding-top: 35upx;
    margin-top: 35upx;
  }
  .place-time image{
    width: 40upx; 
    height: 40upx; 
    padding-right: 20upx;
    }
  
  /* 菜单 */
  .order-view{
    display: flex;
    height: 150upx !important; overflow: hidden;
    margin-bottom: 15upx;
    font-size: 30upx;
  }
  .order-view text{display: block;}
  .order-img{
    width: 200upx !important; 
    height: 150upx !important;
    padding-right: 15upx;
  }
  .order-img image{width: 100%; height: 100%;}
  .order-title{flex-grow: 1;}
  .order-title text:nth-child(2){color: #999999; font-size: 25upx;}
  .Delivery{
    display: flex;
    justify-content: flex-end;
    font-size: 30upx;
  }

  /* 支付 */
  .payment{
    background: #FFFFFF;
    height: 120upx;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30upx;
    }
 .payment-left{
    display: flex; 
    align-items: center;
    font-size: 30upx;
    }
  .payment-left text:nth-child(2){
    font-weight: bold; 
    font-size: 32upx;
    }
  .payment-right{
    background: #07c160; 
    color: #FFFFFF;
    padding: 20upx 60upx;
    font-size: 30upx;
    border-radius: 7upx;
    }
 
</style>
