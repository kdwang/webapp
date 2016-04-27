var _YMC = require('./ymc');
module.exports = function(router){
	router.map({
		'/': {
			name: 'home',
			forReady:true,//表示数据在ready请求
			component: require('./views/home.vue')
		},
		// 热销车型
		'/hotcar': {
			name: 'hotcar',
			component: require('./views/hotcar.vue'),
		},
		/******车预定模块****/
		'/brandList': {
			name: 'brandList',
			component: require('./views/brandList.vue'),
		},
		'/car-series-list': {
		  name:'car-series-list',
		  component:require('./views/car-series-list.vue')
		},
		'/car-model-list': {
		  name:'car-model-list',
		  component:require('./views/car-model-list.vue')
		},
		'/car-model-detail': {
		  name:'car-model-detail',
		  component:require('./views/car-model-detail.vue')
		},
		'/specarSuccess': {
		  name:'specarSuccess',
		  component:require('./views/specarSuccess.vue')
		},
		/******车预定模块end****/

		/*********定位优化**********/
		'/local_error':{ //定位优化
			name:'local_error',
			component:require('./views/local_error.vue')
		},
		'/city':{ //选择城市
			name:'city',
			component:require('./views/city.vue')
		},
		'/store':{ //周围门店
			name:'store',
			component:require('./views/store.vue')
		},
		'/list_store':{ //交付中心
			name:'list_store',
			component:require('./views/list_store.vue')
		},

		'/selected_package': {
		  name:'selected_package',
		  component:require('./views/selected_package.vue')
		},

		'/selected_package-detail': {
		  name:'selected_package-detail',
		  component:require('./views/selected_package-detail.vue')
		},

		'/selected_package-list': {
		  name:'selected_package-list',
		  component:require('./views/selected_package-list.vue')
		},
		// 闪购模块
		'/rush/': {
			name: 'rush',
			component: require('./views/rush.vue')
		},
		'/rushUsrCenter/': {
			name: 'rushUsrCenter',
			component: require('./views/rushUsrCenter.vue'),
			auth: true
		},
		'/rushEnr/': {
			name: 'rushEnr',
			component: require('./views/rushEnr.vue'),
			auth: true
		},
		'/rushEnrSuccess/': {
			name: 'rushEnrSuccess',
			component: require('./views/rushEnrSuccess.vue'),
			auth: true
		},
		'/rushPaySuccess/': {
			name: 'rushPaySuccess',
			component: require('./views/rushPaySuccess.vue'),
			auth: true
		},
		'/rush-rule/': {
			name: 'rush-rule',
			component: require('./views/rush-rule.vue')
		},
		'/rush-enr-rule/': {
			name: 'rush-enr-rule',
			component: require('./views/rush-enr-rule.vue')
		},
		'/product/': {
			name: 'product',
			component: require('./views/product.vue')
		},
		'/car-argument/': {
			name: 'car-argument',
			component: require('./views/car-argument.vue')
		},
		'/comment': {
		  name:'comment',
		  component:require('./views/comment.vue')
		},
		// '/my_views/:viewId': {
		// 	name:'my_views_detail',
		// 	component: require('./views/my_views_detail.vue'),
		// 	auth: true // 此页面需要用户登录
		// },
		// 'async':{
		// 	//http://forum.vuejs.org/topic/114/vue-router-异步加载的例子
		// 	name:'async',
		// 	component: function(reslove){
		// 		//异步加载，
		// 		//例子
		// 		return require(['./views/async.vue'], reslove)
		// 	}
		// },
		'/loan':{  //购车付款方式
			name:'loan',
			component: require('./views/loan.vue')
		},
		'/insurance':{ //我的车险方案
			name:'insurance',
			component: require('./views/insurance.vue')
		},
		'/service':{ //尊享服务
			name:'service',
			component: require('./views/service.vue')
		},
		'/checkout':{ //订单 / 支付
			auth:true,
			name:'checkout',
			component: require('./views/checkout.vue')
		},
		'/paySuccess':{ //支付成功
			name:'paySuccess',
			component: require('./views/paySuccess.vue')
		},
		'/grouppaysuccess':{ //团购支付成功
			name:'grouppaysuccess',
			component: require('./views/grouppaysuccess.vue')
		},
		'/orderTrack':{ //订单跟踪
			auth:true,  //需要登陆
			name:'orderTrack',
			component: require('./views/orderTrack.vue')
		},
		'/orderDetail':{ //订单详情
			auth:true,
			name:'orderDetail',
			component: require('./views/orderDetail.vue')
		},
		'/_reg':{ //注册
			name:'_reg',
			component: require('./views/_reg.vue')
		},
		'/_login':{ //登陆
			name:'_login',
			component: require('./views/_login.vue')
		},
		'/_smslogin':{ //验证码登录
			name:'_smslogin',
			component: require('./views/_smslogin.vue')
		},
		'/_lose':{ //找回密码
			name:'_lose',
			component: require('./views/_lose.vue')
		},
		'/_reset':{ //密码重置
			name:'_reset',
			component: require('./views/_reset.vue')
		},
		'/myBuyCar':{
			name:'myBuyCar',
			component: require('./views/myBuyCar.vue')
		},
		'/helpIndex':{//帮助中心
			name:'helpIndex',
			component: require('./views/helpIndex.vue')
		},
		'/carProcess':{//帮助中心 - 购车流程
			name:'carProcess',
			component: require('./views/carProcess.vue')
		},
		'/aboutPay':{//帮助中心 - 关于支付
			name:'aboutPay',
			component: require('./views/aboutPay.vue')
		},
		'/turnCenter':{//帮助中心 - 交付中心
			name:'turnCenter',
			component: require('./views/turnCenter.vue')
		},
		'/aboutUs':{//帮助中心 - 关于我们
			name:'aboutUs',
			component: require('./views/aboutUs.vue')
		},
		'/contactUs':{//帮助中心 - 联系我们
			name:'contactUs',
			component: require('./views/contactUs.vue')
		},
		'/job':{//帮助中心 - 招贤纳士
			name:'job',
			component: require('./views/job.vue')
		},
		'/issue':{//帮助中心 - 常见问题
			name:'issue',
			component: require('./views/issue.vue')
		},
		'/warranty-services':{//帮助中心 - 汽车三包、保养、维修服务说明
			name:'warranty-services',
			component: require('./views/warranty-services.vue')
		},
		'/refund-notice':{//帮助中心 - 三十天无理由退车服务说明
			name:'refund-notice',
			component: require('./views/refund-notice.vue')
		},
		'/car-brand-site':{//帮助中心 - 品牌官网
			name:'car-brand-site',
			component: require('./views/car-brand-site.vue')
		},
		'/agreement':{//帮助中心 - 服务协议
			name:'agreement',
			component: require('./views/agreement.vue')
		},
		'/after-sales-service':{//帮助中心 - 售后服务
			name:'after-sales-service',
			component: require('./views/after-sales-service.vue')
		},
		'/third-party':{//第三方显示
			name:'third-party',
			component: require('./views/third-party.vue')
		},
		'/purchaseNote':{//购车笔记
			name:'purchaseNote',
			component: require('./views/purchaseNote.vue')
		},
		'/intention':{//我的购车意向
			name:'intention',
			component: require('./views/intention.vue'),
			auth:true
		},
		// not found handler
	    '*': {
	    	name: 'not_found',
	    	component: require('./views/not_found.vue')
	    }
	});

	window.siteMap = {
		'home'                    : '首页',
		'hotcar'                  : '特价现车',
		'brandList'         	  : '品牌',
		'car-model-list'          : '车款',
		'car-series-list'         : '现车车系',
		'specarSuccess'           : '意向提交成功',
		'product'                 : '',
		'_login'                  : '登录',
		'_reg'                    : '注册',
		'_lose'                   : '找回密码',
		'_reset'                  : '重置密码',
		'_smslogin'               : '验证码登录',

		'comment'                 : '评论',
		'myBuyCar'                : '我的购车方案',
		'selected_package'        : '我的精选套餐方案',
		'selected_package-detail' : '精选套餐方案',
		'selected_package-list'   : '精品商品库',
		'local_error'			  : '请选择用车城市',
		'city'			  		  : '请选择上牌城市',
		'store'			  		  : '选择交付中心',
		'list_store'			  : '选择交付中心',
		'helpIndex'               : '帮助中心',
		'carProcess'              : '购车流程',
		'aboutPay'                : '关于支付',
		'turnCenter'              : '交付中心',
		'aboutUs'            	  : '关于我们',
		'contactUs'               : '联系我们',
		'job'        		      : '招贤纳士',
		'issue'        		      : '常见问题',
		'warranty-services'       : '汽车三包、保养、维修服务说明',
		'refund-notice'           : '三十天无理由退车服务说明',
		'car-brand-site'          : '车辆品牌售后服务说明',
		'agreement'               : '要买车服务协议',
		'after-sales-service'     : '车辆售后服务',
		'loan'                    : '贷款方案',
		'insurance'               : '保险套餐',
		'service'                 : '尊享服务',
		'checkout'                : '订单确认',
		'orderTrack'              : '订单跟踪',
		'orderTrackN'             : '订单跟踪',//订单跟踪失败
		'orderDetail'             : '订单详情',
		'success'                 : '意向提交成功',
		'rush'					  : '',
		'rushEnr'				  : '闪购报名',
		'rushEnrSuccess'		  : '闪购报名结果页',
		'rushPaySuccess'		  : '闪购支付结果页',
		'rush-rule'		          : '闪购细则',
		'rush-enr-rule'		      : '要买车闪购活动细则',
		'rushUsrCenter'			  : '我的闪购',
		'third-party'             : '第三方网站',
		'purchaseNote'            : '购车笔记',
		'intention'            : '我的购车意向',
		'not_found'               : '页面未找到'
	};

	var _routeList = _YMC.local('routeList');

	try{
		window.routeList = JSON.parse(_routeList) || [];
	}catch(e){
		window.routeList = [];
	}

	//是否从外部链接跳进来的
	var isOutUrl = true;

	router.beforeEach(function(transition){
		if (router.app.animateDisable) {
			window.scrollTo(0, 0);
		}

		if(Prius.isYaomaiche && (!Prius.isVersionLessV2())){
			//在要买车app中
			Prius.shouleOverrideUrl(window.location.href,
				transition.to.name,
				transition.from.name,
				JSON.stringify(transition.from.query),
				JSON.stringify(transition.to.query),
				/**
				 * @param  {[type]} interrupt app中是否拦截
				 * @param  {[type]} data      登录信息
				 */
				function(interrupt, data) {
					//隐藏返回
					router.app.hideBack = (data && data.hideBack) ? true : false ;
					YMC.log("hidback##############");
					YMC.log(router.app.hideBack);
					YMC.log("back data #######################");
					YMC.log(JSON.stringify(data));
					YMC.log("back data  end end end end");
					//app中登录状态
					if(data && data.userAuth){
						_YMC.register.setYMCAPPToken(data.userAuth);
					} else {
						_YMC.register.setYMCAPPToken({});
					}
					router.app.userState = _YMC.register.loginStatus();

					if (interrupt) {
						if (transition.to.name === 'home') {
							//在首页的时候，刷新下状态
							//路由
							if(window.routeList.length>1){
								window.routeList = [window.routeList[window.routeList.length-1]];
								_YMC.local('routeList',JSON.stringify(window.routeList));
							}
						}
                        if (!transition.from.path) {
                            if (transition.to.name === '_login') {
                                if(transition.to.query.source){
                                    transition.from.path = '/' + transition.to.query.source;
                                    if(transition.to.query.id){
                                        transition.from.path += '?id=' + transition.to.query.id;
                                    }
                                    if (transition.to.query.appfrom) {
                                        //从app打开的第一页
                                        if (transition.from.path.indexOf("?") != -1) {
                                            transition.from.path += '&appfrom=' + transition.to.query.appfrom;
                                        } else {
                                            transition.from.path += '?appfrom=' + transition.to.query.appfrom;
                                        }
                                    }
                                }
                            } else {
                                transitioin.from.path = transition.to.path;
                            }
                        }
						transition.abort();
						return;
					}
					return allowTransition(transition);
				}
			);
		} else {
			//web环境中
			allowTransition(transition);
		}
	});

	//可以记录访问路径
	router.afterEach(function(transition){
		//_track.push();
	});


	//在app中，需要请求是否允许跳转到下一页
	function allowTransition(transition){
		//如果从外部链接跳转进来的，此时保存一下当前的name，和跳转的路径
		//在app.vue的normalGoBack 中判断，如果路径符合，那么就跳转回去。
		//场景：  外部url -> webapp a页面 再进入 b页面
		//		  此时返回  返回a页面，再次点返回返回外部url
		window.currentView = transition.to.name;
		if( (~document.referrer.indexOf(location.host))&&(~document.referrer.indexOf('.html'))){
			if(document.referrer){
				if(isOutUrl){
				window.outjumpUrl = {refer:document.referrer,viewname:transition.to.name};
					isOutUrl = false;
				}
			}
		}

		router.app.header = siteMap[transition.to.name] || '';
		if(router.app.isCarmaster){
			document.title = "";
			setTimeout(function(){
				document.title =  router.app.header;
				if(transition.to.name == 'product' && !router.app.header){
					document.title = '车辆详情';
				}
			},1000)

		}else{
			document.title = "要买车 - 让买车更轻松 -  " + router.app.header;
		}
		router.app.pubFootbar = false;
		//第三方统计代码
		window._adwq = [];
		router.app.customTop = {
			goback : true,
			share : false,
			reg : false,
			log : false
		}
		//BUT埋点统计
		if(window._track){
			//如果有点击事件
			if( JSON.stringify(_track.clickData) !== '{}'){
				_track.push();
			}
			setTimeout(function(){
				//页面刚进入上报
				try{_track.data.parameters = JSON.stringify(transition.to.query);} catch(e){}
				_track.data.referPageId = transition.from.name || '';
				_track.data.pageId = transition.to.name || '';
				_track.push('pageShow');
			},25);

		}
		//国双统计
		YMC.wdStatistic();

		//可以通过在路由中的自定义字段来验证用户是否需要登陆
		if(transition.to.auth){
			YMC.log('通过配置路由中自定义的字段验证是否需要登陆');
			if(!YMC.register.loginStatus()){
				VUI.alert('请先登录！',1000,function(){
					var _query = {
						source : transition.to.name,
						id : transition.to.query.id || '',
						appfrom : transition.to.query.appfrom || ''
					};
					try{
						_query.query = JSON.stringify(transition.to.query);
					}catch(e){}
					router.replace({
                        name:'_login',
                        query:_query
                    });
				});
				return;
			}
		}

		//登录了再进这些页面直接在路由中删除，这样就不会出现
		// 首页-》订单跟踪（此时需要登录）
		//                 -》登录完毕
		//                 -》再次跳转到订单跟踪  此时路由表中的路径为   home login track
		//                 此时再点击返回的时候，就会返回到login，这是不想看到的，所以需要清空 路由表中和登录相关的路径
		if(YMC.register.loginStatus() && (" _login _reg _smslogin ".indexOf(transition.to.name) > -1)){
			if(routeList.length>1){
				routeList.splice(routeList.length-2,1)[0];
				var rt = routeList[routeList.length-2] || {name:'home'};
				var _route = {
					name:rt.name
				}
				if(rt.query && (JSON.stringify(rt.query)!=="{}") ){
					_route.query = rt.query;
				}
				_YMC.local('routeList',JSON.stringify(routeList));
				transition.abort();
				Vue.nextTick(function(){
					router.replace(_route);
				});
				return;
			}
		}

		if(transition.to.forReady){
			router.app.loadingShow = true;
			setTimeout(function(){
				router.app.loadingShow = false;
			},600);// 400 页面切换时的延迟
		}




		switch(transition.to.name){
			case 'home' :
				router.app.pubTitle = 'home';
				(Prius.isVersionLessV2()) && (router.app.pubFootbar = true);
				break;

			case 'brandList' :
			case 'car-series-list' :
			case 'car-model-list' :
			case 'car-model-detail' :
				router.app.pubTitle = 'choose';
				break;

			case 'myBuyCar' :
			case 'orderTrack' :
			case 'orderTrackN' :
				router.app.pubTitle = 'normal';
				(Prius.isVersionLessV2()) && (router.app.pubFootbar = true);
				break;

			default :
				router.app.pubTitle = 'normal';
				break;
		}

		//transition.to.name 避免404的时候 transition.to.name是 undefined
		if(transition.to.name){
			if(routeList.length > 1 && transition.to.name==routeList[routeList.length-2]['name']){
				router.app.effect='prev';//返回
				routeList.splice(routeList.length-1,1);
				_YMC.local('routeList',JSON.stringify(routeList));
			} else {
				router.app.effect='next';//前进

				if(routeList.length && routeList[routeList.length-1]['name']==transition.to.name){
					//刷新了当前页面

				} else {
					var _route = {name : transition.to.name};
					if(JSON.stringify(transition.to.query)!="{}"){
						_route.query = transition.to.query;
					}
					routeList.push(_route);
					//routeList.push({
						// name : transition.to.name,
						// query : transition.to.query
						// path : transition.to.path,
						// params : transition.to.params,
						// timer: +new Date
					//});
				}
				_YMC.local('routeList',JSON.stringify(routeList));
			}
		}
		transition.next();
	};
}
