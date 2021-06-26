<template>
    <view>
      <!-- 搜索区域 -->
      <view class="Search" >
        <view class="Search-view">
        	<input type="text"  placeholder-class="inputclass" confirm-type ="search" 
                 focus="true"
        	       placeholder="请输入关键字"
        	       v-model="searchdata"
        	       @confirm="onKeyInput"/>
        </view>
        <view class="Search-code" @click="handleSearch()">
        	搜索
        </view>
      </view>
      <!-- 内容展示 -->
      <view class="content" v-if="shopcont">
        <block v-for="(item,index) in takeshop" :key="index">
        	<view class="content-view" >
        		<view class="content-img">
        			<image :src="item.logo" mode="aspectFill"></image>
        		</view>
        		<view class="content-title">
        			<text class="conteng-take">{{item.shop}}</text>
        			<view class="conteng-monthly">
        				<text>月售200</text>
        				<text>约{{item.duration}}分钟</text>
        			</view>
        			<view class="conteng-starting">
        				<text>起送¥{{item.delivering}}</text>
        				<text>配送¥{{item.physical}}</text>
        				<text>人均¥{{item.capita}}</text>
        			</view>
        			<view class="conteng-starting">
        				<image  mode="widthFix"></image>
        				<text>{{item.types}}</text>
        			</view>
        		</view>
        	</view>
        </block>
      </view>
      
      <!-- 搜索历史 -->
      <view class="search-history" v-if="ifhistory">
        <view class="search-title">
          <view >搜索历史</view>
          <view>
            <image src="../../static/coen/searchend.svg" mode="" 
                  @click="removeStorage()"></image>
          </view>
        </view>
        <!-- 循环展示的列表内容 -->
        <view class="menu-block">
          <block v-for="(item, index) in setdata" :key="index">
            <view @click="menubtn(item)">{{item}}</view>
          </block>
        </view>
      </view>
      
      <!-- 反馈tips -->
      <tips ref="tips"></tips>
    </view>  
</template>

<script>
  import {publicing} from '../../api/api.js'
  import {searchurl} from '../../api/request.js'
  
  // 引入tips组件
  import tips from '../../element/tips.vue'
  export default{
    components:{
      tips
    },
    data(){
      return{
        // 搜索关键词
        searchdata:'',
        takeshop:[],
        setdata:[],
        ifhistory:false,
        shopcont:false
      }
    },
    methods:{
      // 点击搜索按钮触发的
      handleSearch(){
        console.log(this.searchdata)
        if(this.searchdata != ''){
          this.ifhistory = false
          let searchkey =this.searchdata
          this.SearchData(searchkey)
          this.getStorage(searchkey)
        
        }
      
      },
      // 敲击键盘打印输入框中的内容
      onKeyInput(event){
        console.log(event.detail.value)
        let searchkey =event.detail.value
        
        if(this.searchkey != ''){
          this.ifhistory = false
          this.SearchData(searchkey)
          this.getStorage(searchkey)
        }  
      },
      
     // 本地存入搜索历史
     getStorage(searchkey){
     	// 先取出本地缓存的数据
     	let seararray = uni.getStorageSync('search_key') || []
     	// 要存入一个数组array
      
      // 给数组存入数据(从第一个添加)
     	seararray.unshift(searchkey)
      // 将数组存入本地缓存
     	uni.setStorageSync('search_key', seararray);
     },
     
     // 取出本地缓存的数据
     setStorage(searchkey){
       // 从本地缓存中取出数据
       let setdata = uni.getStorageSync('search_key')       
       // 将这些数据去重
       let setdataarr = Array.from(new Set(setdata))
       // console.log(setdataarr)
       // 将去重数组赋值给setdata
       this.setdata = setdataarr
       // console.log(setdata)
       
       if(setdataarr == []){
         this.ifhistory = false
       }else{
         this.ifhistory =true
       }
     },
     
     // 手动清除搜索历史
     removeStorage(){
     	uni.removeStorageSync('search_key');
     	this.setStorage()
     },
          
      // 搜索历史的搜索
      menubtn(item){
      	console.log(item)
      	this.ifhistory = false
        this.SearchData(item)
      },
      
      
      // 发送请求搜索
      SearchData(searchkey){
        let data={
          searchdata:searchkey
        }
        publicing(searchurl,data).then(res=>{
          console.log(res)
          if(res.data == '没有商品数据'){
            this.shopcont = false
            let bull =true
            let tips ='没有您要找的商品'
            this.tipsing(bull,tips)
            console.log('没有商品数据')
            }else{
              this.shopcont = true
              let bull =false
              let tips =''
              this.takeshop = res.data
            }
  
        }).catch(err=>{
          console.log(err)
        })
      },
      
      // 反馈提示tips
      tipsing(bull,tips){
        this.$nextTick(()=>{
          this.$refs.tips.init(bull,tips)
        })
      }
      

      
    },
    created() {
    	this.setStorage()
    }
  }

</script>

<style scoped>
  @import "../../common/meituan.css";
  .Search{
      display: flex; 
      justify-content: space-between; 
      height: 70upx; 
      align-items: center;		
      padding: 30upx 0;
  	}
    .Search-view{
       height: 70upx;
       line-height: 70upx;
       width: 100%;
       background:#f8f8f8;
       border-radius: 20upx;
       margin-left: 20upx;
    }
  .Search-view input{
     width: 100%;
  		height: 70upx;
  		line-height: 70upx;
  		font-size: 30upx;
      padding-left: 30upx;
      color: #666666;
  	} 
    .Search-code{
      width: 150upx;
      height: 50upx;
      text-align: center;
      font-size: 30upx;
    }
/* 搜索历史 */
	.search-history{margin: 20upx;}
	.search-title{
      font-size: 30upx; 
      font-weight: bold;
				display: flex;
				justify-content:space-between;
				align-items: center;
				height: 60upx;
				line-height: 60upx;}
	.search-title image{width: 36upx; height: 36upx; display: block;}
	.menu-block view {
		background: #f7f8fa;
		border-radius: 6upx;
		font-size: 27upx;
		color: #292c33;
		text-align: center;
		padding: 10upx;
		margin: 20upx 20upx 0 0;
	}
	
	.menu-block {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
</style>
