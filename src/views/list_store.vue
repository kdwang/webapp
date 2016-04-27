<template>
	<div>
		<div id="listStore" class="mainautow mainhd">
			<div class="user-city">
				<p>您期望的交付中心是？</p>
			</div>

			<div class="city-data">
				<div  v-if="hasStore" class="cur-local">
					<h5>当前选择</h5>
					<span class="item-store" @click="selectCur()">
						<a v-link="{name:'rushEnr'}"  v-if="fromType == 'rushEnr'">{{userInfo.storeName}}</a>
						<a v-link="{name:'product',query:{'id':carGoodsId}}" v-if="fromType == 'product' && isSupport">{{userInfo.storeName}}</a>
						<a v-if="fromType == 'product' && !isSupport" class="nosupport" href="javascript:">{{userInfo.storeName}}</a>
						<a v-link="{name:'store'}" v-if="!fromType">{{userInfo.storeName}}</a>
					</span>
				</div>

				<div class="opencity">
					<dl v-for="open in openStore">

						<dt class="first-letter">{{open.firstLetter}}</dt>

						<dd v-for="item in open.storeList"  @click="setLocalStorage(item.isSupport,item.name,item.areaId,item.address,item.areaName,item.latitude,item.longitude,item.provinceName)">
								<a  v-if="fromType == 'rushEnr'" v-link="{name:'rushEnr'}">{{item.name}}</a>
								<a  v-if="item.isSupport &&  fromType == 'product'" v-link="{name:'product',query:{'id':carGoodsId}}">{{item.name}}</a>
								<a  v-if="!item.isSupport &&  fromType == 'product'"  class = "nosupport" href="javascript:">{{item.name}}</a>
								<a  v-if="!fromType" v-link="{name:'store'}">{{item.name}}</a>
						</dd>
					</dl>
				</div>

					<div  v-if="comeSoonStore.length>=1" class="soon">
						<dl class="opensoon">
							<dt>即将开通</dt>
							<dd v-for="item2 in comeSoonStore">
								<h5  v-for="item3 in item2.storeList">
									<a href="javascript:">{{item3.fullName}}</a>
								</h5>
							</dd>
						</dl>
					</div>

					<div class="bottips">
						<p>要买车将继续开通其他城市，敬请期待！</p>
					</div>
					<div class="pop_wrap">
						<div class="fixpop">
							<div class="fixpop-main">
								<div id="fixnav" v-el:fixnav>
									<ul>
										<li v-for="open in openStore"  @click="gotoScrollTop($index)">{{open.firstLetter}}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	//props: ['父组建传的值'],
	data:function(){

		return {
			hotStore		:'',//热门门店
			openStore		:'',//已开通门店
			comeSoonStore	:'',//即将开通门店
			fromType        :'',//选择交互中心后返回
			hasStore        :false,//是否有当前选择交互中心
			userInfo:{
			},
			arrPageY        : [],
			carGoodsId      :'',//从详情页带过来的SKU,
			isSupport       :false,
		}
	},
	//这里才是route的生存周期
	route:{

		data: function(transition) {
			var _this = this;
			_this.userInfo = JSON.parse(YMC.local('userCity')) || {};
			_this.hasStore = _this.userInfo.saveStore;
			_this.fromType = _this.$route.query.from;

			_this.carGoodsId = _this.$route.query.id;
			_this.loadData();
			transition.next()
		}
	},
	methods:{
		loadData:function(){
			var _this = this;
			YMC.ajax({
				url: 'Products/Store/GetAllStoreList',
				showLoading: true,
				data:{carGoodsId:_this.carGoodsId},
				success:function(res){
					if(res.success &&res.result){
						_this.openStore = res.result.actionList;
						var openStore = _this.openStore;
						var userInfo = _this.userInfo;
						for(var i in openStore){
							for(var j=0;j<openStore[i].storeList.length;j++){
								if(openStore[i].storeList[j].name == userInfo.storeName){
									if(openStore[i].storeList[j].isSupport){
										_this.isSupport = true
									}else{
										_this.isSupport = false;
									}
								}
							}
						}

						_this.hotStore = res.result.hotList;
						_this.comeSoonStore  = res.result.noActionList;
						_this.$nextTick(function(){

							// setTimeout(function(){
							// 	var fixnav = document.getElementById('fixnav');
							// 	$(".first-letter").each(function(index, el) {
							// 		_this.arrPageY.push($(this).offset().top);
							// 	});
							// 	_this.slideNav(fixnav);
							// },400)

						})

					}else{
						VUI.alert(res.error.message,1500);
					}
				},
				error:function(xhr){
					VUI.alert("网络连接失败,请稍后再试!",1500);
				}
			})
		},
		setLocalStorage:function(isSupport,storeName,areaId,address,areaName,latitude,longitude,province){
			var _this = this;
			if(!isSupport){
				VUI.alert('该车不在此区域销售',1500);
				return false;
			}

			if(areaName.split("市").length>1){
				areaName = areaName.split("市")[0];
			}
			var userInfo = _this.userInfo;

			userInfo.storeName = storeName;
			userInfo.cityId = areaId;
			userInfo.storeAddress = address;
			userInfo.storeCity = areaName;
			userInfo.localCity = areaName;
			userInfo.selectStore = true;
			userInfo.saveStore = true;//保存当前选择交互中心
			/**
			 * Date:2016年1月28日17:34:30
			 * Writer:weijing
			 * For : 选择交互中心,更改首页交互中心信息
			 */
			router.app.cityId = areaId;
			router.app.cityTit = areaName;
			router.app.storeInfo={
				storeName:storeName,
				storeAddress:address
			}

			YMC.local('userCity',JSON.stringify(userInfo));
		},
		selectCur:function(){
			if(!this.isSupport){
				VUI.alert('该车不在此区域销售',1500);
				return false;
			}
			this.userInfo.selectStore = true;
			YMC.local('userCity',JSON.stringify(this.userInfo));
		},
		slideNav:function(ele){
			var nav = $(this.$els['fixnav']);
			function autoLineheight(){
				var winH = ($(window).height()-50)/2+100;
				nav.find('li').css({"height":winH/nav.find('li').length});

			}
			autoLineheight();
			$(window).resize(function(event) {
				autoLineheight();
			});
			ele.addEventListener("touchstart", this.handleTouchEvent, false);
			ele.addEventListener("touchend", this.handleTouchEvent, false);
			ele.addEventListener("touchmove", this.handleTouchEvent, false);
		},
		handleTouchEvent:function(event){
			var _this = this;
			var strArr = [];//用于存储右侧字母的位置

			var nav = $(this.$els['fixnav']);
			var totalN = nav.find('li').length;
			nav.find('li').each(function(index, el) {
				strArr.push($(this).offset().top);
			});
			var w = $(window).width();
			var winh = $(window).height();
			if(event.touches){
				switch (event.type) {
				case "touchstart":
				    break;
				case "touchend":
				   // event.preventDefault(); //阻止滚动
				    break;
				case "touchmove":
					event.preventDefault(); //阻止滚动
					var pageY = event.touches[0].pageY;
					var cliX = event.touches[0].clientY+60;
					var x = event.changedTouches[0].pageX;
					//超出ul外 就不执行

					if (pageY < 80 || w - x > 40 || cliX > winh) {
					    return false;
					}

					//当前滑动的位置,计算出是第几个索引值
					for(var i=0;i<=strArr.length;i++){

						if(strArr[i]>pageY){
							_this.gotoScrollTop(i);
							return;
						}
					}
					break;
				}
			}
		},
		gotoScrollTop:function(idx){
			// if(router.app.isCarmaster){
			// 	$(window).scrollTop(this.arrPageY[idx]);
			// }else{
			// 	$(window).scrollTop(this.arrPageY[idx]-50);
			// }

		}
	}
}
</script>

<style>
.user-city{
	border-bottom: 1px solid #e5e5e5;
	padding:0 14px;
	height: 38px;
	line-height: 38px;
	color: #444;
}
.city-data .cur-local{
	padding: 0 0 15px 16px;
	color: #031e34;
}
.city-data .cur-local h5{
	font-size: 0.8rem;
	padding:10px 0 ;
}
.city-data .cur-local span{
	padding:0 13px;
	background-color: #f7cf15;
	display:inline-block;
	line-height: 26px;
	border-radius: 5px;
	font-size: 0.9rem;
}
.city-data .cur-local span.nosupport{
	background-color: #eee;
}
.city-data dt{
	background-color: #e4e4e4;
	height: 26px;
	line-height: 26px;
	color: #031e34;
	padding: 0 0 0 15px;
	font-size: 0.8rem;
}
.city-data  dd{
	line-height: 40px;
	padding: 0 0 0 15px;
	border-bottom: 1px solid #e4e4e4;
}
.city-data .opencity dd a{
	color: #031e34;
	font-size:0.9rem;
	display: block;
}
.city-data .opencity dd a.nosupport{
	color: #999;
}
.city-data  .opensoon dd{
	margin:0 0 0 20px;
	padding: 0;
}
.city-data .opensoon a{
	color:#999;
	font-size: 0.9rem;
}

/*滑动选择*/
.pop_wrap{
	position: fixed;
	z-index: 10000;
	right: 0;
	top: 0;
	width: 60px;
	height: 100%;
	overflow: hidden;
	display: table;
	display: none;
}
.fixpop{
	vertical-align: middle;
	display: table-cell;
}
.fixpop-main{
	position: relative;
	margin: 0 auto;
	width: 20px;
}
#fixnav{
    width:20px;
    padding:51px 10px 10px;
    text-align: center;
}
#fixnav ul li{
    color:#006afd;
	font-size: 0.8rem;
	font-weight: bold;
}


</style>