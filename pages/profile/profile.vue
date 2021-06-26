<template>
  <!-- 我的 -->
  <view class="profile">
    <!-- 已登录 -->
    <view class="wx-name" v-if="wxlogin">
    	<view>
    		<image :src="usering.avatarUrl"></image>	
    	</view>
    	<view class="wx-text">
    		<text>{{usering.nickName}}</text>
    	</view>
    </view>
    <!-- </block> -->
    	<!-- 未登录 -->
    	<view class="wx-button" v-if="!wxlogin">
    		<view class="wx-button-view">登录美团外卖，开启吃货旅程</view>
    		<view>
    			<button plain="true" open-type="getUserInfo" @click="getUserInfo">去登录</button>
    		</view>
    	</view>
    </view>
  </view>
</template>

<script>
// post请求
import {publicing} from '../../api/api.js'
	// 请求地址
	import {wxloginurl} from '../../api/request.js'
  
  export default{
    data(){
      return {
        wxlogin:false,
        usering:{},
        appid:'wx58a5d86dd50108ef',
        AppSecret:'db64f442101af055e9cd06897fbe4483'
      }
    },
    methods:{
      getUserInfo(event){
        wx.getUserProfile({
        	desc: '登录'
        })
        .then(res=>{
        	console.log(res)
          this.wxCode(res.userInfo.avatarUrl,res.userInfo.nickName)
        })
        .catch(err=>{
        	console.log('拒绝登录或登录失败')
        })
      },
      
      // 获取code
      wxCode(avatarUrl,nickName){
        wx.login({
          success:res=>{
            console.log(res)
            let code = res.code
            let appid = this.appid
            let secret = this.AppSecret
            this.wxLogin(avatarUrl, nickName, code, appid, secret)
          },
          fail:err=>{
            console.log(err)
          }
        })
      },
      // 请求后端登录
      wxLogin(avatarUrl, nickName, code, appid, secret){
        let data = {
          avatarUrl,
          nickName,
          code,
          appid,
          secret
        }
        console.log(data)
        publicing(wxloginurl, data).then(res=>{
          console.log(res)
          
          // 存入本地
          uni.setStorageSync('usermen',res.data.datas)
          this.ifUser()
        }).catch(err=>{
          console.log(err)
        })
      },
      
     //  取出本地存入的用户信息
     // 是否已登录
     ifUser(){
       
       // 从本地取出数据存入setdata
     	let setdata = uni.getStorageSync('usermen')
     	if(!setdata){
     		this.wxlogin = false
        console.log('用户没有登录')
     	}else{
     		this.wxlogin = true
     		this.usering = setdata
         console.log('用户已经登录')
     	}
     }
   },

 
  }
</script>

<style scoped>
  .profile{
    background: linear-gradient(to top, #ffe566 10%, #ffa500 97% 100%); 
    height: 350upx; 
    display: flex; 
    align-items: center;}
  .wx-name{
    display: flex; 
    align-items: center; 
    padding: 0 30upx; 
    align-content: center;
    height: 200upx;}
  .wx-text text{
    font-size: 35upx;
    }
  .wx-name image{
    width: 150upx !important; 
    height: 150upx !important; 
    border-radius: 50%; 
    margin-right: 20upx;
  	border: 5rpx solid #999999;}
  text{display: block; margin: 10upx 0; color: #999999;}
  
  /* 登录 */
  .wx-button-view{font-size: 35upx; color: #FFFFFF; margin-bottom: 25upx;}
  .wx-button{margin: 0 auto;}
  .wx-button button{
    border: none;
    font-size: 35upx; 
    background:#ff7300;
    border-radius: 50upx;
    color: #FFFFFF;}							
 
</style>
