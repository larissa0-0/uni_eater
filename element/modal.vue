<template>
  <!-- 结算弹窗 -->
	<view>
		<view class="warp" v-if="modaishow">
			<view class="warp-view">
				<view class="warp-text">请登陆后再操作</view>
				<view class="warp-flex">
					<button @click="messcancel()" plain="true">取消</button>
					<button plain="true" open-type="getUserInfo" @click="getUserInfo()">登录</button>
				</view>
			</view>
		</view>
		<!-- 提示组件 -->
		<HMmessages ref="HMmessages" 
                @complete="HMmessages = $refs.HMmessages" 
                @clickMessage="clickMessage"></HMmessages>
	</view>
</template>

<script>
	var {log} = console
	import {publicing} from "@/api/api.js"
	import {wxloginurl} from '@/api/request.js'
	// 引入提示组件
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	//引入类
	let logins = require('../login/login.js')
	export default{
		components: {HMmessages},
		data() {
			return {
				modaishow: false,
        appid:'wx58a5d86dd50108ef',
        AppSecret:'db64f442101af055e9cd06897fbe4483'
			}
		},
		
		methods:{
			// 显示弹出框
			init(){
				this.modaishow = true
			},
			// 取消弹出框
			messcancel(){
				this.modaishow = false
			},
			
			// 登录
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
          let succ= '登录成功'
          let ico = 'success'
			   this.tIps(succ,ico)
         this.modaishow = false
			  }).catch(err=>{
          let succ= '登录失败'
          let ico = 'error'
			    console.log(err)
			  })
			},
    
			
			// 提示
			tIps(succ,ico){
				this.HMmessages.show(succ,{icon:ico,fontColor:"#ffffff",iconColor:"#ffffff",background:"rgba(156, 74, 7, 0.8)"})
			}
		}
	}
</script>

<style scoped>
	/* 模态弹窗布局 */
	.warp{position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0,0,0,0.6);
	z-index: 9999;}
  
	.warp-view{width: 500upx;
			height: 200upx;
			background: #FFFFFF;
			margin: auto;
			position: absolute;
			-webkit-position:absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			border-radius: 8upx;
			overflow: hidden;
			}
	.warp-text{text-align: center;
			margin-top: 30upx;
			font-size: 34upx;
			color: #666666;}		
	.warp-flex{ display: flex;
		justify-content: space-around;
		border-top: 1upx solid #EEEEEE;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80upx;
		line-height: 80upx;
		}
	.warp-flex button{border: none;
	font-size: 30upx;}						
</style>
