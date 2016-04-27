<template>
<div class="rushpage">
	<div class="mainautow mainhd">
		<!-- 微信分享logo S-->
		<img src="http://m.yaomaiche.com/activity/images/Flashsales/flashsales.jpg" style="width:0px;height:0px;overflow:hidden;display:block;">
		<!-- 微信分享logo E-->
		<template v-if="nodeCode>0&&nodeCode<4">
			<div class="rush-note" v-if="flagObj.isRushNoteSpec">{{{flagObj.comment}}}<i class="ir-close" @click.stop="flagObj.isRushNoteSpec=false"></i></div>
			<div class="rush-status-wrap">
				<div class="rush-status">
					<div class="rush-status-txt" v-if="nodeCode==1">报名时间<br/>{{nodeTime.enrStart}} ~ {{nodeTime.enrEnd}}</div>
					<div class="rush-status-txt" v-if="nodeCode==2">离闪购开始：<span class="countdown">{{{countdownTime | countdown 2}}}</span></div>
					<div class="rush-status-txt" v-if="nodeCode==3">闪购活动进行中</div>
				</div>
			</div>
			<div class="car_logo_outer_wrap">
				<div id="carlogo" class="car_logo_outer" :class="{'car_logo_fix': flagObj.isCarLogoFix}">
					<div class="car_logo_wrap-view">
						<div class="car_logo_wrap swiper-wrapper">
							<ul class="car_logo_sec swiper-slide" v-if="brandList.length" v-for="brandGroup in brandList">
								<li v-for="it in brandGroup" class="car_logo" :class="{'car_logo-on':ajaxDat.CarBrandId==it.carBrandId}" ubt="brand_{{it.carBrandId}}" gsq="brand_{{it.carBrandId}}" gsqName="brand_{{it.carBrandName}}" @click="brandToCarListRender(it)">
									<img :src="it.carBrandLogoUrl | imgUrl" title="{{it.carBrandName}}" class="car_img" />
								</li>
							</ul>
							<!-- <p class="tc" style="line-height:100px;color:#fff;" v-else>暂无数据。。。</p> -->
						</div>
						<a href="javascript:;" class="rush-logo-arr rush-logo-arr-prev"></a>
						<a href="javascript:;" class="rush-logo-arr rush-logo-arr-next"></a>
					</div>
				</div>
			</div>
			<div class="car_list act-car">
				<div class="rush-txt-panel" v-if="nodeCode==1||nodeCode==2">{{rushBeginTime}}开始闪购</div>
				<!-- <div class="btm-hd">
					<span class="fs12">闪购时间：{{rushBeginTime}}</span>
					<a ubt="actRules" class="btm-hd-more" v-link="{name: 'rush-rule', replace: true}">活动细则 &gt;</a>
				</div> -->
				<div class="act-con">
					<template v-if="items.length">
						<ul>
							<li class="act-prodinfo" v-for="it in items">
								<a class="act-prodinfo-link" v-link="{name:'product', query:{id:it.carGoodsId}}" gsq="{{it.carGoodsId}}" gsqName="{{it.carGoodsTitle}}">
									<div class="act-sec-left"><img class="act-prod-img" :src="it.picUrl | imgUrl" /></div>
									<div class="act-sec-main">
										<h2 class="act-cartitle act-cartitle-singline">{{it.carBrandName}} {{it.carGoodsTitle}}</h2>
										<div class="act-cardecor">
											<div class="act-enrollment" v-if="nodeCode==1&&it.isEnrollingFull">报名人数已满</div>
											<template v-if="nodeCode==1&&(!it.isEnrollingFull)">
												<div class="act-enrollment" v-if="it.attendeesCount"><i class="act-enr-num">{{it.attendeesCount}}</i>人报名</div>
												<div class="act-enrollment" v-else>暂无人报名</div>
											</template>
											外<i class="icar-color" :style="{backgroundColor:it.externalRGB}"></i>内<i class="icar-color" :style="{background: '-webkit-linear-gradient(left, '+it.internalRGB.split('/')[0]+' 50%, '+it.internalRGB.split('/')[1]+' 50%)'}" v-if="it.internalRGB&&~it.internalRGB.indexOf('/')"></i><i class="icar-color" :style="{backgroundColor:it.internalRGB}" v-else></i>
										</div>
										<p class="c4">市场指导价：<del><i>{{it.officialPrice | priceW}}</i>万元</del></p>
									</div>
									<ol class="act-price-steps clearfix" v-if="it.tieredPriceList">
										<li class="act-price-step" :class="{'act-price-step2': (it.tieredPriceList.length-2)==0,'act-price-step3': (it.tieredPriceList.length-3)==0}" v-for="step in it.tieredPriceList">
											<p v-if="step.minBuyer">{{step.minBuyer}}人闪购价</p>
											<p v-else>1人闪购价</p>
											<div class="rush-price-wrap"><i class="rush-price">{{step.panicBuyingPrice | priceW}}</i>万元</div>
										</li>
									</ol>
									<ol class="act-price-steps act-price-steps-1" v-else>
										<li class="act-price-step">
											<p>闪购一口价</p>
											<div class="rush-price-wrap"><i class="rush-price">{{it.panicBuyingPrice | priceW}}</i>万元</div>
										</li>
									</ol>
								</a>
								<a class="act-btn act-btn-3" v-link="{name:'product', query:{id:it.carGoodsId}}" v-if="nodeCode==3&&it.salesCount" gsq="{{it.carGoodsId}}" gsqName="立即闪购">立即闪购</a>
								<a class="act-btn act-btn-2" @click.stop.prevent="actBtn('已抢完！')" v-if="nodeCode==3&&(!it.salesCount)">已抢完</a>
								<i class="ia ia-4" v-if="nodeCode==3&&(!it.salesCount)"></i>
								<a class="act-btn act-btn-2" v-if="nodeCode==2" @click.stop.prevent="actBtn('闪购还未开始！')">立即闪购</a>
								<a @click.stop.prevent="enrInfoToLS(ajaxDat.ActivityId,it.carGoodsId)" class="act-btn act-btn-1" v-if="nodeCode==1&&(!it.isEnrollingFull)" gsq="{{it.carGoodsId}}" gsqName="报名">立即报名</a>
								<a href="javascript:;" class="act-btn act-btn-2" @click.stop.prevent="actBtn('报名人数已满')" v-if="nodeCode==1&&it.isEnrollingFull">报名人数已满</a>
							</li>
						</ul>
						<div v-show="items.length>=totalCount">
							<div class="viewother mt10 tc">已无更多车型</div>
						</div>
						<div class="viewother mt10 tc" v-else><i class="i-load20"></i>&nbsp;正在加载更多车型</div>
					</template>
					<div class="viewother tc" v-else>
						<a v-link="{name: 'home'}">暂无活动车型，去首页看看吧！</a>
					</div>
				</div>
			</div>
		</template>
		<div class="viewother tc" v-if="nodeCode==0">
			<a v-link="{name: 'home'}">闪购活动还未开始，去首页看看吧！</a>
		</div>
		<a class="ico-myrush ico-myrush-2" :class="{'fix-ico-rush':flagObj.isIcoFixed}" v-if="flagObj.rushIco" v-link="{name:'rushUsrCenter'}"></a>
		<a v-link="{name:'rushUsrCenter'}" class="ico-myrush fl-ico-rush" :class="{'fix-ico-rush':flagObj.isIcoFixed}" v-if="flagObj.rushIcoTxt">我的闪购</a>
	</div>
</div>
</template>
<script>
require('../../node_modules/swiper/dist/css/swiper.min.css');
var Swiper = require('swiper');

module.exports = {
	data: function(){
		return {
			brandList: [],
			items: [],
			nodeCode: null,
			nodeTime: {},
			rushBeginTime: null,
			totalCount: 0,
			countdownTime: 0,
			ajaxDat: {
				"cityId": router.app.cityId,
		        "CarBrandId": "",
		        "ActivityId": "",
		        "PageSize": 10,
		        "PageIndex": 1
		    },
		    scrollEle: {},
		    rushTypeName: '--',
		    rushTypeDat: null,
		    categoryId: null,
			flagObj: {
				isPageIndexInc: false,
				scrollFlag: false,
				isPageBottom: false,
			    isRushNoteSpec: false,
			    comment: null,
			    isCarLogoFix: false,
			    isOptShow: false,
			    isIcoFixed: false,
			    rushCenterEnable: false,
			    rushIco: false,
			    rushIcoTxt: false
			}
		}
	},
	route: {
		data: function(){
			this.rushType();
		},
		deactivate: function(){
			var _this = this;
			_this.dataClear();
		}
	},
	ready: function(){
	},
	methods: {
		dataClear: function(){
			var _this = this;

			_this.brandList = [];
			_this.items = [];
			_this.nodeCode = null;
			_this.nodeTime = {};
			_this.rushBeginTime = null;
			_this.totalCount = 0;
			_this.countdownTime = 0;
			_this.ajaxDat = {
		        "cityId": router.app.cityId,
		        "CarBrandId": "",
		        "ActivityId": "",
		        "PageSize": 10,
		        "PageIndex": 1
		    };
		    _this.scrollEle = {};
		    _this.rushTypeDat = null;
		    _this.categoryId = null;
			_this.flagObj = {
				isPageIndexInc: false,
				scrollFlag: false,
				isPageBottom: false,
			    isRushNoteSpec: false,
			    comment: null,
			    isCarLogoFix: false,
			    isOptShow: false,
			    isIcoFixed: false,
			    rushCenterEnable: false,
			    rushIco: false,
			    rushIcoTxt: false
			};

			// 清除定时器
			clearInterval(_this.rushCtdFlag);
        	clearInterval(_this.scrollFnFlag);
        	clearTimeout(_this.timeRushIcoTxt);

        	// 清除滚动事件
        	$(document).off("scroll",_this.scrollHandle);
		},
		mySwiper: function(){
			var _this = this;

			new Swiper('.rushpage .car_logo_wrap-view',{
				// loop: _this.brandList.length-1,
				// loopedSlides:_this.brandList.length,
				prevButton:'.rushpage .rush-logo-arr-prev',
				nextButton:'.rushpage .rush-logo-arr-next'
			});
		},
	    rushType: function(){
	    	var _this = this;

	    	// 数据重置
	    	_this.dataClear();

			setTimeout(function(){
				// window.scrollTo(0,1);
				_this.$set('flagObj["rushIco"]', true);
				_this.$set('flagObj["rushIcoTxt"]', true);
				_this.$set('flagObj["isIcoFixed"]', true);
			}, 800);

			_this.timeRushIcoTxt = setTimeout(function(){
				// _this.flagObj.rushIco = true;
				_this.$set('flagObj["rushIcoTxt"]', false);
			},5000);



	    	var urlParams = _this.$route.query,
				rushParams = JSON.parse(YMC.local('rushParams')),
	    		ajxDat = {
					// CategoryId: (urlParams&&urlParams.cateId) || (rushParams&&rushParams.CategoryId),
					CategoryId: urlParams&&urlParams.cateId,
					CurrentActivityId: urlParams&&urlParams.id
				};

				if((!ajxDat.CategoryId)&&(!ajxDat.CurrentActivityId)){
					ajxDat.CategoryId = rushParams&&rushParams.CategoryId;
				}

			// if(ajxDat.CategoryId){
			// 	YMC.local('rushParams', ajxDat);
			// 	_this.categoryId = ajxDat.CategoryId;
			// }else{
			// 	VUI.alert("闪购活动获取失败，请重新选择", 1500, function(){
			// 		router.go({
			// 			name: 'home'
			// 		});
			// 	});
			// 	return false;
			// }

			// if(!ajxDat.CurrentActivityId){
			// 	if(rushParams&&rushParams.CategoryId==ajxDat.CategoryId){
			// 		ajxDat.CurrentActivityId = rushParams.CurrentActivityId
			// 	}else{
			// 		ajxDat.CurrentActivityId = '';
			// 	}
			// }

			// // a34b3a9b-dbac-4472-9c1c-a58e00a7b05f
			// YMC.ajax({
	  //   		data: ajxDat,
	  //   		url: 'Marketing/PanicBuyingCategory/GetPanicBuyingCategoryWithActivitySchedule',
	  //   		success: function(res){
	  //   			if(res.success&&res.result&&JSON.stringify(res.result)!='{}'){
	  //   				_this.ajaxDat.ActivityId = res.result.currentActivityId;
	  //   				_this.rushTypeDat = res.result;

	  //   				res.result.categoryList.forEach(function(v){
	  //   					if(v.isSelected){
	  //   						_this.rushTypeName = v.name;
	  //   						return
	  //   					}
	  //   				})
	  //   				// 获取当前活动信息
	  //   				_this.getActInfo();
	  //   			}
	  //   		}
	  //   	});

			// new
			if(ajxDat.CategoryId){
				YMC.local('rushParams', ajxDat);
				_this.categoryId = ajxDat.CategoryId;

				if(!ajxDat.CurrentActivityId){
					if(rushParams&&rushParams.CategoryId==ajxDat.CategoryId){
						ajxDat.CurrentActivityId = rushParams.CurrentActivityId
					}else{
						ajxDat.CurrentActivityId = '';
					}
				}

				// 请求活动类型数据
				YMC.ajax({
		    		data: ajxDat,
		    		url: 'Marketing/PanicBuyingCategory/GetPanicBuyingCategoryWithActivitySchedule',
		    		success: function(res){
		    			if(res.success&&res.result&&JSON.stringify(res.result)!='{}'){
		    				_this.ajaxDat.ActivityId = res.result.currentActivityId;
		    				_this.rushTypeDat = res.result;

		    				res.result.categoryList.forEach(function(v){
		    					if(v.isSelected){
		    						_this.rushTypeName = v.name;
		    						return
		    					}
		    				})
		    				router.app.$dispatch('updateTitle',_this.rushTypeName+'<a href="#/rush-rule/" class="rush-nav-link">活动细则</a>');
		    				// 获取当前活动信息
		    				_this.getActInfo();
		    			}
		    		},
		    		error: function(){
		    			VUI.alert('网络连接失败，请稍后再试。',1500, function(){
		    				router.go({
		    					name: 'home'
		    				})
		    			});
		    		}
		    	});
			}else{
				if(!ajxDat.CurrentActivityId){
					if(rushParams&&rushParams.CurrentActivityId){
						_this.ajaxDat.ActivityId = rushParams.CurrentActivityId;
						_this.getActInfo();
					}else{
						VUI.alert("闪购活动获取失败，请重新选择", 1500, function(){
							router.go({
								name: 'home'
							});
						});
						return false;
					}
				}else{
					_this.ajaxDat.ActivityId = ajxDat.CurrentActivityId;
					YMC.local('rushParams', ajxDat);
					_this.getActInfo();
				}
			}

	    },
		getActInfo: function(){
			var _this = this;

			// 参数重置
			_this.ajaxDat.CarBrandId = '';
			_this.ajaxDat.PageIndex = 1;
			_this.brandList = [];
			_this.flagObj.isPageIndexInc = false;
			_this.items = [];

			YMC.ajax({
				// data: _this.ajaxDat,
				data: {activityId: _this.ajaxDat.ActivityId, cityId: router.app.cityId},
				url: "Marketing/PanicBuyingActivity/GetPanicBuyingActivity",
				success: function(res){
					if(res.success&&res.result){
						var dat = res.result;

						var tmpArr = dat.brandList,
							groupNum = 10;

						// 活动节点信息
						_this.nodeCode = dat.currentActivityNode.nodeCode;
						_this.nodeTime = {
							enrStart: dat.currentActivityNode.beginDate,
							enrEnd: dat.currentActivityNode.endDate,
							actStart: dat.currentActivityNode.panicBeginDate
						};
						_this.rushBeginTime = dat.currentActivityNode&&dat.currentActivityNode.keyNode&&dat.currentActivityNode.keyNode.beginDate;

						if(_this.nodeTime.enrStart&&_this.nodeTime.enrStart.indexOf(' ')>-1){
							_this.nodeTime.enrStart = _this.nodeTime.enrStart.split(/\s+/g)[0]
						}

						if(_this.nodeTime.enrEnd&&_this.nodeTime.enrEnd.indexOf(' ')>-1){
							_this.nodeTime.enrEnd = _this.nodeTime.enrEnd.split(/\s+/g)[0]
						}


						// 品牌分为groupNum个一组
						while(tmpArr.length&&tmpArr.length>groupNum){
							_this.brandList.push(tmpArr.splice(0,groupNum))
						}
						_this.brandList.push(tmpArr);

						// 车logo组件
						// Vue.nextTick(_this.mySwiper);
						setTimeout(_this.mySwiper,1000);
						// _this.flagObj.isIcoFixed = true;

						// document.title = dat.activityName?(dat.activityName+' - 要买车网'):'要买车网 - 让买车更轻松';
						// 头部文字设置
						if(!_this.categoryId){
							router.app.$dispatch('updateTitle',dat.activityName||'闪购车型');
						}

						// 滚动常量
						_this.scrollEle.hdHeight = $('header.hd').height();

						// 滚动事件
						$(document).on("scroll", _this.scrollHandle);
						_this.scrollFn();

						_this.ajaxDat.ActivityId = dat.activityId;

						// 特殊时期的闪购文案
						if(dat.comment){
							_this.flagObj.isRushNoteSpec = true;
							_this.flagObj.comment = dat.comment;
						}
//						if(dat.activityId=='64912e28-f1b2-416c-8aed-a57c00ef3d1b'){
//							_this.flagObj.isRushNoteSpec = true;
//						}

						// 活动倒计时
						if(dat.currentActivityNode.nodeCode==2){
							if(parseInt(dat.currentActivityNode.remainingTime)>0){
	                            _this.countdownTime = parseInt(dat.currentActivityNode.remainingTime);
	                        }
                            _this.rushCtdFlag = setInterval(_this.countdown, 1000);
                        }else if(dat.currentActivityNode.nodeCode==4){
                        	if(_this.rushTypeDat&&_this.rushTypeDat.nextActivityId){
                        		router.go({
                        			name: 'rush',
                        			query: {
                        				id:_this.rushTypeDat.nextActivityId,
                        				cateId:_this.categoryId
                        			}
                        		});
                        	}else{
                        		VUI.alert("活动已结束，去首页看看吧",1500, function(){
                        			router.go({
                        				name: 'home'
                        			});
                        		});
                        	}
                        }
						// 活动车型列表渲染
						_this.carListRender();
                        // 活动类型列表
                        // _this.rushType();
					}else{
						VUI.alert(res.error.message, 1500, function(){
							router.go({
								name: 'home'
							});
						});
					}
				},
	            showLoading: true
			})
		},
		carListRender: function(){
			var _this = this;

	        if(_this.flagObj.isPageIndexInc){
	            _this.ajaxDat.PageIndex += 1;
	        }else{
	            _this.ajaxDat.PageIndex = 1;
	        }
	        YMC.ajax({
	            data: _this.ajaxDat,
	            url: "Marketing/PanicBuyingActivity/GetPanicBuyingCarGoodsListQuery",
	            success: function(res){
	                if(res.success&&res.result){
	                	var dat = res.result;
	                    if(dat.items.length){
	                        if(_this.flagObj.isPageIndexInc){
	                            dat.items.forEach(function(v){
	                            	_this.items.push(v);
	                            });
	                        }else{
	                            _this.items = dat.items;
	                        }

	                        _this.flagObj.isPageIndexInc = true;
	                        _this.totalCount = dat.totalCount;

							// 加载文案
							// if(_this.$els.txtMoreData){
							// 	_this.$els.txtMoreData.textContent='上滑加载更多车型';
							// }

	                        // 加载更多按钮
	                        if(_this.items.length>=_this.totalCount){
	                            _this.flagObj.isPageBottom = false;
	                        }else{
	                            _this.flagObj.isPageBottom = true;
	                        }
	                    }
	                }
	            },
	            error: function(){
	                VUI.alert("网络连接失败，请稍后再试。", 1500);
	            }
	        });
	    },
	    scrollHandle: function(){
	    	var _this = this;

	    	_this.flagObj.scrollFlag = true;
	    },
	    infiniteScroll: function(){
    		var _this = this;

	    	if(_this.flagObj.scrollFlag){
		    	_this.flagObj.scrollFlag = false;

		    	var mainHeight = $(".rushpage").height(),
	                pageHeight = $("body").height(),
	                scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
	                listBot = $('.car_logo_outer_wrap').offset(),
		            fixStart = listBot.top - _this.scrollEle.hdHeight;

	            if(scrollTop <= fixStart){
	                _this.flagObj.isCarLogoFix = false;
	            }else{
	                _this.flagObj.isCarLogoFix = true;
	            }

	            // 悬浮“我的闪购”icon
	            // if(scrollTop){
	            // 	_this.flagObj.isIcoFixed = true;
	            // }else{
	            // 	_this.flagObj.isIcoFixed = false;
	            // }

	            // if((mainHeight - scrollTop + pageHeight) >= 600){
            	// console.log(scrollTop + pageHeight - mainHeight);
	            // }
	            var itemHeight = 300,
	            	ajaxLen = 3*itemHeight;
	            if(_this.flagObj.isPageBottom&&(mainHeight - scrollTop - pageHeight) <= ajaxLen) {
	                _this.flagObj.isPageBottom = false;

	                // setTimeout(function() {
		               //  _this.$els.txtMoreData.textContent='正在加载更多车型';
	                //     _this.carListRender();
	                // }, 300);
					// _this.$els.txtMoreData.textContent='正在加载更多车型';
                    _this.carListRender();
	            }

	            // if(_this.flagObj.isPageBottom&&scrollTop + pageHeight >= mainHeight) {
	            //     _this.flagObj.isPageBottom = false;

	            //     setTimeout(function() {
		           //      _this.$els.txtMoreData.textContent='正在加载更多车型';
	            //         _this.carListRender();
	            //     }, 300);
	            // }
	    	}
	    },
	    scrollFn: function(){
	    	var _this = this;
	    	_this.scrollFnFlag = setInterval(_this.infiniteScroll,200);
	    },
	    brandToCarListRender: function(targ){
	        var _this = this;

	        _this.ajaxDat.CarBrandId = targ.carBrandId;
	        _this.ajaxDat.PageIndex = 1;
	        _this.flagObj.isPageIndexInc = false,

	        _this.carListRender();
	        window.scrollTo(0,0);
	    },
	    countdown: function(){
	    	var _this = this;
	        if(_this.countdownTime>0){
	            _this.countdownTime -= 1;
            }else{
            	clearInterval(_this.rushCtdFlag);
                // if(_this.nodeCode==3){
                // 	_this.nodeCode +=1;
                // }else{
                //     _this.flagObj.isPageIndexInc = false;
                //     _this.getActInfo();
                // }
                _this.getActInfo();
            }
	    },
	    actBtn: function(txt){
	    	VUI.alert(txt, 1500);
	    },
	    // goRushCenter: function(){
	    // 	router.go({
	    // 		name: 'rushUsrCenter'
	    // 	})
	    // },
	    optEv: function(it){
	    	var _this = this;
	    	// _this.$els.rushTypeName.textContent = it.name;
	    	_this.rushTypeName = it.name;
	    	_this.flagObj.isOptShow = false;

	    	// _this.dataClear();
	    	// 新活动请求数据
	    	router.replace({
	    		name: 'rush',
	    		query: {
	    			cateId: it.id
	    		}
	    	});
	    },
	    enrInfoToLS: function(actId, id){
	    	var rushInfo = {
	    		activityId: actId,
	    		panicBuyingCarGoodsId: id
	    	}

	    	YMC.local('rushInfo', rushInfo);

	    	router.go({
	    		name: 'rushEnr',
	    		query: rushInfo
	    	});
	    }
	},
    detached: function(){
  //   	var _this = this;
  //       // reset data
		// _this.dataClear();
    }
}
</script>
<style src="../css/rush.css"></style>
<style>
.hd .pagetitle .rush-nav-link{position: absolute;top:0;bottom: 0;right: 0;width: auto;padding:0 8px;color: #ffba00;font-size: 12px;}
.rushpage .hd{z-index:1000;left:50px;right:50px;width: auto;box-sizing:border-box;background-color: #2a2d33;}
.rushpage .hd.hd-on{left: 0;right:0;width:100%;}
.rushpage .hd .rush-act-next{position: absolute;right: -50px;top:0;bottom: 0;width: auto;padding:0 12px;color: #ffba01;font-size: 12px;line-height:50px;background-color: #2a2d33;}
.rushpage .hd .rush-act-next:active{opacity: .5;}
.rushpage .hd .rush-actname{position:relative;display: inline-block;height: 50px;line-height: 50px;/*font-size: 16px;*/overflow: hidden;}
/*.rushpage .hd .rush-actname::after{content:'';display: inline-block;width: 6px;height: 6px;margin-left:10px;margin-right:4px;border-top:2px solid #999;border-right:2px solid #999;vertical-align: 2px;-webkit-transform:rotate(135deg);transform:rotate(135deg);}
.rushpage .hd-on .rush-actname{z-index: 2;display: block;width: 100%;background-color: #2a2d33;}
.rushpage .hd-on .rush-actname::after{vertical-align: -2px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);}
.rushpage .hd-on .rush-actname::before{content:'取消';position:absolute;top:0;left: 0;padding:0 12px;bottom: 0;font-size: 12px;}*/
/*.rushpage .ico-myrush{z-index:99;position: fixed;left: 50%;top:80%;margin-left: -45px;width:90px;overflow: hidden;background: url(../imgs/ir-myrush.png) no-repeat;background-size: 90px 130px;}
.rushpage .fl-ico-rush{height:55px;margin-top:-55px;padding:10px 0 14px;color: #666;font-size: 13px;line-height: 31px;text-align: center;box-sizing:border-box;}*/
.rushpage .ico-myrush{z-index:99;position: absolute;left: 50%;bottom: 6px;margin-left: -45px;width:90px;overflow: hidden;background: url(../imgs/ir-myrush.png) no-repeat;background-size: 90px 130px;}
.rushpage .fl-ico-rush{height:55px;margin-bottom: 75px;padding:10px 0 14px;color: #666;font-size: 13px;line-height: 31px;text-align: center;box-sizing:border-box;}
.rushpage .ico-myrush-2{height: 75px;background-position: 0 -55px;}
.rushpage .fix-ico-rush{position: fixed;-webkit-animation:rushIcoFadeIn .5s ease-in 1 forwards;animation:rushIcoFadeIn .5s ease-in 1 forwards;}

/*.rushpage .click-iframe{z-index:9;position: fixed;left: 50%;bottom:60px;width: 90px;height: 130px;margin-left:-45px;overflow: hidden;}*/

.rushpage .click-mask{position: fixed;right:0;left: 0;bottom:0;width: 100%;height: 0;overflow: hidden;}
.rushpage .click-mask.click-mask-visible{overflow: visible;-webkit-animation:rushIcoFadeIn .3s ease-in 1 forwards;animation:rushIcoFadeIn .3s ease-in 1 forwards;}
.rushpage .click-mask .ico-myrush{z-index:99;position: absolute;left: 50%;top: -120px;margin-left: -45px;width:90px;overflow: hidden;background: url(../imgs/ir-myrush.png) no-repeat;background-size: 90px 130px;}
.rushpage .click-mask .fl-ico-rush{height:55px;margin-top: -55px;padding:10px 0 14px;color: #666;font-size: 13px;line-height: 31px;text-align: center;box-sizing:border-box;}
.rushpage .click-mask .ico-myrush-2{height: 75px;background-position: 0 -55px;}

.rushpage{background-color: #f0f0f0;}
.rushpage .rush-status-wrap{padding:0 10%;text-align: center;background-color: #e2493a;}
.rushpage .rush-status-wrap .rush-status{padding:12px 0;color: #fff;font-size: 14px;line-height: 20px;background: -webkit-linear-gradient(top, rgba(0,0,0,0) 49%, #bc3123 49%, #bc3123 51%, rgba(0,0,0,0) 51%);}
.rush-status-wrap .rush-status .rush-status-txt{display: inline-block;padding: 0 12px;color:#fff;background-color: #e2493a;}
.rushpage .rush-note{position: relative;padding:12px 40px 12px 12px;color: #999;font-size: 12px;background-color: #fffdea;line-height: 16px;}
.rushpage .rush-note .ir-close{position: absolute;right: 0;top:50%;width: 40px;height: 40px;margin-top:-20px;background:#fffdea url(../imgs/ir-close.png) center center no-repeat;background-size: 40px 40px;}
.rushpage .act-sec-main .act-enrollment{float: right;margin:0;}
.rushpage .act-enrollment .act-enr-num{color: #ffa320}
.rushpage .countdown i{width: auto;height: 24px;padding:0 4px;margin:0 4px;line-height: 24px;background:#2a2d33;letter-spacing:0;text-indent:0;border-radius: 2px;}
.rushpage .swiper-pagination{position: relative;bottom: 0;width:100%;}
.rushpage .my-rush .btm-hd.btm-hd-note{height: auto;padding:6px 0;line-height: 18px;}
.rush-logo-arr{z-index: 2;position: absolute;top:50%;width:20px;height: 20px;margin-top:-10px;background-color: #f4f4f4;/*background-color: #484b50;*/}
.rush-logo-arr:active::before {border-color: #2a2d33;}
.rush-logo-arr::before{content: '';position: absolute;top:50%;left: 50%;width: 8px;height: 8px;margin-top:-4px;/*border-top:2px solid #2a2d33;border-right:2px solid #2a2d33;*/border-top:2px solid #ccc;border-right:2px solid #ccc;}
.rush-logo-arr.rush-logo-arr-prev{left:0;}
.rush-logo-arr.rush-logo-arr-next{right:0;}
.rush-logo-arr.rush-logo-arr-prev::before{margin-left:-3px;-webkit-transform:rotate(-135deg);transform:rotate(-135deg);}
.rush-logo-arr.rush-logo-arr-next::before{margin-left:-6px;-webkit-transform:rotate(45deg);transform:rotate(45deg);}
.rushpage .rush-txt-panel,
.rushpage .go-rushrule{padding:12px 0;font-size: 14px;line-height: 20px;color: #999;}
.rushpage .rush-txt-panel{text-align: center;}
.rushpage .go-rushrule{position: relative;display: block;padding-left: 12px;margin-bottom: 15px;background-color: #fff}
.rushpage .go-rushrule::after{content:'';position: absolute;top:50%;right:12px;width: 6px;height: 6px;margin-top: -3px;border-top:2px solid #ccc;border-right:2px solid #ccc;-webkit-transform:rotate(45deg);transform:rotate(45deg);}

.rushpage .act-prodinfo .act-sec-left{top:15px;width: 40%;height: 110px;background-color: #fff;/*background-color: #F7F7F7;*/}
.rushpage .act-prodinfo .act-sec-main{min-height: 110px;margin-left: 42%;}
.rushpage .act-sec-main .act-cardecor{margin:10px 0;color:#040404}
.rushpage .act-con{border-top:none;}
.rushpage .act-con .act-prodinfo{padding: 15px 12px;}
.rushpage .icar-color{display: inline-block;width: 12px;height: 12px;margin-left: 6px;margin-right: 15px;border: 1px solid #ddd;border-radius:7px;vertical-align: -3px;}
.rushpage .act-price-steps{margin-top: 20px;}
.rushpage .act-price-steps.act-price-steps-1{text-align: center;border-left:1px solid #e4e4e4;border-right:1px solid #e4e4e4;background: -webkit-linear-gradient(top, rgba(0,0,0,0) 49%, #e4e4e4 49%, #e4e4e4 51%, rgba(0,0,0,0) 51%);}
.rushpage .act-price-steps li{width:auto;border:none;}
.rushpage .act-price-steps li + li{margin-left:0;border-left: 1px solid #e4e4e4;}
.rushpage .act-price-steps .act-price-step2{width: 50%;}
.rushpage .act-price-steps .act-price-step3{width: 33.3333%;}
.rushpage .act-price-steps-1 .act-price-step{float:none;display: inline-block;padding: 4px 20px 0;background-color: #fff;}
.rushpage .rush-price-wrap{margin-top: 8px;font-size: 12px;color: #333;}
.rushpage .rush-price-wrap .rush-price{font-size: 16px;color: #ffa320;}
.rushpage .act-prodinfo .act-prodinfo-link{padding-bottom: 10px;}
/*.rushpage .act-prodinfo .act-btn{margin-top: 20px;}*/
.rushpage .viewother{height: auto;line-height: 20px;}

.rushpage .hd-options{z-index: 998;position:fixed;left: 0;right: 0;top:50px;width: 100%;min-width: 320px;max-height: 300px;overflow: auto;background-color: #fff;box-sizing:border-box;-webkit-transition: -webkit-transform .3s ease;transition: -webkit-transform .3s ease,transform .3s ease;-webkit-transform:translateY(-100%);transform:translateY(-100%);}
.rushpage .hd-options.hd-options-on{-webkit-transform:translateY(0);transform:translateY(0);}
.rushpage .hd-options li{position: relative;padding: 12px 20px 12px 12px;font-size: 14px;color: #010101;line-height: 20px;}
.rushpage .hd-options li + li{border-top: 1px solid #f0f0f0;}
.rushpage .hd-options-mask{z-index: 900;position:fixed;top: 0;left: 0;right: 0;bottom: 0;display: none;width: 100%;height: 100%;opacity: 1;background-color: rgba(0,0,0,.5);opacity: 0;-webkit-transition: opacity .3s ease;transition: opacity .3s ease;}
.rushpage .hd-options-mask.hd-options-mask-on{display: table;opacity: 1;}
.rushpage .hd-options .hd-option-on::after{content:'';position: absolute;right: 12px;top:50%;width: 10px;height: 11px;margin-top:-5px;background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAMAAAD3n0w0AAAA51BMVEUAAAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xAD9xADn/PisAAAATHRSTlMA/FwQQfvxAf4E4uswGgmqBdkv0w6lGHLI58I9wZUidPOjkRmOTRssP1rXc4Tk6b5fu8bQ+W7vDJmQ9FgX2AukljKg6jpkzwJqA8ehjwK7GAAAAKhJREFUeNplkVUOAzEMBcvdMjMzMzPz3P885Wqb5GsysvxsWSM9u+0mudMVqyQPcBadfsfxIso1yl5K0bIVnbnLcC7KNgyklCY9iyizKDHReY1k3jSbjL4pUUzBN05ZfaQOQh8cg+4F/gi+b8pygSn5hDyK4dd+0yf8qCgZCahCU1DXmFuki+rdOmjLFaj9zZezYW1Qdf9PXVAAg7hLAlzSDZxxj0P1vQPRRxZI/WsChwAAAABJRU5ErkJggg==) no-repeat;background-size: 10px 11px;overflow: hidden;}
@-webkit-keyframes carlogo{
	0%{
		-webkit-transform: translate(0,-70px);
		-ms-transform: translate(0,-70px);
		-moz-transform: translate(0,-70px);
		transform: translate(0,-70px);
	}
	100%{
		-webkit-transform: translate(0,0);
		-ms-transform: translate(0,0);
		-moz-transform: translate(0,0);
		transform: translate(0,0);
	}
}
@keyframes carlogo{
	0%{
		-webkit-transform: translate(0,-70px);
		-ms-transform: translate(0,-70px);
		-moz-transform: translate(0,-70px);
		transform: translate(0,-70px);
	}
	100%{
		-webkit-transform: translate(0,0);
		-ms-transform: translate(0,0);
		-moz-transform: translate(0,0);
		transform: translate(0,0);
	}
}

@-webkit-keyframes rushIcoFadeIn{
	0%{
		position: absolute;
		opacity: 0;
	}
	100%{
		position: fixed;
		opacity: 1;
	}
}
@keyframes rushIcoFadeIn{
	0%{
		position: absolute;
		opacity: 0;
	}
	100%{
		position: fixed;
		opacity: 1;
	}
}

/*图片*/
/*.rushpage .act-sec-left .act-prod-img{position: relative;height: auto;max-height: 200%;top:-5%;}
@media screen and (min-width: 351px){
	.rush-status-wrap .rush-status .rush-status-txt{padding:0 15px;}
}
@media screen and (min-width: 351px) and (max-width: 380px){
	.rushpage .act-sec-left .act-prod-img{top:-10%;}
}
@media screen and (min-width: 381px) and (max-width: 410px){
	.rushpage .act-sec-left .act-prod-img{top:-15%;}
}
@media screen and (min-width: 411px) and (max-width: 450px){
	.rushpage .act-sec-left .act-prod-img{top:-18%;}
}
@media screen and (min-width: 451px) and (max-width: 500px){
	.rushpage .act-sec-left .act-prod-img{top:-20%;}
}
@media screen and (min-width: 501px){
	.rushpage .act-sec-left .act-prod-img{top:-25%;}
}*/
</style>