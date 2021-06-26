<template>
  <view class="prefer-select">
    <view class="prefer-text">
      为你优选
    </view>
    <scroll-view scroll-x="true"  class="scroll" scroll-with-animation="true">
      <view class="prefer-cont">
        <block v-for="(item, index) in preferdata" :key="index">
          <view class="prefer-view">
            <image :src="item.image" mode="aspectFill" class="prefer-img"></image>
            <text>{{item.title}}</text>
            <text>{{item.lable}}</text>
          </view>
        </block>
      </view>
    </scroll-view>
    
  </view>
</template>

<script>
  export default{
    data(){
      return{
      }
    },
    props:{
      preferdata:Array
    }
  }
</script>

<style>
  .prefer-select{
    margin: 30upx 0 !important
    }  .prefer-text{
    font-size: 30upx;
    font-weight: 400;
    margin-bottom: 10upx;
   }
 .prefer-cont{
    display: flex; 
    justify-content: space-between;
    }	
  .scroll{
    white-space: nowrap;
    width: 100%;
    height: 350upx;
  }
  .prefer-view {
    height: 300upx; 
    width: 300upx;
    padding: 0 10upx;
  }
  .prefer-img{
    width: 250upx;
    height: 250upx;
  }
  .prefer-view text{
    display: block;
    height: 45upx;
    line-height: 45upx;    
  }
  .prefer-view text:nth-child(2){font-size: 30upx;}
  .prefer-view text:nth-child(3){font-size: 27upx; color: #9c9c9c;}
</style>
