<template>
  <!-- 商家详情 -->
  <view class="introduce">
    <!-- 地址 -->
    <view class="introduce-view">
    	<view>
    		<image src="../../../static/coen/dizhi.png" mode="widthFix"></image>
    	</view>
    	<view>
    		<text>{{busidata.address}}</text>
    	</view>
      <!-- 查看安全文档 -->
    </view>
    <view class="introduce-view">
    	<view>
    		<image src="../../../static/coen/dangan.png" mode="widthFix"></image>
    	</view>
    	<view>
    		<text>查看食品安全档案</text>
    	</view>
    </view>
    <!-- 配送时间 -->
    <view class="introduce-view">
    	<view>
    		<image src="../../../static/coen/shijian.png" mode="widthFix"></image>
    	</view>
    	<view>
    		<text>配送时间:{{busidata.times}}</text>
    	</view>
    </view>
    <!-- 商家服务 -->
    <view class="introduce-view">
    	<view>
    		<image src="../../../static/coen/fuwu.png" mode="widthFix"></image>
    	</view>
    	<view>
    		<text>商家服务: 到店自取(享优惠)</text>
    	</view>
    </view>
  </view>
</template>

<script>
  export default{
    props:{
      busidata:Object
    },
    
  }
</script>

<style>
  .introduce{
    height: 800upx;
  }
  .introduce-view{
  background: #ffffff;
  display: flex;
  align-items: center;
  height: 110upx;
  margin: 20upx 0;
  padding: 0 20upx;
  }
  
  .introduce-view view:nth-child(1){
    width: 38upx; height: 38upx;
  padding-right: 20upx;}
  
  .introduce-view image{
    width: 38upx !important; 
    height: 38upx !important;
  }
  .introduce-view text{display: block; font-size: 30upx;}

  
</style>
