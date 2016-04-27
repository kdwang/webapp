<template>
<div  style="margin-top:51px;">
	<div class="modelDetail">
		<h2 class="select_cartitle"><span>{{data_modelDetail.carModelName}}</span></h2>
		<div class="specarDetail">
			<div class="detailList mt10">
				<div ubt="outColor" class="arrow item_arr-down clearfix" @click.stop="showExter=!showExter" :class="{'item_arr-up':showExter}" data-exterId={{exterId}}>

					<h3>外观颜色</h3>
					<template v-if="!params.IsAll">
						<p class="op">
							{{{canBookingfirstExterTxt}}}
						</p>
					</template>

					<template v-if="params.IsAll">
						<p class="op">
							{{{firstExterTxt}}}
						</p>
					</template>

				</div>

				<div class="chioceC chioceC-O none" :class="{'none':!showExter}" >

					<ul class="clearfix" >
						<template v-if="params.IsAll">

							<li  @click="selectColors('exter')" v-for="item3 in data_modelDetail.carModelExternalColorColors" data-id={{item3.id}} :class="{'select':$index==0}">
								<span><i v-bind:style="{backgroundColor:item3.rbg}"></i><em>{{item3.name}}</em></span>
							</li>
						</template>

						<template v-if="!params.IsAll">
							<li @click="selectColors('exter','buy')" v-for="item5 in canBookingCar.exter" data-id={{item5.id}} :class="{'select':$index==0}">
								<span><i v-bind:style="{backgroundColor:item5.rbg}"></i><em>{{item5.name}}</em></span>
							</li>
						</template>

					</ul>
				    <h3 ubt="outOtherColor" class="viewmore colors-O" @click="viewAll()"  :class="{'none':params.IsAll}">
				        如需选择其他外观颜色，请预订
				    </h3>
				</div>

				<div ubt="innerColor" class="arrow item_arr-down clearfix" @click="showInner=!showInner" :class="{'item_arr-up':showInner}" data-interId={{interId}}>
				    <h3>
				        内饰颜色
				    </h3>

				    <template v-if="!params.IsAll">
				    	<p class="ip">
				    		{{{canBuyfirstInnerTxt}}}
				    	</p>
				    </template>

				    <template v-if="params.IsAll">
				    	<p class="ip">
				        	{{{firstInnerTxt}}}
				    	</p>
				    </template>


				</div>

				<div class="chioceC chioceC-I none" :class="{'none':!showInner}">
				    <ul class="clearfix">

				    <template v-if="params.IsAll">
				    	<li  @click="selectColors('inner')" v-for="item4 in data_modelDetail.carModelInternalColors" data-id="{{item4.id}}" :class="{'select':$index==0}">
				    		<span>
				    			<template v-if="item4.rbg.split('/').length == 1">
				    				<i v-bind:style="{backgroundColor:item4.rbg}"></i>
				    			</template>
				    			<template v-if="item4.rbg.split('/').length > 1">
				    				<i>
				    					<s v-for="inner in item4.rbg.split('/')" v-bind:style="{backgroundColor:inner}"></s>
				    				</i>
				    			</template>
				    			<em>{{item4.name}}</em>
				    		</span>
				    	</li>
				    </template>
					    <template v-if="!params.IsAll">
							<li  @click="selectColors('inner')" v-for="item6 in canBookingCar.inter" data-id="{{item6.id}}" :class="{'select':$index==0}">
				    		<span>
				    			<template v-if="item6.rbg.split('/').length == 1">
				    				<i v-bind:style="{backgroundColor:item6.rbg}"></i>
				    			</template>
				    			<template v-if="item6.rbg.split('/').length > 1">
				    				<i>
				    					<s v-for="inner in item6.rbg.split('/')" v-bind:style="{backgroundColor:inner}"></s>
				    				</i>
				    			</template>
				    			<em>{{item6.name}}</em>
				    		</span>
				    			</li>
					    </template>
				    </ul>
				    <h3 ubt="innerOtherColor" class="viewmore colors-I" @click="viewAll()"  :class="{'none':params.IsAll}">
				        如需选择其他内饰颜色，请预订
				    </h3>
				</div>
			</div>
		</div>
		<div class="buyCarInfo mt10"  :class="{'none':canBuy}">
		    <ul>
		        <li>
		            <label>
		                备注
		            </label>
		            <input ubt="remarks" v-model="userInfo.mark" id="exp" placeholder="备注最多输入15个字符">
		        </li>
		        <li>
		            <label>
		                姓名
		            </label>
		            <input ubt="name"  v-model="userInfo.name" id="name" placeholder="输入你的姓名">
		        </li>
		        <li>
		            <label>
		                手机号
		            </label>
		            <input ubt="phone"  v-model="userInfo.tel" numbe id="phone" placeholder="输入你的手机号码">
		        </li>
		    </ul>
		</div>

		<div class="proAction" :class="{'none':canBuy}">
		    <p>
		        此商品目前无货，非常抱歉。若您愿意提交购买意向，未来商品上架后我们会主动通知
		    </p>
		    <span ubt="subIntent" class="btn btn-primary" @click="submitBooking" :class="{'disable':!userInfo.name || !userInfo.tel}">
		        <a>提交购车意向</a>
		    </span>
		</div>

		<div class="canBuy" :class="{'none':!canBuy}" >
			<p>这款车我们已经上架啦</p>
			<span>
				<a ubt="payBtn" v-link="{name:'product',query:{id:productNo}}">前往定购</a>
			</span>
		</div>
	</div>
</div>
</template>

<script>
	module.exports = {
		//props: ['父组建传的值'],
		data:function(){

			return {
				showExter           	: false,
				showInner           	: false,
				select              	: false,
				canBuy              	: true,
				isEmpty                 : '',
				isAll               	:'',//全部or现车
				exterId             	: '',//外饰id
				interId             	: '',//内饰id
				firstExterTxt       	: '',//外饰颜色信息
				firstInnerTxt       	: '',//内饰颜色
				canBookingfirstExterTxt :'',//现车的第一个外观颜色
				canBuyfirstInnerTxt :"",//现车的第一个内饰颜色
				productNo           	: '',
				data_modelDetail 		: {},// 品牌列表,
				userInfo:{
					mark:'',//备注
					name:'',//姓名
					tel:''//手机号
				},
				submitAjax              : 'Marketing/CarBooking/CreateCarBookingOrder',
				params:{
					Id: '',
					IsAll:''
				},
				selectType              : '',//选中的是全部还是现车,
				canBookingCar: {
					exter:'',
					inter:''
				}//能够预订的
			}
		},
		//这里才是route的生存周期
		route:{

			data: function(transition) {
				var _this = this;
				var local = window.location.href;
				var gup = YMC.gup(local);
				var flag = gup.isAll;
				_this.isAll = eval(flag.toLowerCase());
				router.app.isAll = _this.isAll;
				_this.params = {
					Id:gup.id,
					IsAll:_this.isAll
				}


				if(router.app.isAll){
					router.app.chooseTit = '全部';
					_this.isAll = true;
					_this.canBuy = false;
				}else{

					router.app.chooseTit = '现车';
					_this.isAll = false;
					_this.canBuy = true;

				}
				router.app.chooseSubtit1 ={
					title:'现车',
					callBack:function(){
						//点击头部的时候,关闭折叠
						_this.showExter = false;
						_this.showInner = false;
						this.isAll = false;
						_this.params.IsAll = false;
						_this.canBuy = true;
						router.app.showSubtit = false;
						router.app.chooseTit = router.app.chooseSubtit1.title;




						//如果没有现车,就显示全部
						if(_this.isEmpty){
							VUI.alert("暂无现车",function(){
								//点击头部的时候,关闭折叠
								_this.showExter = false;
								_this.showInner = false;
								router.app.isAll = true;
								_this.params.IsAll = true;
								router.app.chooseTit = router.app.chooseSubtit2.title;
								//默认换成全部的第一个内饰和外饰Id
								_this.exterId = _this.data_modelDetail.carModelExternalColorColors[0].id;
								_this.interId = _this.data_modelDetail.carModelInternalColors[0].id;
								_this.compareColors(_this.exterId,_this.interId);
								_this.canBuy = false;
							},1000);
						}else{
							//默认换成已有的第一个内饰和外饰Id
							_this.exterId = _this.canBookingCar.exter[0].id;
							_this.interId = _this.canBookingCar.inter[0].id;
							_this.canBuy = true;
							_this.compareColors(_this.exterId,_this.interId);
						}
					}


				};
				router.app.chooseSubtit2 ={
					title:'全部',
					callBack:function(event){
						//默认换成全部的第一个内饰和外饰Id
						_this.exterId = _this.data_modelDetail.carModelExternalColorColors[0].id;
						_this.interId = _this.data_modelDetail.carModelInternalColors[0].id;

						//点击头部的时候,关闭折叠
						_this.showExter = false;
						_this.showInner = false;
						this.isAll = true;
						_this.params.IsAll = true;
						//改变标题
						router.app.showSubtit = false;
						router.app.chooseTit = router.app.chooseSubtit2.title;
						_this.compareColors(_this.exterId,_this.interId);
						_this.canBuy = false;
					}
				};//pubTitle == 'choose'

				_this.loadData();
				transition.next();
			}
		},
		methods:{
			loadData:function(){
				var _this = this;
				YMC.ajax({
					url: 'Products/CarModel/GetCarModelDto',
					data: {Id:_this.params.Id},
					showLoading:true,
					success:function(res){
						var result = res.result ;
						var modelInfo = _this.model_info;
						_this.data_modelDetail = result;

						/**
						 * 取所有车的信息
						 */

						//取第一个外观的信息
						var allExte = result.carModelExternalColorColors;
						var firstExter =  allExte[0];

						//取第一个内饰颜色的信息
						var allInner = result.carModelInternalColors;
						var firstInner = allInner[0];


						var firstInnerColor = firstInner.rbg.split("/");
						var colorstr="";

						/**
						 * 取现车的信息
						 */
						var canBookingInfo = result.carBookingGoodsColors;
						Array.prototype.unique = function () {
						    var result = [];
						    for (var i = 0, len = this.length; i < len; i++) {
						        for (var j = 0, len2 = result.length; j <= len2 ; j++) {
						            if (result.indexOf(this[i]) < 0) {
						                result.push(this[i]);
						            }
						        }
						    }
						    return result;
						}
						var extIdArr= [];
						var interIdArr = [];
						for(var i in canBookingInfo){
							extIdArr.push(canBookingInfo[i].externalColorId);
							interIdArr.push(canBookingInfo[i].internalColorId);
						}

						//根据内饰Id找到对应颜色
						var hasExter = [];
						for(var j=0;j<extIdArr.length-1;j++){
							for(var x in allExte){
								if(extIdArr[j] == allExte[x].id){
									hasExter.push(allExte[x]);
								}
							}
						}
						//根据外饰Id找到对应的颜色
						var hasInter = [];
						for(var j=0;j<interIdArr.length-1;j++){
							for(var k in allInner){
								if(interIdArr[j] == allInner[k].id){
									hasInter.push(allInner[k]);
								}
							}
						}




						//找到第一个能够购买的所有内饰
						//根据上述找到的内饰Id,找到对应的信息
						var itInter = _this.data_modelDetail.carBookingGoodsColors;
						//根据外饰Id找对对应的可购买的颜色
						var interArrs = [];
						for(var i =0;i<itInter.length;i++){
							if(itInter[i].externalColorId == hasExter.unique()[0].id){
								interArrs.push(itInter[i].internalColorId);
							}
						}

						//根据上述找到的内饰Id,找到对应的信息
						var canBuyCar = _this.data_modelDetail.carModelInternalColors;
						var goods=[];
						for(var i in canBuyCar){
								for(var j=0;j<interArrs.length;j++){
									//debugger;
									if(interArrs[j] == canBuyCar[i].id){
										goods.push(canBuyCar[i]);
									}
								}
						}

						_this.canBookingCar.exter= hasExter.unique();
						_this.canBookingCar.inter= goods;


						//所有车的信息
						_this.firstExterTxt='<span>'
							+'<i style=\"background-color:'+firstExter.rbg +'"\></i>'
							+'<em>'+firstExter.name+'</em>'+
							'</span>';
						if(firstInnerColor.length>1){
							colorstr = '<i><s style=\"background-color:'+firstInnerColor[0] +'"\></s><s style=\"background-color:'+firstInnerColor[1] +'\"></s></i>'
						}else{
							colorstr = '<i style=\"background-color:'+firstInnerColor+'"\></i>'
						}
						_this.firstInnerTxt='<span>'
							+colorstr+'<em>'+firstInner.name+'</em>'+
							'</span>';





						if(_this.params.IsAll){
							_this.exterId = firstExter.id;
							_this.interId = firstInner.id;
						}else{
								_this.exterId = hasExter[0].id;
								_this.interId = hasInter[0].id;
						}

						if(hasExter.length==0){
							_this.isEmpty = true;
							return false;
						}else{
							_this.compareColors(_this.exterId,_this.interId);
						}
						//第一个可购买外观颜色
						var buyfirstColor = "";
							_this.canBookingfirstExterTxt='<span>'
							+'<i style=\"background-color:'+hasExter[0].rbg +'"\></i>'
							+'<em>'+hasExter[0].name+'</em>'+
							'</span>';
							//第一个可购买外饰颜色
							var BookingfirstInnerColor = hasInter[0].rbg.split("/");

							var buyfirstColor="";



							if(BookingfirstInnerColor.length==2){
								buyfirstColor = '<i><s style=\"background-color:'+BookingfirstInnerColor[0] +'"\></s><s style=\"background-color:'+BookingfirstInnerColor[1] +'\"></s></i>';
							}else{
								buyfirstColor = '<i style=\"background-color:'+BookingfirstInnerColor+'"\></i>'
							}

							_this.canBuyfirstInnerTxt='<span>'
								+buyfirstColor+'<em>'+hasInter[0].name+'</em>'+
								'</span>';
					}
				})
			},
			viewAll:function(event){
				var _this = this;
				//router.app.chooseTit = router.app.chooseSubtit2.title;
				_this.showExter = false;
				_this.showInner = false;
				this.isAll = true;
				_this.params.IsAll = true;
				_this.canBuy = false;
				//改变标题
				router.app.showSubtit = false;
				router.app.chooseTit = router.app.chooseSubtit2.title;
				router.app.isAll = true;
			},

			//选取颜色
			selectColors:function(type,status){
				var that = $(event.target).closest('li');
				var html = that.html();
				var id = that.attr("data-id");
				var _this = this;
				that.addClass('select').siblings('li').removeClass('select');
				if(type =="exter"){
					_this.showExter = false;
					_this.firstExterTxt=html;
					_this.exterId = id;
					if(status == 'buy'){
						var itInter = _this.data_modelDetail.carBookingGoodsColors;
						//根据外饰Id找对对应的可购买的颜色
						var interArrs = [];
						for(var i =0;i<itInter.length;i++){
							if(itInter[i].externalColorId == id){
								interArrs.push(itInter[i].internalColorId);
							}
						}


						//根据上述找到的内饰Id,找到对应的信息
						var canBuyCar = _this.data_modelDetail.carModelInternalColors;
						var goods=[];
						for(var i in canBuyCar){
								for(var j=0;j<interArrs.length;j++){
									//debugger;
									if(interArrs[j] == canBuyCar[i].id){
										goods.push(canBuyCar[i]);
									}
								}
						}
						var colorstr="";
						var firstbuyColor = goods[0].rbg.split("/");

						if(firstbuyColor.length>1){
							colorstr = '<i><s style=\"background-color:'+firstbuyColor[0] +'"\></s><s style=\"background-color			:'+firstbuyColor[1] +'\"></s></i>'
						}else{
							colorstr = '<i style=\"background-color:'+firstbuyColor+'"\></i>'
						}

						_this.params.IsAll = false;

						_this.canBuyfirstInnerTxt='<span>'
							+colorstr+'<em>'+goods[0].name+'</em>'+
							'</span>';

						_this.canBookingCar.inter = goods;

					}
				}else{
					_this.showInner = false;
					_this.firstInnerTxt=html;
					_this.interId = id;
				}
				_this.compareColors(_this.exterId,_this.interId,status);

			},
			compareColors:function(exterId,interId,status){
				//比较颜色
				var hasId = {
					extId:exterId,
					intId:interId
				}
				var _this = this;
				if(status =='buy'){ return false;}
				var canBooking = _this.data_modelDetail.carBookingGoodsColors;

				for(var i in canBooking){
					if(canBooking[i].externalColorId == hasId.extId && canBooking[i].internalColorId == hasId.intId){
						_this.productNo = canBooking[i].productNo;
						_this.canBuy = true;
						return false;
					}else{
						_this.canBuy = false;
					}
				}


			},
			submitBooking:function(){
				var _this = this;
				var user = _this.userInfo;
				if(!user.name || !user.tel){
					return false;
				}
				//判断姓名输入是否正确
				if(user.name.length>5){
					VUI.alert('请输入正确的姓名',1500);
					return false;
				}

				//判断手机号码输入是否正确
				if(user.tel.length != 11 && user.tel.length != 0){
					VUI.alert('手机号码输入有误,请核对后再输入',1500);
					return false;
				}

				var subdata = {
                    "CarModelName": $(".select_cartitle").text(),
                    "CarModelInternalColor": $('.ip em').html(),
                    "CarModelExternalColor": $('.op em').html(),
                    "Budget": 16,
                    "Remarks":_this.userInfo.mark,
                    "MemberName": user.name,
                    "MemberTel": user.tel,
                    "CarModelInternalColorId": _this.interId,
                    "CarModelExternalColorId": _this.exterId,
                }

				YMC.ajax({
					url: _this.submitAjax,
					data:subdata,
					showLoading:true,
					success:function(result){
						if (result.success) {
                            if (result.result) {
                                router.go({name:'specarSuccess'});
                            } else {
                                UI.alert("系统有误，请重新预订", 1500);
                            }
                        } else {
                            UI.alert("错误提示：" + result.error.message, 2500);
                        }
					},
					error:function(){
						VUI.alert('网络链接失败,请稍后再试',1500);
					}
				})
			},
		}

	}
</script>

<style>
.modelDetail .detailList .arrow,.buyCarInfo ul li{
	min-height: 22px;
	line-height: 22px;
	position: relative;
	padding: 15px 10% 15px 5%;
	border-bottom: 1px solid #f1f1f1;
	background: #fff;
}
.modelDetail .detailList {
	font-size: 14px;
	color: #333;
	border-bottom: 1px solid #f2f2f2;
}
.modelDetail .detailList .arrow .op,.modelDetail .detailList .arrow .ip{
	color:#777;
	font-size:0;
    height: 23px;
}
.modelDetail .detailList .arrow .op *,.modelDetail .detailList .arrow .ip *{
	font-size: 14px;
}
.modelDetail .detailList .arrow:before{
	right:7px;
}
.modelDetail .detailList h1{
	font-weight: normal;
}

.modelDetail .detailList .ico_back:before{
	 right: 4px;
	 top: 9px;
}
.modelDetail .detailList .chioceC{
	color:#5b5959;
	background: #f7f7f7;
	border-bottom: 1px solid #f2f2f2;
	padding:15px 10px 5px 10px;
	text-align: center;
}
.modelDetail .detailList .chioceC li{
	float: left;
	width: 33%;
	text-align: center;
}
.modelDetail .detailList .chioceC li.select span{
	background: #f6d052;
}
.modelDetail .detailList .chioceC span{
	display: inline-block;
	width: 85%;
	height:20px;
	line-height: 20px;
	border-radius: 6px;
	padding:5px 0;
	margin:0 0 10px 0;
}
.modelDetail .detailList .chioceC h3{
	text-align: left;
	color: #0099cc;
	line-height: 30px;
}
.modelDetail .detailList .chioceC span i{
    margin-right: 8px;
    display: inline-block;
    width:12px;
    height: 12px;
    vertical-align: -1px;
}
.modelDetail .detailList .chioceC span i s,.modelDetail .detailList .arrow p i s{
    padding: 0;
    margin:0;
    width: 6px;
    height: 12px;
    display:inline-block;
    vertical-align: -1px;
    float: left;
}
.modelDetail .detailList .chioceC span i em,.arrow .ip i em{
	display: inline-block;
	width: 6px;
	height: 12px;
	float: left;
}
.modelDetail .detailList .chioceC span i em:nth-child(1),.arrow .ip i em:nth-child(1){
	background-color: #fdf2d1;
}
.modelDetail .detailList .chioceC span i em:nth-child(2),.arrow .ip i em:nth-child(2){
	background-color: #ffa800;
}

.modelDetail .detailList .chioceC-time li{
	width:25%;
}
.modelDetail .detailList .chioceC-O li,.modelDetail .detailList .chioceC-I li{
	width: auto;
	margin-right: 10px;
}
.modelDetail .detailList .chioceC-O li span,.modelDetail .detailList .chioceC-I li span{
	width: auto;
	padding:5px 10px;
}
.modelDetail .detailList .itemNone{
	padding-right:10px;
}
.modelDetail .detailList .disabled{
	padding-right:30px;
}
.modelDetail .detailList .arrow h3,.modelDetail .detailList .itemNone h3{
	float: left;
	font-weight: normal;
}

.modelDetail .detailList .arrow p,.modelDetail .detailList .itemNone p{
	float: right;
}

.modelDetail .detailList .arrow p i {
	width: 12px;
	height: 12px;
	display: inline-block;
	margin-bottom: -1px;
	margin-right: 5px;
}
.modelDetail .buyCarInfo ul li
{
	font-size: 0;
}
.modelDetail .buyCarInfo ul li *{
	vertical-align:top;
	font-size:14px;
}
.modelDetail .buyCarInfo ul li label{
	display: inline-block;
	margin-right: 3%;
	min-width: 50px;
	width:30%;
}
.modelDetail .buyCarInfo ul li input{
	color:#777;
	width:67%;
	display:inline-block;
}
.modelDetail .proAction .btn-primary{
   width:90%;
   margin-top:10px;
   margin-bottom: 0;
}

.modelDetail .disable{
	background-color: #efefef;
	border:1px solid #efefef;
}


.modelDetail input:-ms-input-placeholder,
.modelDetail textarea:-ms-input-placeholder {
	color: #ccc;
	text-align:right;
}
.modelDetail input::-webkit-input-placeholder,
.modelDetail textarea::-webkit-input-placeholder {
	color: #ccc;
	text-align:right;
}

/*城市列表滚动条css */
.modelDetail .swiper-container { height: 100%;}
.modelDetail .swiper-slide {
		height: auto !important;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
}

/*省份城市列表*/
.modelDetail .cityList{
	position: fixed;
	bottom:0;
	left:0;
	right: 0;
	height: 60%;
	background-color:#e4e3e2;
	width: 100%;
	z-index: 10000;
	overflow-x:hidden;
	-webkit-transform: translate3d(0px, 100%, 0px);
	-moz-transform: translate3d(0px, 100%, 0px);
	-ms-transform: translate3d(0px, 100%, 0px);
	transform: translate3d(0px, 100%, 0px);
	-webkit-transition: all ease-out .3s;
	-moz-transition: all ease-out .3s;
	-ms-transition: all ease-out .3s;
	transition: all ease-out .3s;
}
.modelDetail .cityListDown {
	-webkit-transform: translate3d(0px, 0%, 0px);
	-moz-transform: translate3d(0px, 0%, 0px);
	-ms-transform: translate3d(0px, 0%, 0px);
	transform: translate3d(0px, 0%, 0px);
}
.modelDetail .cityList .cityB{
	height: 100%;
	width: 100%;
	background-color: #fff;
}

.modelDetail .cityList .cityB li.select{
	background: #f1f1f1;
	border-left: 3px solid #ffa800;
	padding: 0 10px 0 7px;
}
.modelDetail .cityList .cityB li{
	height: 44px;
	line-height: 44px;
	overflow: hidden;
	white-space: nowrap;
	text-align: center;
	padding: 0 10px;

	-moz-box-sizing:border-box;
	-webkit-box-sizing:border-box;
	box-sizing:border-box;
}
.modelDetail .cityList .cityB li{
	border-bottom: 1px solid #f1f1f1;
	color:#777;
}
.modelDetail .cityList .cityB li:last-child{
	border-bottom:0 none;
}

.modelDetail .choice ul li{
	margin-bottom: 5px;
}
.modelDetail .choice ul li span{
	display: inline-block;
	width: 100px;
	text-align: right;
	margin-right: 10px;
}


/*2015年8月27日13:35:17 新增css*/
.modelDetail .canBuy{
    padding: 30px;
    text-align: center;
}
.modelDetail .canBuy p,.proAction p{
    color: #ff4c66;
    line-height: 1.2rem;
    font-size: 1rem;
}
.modelDetail .proAction p{
	padding:10px 50px;
	 line-height: 1.6rem;
	text-align: center;
}
.modelDetail .canBuy span{
    padding:30px 20%;
    display: block;
}
.modelDetail .canBuy span a{
    line-height: 40px;
    color: #333;
    background-color: #f6d052;
    border-radius:8px;
    display:block;
    width: 100%;
    margin: 0 auto;
    font-size: 1.2rem;
}


</style>