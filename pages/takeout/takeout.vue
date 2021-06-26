<template>
  <!-- 下单界面 -->
  <view class="takeout">
    <!-- 商家介绍 -->
    <business :busidata="busidata"></business>
    <!-- tab切换 -->
    <tabs></tabs>
    
    <view class="ordering-sceate">
      <!-- 商品下单 -->
      <ordering :orderingdata="orderingdata"
                :busidata="busidata"
                :class="[hideing===0 ? 'actineclass' : 'errorclass']"></ordering>
      <!--评价  -->
      <message  :messagedata="messagedata"
                :tabmessage = "tabmessage"
                :empty="empty"
                :class="[hideing===1 ? 'actineclass' : 'errorclass']"></message>
      <!-- 商家详情 -->
      <introduce :busidata="busidata"
                 :class="[hideing===2 ? 'actineclass' : 'errorclass']">
      </introduce>
    </view>
    <!-- loading -->
    <home-load v-if="efinition"></home-load>
  </view>
</template>

<script>
  // 引入子组件
  import business from './components/business.vue'
  import tabs from './components/tabs.vue'
  import ordering from './components/ordering.vue'
  import message from './components/message.vue'
  import introduce from './components/introduce.vue'
  
  // 引入接口地址
  import {shopurl, getdishesurl, discussurl } from '../../api/request.js'
  // 引入post请求
  import {publicing} from '../../api/api.js'
  export default{
    components:{
      business,
      tabs,
      ordering,
      message,
      introduce
    },
    data(){
      return {
        efinition:true,
        hideing:0,
        // 商家介绍
        busidata:{},
        // 商品数据
        orderingdata:[],
        // 评论
        messagedata:[],
        tabmessage:[],
        // 空评论
        empty:'',
        // 商家唯一标识
        ids:''
      }
    },
    methods:{
      // 被子组件tabs调用的方法
      fatherMethods(index){
        console.log(index)
        this.hideing = index
        // console.log(this.hideing)
      },
      
      // 被评论子组件message调用的方法
      messageMethod(item){
        console.log(item)
        if(item == '全部'){
          let data= {
            merchantid:this.ids
          }
          this.classifMess(data)
        }else{
          let data ={
            merchantid:this.ids,
            classmessage: item
          }
          this.classifMess(data)
        }
      },
        // 请求评论分类的数据
        classifMess(data){
          publicing(discussurl,data).then(res=>{
            console.log(res)
            this.messagedata = res.data
          }).catch(err=>{
            console.log(err)
            })
        },
     
       
      // 请求接口
      takeFun(ids){
        let data = {
          openid:ids
        }
        let disdata = {
          merchantid:ids
        }
        Promise.all([publicing(shopurl, data), publicing(getdishesurl, data),publicing(discussurl, disdata)]).then(res=>{
        console.log(res)
          // 商家介绍
          this.busidata = res[0].data[0]
          // 商品数据
          this.orderingdata = res[1].data
          // 评论
          this.messagedata = res[2].data
          if(res[2].data.length == ''){
            this.empty = 'EMPTY'
          }else{
        // 评论分类标签去掉重复标签和空标签
           // 取出评论分类标签放在一个数组里
           let messageword = res[2].data.map(item=>{
             return item.classmessage
           })
           //标签去重
           let newarr = Array.from(new Set(messageword))
           // console.log(newarr)
           // 标签去空值
           var newArr = newarr.filter(item => item)
           // console.log(newArr)
           
           //数组合并 需要一个全部按钮
             this.tabmessage = ['全部', ...newArr]
          }
          
          // loading
          this.efinition = false
          
        }).catch(err=>{
          console.log(err)
        })
      }
  },
  
  // 生命周期函数
 onLoad(e) {
 	console.log(e)
 	this.ids = e.id
 	this.takeFun(e.id)
 }
  
  }
</script>

<style scoped>
  .ordering-sceate{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top:230upx;
  }
  
  .actineclass{
    display: block;
    overflow-y: auto;
    height: 100%;
  }
  .errorclass{
    display: none;
  }

</style>
