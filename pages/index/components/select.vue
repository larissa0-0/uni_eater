<template>
  <view >
    <view class="select-cont">
      <!-- 排序 -->
      <view class="select-view">
        <view class="select-left select-clid" @click="handleSorting()">
          <text>{{selectSorting}}</text>
          <image src="../../../static/coen/paixu.png" mode="widthFix"></image>
        </view>
        <view class="select-clid"  @click="saLes()">销量高</view>
        <view class="select-clid"  @click="saLes()">速度快</view>
        <view class="select-clid"  @click="saLes()">津贴联盟</view>
        <view class="select-right" @click="moreClick()">
          <text>筛选</text>
          <image src="../../../static/coen/shaixuan.png" mode="widthFix"></image>
        </view>
      </view>
      <!-- 综合排序 筛选 -->
      <view class="select-sortlist" v-if="drop">
        <block v-for="(item,index) in sortlist" :key="index">
          <text :class="{activeSortlist: index == num}" 
                @click="sortClick(item.name, index, item.screen,item.nums)">
             {{item.name}}
          </text>
        </block>
      </view>
      
      <!-- 筛选按钮 -->
      <!-- 多筛选区域 -->
      <view class="more-sortlist" v-if="hid" >
        <!-- 多选 商家特色-->
        <block v-for="(item, index) in screendata" :key="index">
          <view >
            <view class="list-title">{{item.title}}</view>
            <view class="list-cont">
              <block v-for="(itemdata, indexs) in item.datas" :key="indexs">
                <text class="choose" 
                      :class="{active:itemdata.id === 2}"
                      @click="handleMoreChoose(indexs, itemdata.sign)">
                    {{itemdata.name}}
                </text>
              </block>
            </view>
          </view>
        </block>
        <!-- 单选 -->
        <block v-for="(item, index) in person" :key="index">
          <view >
            <view class="list-title">{{item.title}}</view>
            <view class="list-cont">
              <block v-for="(itemdata, indexs) in item.datas" :key="indexs">
                <text class="choose" 
                      :class="{active: indexs == scrnum}"
                      @click="handleSingleChoose(indexs, itemdata.per)">
                  {{itemdata.name}}
                </text>
              </block>
            </view>
          </view>
        </block>
        <!-- 底部按钮 -->
        <view class="sortlist-bottom">
          <text @click="handleClean()">清空</text>
          <text @click="flag && complete()">完成</text>
        </view>
      </view> 
    </view>
    <!-- 透明背景 -->
      <view class="yin" v-if="ying"  @click="backdis()"></view>
    
    <!-- 反馈tips -->
    <view class="tips" v-if="Tip" >
       <tips ref="tips"></tips>
    </view>
     
  </view> 
</template>

<script>
  // 引入post请求
  import { publicing} from '../../../api/api.js'
  // 引入综合排序请求地址   
  import {startingurl} from '../../../api/request.js'
  
  // 引入筛选按钮请求地址
  import {multipleurl} from '../../../api/request.js'
  
  // 引入没有该商品的提示
  import tips from '../../../element/tips.vue'
  
  export default{
    components:{
      tips
    },
    data(){
      return{
        Tip:false,
        flag:false,
        multiobj:[],
        selectSorting:'综合排序',
        drop:false,
        hid:false,
        ying:false,
        num:0,
        scrnum:-1,
        sortlist:[
          {
          	"name":"综合排序",
          	"screen":"_id",
          	"nums":1
          },
          {
          	"name":"起送价最低",
          	"screen":"delivering",
          	"nums":1
          },
          {
          	"name":"配送费最低",
          	"screen":"physical",
          	"nums":1
          },
          {
          	"name":"人均高到低",
          	"screen":"capita",
          	"nums":-1
          },
          {
          	"name":"人均低到高",
          	"screen":"capita",
          	"nums":1
          }
        ],
        screendata:[
          {
            "title":'商家特色(可多选)',
            "datas":[
              {
                "id":1,
                "sign":"duration",
                "name":"配送最快"
              },
              {
                "id":1,
                "sign":"deliver",
                "name":"0元起送"
              },
              {
                "id":1,
                "sign":"physi",
                "name":"免费配送"
              }
            ]
          }
        ],
        person:[
         {
         	"title":"人均价",
         	"datas":[
         		{
         		"name":"20元以下",
         		"per":{
         			"$lt":20
         			},
         		},
         		{
         		"name":"20-40元",
         		"per":{
         			"$lte":40,
         			"$gte":20
         			},
         		},
         		{
         		"name":"40元以上",
         		"per":{
         			"$gt":40
         			},
         		},
            ]
          }
        ]
      }
    },
    methods:{
      // 综合排序
     handleSorting(){
       this.drop = true,
       this.hid = false
       this.backshow()
     },
     // 综合排序
     sortClick(name, index, screen, nums){
       this.selectSorting = name,
       this.num = index,
       this.drop =false,
       this.backdis()
       this.starTing(screen, nums)
     },
     
     // 综合排序的请求
     starTing(screen,nums){
       let Data ={
         screen,
         nums
       }
       publicing(startingurl, Data).then(res=>{
         // console.log(res)
         // 存储到vuex数据仓库
         this.$store.commit('screenmuta',res.data)
       }).catch(err=>{
         console.log(err)
       })
       
     },
     
     
     
     //销量 速度 津贴联盟
     saLes(){
     	this.backdis()
     },
     // 筛选 多选
     moreClick(){ 
       this.drop = false
       this.hid = true
        this.backshow()
     },
         
     // 透明背景
     backshow(){
       setTimeout(()=>{
         this.ying = true
       },100)
     },
     // 回到首页
     backdis(){
       this.ying = false
       this.drop = false
       this.hid = false
     },
     
     // 商家多选按钮
     handleMoreChoose(indexs, sign){
       // console.log(indexs)
       console.log(sign)
       this.multiobj = {}
      if(this.screendata[0].datas[indexs].id == 1){
      		// 选中
      		this.screendata[0].datas[indexs].id = 2
      		// console.log('选中')
      		this.$set(this.multiobj,sign,sign)
      		// this.$set给对象添加一个属性
      		console.log(this.multiobj)
      	}else{
      		// 未选中
      		this.screendata[0].datas[indexs].id = 1
      		// console.log('未选中')
      		this.$delete(this.multiobj,sign)
      		console.log(this.multiobj)
      	}
    
     },
     // 单选按钮
     handleSingleChoose(index, name){
      if( this.scrnum == index){
        this.scrnum = -1
        this.$delete(this.multiobj,'capita')
        console.log(this.multiobj)
      }else{
        this.scrnum =index
        this.$set(this.multiobj,'capita',name)
         console.log(this.multiobj)
      }     
     },
     // 清空按钮
     handleClean(){
       // 多选按钮 取消 条件
       this.screendata.forEach(item=>{
         let arr = item.datas.map(items=>{
           items.id =1;
           return items
         })
       }),
       	this.multiobj = {},
       // 单选按钮
       this.scrnum = -1,
       this.backdis()
     },
     
     // 请求筛选按钮的数据
     complete(){
       this.backdis()
       publicing(multipleurl,this.multiobj).then(res=>{
         console.log(res)
         this.$store.commit('screenmuta',res.data)
         if(res.data == '没有商品数据'){
           this.Tip = true
           let bull =true
           let tips ='没有您要找的商品'
           this.tipsing(bull,tips)
           }else{
             let bull =false
             let tips =''
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
    // 如果用户没有点击任何按钮，完成按钮不能被点击
    computed:{
      emptyIng(){
        let obj = JSON.stringify(this.multiobj)== '{}'
        console.log(obj)
        // obj值为true 就为空对象    false就不是空对象
        if(obj == true){
          this.flag =false
        }else{
          this.flag =true
          
        }
      }
   
    },
    
    
  }
</script>

<style scoped>
  .select-cont{
    position: absolute; 
    left: 0; 
    right: 0;
  	width: 100%;
  	z-index: 99;
  }
  
  .select-view{
    display: flex;
    align-items: center;
    height: 70upx;
    font-size: 30upx;
    color: #808080;
    padding: 0 15upx;
    background: #FFFFFF;
  }
  .select-view image{
    width: 30upx;
    height: 30upx;
    display: block;
  }
  .select-left{
   display: flex;
   align-items: center;
  }
  .select-right{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 5;
  }
  .select-clid{
    flex-grow: 1;
  }
  /* 排序 */
  .select-sortlist{
    padding: 0 15upx;
    background:#FFFFFF;
  }
  .select-sortlist text{
    display: block;
    height: 70upx;
    line-height: 70upx;
    border-top:1rpx solid #ededed ;
  }
  
  /* 多选 */
  .more-sortlist{
    height:800upx;
    position: relative;
    background: #FFFFFF;
    }
   .list-title{
     height: 50upx;
     line-height: 50upx;
     font-size:30upx;
     font-weight: 500
}
   .list-cont{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 30upx 0 80upx 0;
    }
    .list-cont text{
      width: 210upx;
      height: 60upx;
      line-height: 60upx;
      text-align: center;
      border-radius: 10upx;
      border: 1px solid  #F8F8F8;
      background:  #F8F8F8;
    }
    .active{
      background:#fff3dc !important;
      color: #f5a61b;
      border: 1px solid #fff3dc;
      
    }
    
    /* 排序列表点击后变颜色*/
    .activeSortlist{
     color: #f5a61b;
    }
    /* 底部按钮 */
    .sortlist-bottom{
      display: flex; 
      justify-content: space-around;
      align-items: center;
      height: 80upx;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      }
      .sortlist-bottom text{
      width: 50%;
      text-align: center;
      flex-grow: 1; 
      height: 80upx;
      line-height: 80upx;
      background: #F8F8F8;
      border: 1upx solid #e4e4e4;
      }
      .sortlist-bottom text:nth-child(1){border-right: 1upx solid #e4e4e4;}
      .sortlist-bottom text:nth-child(2){background: #ffd348; border: 1upx solid #ffd348;}

     .yin{
       background: rgba(0,0,0,0.5); 
       position: fixed; 
       top: 0; 
       left: 0; 
       right: 0; 
       bottom: 0;
   }

.tips{
  height: 800upx;
  padding: 100upx;
}


</style>

