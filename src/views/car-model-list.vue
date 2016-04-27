<template>
<div id="main" class="mainautow mainhd">

	<div class="carModel" v-if="params.IsAll">
			<h2 class="cartitle" ><span>{{data_carModel.carSeriesName}}</span></h2>

			<div class="specarName" v-for="carModelList in data_carModel.carModelList">

				<div class="item" >
					<div class="item_left"><span>{{carModelList.years}}</span></div>
				</div>
				<div class="sList" data-flag="{{isEqual}}">
					<ul>
						<li v-for ="item in carModelList.carModelModels" >
							<a ubt="car_{{item.id}}" gsq="car_{{item.id}}" gsqName="车款_{{item.modelName}}" v-link="{name:'product',query:{carModelId: item.id}}"  data-value="{{item.id}}">
								<p><span>{{item.modelName}}</span><em>{{item.price}}万起</em></p>
								<p class="gearbox">
									<span>{{item.gearboxType}}</span>指导价：
									<del>{{item.officePrice}}万</del>
								</p>
							</a>
						</li>
					</ul>
				</div>
			</div>
	</div>
	<div class="carModel" v-if="!params.IsAll">
			<div  v-if="!isEmpty">
				<h2 class="cartitle"><span>{{data_carModel.carSeriesName}}</span></h2>
				<div class="specarName"  v-for="carModelList in data_carModel.carModelList">
					<div class="item" v-if="!carModelList.curType">
						<div class="item_left"><span>{{carModelList.years}}</span></div>
					</div>
					<div class="sList">
						<ul>
							<li v-for ="item in carModelList.carModelModels"  v-if="item.inventory">
								<a ubt="car_{{item.id}}" gsq="car_{{item.id}}" gsqName="车款_{{item.modelName}}" v-link="{name:'product',query:{carModelId: item.id}}"  data-value="{{item.id}}">
									<p><span>{{item.modelName}}</span><em>{{item.price}}万起</em></p>
									<p class="gearbox">
										<span>{{item.gearboxType}}</span>指导价：
										<del>{{item.officePrice}}万</del>
									</p>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div v-if="isEmpty" class="nocar-msg">
			  <p>暂时没有<span>{{data_carModel.carSeriesName}}</span>的可售车款</p>
			</div>

			<div class="viewother" v-show="isEquity">
				<a ubt="chooseMore" href="javascript:" @click="viewAll">其它更多车款</a>
			</div>
	</div>
</div>
</template>

<script>
	module.exports = {
		//props: ['父组建传的值'],
		data:function(){

			return {
				data_carModel          : {}, // 品牌列表
				params:{
					Id: '',
					IsAll:''
				},
				isEmpty                 : false,//是否有现车
				isEquity                : false,//'现车和所有是否相等',
				selectType 				: '',//选中的是全部还是现车
			}
		},
		methods:{
			loadData:function(){
				var _this = this;
				_this.data_carModel = {};
				router.app.showSubtit = false;//默认关闭头部二级菜单
				YMC.ajax({
					url: 'Products/CarModel/GetCarModelList',
					data: _this.params,
					showLoading:true,
					success:function(res){
						if(res.result.carModelList.length==0){
							_this.data_carModel.carSeriesName = res.result.carSeriesName;
							_this.isEmpty = true;
							return false;
						}

						$.each(res.result.carModelList,function(a,b){
						  //判断对应厂商的车系是否都是可售
						  if(b.carModelModels.length==$.grep(b.carModelModels,
						    function(o,p){return o.inventory==true}).length){
						     b.AllSaled=true;
						  }else{
						     b.AllSaled=false;
						  }

						//判断可售中是否有现车
						if(b.carModelModels.length==$.grep(b.carModelModels,
						    function(o,p){return o.inventory==false}).length){
						      b.curType=true;
						  }else{
						      b.curType=false;
						  }
						});


						_this.data_carModel = res.result;

						var temp=$.grep(res.result.carModelList,function(a,b){return a.AllSaled==false;}).length;
						var AllTemp=$.grep(res.result.carModelList,function(a,b){return a.curType==false;}).length;

						//判断对应厂商的车系是否有可售的以及是否相等
						if(temp>0){
						  _this.isEquity = true;
						}else{
						  _this.isEquity = false;
						}

						if(AllTemp>0){
						  _this.isEmpty = false;
						}else{
						  _this.isEmpty = true;
						}

					},
					error:function(){
						VUI.alert("网络连接失败",1500);
					}
				})
			},
			viewAll:function(){
				var _this = this;

				_this.isAll =  true;
				_this.params.IsAll = true;
				router.app.isAll = true;
				router.app.chooseTit = router.app.chooseSubtit2.title;
			}
		},
		//这里才是route的生存周期
		route:{
			data: function(transition) {
				var _this = this;
				var flag = _this.$route.query.isAll === 'true';

				router.app.isAll = flag;
				_this.params = {
					Id:this.$route.query.carSeriesId,
					IsAll:router.app.isAll
				}
				if(_this.params.IsAll){
					router.app.chooseTit = '全部车款';
				}else{
					router.app.chooseTit = '可售车款';
				}
				router.app.chooseSubtit1 ={
					title:'可售车款',
					callBack:function(event){
						this.showSubtit = false;
						this.isAll = false;
						_this.params.IsAll = false;
						router.app.chooseTit = router.app.chooseSubtit1.title;
					}
				};//pubTitle == 'choose'
				router.app.chooseSubtit2 ={
					title:'全部车款',
					callBack:function(){
						this.showSubtit = false;
						this.isAll =  true;
						_this.params.IsAll = true;
						router.app.chooseTit = router.app.chooseSubtit2.title;
					}
				};
				_this.loadData();
				transition.next()
			}
		}
	}
</script>

<style>
.none{
	display: none;
}
.carModel .specarName .item{
	padding:0 5%;
	border-bottom:0 none;
}

.carModel .specarName .item_arr-down{
	border-bottom:0 none;
}
.carModel .specarName .item_arr-up{
	border-bottom:1px solid #f1f1f1;
}

.carModel .specarName .item .item_left span{
	display: inline-block;
	border-bottom:1px solid #ff4c66;
	position: relative;
	top:-1px;
	color:#ff4c66;
}

.carModel .specarName .sList{
	background: #fff;
}
.carModel .specarName .sList ul{
	padding:0 5%;
}
.carModel .specarName .sList li{
	border-bottom:1px solid #f1f1f1;
	padding:10px 0;
	clear: both;
	opacity: 1;
	-webkit-animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
	-moz-animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
	-ms-animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
	animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
}
.carModel .specarName .sList li a{
	display: block;
	width: 100%;
	height: 100%;
	color:#444;
}
.carModel .specarName .sList li p{
	text-align: right;
}
.carModel .specarName .sList li p span{
	float: left;
	text-align: left;
	display: block;
	font-size: 12px;
	width: 70%;
	white-space: nowrap;
	text-overflow:ellipsis;
	overflow: hidden;
}
.carModel .specarName .sList li p.gearbox{
	/*color: #999;*/
}
.carModel .specarName .sList li p.gearbox span{
	width: 60%;
	/*color: #000;*/
}


.carModel .specarName .sList li:last-child{
	border:0 none;
}
.carModel .specarName .sList li em{
	color:#ff4c66;
	margin-left: 5px;
}

</style>