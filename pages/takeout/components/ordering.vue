<template>
  <!-- 商品列表 -->
  <view class="ordering">
    <!-- 左边列表 -->
    <view class="ordering-left">
      <block v-for="(item, index) in orderclass" :key="index">
        <text :class="{activeLeft: index==leftNum}" @click="handleLeft(index, item)">{{item}}</text>
      </block>
    </view>
    <!-- 右边商品列表 -->
    <view class="ordering-right">
     <text class="ordering-right-title">{{ordertitle}}</text>
     <view>
     	<block v-for="(item,index) in classifarr" :key="index">
     		<view class="content-view">
     			<!-- 左边商品图片 -->
     			<view class="content-img">
     				<image :src="item.objdis.image" mode="aspectFill"></image>
     			</view> 
     			<!-- 右边商品信息-->
     			<view class="content-title">
            <!-- 商品名字 -->
     				<text class="conteng-take">{{item.objdis.input}}</text>
     				<view class="conteng-monthly">
              <!-- 商品的标签 -->
     					<block v-for="(itemdata,index) in item.objdis.tags" :key="index">
     					<text>{{itemdata}}</text>
     					</block>
     				</view>
     				<view class="conteng-starting">
     					<text>月售10</text>
     				</view>
     				<view class="conteng-price">
     					<view class="conteng-shi">¥{{item.objdis.Discount}}</view>
     					<view class="conteng-hua">¥{{item.objdis.Price}}</view>
     					<view class="ordering-price">
                <!-- 减号图片 -->
     						<image @click="reDuce(item.amount,item._id,index,item.objdis.Discount,item.objdis.image,item.objdis.input)" src="../../../static/coen/jianhao.png" mode="widthFix"></image>
     						<!-- 份数 -->
                <text class="amounting">{{item.amount}}</text>
                <!-- 加号图片 -->
     						<image @click="pLus(item.amount,item._id,index,item.objdis.Discount,item.objdis.image,item.objdis.input)" src="../../../static/coen/jiahao.png" mode="widthFix"></image>
     					</view>
     				</view>
     			</view>
     		</view>
     	</block>
     </view>
      
    </view>
    
    <view class="Shopping">
    	<!-- 骑手 -->
    	<view class="qishou">
    		<image v-if="!isActive" src="../../../static/coen/weigou.png" mode="widthFix"></image>
    		<image v-if="isActive" src="../../../static/coen/yigou.png" mode="widthFix"></image>
    	</view>
    	<!-- 多少量 -->
    	<view class="Numbering" v-if="isActive">{{Takeleng.length}}</view>
    	<!-- 金额 -->
    	<view class="Shopping-dis">
    		<view class="Shopping-left">
    			<view class="Cost-mony">
    				<text class="Total-price">¥{{Takeawayprice}}</text>
    				<text class="Delivery">另需配送费{{physical}}元</text>
    			</view> 
    		</view>
    		<view class="Shopping-right" :class="{shoppactive: isActive}" 
              @click="flat && settLement()">
    			<text v-if="!isActive">{{delivering}}元起送</text>
    			<text v-if="isActive">{{difference}}</text>
    		</view>
    	</view>
    </view>
    <!-- 登录模块弹窗组件 -->
   	<motal ref="mon"></motal>
    
    
  </view>
</template>

<script>
  // 引入登录模块弹窗组件
  import motal from '../../../element/modal.vue'
  export default{
    components:{
      motal
    },
    props:{
      orderingdata:Array,
      busidata:Object
    },
    data(){
      return{
        // 左边的列表
         orderclass:[],
         leftNum:0,
         // 所有的商品数据
         commodity:[],
         // 右边商品展示的title
         ordertitle:'',
         // 右边默认展示的商品
         classifarr:[],
         // 商品数量
         amount:'',
         
         // 骑手部分
        // 配送费
        physical:Number,
        // 起送费
        delivering:Number,
         // 商家标识
         MerchantId:'',
         // 商家名称
         nameshop:'',
         // 商家logo
         logo:'',
        // 骑手 总价
        arrtotalPrice:[],
        // 所有商品总价之和
        Takeawayprice:0,
        Takeleng:[],
        isActive:false,
        difference:'',
        // 禁止点击
        flat:false,
       
      }
      
    },
    methods:{
      // 左边商品分类列表的切换
      handleLeft(index, itemclass){
        this.leftNum = index
        this.ordertitle = itemclass
        console.log(itemclass)
        
        // 做一个筛选 如果itemclass的值等于 commodity里的每个项目的optidata
        // 就将itemarr给到classifarr 渲染到右边列表
        let itemarr = this.commodity.filter(item=>{
          return item.optidata == itemclass
        })
        this.classifarr = itemarr
      },
      
     
      // 右边商品列表 加减号
    pLus(amounts,indexs,indexdata,price,image,input){
    	// log(amounts)
    	// 商品数量
    	this.amount =  Number(amounts) + Number(1)
    	// log(this.amount)
    	this.pullData(indexs,indexdata,price,image,input)
    },
    
    // 减价
    reDuce(amounts,indexs,indexdata,price,image,input){
    	// log(amounts)
    	// 商品数量
    	this.amount =  Number(amounts) - Number(1)
    	// log(this.amount)
    	this.pullData(indexs,indexdata,price,image,input)
    },
    
     // 加减价共用函数
      pullData(indexs,indexdata,price,image,input){
        let findarr = this.classifarr.filter((item,index)=>{
          if(item._id == indexs){
            if(this.amount < 1){
              return item.amount = '0'
            }else{
              return item.amount = this.amount
            }
          }
        })
       
       // console.log(findarr)
       // 得到更改的数组 
       this.classifarr[indexdata] = findarr[0]
       	
       // 计算总价
       if(Number(this.amount) <= 0){
         this.amount = 0 
       }
       let Totalnum = price * Number(this.amount)
      
       // 解决浮点数问题
       // 单条商品的总价
       let Totalprice = parseFloat(Totalnum.toFixed(2))
       console.log(Totalprice)
     
       
       // 商品的总价
       /* 把单个商品得到的总价作为一个对象push到数组里，
       方便后面多个商品总价计算时得到最终的价格*/
      let fands = {
      	indexs,
      	Totalprice,
      	image,
      	input,
      	"amount":this.amount,
      	price
      }
      this.arrtotalPrice.push(fands)
      // log(this.arrtotalPrice)
      // 查询当前点击的商品_id，替换总价
      let findarrdata = this.arrtotalPrice.map((item)=>{
      	return item.indexs == indexs ? fands : item
      })
      console.log(findarrdata)
      this.arrtotalPrice = findarrdata
     },
     
     
     // 去结算
     settLement(){
     	console.log('去结算')
      
     	// 去结算前的条件就是必须已经登录：到本地存储去查看是否已经有用户信息
      
      // 从本地获取usermen的信息 登录了之后就有usermen的值 就为true
     	let setdata = uni.getStorageSync('usermen')
     	if(!setdata){
     		console.log('用户没有登录')
     		
        // 弹出模态登录框
     		this.$nextTick(()=>{
     			this.$refs.mon.init()
     		})
     	}else{
     		console.log('已经登录')
     		// 做支付
     		// 需要支付的总金额
     		// 配送费
     		// 用户openid
     		// 商家标识：身份证
     		// 商家名称
     		// 商家logo
     		// 点的商品个数
        
        // 支付金额等于商品总价加上
     		let payment = parseFloat((this.Takeawayprice + this.physical).toFixed(10))
     		let Ordering = {
     			payment,
     			physical:this.physical,
     			openid:setdata.openid,
     			MerchantId:this.MerchantId,
     			nameshop:this.nameshop,
     			logo:this.logo,
     			allorder:this.Takeleng
     		}
     		// // 路径带数据不能带对象，数组，只能是字符串
     		let strorder = JSON.stringify(Ordering)
     		wx.navigateTo({
     			url:'../placeorder/placeorder?ide=' + strorder
     		})
     	}
     	
     },
     
     
    
    },
    computed:{
      calculation(){
      	// 监听总价
      	// 1数组对象去重 :累加器：reduce()
      	let arr = {}
        
        // preVal默认类型为数组，初始值为空的数组 
        // 初始值 以及 当前被处理的对象的值
      	let arrdata = this.arrtotalPrice.reduce((preVal,curVal)=>{
      		arr[curVal.indexs] ? '' : arr[curVal.indexs] = true && preVal.push(curVal)
      		return preVal
      	},[])
      	console.log(arrdata)
      	// 剔除总价为0的商品
      	this.Takeleng = arrdata.filter((item)=>{
      		return item.Totalprice != 0
      	})
      	// log(taoarr)
      	// 所有商品的总价累积之和
      	let numdata = 0
      	arrdata.forEach((item)=>{
      		numdata += item.Totalprice
      	})
      	// log(numdata)
      	// 得到的总价
      	this.Takeawayprice = parseFloat((numdata).toFixed(10))
      },
      
      // 是否满足下单的条件
      condition(){
      	// 是否选择任何一个商品
      	if(this.Takeawayprice === 0){
          console.log('没有选择任何一件商品')
      		this.isActive = false
      		this.flat = false
      	}else{
      		this.isActive = true
      		this.flat = true
      		console.log('选择了一件或多件商品')
      		if(this.Takeawayprice < this.delivering){
      			// 不达到起送金额  还差多少满足 = 起送金额 - 总价 
      			let preceMen = parseFloat((this.delivering - this.Takeawayprice).toFixed(10))
      			console.log(preceMen)
      			this.difference = '还差' + preceMen  + '元'
      			this.flat = false
      		}else{
      			this.difference = '去结算'
      			this.flat = true
      		}
      	}
      }
      
      
    },
    watch:{
      // 用户进入该页面，默认展示在第一个tab上
      // 并且展示该分类下面的商品
      orderingdata(newValue,oldValue){
        // newValue 放着所有的上商品
        console.log(newValue)
        
        // 取出左边的商品分类
        /* 使用map 循环遍历newvalue let一个数组 用来存放想要得到的遍历结果*/
        let orderclass = newValue.map(item=>{
          return item.optidata
        })
        // 去掉重复 new set
        let orderclassArr = Array.from(new Set(orderclass))
        console.log(orderclassArr)
        this.orderclass = orderclassArr
        
       // 右边部分
       /* 先存放所有的商品数据*/
       this.commodity = newValue
       // 3右边默认分类为第一个分类
       this.ordertitle = newValue[0].optidata

      console.log(newValue)
      console.log(newValue[0])
       // 往商品里添加一个字段为0
       let commoditydata = newValue.map(item=>{
         let key='amount'
         let value = 0
         return item[key] =value
       })
       // 右边默认展示的商品页面是第一个分类下的商品
       let classifarr = this.commodity.filter(item=>{
         return item.optidata == newValue[0].optidata
       })
       console.log(classifarr)
        this.classifarr =classifarr
      },
      
      
      
      //    骑手部分
     // 商家介绍
     busidata(newvalue,oldvalue){
     	console.log(newvalue)
     	// 配送费
     	this.physical = newvalue.physical
     	// 起送价
     	this.delivering = newvalue.delivering
     	// 商家标识
     	this.MerchantId = newvalue.openid
     	// 商家名称
     	this.nameshop = newvalue.shop
     	// 商家logo
     	this.logo = newvalue.logo
     }
      
      
    }
  }
</script>

<style scoped>
  .ordering{
    display:flex;
    justify-content: space-between;
    }
  /* 左边商品分类 */
  .ordering-left{width: 190upx; background: #fafafa;
  overflow-y: auto;
  height: 100%;
  }
  .ordering-left text{
  color: #a8a8a8;
  display: block;
  font-size: 28upx;
  height: 80upx;
  line-height: 80upx;
  text-align: center;}
  .activeLeft{
    background: #FFFFFF !important; 
    font-weight: bold !important;}
    
    /* 右边 */
    .ordering-right{width: 100%;
    padding: 9upx 9upx 130upx 9upx;
    overflow: hidden;
    overflow-y: auto;
    }
    .activeord{background: #FFFFFF !important; font-weight: bold !important;}
    
    .ordering-right-title{font-size: 28upx;
    height: 60upx;
    line-height: 60upx;}
    
    .content-view{
    display: flex; justify-content: space-between;
    height: 200upx !important; overflow: hidden;
    margin: 30upx 0;
    color: #898989;
    }
    .content-img{width: 180rpx !important; height: 200rpx !important;
    overflow: hidden;
    }
    .content-img image{width: 100%; height: 100%; border-radius: 10upx;
    overflow: hidden;}
    .content-title{
    /* width: 100%; */
    padding-left: 10upx;
    font-size: 24upx;
    }
    
    .conteng-take{
    color: #333333;
    height: 50upx; font-size: 33upx;
    font-weight: bold;
    line-height: 50upx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;}
    .conteng-monthly{display: flex;
    }
    .conteng-monthly text{background: #f1f1f1;
    margin-right: 9upx;
    padding: 4upx 13upx;
    border-radius: 7upx;
    display: block;
    }
    .conteng-starting{display: flex;
    align-items: center;
    height: 50upx;
    line-height: 50upx;}
    .conteng-price image{width: 60upx; height: 60upx;}
    .conteng-price{display: flex; align-items: center;}
    .ordering-price{display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    }
    /* 数量 */
    .amounting{
    width: 50upx;
    text-align: center;}
    .conteng-hua{text-decoration: line-through;
    }
    .conteng-shi{color: #fb4e44; font-size: 33upx;
    width: 180upx;
    overflow: hidden;
    }
    /* 购物车 */
    .Shopping{position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    }
    .Shopping-left{
    height: 130upx;
    background: #000000; flex-grow: 2;
    border-top-left-radius: 50upx;
    border-bottom-left-radius: 50upx;
    }
    .Shopping-right{
    height: 130upx;
    line-height: 130upx;
    font-size: 30upx;
    color: #7f7f7f;
    text-align: center;
    background: #000000; flex-grow: 1;
    border-top-right-radius: 50upx;
    border-bottom-right-radius: 50upx;}
    .Shopping-dis{display: flex;
    height: 130upx;
    margin: 0 20upx;
    }
    .qishou{width: 120upx; height: 150upx;
    position: fixed;
    bottom: 0upx;
    left: 50upx;
    }
    .qishou image{width: 120upx; height: 150upx !important;}
    /* 定位 */
    .Delivery{color: #999999;
    font-size: 28upx;
    height: 65upx;}
    .Shopping-left text{display: block;}
    .Total-price{font-size: 40upx; color: #FFFFFF;
    height: 65upx;
    line-height: 65upx;
    }
    .Cost-mony{padding-left: 170upx; color: #4CD964;
    height: 130upx;
    }
    /* 数量 */
    .Numbering{
    background: red;
    width: 40upx;
    height: 40upx;
    border-radius: 50%;
    font-size: 20upx;
    color: #FFFFFF;
    text-align: center;
    line-height: 40upx;
    position: fixed;
    bottom: 50upx;
    left: 130upx;}
    /* 选中菜品 */
    .shoppactive{background: #ffd300 !important;
    color: #000000 !important;}
</style>
