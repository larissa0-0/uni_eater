<template>
  <!-- 三个tab栏分类 -->
  <view class="tabs">
    <view class="tabs-view">
      <block v-for="(item, index) in tabs" :key="index">
        <text :class="{activetext: index==num}" @click="handleText(index)">{{item}}</text>
      </block>
    </view>
  </view>
</template>

<script>
  // 引入接口地址
  
  export default{
    data(){
      return{
         tabs:['点菜','评价','商家'],
         num:0
      }
    },
    methods:{
      handleText(index){
       this.num = index
       // // 子组件调试父组件方法 ：parent
       this.$parent.fatherMethods(index)
       // this.$parent.fatherMethod(index)
      }
    }
  }
</script>

<style scoped>
  .tabs-view{
  margin: 15upx;
  display: flex;
  }
  .tabs-view text{
  margin-right: 60upx;
  display: block;
  height: 60upx;
  line-height: 60upx;
  font-size: 33upx;
  color: #666666;
  }
  .activetext{
    color: #333333 !important;
  font-weight: bold !important;
  border-bottom: 5upx solid #ffd161;}
</style>
