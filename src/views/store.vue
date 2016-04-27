<template>
	<div id="store" style="padding-top:51px;">
		<div id="local-wrap">
				<div class="user-city">

					<div v-if="!isSelectCity">
							<span class='cur-txt'>我们猜，你是在</span><span class="city-name">{{userInfo.cardCity}}</span>上牌
							<a class="change" v-link="{name:'city',query:{province:userInfo.province,city:userInfo.cardCity}}">猜错了？</a>
					</div>

					<div v-if="isSelectCity">
						<span class='cur-txt'>你选择的上牌城市是</span><span class="city-name">{{cardCity || userInfo.cardCity}}</span>
						<a class="change" v-link="{name:'city',query:{province:userInfo.province,city:userInfo.cardCity}}">更改</a>
					</div>

				</div>
				<div  class="city-data" v-if="!fromStore && !noStore">
					<div  class="list-store" >

						<h2>离{{userInfo.cardCity}}最近的交付中心是</h2>
						<ul>
							<li class="store-item" v-for="store in listStore" data-areaid="{{store.areaId}}" @click="setAreaId(store.areaId,store.name,store.address,store.areaName)">
								<div class="item-info">
									<h5>{{store.name}}</h5>
									<p>{{store.address}}</p>
								</div>
								<a v-link="{name:'home'}">确认</a>
							</li>
						</ul>

					</div>
				</div>
				<div class="city-data" v-if="fromStore">
					<div class="list-store" >
						<h2>您选择的交付中心是</h2>
						<ul>
							<li class="store-item" data-areaid="{{userInfo.cityId}}"  @click="setAreaId(userInfo.cityId,userInfo.storeName,userInfo.storeAddress,userInfo.storeCity)">
									<div class="item-info">
										<h5>{{userInfo.storeName}}{{userInfo.areaName}}</h5>
										<p>{{userInfo.storeAddress}}</p>
									</div>
									<a v-link="{name:'home'}">确认</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

			<div class="nodata">
				<div v-if="noStore  && !fromStore">
					<span class="ico-null">
						<img src='../imgs/ico_null.png'>
					</span>
					<p>很抱歉<br>您选择的上牌城市<br>暂无交付中心</p>
				</div>

				<a  v-link="{name:'list_store'}">选择其他交付中心</a>

			</div>


	</div>
</template>

<script>
	module.exports = {
		//props: ['父组建传的值'],
		data:function(){

			return {
				userInfo		: {},//存数用户信息
				listStore       : {},//根据经纬度算出的门店
				fromStore		: false,//是否从门店列表页面进入
				cardCity        : '',//上牌城市
				isSelectCity      : '',//是否猜错
				noStore			: ''//没有找到门店
			}
		},
		//这里才是route的生存周期
		route:{

			data: function(transition) {
				var _this = this;
				_this.userInfo = JSON.parse(YMC.local('userCity')) || {};
				_this.isSelectCity = JSON.parse(YMC.local('userCity')).selectCity || false;
				_this.fromStore = _this.userInfo.selectStore || false;
				// //进入store页面,说明已经不需要再定位或者不会再次出现定位失败页面
				router.app.cityPara.name = 'store';

				YMC.local('userCity',JSON.stringify(_this.userInfo));
				_this.loadData();
				transition.next();
			}
		},
		methods:{
			loadData:function(){
				var _this = this;
				YMC.ajax({
					url: 'Products/Store/GetNearestStore',
					data:{longitude:_this.userInfo.lng,latitude:_this.userInfo.lat},
					showLoading: true,
					success:function(res){
						if(res.success){
							if(res.result.length){
								_this.noStore = false;
								_this.listStore = res.result;
							}else{
								_this.noStore = true;
							}
						}else{
							VUI.alert(res.error.message,1500);
						}

					},
					error:function(){
						VUI.alert("网络连接失败",1500);
					}
				})
			},
			setAreaId:function(areaId,storeName,address,city){
				var _this = this;
				if(city.split("市").length>1){
					city = city.split("市")[0];
				}else{
					city = city;
				}

				_this.userInfo.cityId = areaId;
				_this.userInfo.storeAddress = address;
				_this.userInfo.localCity = city;
				_this.userInfo.storeName = storeName;
				/**
				 * Date:2016年1月28日17:35:43
				 * Writer:weijing
				 * For : 选择交互中心,更改首页交互中心信息
				 */
				router.app.storeInfo={
					storeName:storeName,
					storeAddress:address
				}

				router.app.cityId = areaId;
				router.app.cityTit = city;
		        router.app.cityPara.name = 'store';
		        router.app.pubTitle = 'home';

		        router.go("/");

				YMC.local('userCity',JSON.stringify(_this.userInfo));
			}
		}
	}
</script>
<style>
#store{
	height: 100%;
	box-sizing:border-box;
	background-color: #f4f4f4;
}
#store .user-city{
	padding:0 14px 0 30px;
	height: 38px;
	line-height: 38px;
	color: #999;
	background-color: #f4f4f4;
	position: relative;
}
#store .user-city:before{
	content: "";
	width:16px;
	height: 22px;
	display:block;
	position: absolute;
	left: 10px;
	top: 50%;
	margin-top: -12px;
	background: url("../imgs/ico_map.png") center /100% 100% no-repeat;

}

#store .city-data{
	background-color: #ffd40b;
	text-align: center;
	padding: 20px 0;
}


#store .city-name{
	color:#000;
	padding:0 5px;
}
#store .change{
	float: right;
	color: #725d00;
}
#store .change i{
	display: block;
	width:19px;
	height: 20px;
	background:url("../imgs/ico_local.png") center /100% 100% no-repeat;
	background-size: 100% 100%;
	display: inline-block;
	margin:8px 0 0;
}
.nodata{
	text-align: center;
	padding:20px 10%;
}
.nodata p{
	color: #666;
	line-height: 26px;
	padding:20px 0 45px;
	font-size: 1rem;
}


.nodata img{
	width: 50%;
}
.nodata a{
	color: #999;
	display: inline-block;
	margin:0 auto;
	font-size: 1rem;
	width: 100%;
	font-size: 14px;
	line-height: 40px;
	border-radius: 5px;
	margin:0 auto;
	background-color:#e4e4e4;
}

/****周围门店****/
.city-data  .list-store h2{
	padding:10px 0 0;
	font-weight: normal;
	font-size: 16px;
	color: #fefefe;
}
.city-data  .list-store h2 span{
	color:#fe8504;
}
.store-item{
	clear: both;
	overflow: hidden;
	padding:10px 0;
	position: relative;
}
.list-store ul{
	padding: 20px 0 0;
	overflow: hidden;
}


.city-data .item-info{
	padding: 0 0 40px;
}
.city-data .item-info h5{
	color: #725d00;
	font-size: 20px;
	padding:3px 0;
}
.city-data .item-info p{
	color: #725d00;
	font-size: 0.8rem;
	padding: 0 10%;
}
.city-data  .store-item a{
	text-align: center;
	background-color: rgba(255,231,121,0.8);
	display: block;
	width: 80%;
	margin:0 auto;
	line-height: 40px;
	color: #c8a501;
	font-size: 16px;
	border:1px dashed #fff;
	border-radius: 8px;
}
</style>