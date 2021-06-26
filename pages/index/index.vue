<template>
	<view class="box">
		<Search></Search>
    <Preference :preferdata=" preferdata"></Preference>
    <Title></Title>
    <view @click="poll()" :catchtouchmove="true">
      <Select :class="{'isFixed' :isFixed}" id="boxFixed"></Select>
    </view>
    <view style="height: 50upx;"></view>
    <Content :takeshop="takeshop"></Content>
    <!-- loading -->
    <home-load v-if="efinition"></home-load>
	</view>
</template>

<script>
  import Search from './components/search.vue'
  import Preference from './components/preference.vue'
  import Title from './components/title.vue'
  import Select from './components/select.vue'
  import Content from './components/content.vue'
  import {listing} from '../../api/api.js'
  import { getpreferurl} from '../../api/request.js'
  import { getwxshopurl} from '../../api/request.js'
  
  import {mapState} from 'vuex'
  
	export default {
		data() {
			return {
        efinition:true,
				menutop:'',
        rect:'',
        topdata:'',
        isFixed:false,
        preferdata:[],
        takeshop:[]
			}
		},  
    components:{
      Search,
      Preference,
      Title,
      Select,
      Content
    },
		methods: {
      // 为你优选
      preference(){
       Promise.all([listing(getpreferurl),listing(getwxshopurl)])
       .then(res=>{
         console.log(res)
         this.preferdata = res[0]
         this.takeshop = res[1]
         
         // loading
         this.efinition = false
       }).catch(err=>{
         console.log(err)
         })
      },
      poll(){
      	wx.pageScrollTo({
      	  scrollTop: this.topdata + 2,
      	  duration: 300
      	})
      },
      
     },
    
    mounted(){
      this.preference()
    },
      
    onLoad() {
    	// 监听筛选组件距离顶部的距离
    	const query = wx.createSelectorQuery()
    	query.select('#boxFixed').boundingClientRect()
    	query.exec((res)=>{
    		// console.log(res[0].top)
    		this.menutop = res[0].top
    		this.topdata = res[0].top
    	})
    },
    
    // 监听页面滚动距离
    onPageScroll(e) {
    	// console.log(e.scrollTop)
    	this.rect = e.scrollTop
    },
    // 计算属性
     computed:{
       
     	// 监听筛选组件置顶和不置顶
     	namepage(){
     		// 如果页面滚动的高度大于筛选组件距离顶部的高度，那就置顶，反之不置顶
     		if(this.rect > this.menutop){
     			// console.log('置顶')
          this.isFixed = true
     		}else{
     			this.isFixed = false
     		}
     	},
      ...mapState(['screendata']),
      count(){
        this.takeshop= this.screendata.screenarr
      }
    },
    
  }
</script>

<style>
	.box{
    margin:5upx 20upx;
  }
 .isFixed{
   position: fixed;
   left: 0; 
   top: 0; 
   right: 0;
   }
</style>
