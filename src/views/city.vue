<template>
	<div id="city">
		<div id="city-wrap">
			<div id="local-wrap">
				<div class="list-city">
					<div id="proside" v-el:proside>
						<div id="province">
							<ul>
								<li v-for="province in provinceList"  data-id="{{province.id}}" @click.stop.prevent="selectPro($index)"  :class="{active:$index==proIndex || 0}" >
									{{province.name}}
								</li>
							</ul>
						</div>
					</div>
					<div id="cityside"  v-el:cityside>
						<div id="subcity">
							<ul>
								<li v-for="city in cityList" :class="{active:$index==cityIndex}" @click ="setData(city.latitude,city.longitude,city.name)">
									<a v-link="{name:'store'}">{{city.name}}</a>
								</li>
							</ul>
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
				provinceList			:{},//省份列表
				cityList				:{},//城市列表
				proIndex                :'',//当前省份索引
				cityIndex               :'',//当前城市索引
				curProvince				:'',//当前选择省份
				curCity                 :'',//当前市
				myScroll                :null,//
				myScroll2               :null,//
				cfg						:{ probeType: 3, mouseWheel: true,click:YMC.iScrollClick},
				userInfo:{
				}
			}
		},
		//这里才是route的生存周期
		route:{
			data: function(transition) {
				var _this = this;
				if(_this.provinceList.length){
					_this.srcollPage();
				}
				_this.userInfo = JSON.parse(YMC.local('userCity')) || {};

				this.loadData();
				transition.next();
			}
		},
		methods:{
			loadData:function(){
				var _this = this;
				YMC.ajax({
					url: 'Core/Region/GetProvinceListOrderByName',
					showLoading:true,
					success:function(res){
							_this.provinceList = res.result;
					},
					complete:function(){
						setTimeout(function(){
							_this.srcollPage();
							if(!_this.myScroll2){
								_this.myScroll2 = new IScroll(_this.$els.cityside, _this.cfg);
							}
							_this.myScroll.refresh();
							_this.myScroll2.refresh();
						},400)
					}
				})
			},
			selectPro:function(index){
				var _this = this;
				_this.proIndex = index;
				_this.cityIndex = "0";
				_this.curProvince = _this.provinceList[index].name;
				_this.cityList = _this.provinceList[index].citys;
				_this.$nextTick(function(){
					_this.myScroll2.refresh();
				});
			},
			setData:function(latitude,longitude,cardCity){

				var userInfo = this.userInfo;
				if(cardCity.split("市").length>0){
					userInfo.cardCity = cardCity.split("市")[0];
				}else{
					userInfo.cardCity = cardCity;
				}
				userInfo.selectStore = false;
				userInfo = this.userInfo;
				userInfo.selectCity = true;
				userInfo.lat = latitude;
				userInfo.lng = longitude;
				userInfo.province = this.curProvince || this.provinceList[0].name;
				YMC.local('userCity',JSON.stringify(userInfo));

			},
			srcollPage:function(){
				var _this = this;
				/**
				 * 通过url中的参数,找对对应省份以及城市的索引
				 * 根据找到的索引,将对应的省份和城市高亮并将对应高亮位置显示在可视区域内
				 */

				 _this.curProvince = _this.$route.query.province;
				 _this.curCity   = _this.$route.query.city;
				 var regPro = new RegExp(_this.curProvince);
				 var regCity = new RegExp(_this.curCity);

				if( !_this.curProvince ){
					_this.cityList = _this.provinceList[0].citys;

				}else{
					for(var i in _this.provinceList){
						if(regPro.test(_this.provinceList[i].name)){
							_this.proIndex = parseInt(i);
						}
					}
					_this.cityList = _this.provinceList[_this.proIndex].citys;
					for(var j in _this.cityList){
						if(regCity.test(_this.cityList[j].name)){
							_this.cityIndex = parseInt(j);
						}
					}
				}

				setTimeout(function(){
					var proIndex = _this.proIndex + 1;
					var cityIndex = _this.cityIndex + 1;
					if(_this.proIndex!=""){
						_this.myScroll.scrollToElement(document.querySelector("#province li:nth-child(" + proIndex+ ")"),'0s');
						if( cityIndex > 0){
						_this.myScroll2.scrollToElement(document.querySelector("#subcity li:nth-child(" + cityIndex + ")"),'0s');
						}
					}
				},650);
			}
		},
		ready:function(){

			this.myScroll = new IScroll(this.$els.proside, this.cfg);
		},
		watch:{
			myScroll:function(val){
				var _this = this;
				if(val){
					setTimeout(function(){
						_this.myScroll.refresh();
					},100);
				}
			},
			myScroll2 : function(val){
				var _this = this;
				if(val){
					setTimeout(function(){
						_this.myScroll2.refresh();
					},100);
				}
			}
		}
	}
</script>

<style>
	/*****所有省份城市****/
	#city-wrap{
		width: 100%;
		background-color: #fff;
		color: #444;
		text-align: center;
	}

	#city{
		height: 100%;
		position: relative;
	}

	#city-wrap .list-city{
		background-color: #fff;
		overflow:hidden;
		position: absolute;
		width:100%;
		height: 100%;
		left: 0;
		top: 0;
		bottom: 0;
	}


	#city-wrap .list-city li{
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #e5e5e5;
	}
	#province li{
		background-color: #f2f2f2;
	}
	#city-wrap .subcity{
		width: 50%;
		float: left;
	}
	#subcity a{
		display: block;
		height: 50px;
		width: 100%;
	}
	#province  li.active{
		background-color: #fff;
		transition:all ease .5s;
	}
	#subcity  li{
		opacity: 1;
		-webkit-animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
		-moz-animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
		-ms-animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
		animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
	}

	#subcity  li.active{
		background-color: #f2f2f2;
		transition:all ease .5s;
	}

	#province,#subcity{
		border-top: 1px solid #e5e5e5;
	}
	/*城市优化*/
	#proside,#cityside {
		position: absolute;
		z-index: 1;
		top: 50px;
		bottom: 0;
		width: 50%;
		overflow: hidden;
	}

	#proside{
		left: 0;
		border-right:1px solid #e5e5e5;
		box-sizing:border-box;
	}
	#cityside{
		right: 0;
	}

	#scroller,#scroller2 {
		position: absolute;
		z-index: 1;
		-webkit-tap-highlight-color: rgba(0,0,0,0);
		width: 100%;
		left: 0;
		-webkit-transform: translateZ(0);
		-moz-transform: translateZ(0);
		-ms-transform: translateZ(0);
		-o-transform: translateZ(0);
		transform: translateZ(0);
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-text-size-adjust: none;
		-moz-text-size-adjust: none;
		-ms-text-size-adjust: none;
		-o-text-size-adjust: none;
		text-size-adjust: none;
	}
</style>