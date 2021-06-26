<template>
  <view>
    <!-- 定位 -->
    <view class="search-view">
      <image src="../../../static/coen/dingwei.svg" mode="widthFix"></image>
      <text class="search-text">北京市朝阳区</text>
      <text> ></text>
    </view>
  <!-- 搜索框 -->
    <view class="search-cont" >
      <view class="search" @click="search()">
        <image src="../../../static/coen/sousuo.svg" mode="widthFix" class="search-img"></image>
        <input type="text" placeholder="麻辣烫" disabled/>
      </view>
    </view>
    
    <!-- 轮播图 -->
   <view class="swiper-view">
    <swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000"
            @change="changeNum">
      <block v-for="(item,index) in lable" :key="index">
        <swiper-item>
          <view class="swiper-item">
            <block v-for="(listdata,index) in item" :key="index">
              <view class="item-cont">
                <image :src="listdata.img" mode="widthFix" class="itemImg"></image>
                <text>{{listdata.title}}</text>
              </view>
            </block>
          </view>
        </swiper-item>
      </block>
    </swiper>
   	<!-- 指示点 -->
    <view class="instruct-view">
    	<block v-for="(item, index) in instructdata" :key="index">
        <view class="instruct" :class="{active: index == num}" >{{item}}</view>
    	</block>
    </view>
   </view>
   
   
   
  </view>
</template>

<script>
 export default{
   data(){
     return{
      num:0,
      instructdata:['',''],
      lable: [
      		[
      			{
      				'img':'../../../static/inster/meishi.png',
      				'title':'美食'
      			},
      			{
      				'img':'../../../static/inster/chaoshi.png',
      				'title':'超市便利'
      			},
      			{
      				'img':'../../../static/inster/shuiguo.png',
      				'title':'蔬菜水果'
      			},
      			{
      				'img':'../../../static/inster/meituan.png',
      				'title':'美团专送'
      			},
      			{
      				'img':'../../../static/inster/paotui.png',
      				'title':'跑腿代购'
      			},
      			{
      				'img':'../../../static/inster/yexiao.png',
      				'title':'夜宵'
      			},
      			{
      				'img':'../../../static/inster/jintie.png',
      				'title':'津贴联盟'
      			},
      			{
      				'img':'../../../static/inster/pinping.png',
      				'title':'甜点饮品'
      			},
      			{
      				'img':'../../../static/inster/shaokao.png',
      				'title':'龙虾烧烤'
      			},
      			{
      				'img':'../../../static/inster/dangao.png',
      				'title':'甜蜜蛋糕'
      			}
      		],
      		[
      			{
      				'img':'../../../static/inster/hanbao.png',
      				'title':'汉堡披萨'
      			},
      			{
      				'img':'../../../static/inster/liaoli.png',
      				'title':'日韩料理'
      			},
      			{
      				'img':'../../../static/inster/malatang.png',
      				'title':'麻辣烫'
      			},
      			{
      				'img':'../../../static/inster/kuaican.png',
      				'title':'快食简餐'
      			},
      			{
      				'img':'../../../static/inster/xianhua.png',
      				'title':'浪漫鲜花'
      			},
      			{
      				'img':'../../../static/inster/lazi.png',
      				'title':'无辣不欢'
      			},
      			{
      				'img':'../../../static/inster/jiaozi.png',
      				'title':'饺子馆'
      			},
      			{
      				'img':'../../../static/inster/xiaochi.png',
      				'title':'小吃馆'
      			},
      			{
      				'img':'../../../static/inster/baofan.png',
      				'title':'煲仔饭'
      			},
      			{
      				'img':'../../../static/inster/qita.png',
      				'title':'其他'
      			}
      		]
      	]
      }    
   },
   methods:{
    changeNum(event){
     this.num= event.detail.current
    },
    // 跳转到搜索页面
    search(){
      wx.navigateTo({
        url:'../search/search'
      })
    }
   }
 }
</script>

<style scoped>
  /* 定位 */
  .search-view{
    font-size: 30upx;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin: 10upx 0 ;
  }
  .search-view image{
    width: 35upx;
    height: 35upx;
  }
  .search-text{
    padding: 0 10upx;
  }
  /* 搜索 */
 .search-cont{
   display: flex;
   justify-content: space-between;
   height: 70upx;
 }
   
 .search{
   display: flex;
   height: 70upx;
   width: 100%;
   line-height: 70upx;
   background: #fff3dc;
   border-radius: 30px;
 }
 .search-img{
   width: 40upx;
   height: 40upx;
   margin: auto 10upx auto 20upx;
 }
 .search input{
   height: 70upx;
   width: 100%;
   font-size: 27upx;
 }
 
 /* 轮播图 */  
 .swiper-view{
   height: 320upx;
 }
 
 .swiper-item{
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   align-items: center;
   height: 300upx;
 }
   
 .item-cont{
  flex:20%;
  text-align: center;
 }
 .item-cont text{
   padding-top: 20upx; 
   font-size: 27upx;
   }
 .itemImg{
  width: 70upx;
  height: 70upx;
  margin:0 auto;
  display: block;
 }
 /* 指示点 */
 .instruct-view{
   width:100upx;
   height: 20upx;
   position: absolute;
   bottm:0;
   left: 50%;
   transform: translate(-50%,0);
   margin-top: 10upx;
 }
 .instruct{
   float: left;
   width: 30upx;
   height: 15upx;
   background:#fff3dc;
   margin-left:10upx ;                
 }
  
.active{
   background:#ffc131;
}
</style>
