<template>
<div class="mainautow mainhd  vbrandlist" v-el:vbrandlist >
	<div class="brandList">
		<ul v-if="IsAll">
			<li class="clearfix" v-for="item in data_allBrand" @click.stop.prevent="showRight(item.id,IsAll)"  >
				<a ubt="car_{{item.id}}" gsq="car_{{item.id}}" gsqName="品牌列表_{{item.name}}">
					<img data-value="{{item.logoUrl}}" :src="item.logoUrl | imgUrl">
					<span>{{item.name}}</span>
				</a>
			</li>
		</ul>

		<ul v-if="!IsAll">
			<li class="clearfix" v-for="item in data_allBrand" @click.stop.prevent="showRight(item.id,!IsAll)" v-if="!item.inventory">
				<a ubt="car_{{item.id}}" gsq="car_{{item.id}}" gsqName="品牌列表_{{item.name}}">
					<img data-value="{{item.logoUrl}}" :src="item.logoUrl | imgUrl">
					<span>{{item.name}}</span>
				</a>
			</li>
		</ul>

		<div class="viewother" v-if="!IsAll"  @click="viewAll"><a ubt="chooseMore" gsq="其它更多车型品牌" href="javascript:;">其它更多车型品牌</a></div>
	</div>
	<bookaside v-ref:asider  :id.sync="carId" :show.sync="showRightAside"  :placement.sync="asideTowards"  :width.sync="asidewidth"></bookaside>
</div>

</template>

<script>
	module.exports = {
		//props: ['父组建传的值'],
		data:function(){
			return {
				carId:'',
				showRightAside  : false,
				selectType      : '',//选中的是全部还是现车
				asideTowards    : 'right',
				asidewidth		: 500,
				data_allBrand   : [],// 品牌列表
				scrollFn		: function(){},//滚动事件
				IsAll           : false
			}
		},
		components: {
	    	bookaside: require('./../components/bookaside.vue'),	// 选择车系侧边栏
	    },
	    methods:{
	    	showRight:function(id,flag){
	    		if(!id){
	    			//this.showRightAside = false;
	    			return false;
	    		}
	    		YMC.local('setBrandId',id);
	    		var _this = this;
	    		_track.setD({productId:id,pShow:'brandShow'});
	    		this.carId = id;
	    		this.showRightAside = true;
	    		this.$refs.asider.getData(id,flag);
	    	},
	    	loadData:function(flag){
	    		var _this = this;
	    		YMC.ajax({
	    			url: 'Products/CarBrand/GetCarBrandList',
	    			data: {IsAll: router.app.isAll},
	    			showLoading:true,
	    			success:function(res){
	    				if(!res.success){
	    					VUI.alert(res.error.message);
	    					return;
	    				}
	    				_this.data_allBrand = res.result;
	    			},
	    			complete:function(){
	    				_this.selectType =  _this.$root.isAll;
	    				var getBrandId = YMC.local('setBrandId');
    					if(flag===undefined && _this.showRightAside && getBrandId){
    						$(_this.$els.vbrandlist).addClass('setzindex');
    						_this.showRight(getBrandId,flag);
    					}
	    			},
	    			error: function(res){
	    				 VUI.alert("网络连接失败，请稍后再试。", 1500);
	    			}
	    		})
	    	},
	    	viewAll:function(){
	    		/*显示所有*/
	    		var _this = this;
	    		_this.IsAll = router.app.isAll  = true;
				router.app.chooseTit = router.app.chooseSubtit2.title;
				$(window).scrollTop(0,0);
				YMC.local('setBrandId',null);
				YMC.local('gIsAll',true);
	    	}

	    },
		//这里才是route的生存周期
		route:{
			data: function(transition) {
				var _this = this;

				_this.IsAll = router.app.isAll = JSON.parse(YMC.local('gIsAll')) || false;
				_this.scrollFn = function() {
					$(_this.$els.vbrandlist).removeClass('setzindex');
				};


				//已选择车系并返回到选车页面,加上setzindex,要不然头部会闪
				if(YMC.local('setBrandId')){
					$(window).scrollTop(0,0);
					$(this.$els.vbrandlist).addClass('setzindex');
					this.showRightAside = true;
					$(window).on('scroll',_this.scrollFn);
				}

				router.app.showSubtit = false;  //默认关闭头部
				if(router.app.isAll){
					router.app.chooseTit = '全部品牌';
				}else{
					router.app.chooseTit = '可售品牌';
				}

				router.app.chooseSubtit1 ={
					title:'可售品牌',
					callBack:function(event){
						this.showSubtit = _this.IsAll = router.app.isAll =  _this.showRightAside  = false;
						router.app.chooseTit = router.app.chooseSubtit1.title;
						$(window).scrollTop(0,0);
						YMC.local('gIsAll',false);
						YMC.local('setBrandId',null);
					}
				};//pubTitle == 'choose'
				router.app.chooseSubtit2 ={
					title:'全部品牌',
					callBack:function(){
						_this.IsAll = router.app.isAll = true;
						this.showSubtit = _this.showRightAside = false;
						router.app.chooseTit = router.app.chooseSubtit2.title;
						$(window).scrollTop(0,0);
						YMC.local('gIsAll',true);
						YMC.local('setBrandId',null);
					}
				};
				_this.loadData();//默认加载现车数据
			},
			canDeactivate:function(transition){
				//如果返回到主页,清空缓存中的brandId
				if(transition.to.name == 'home'){
					YMC.local('setBrandId',null);
					this.showRightAside = false;
				}
				$(window).off('scroll',this.scrollFn);
				transition.next();
			}
		}
	}
</script>

<style>
.mainautow.setzindex{
	z-index: 1000;
}
.vbrandlist .brandList{

}
.cartitle{
	padding: 15px 0;
	text-align:center;
}
.vbrandlist .brandList ul {
	margin:10px 0 0;
	padding:0 0 0 5%;
	background: #fff;
	font-size: 14px;
	color:#333;
}
.vbrandlist .brandList ul li{
	width:100%;
	height: 40px;
	line-height: 40px;
	padding:8px 0;
	border-bottom:1px solid #f2f2f2;
	opacity: 1;
	clear: both;
	-webkit-animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
	-moz-animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
	-ms-animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
	animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
}
.vbrandlist .brandList ul li:last-child{
	border:0 none;
}
.vbrandlist .brandList ul li img,.brandList ul li span{
	float: left;
}
.vbrandlist .brandList ul li a{
	display: block;
	width: 100%;
	height: 100%;
}
.vbrandlist .brandList ul li img{
	height: 40px;
	margin-right: 10px;
	width:60px;
}

</style>