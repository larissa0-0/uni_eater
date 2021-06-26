<template>
  <!-- 头部商品介绍 -->
  <view class="business">
    <view class="business-view">
      <view class="business-img">
        <image :src="busidata.logo" mode="aspectFill"></image>
      </view>
      <view class="business-right">
        <text class="business-title">{{busidata.shop}}</text>
        <view class="business-time">
          <image src="../../../static/coen/shijian.svg" mode=""></image>
          <text>配送约 {{busidata.duration}}分钟</text>
        </view>
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
  text{display: block;}
  .business{
    height: 130upx;
  background: linear-gradient(to top, #ffe555 10%, #ffa500 97%);
  border-bottom-left-radius: 10upx;
  border-bottom-right-radius: 10upx;
  }
  .business-view{
    display: flex;
    height: 130upx;
    padding:0 10upx ;}
  /* 1 */
  .business-img{
    width: 150upx !important; 
    height: 120upx !important;
    padding-right: 20upx;
    margin-left: 15upx;
  }
  .business-img image{
    width: 100%; 
    height: 100%; 
    border-radius: 10upx;}
  
  .business-time{
    display: flex; 
    align-items: center;
  font-size: 27upx;
  height: 40upx;
  line-height: 40upx;
  }
  
  .business-title{font-size: 37upx; margin-bottom: 19upx;
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;}
 
  .business-right{width: 100%;}
  .business-time image{
    width: 27upx; 
    height: 27upx; 
    padding-right: 9upx;
    }



</style>
