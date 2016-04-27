/*
因为上报，依赖zepto库，所以要在zepto后面引用
涉及到app的上报，还需要引入 Prius.js

使用：
    _track.data.k = v; // 设置，但是不会上报
    —track.push();     // 上报
    _track.set(k,v);   // set一次 上报一次   添加到上报字段的parameters属性中。
    _track.set({k1:v1,k2:v2})
    _track.setD(k,v);  // setD一次 上报一次  添加到上报字段根节点中。
    _track.setD({k1:v1,k2:v2})

    _track.setProduct使用
    在product页面，需要在每次点击的时候，清空之前点击事件，上报最新的一次点击事件。而且需要自定义eventAction的时候
    var _t = {};
    _t['自定义点击事件名称'] = 1;
    _track.setProduct({
      parameters : {
        carName:'车辆名称',
        price:'价格',
        source:'页面来源'
      },
      clickData:_t,
      productId : '车辆id',
      pShow : 'productShow'
    });

上报逻辑：
    上报时机：  页面进入之后 和 页面离开之前

    离开的时候如果没有进行任何点击操作，比如刷新当前页面，则离开时不上报。

 */



(function(){
/**
 * 根据页面的viewName返回name 和 id ，
 * 目前通过的是file名，来配置
 * 以后如果是单页框架,这里的viewName就是路由中设置的name
 * @param  {[type]} viewName [description]
 * @return {[type]}          [description]
 */
function getPageInfo(viewName){
	var cfg = {

		''                        : {'name':'首页', 'id':'home'},
		'index'                   : {'name':'首页', 'id':'home'},
		'test'                   : {'name':'测试首页', 'id':'test'},
		'product'                 : {'name':'商品详情', 'id':'product'},
		'myBuyCar'                : {'name':'我的方案', 'id':'myBuyCar'},
		'comment'                 : {'name':'评论', 'id':'comment'},

		'insurance'               : {'name':'车险方案', 'id':'insurance'},
		'loan'                    : {'name':'购车付款方式', 'id':'loan'},
		'service'                 : {'name':'尊享服务','id':'service'},
		'checkout'                : {'name':'订单支付','id':'checkout'},
		'orderDetail'             : {'name':'订单详情','id':'orderDetail'},
		'paySuccess'              : {'name':'支付成功','id':'paySuccess'},
		'orderTrack'              : {'name':'订单跟踪','id':'orderTrack'},
		'orderTrackN'             : {'name':'订单跟踪失败','id':'orderTrackN'},

		'purchase_intent'         : {'name':'购车意向','id':'purchase_intent'},
		'brandList'               : {'name':'品牌列表','id':'brandList'},
		'car-series-list'         : {'name':' 车系列表','id':'car-series-list'},
		'car-model-list'          : {'name':'车款列表','id':'car-model-list'},
		'car-model-detail'        : {'name':'车型详情','id':'car-model-detail'},
		'specarSuccess'           : {'name':'预定成功','id':'specarSuccess'},

		'selected_package'        : {'name': '套餐 - 精品套餐方案', 'id': 'selected_package'},
		'selected_package-list'   : {'name': '套餐 - 精品商品库', 'id': 'selected_package-list'},
		'selected_package-detail' : {'name': '套餐 - 精品商品详情页', 'id': 'selected_package-detail'},

		'tuan'                    : {'name':'团购列表','id':'tuan'},
		'grouppaysuccess'         : {'name':'团购列表','id':'grouppaysuccess'},

		//个人中心
		'user-info-improve1'      : {'name': '完善信息1', 'id': 'user-info-improve1'},
		'user-info-improve2'      : {'name': '完善信息2', 'id': 'user-info-improve2'},
		'user-info-improve3'      : {'name': '完善信息3', 'id': 'user-info-improve3'},
		'user-info-improve4'      : {'name': '完善信息4', 'id': 'user-info-improve4'},
		'user-info-improve5'      : {'name': '完善信息5', 'id': 'user-info-improve5'},
		'user-info-improve6'      : {'name': '完善信息6', 'id': 'user-info-improve6'},
		'user-info'               : {'name': '个人资料', 'id': 'user-info'},

		//登陆注册
		'_reg'                    : {'name': '注册', 'id': '_reg'},
		'_login'                  : {'name': '登录1', 'id': '_login'},
		'_smslogin'               : {'name': '登录2', 'id': '_smslogin'},
		'_lose'                   : {'name': '找回密码', 'id': '_lose'},
		'_reset'                  : {'name': '重置密码', 'id': '_reset'}

	}
	return cfg[viewName] || { notfound:viewName + 'notfound' };
};


var util = {
	createCookie:function (name, value, days) //创建
	{
	    if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
		} else var expires = "";
		document.cookie = name + "=" + value + expires + "; path=/";
	},
	readCookie:function (name) //读取
	{
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	},
	eraseCookie:function (name) //销毁
	{
		util.createCookie(name, "", -1);
	},
	/*
		使用：
		var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');
		myURL.file; // = 'index.html'
		myURL.hash; // = 'top'
		myURL.host; // = 'abc.com'
		myURL.query; // = '?id=255&m=hello'
		myURL.params; // = Object = { id: 255, m: hello }
		myURL.path; // = '/dir/index.html'
		myURL.segments; // = Array = ['dir', 'index.html']
		myURL.port; // = '8080'
		myURL.protocol; // = 'http'
		myURL.source; // = 'http://abc.com:8080/dir/index.html?id=255&m=hello#top'
	*/
	parseURL:function (url) {
	    var a = document.createElement('a');
	    //创建一个链接
	    a.href = url;
	    return {
	        source: url,
	        protocol: a.protocol.replace(':', ''),
	        host: a.hostname,
	        port: a.port,
	        query: a.search,
	        params: (function () {
	            var ret = {},
	                seg = a.search.replace(/^\?/, '').split('&'),
	                len = seg.length,
	                i = 0,
	                s;
	            for (; i < len; i++) {
	                if (!seg[i]) {
	                    continue;
	                }
	                s = seg[i].split('=');
	                ret[s[0]] = s[1];
	            }
	            return ret;
	        })(),
	        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
	        hash: a.hash.replace('#', ''),
	        path: a.pathname.replace(/^([^\/])/, '/$1'),
	        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
	        segments: a.pathname.replace(/^\//, '').split('/')
	    }
	},
	createGuid:function() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	        return v.toString(16);
	    });
	},
	env:function(){
	    _env = {};

	    var ua = window.navigator.userAgent;
	    var matched;

	    if((matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))) {
	        /**
	         * @instance browser
	         * @memberof _env
	         * @property {String} name - 浏览器名称，比如UC/QQ/Firefox/Chrome/Android/Safari/iOS Webview/Chrome Webview/IE/IEMobile/unknown等
	         * @property {Version} version - 浏览器版本号
	         * @property {Boolean} isUC - 是否是UC浏览器
	         * @property {Boolean} isQQ - 是否是QQ浏览器
	         * @property {Boolean} isIE - 是否是IE浏览器
	         * @property {Boolean} isIEMobile - 是否是IE移动版浏览器
	         * @property {Boolean} isIELikeWebkit - 是否是IE兼容了Webkit特性的浏览器
	         * @property {Boolean} isChrome - 是否是Chrome浏览器
	         * @property {Boolean} isAndroid - 是否是Android的原生浏览器
	         * @property {Boolean} isSafari - 是否是Safari浏览器
	         * @property {Boolean} isWebview - 是否是iOS下的Webview或Android下Chrome的Webview
	         */
	        _env.browser = {
	            name: 'UC',
	            isUC: true,
	            version: matched[1]
	        }
	    } else if((matched = ua.match(/MQQBrowser\/([\d\.]+)/))) {
	        _env.browser = {
	            name: 'QQ',
	            isQQ: true,
	            version: matched[1]
	        }
	    } else if ((matched = ua.match(/Firefox\/([\d\.]+)/))) {
	        _env.browser = {
	            name: 'Firefox',
	            isFirefox: true,
	            version: matched[1]
	        }
	    } else if ((matched = ua.match(/MSIE\s([\d\.]+)/)) ||
	                    (matched = ua.match(/IEMobile\/([\d\.]+)/))) {

	        _env.browser = {
	            version: matched[1]
	        }

	        if (ua.match(/IEMobile/)) {
	            _env.browser.name = 'IEMobile';
	            _env.browser.isIEMobile = true;
	        } else {
	            _env.browser.name = 'IE';
	            _env.browser.isIE = true;
	        }

	        if (ua.match(/Android|iPhone/)) {
	            _env.browser.isIELikeWebkit = true;
	        }
	    } else if((matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/))) {
	        _env.browser = {
	            name: 'Chrome',
	            isChrome: true,
	            version: matched[1]
	        }

	        if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
	            _env.browser.name = 'Chrome Webview';
	            _env.browser.isWebview = true;
	        }
	    } else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
	        _env.browser = {
	            name: 'Android',
	            isAndroid: true,
	            version: matched[1]
	        }
	    } else if(ua.match(/iPhone|iPad|iPod/)) {
	        if(ua.match(/Safari/)) {
	            matched = ua.match(/Version\/([\d\.]+)/)
	            _env.browser = {
	                name: 'Safari',
	                isSafari: true,
	                version: matched[1]
	            }
	        } else {
	            matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);
	            _env.browser = {
	                name: 'iOS Webview',
	                isWebview: true,
	                version: matched[1].replace(/\_/, '.')
	            }
	        }
	    } else {
	        _env.browser = {
	            name:'unknown',
	            version:'0.0.0'
	        }
	    }
	    return _env;
	}()
};

try{
	//删除可能会导致部分机型出错的中文名cookie
	util.eraseCookie('_referPageName');
} catch(e){
	console.log("error：util.eraseCookie('_referPageName')");
}


window._track = {
	trackUrl : (location.href.indexOf('shgqc')>-1) ? 'http://ubt.gqc.fx.ymc.com/ubt/acquire/report?' : 'http://ubt.fx.yaomaiche.com/acquire/report/?',
	//trackUrl :'./ubt.gif?',
	data : {}, //上报的数据,
	isUpload:false,//是否已上报过数据，主要是绑定两个上报事件的时候，如果一个上报了，后面一个就不用上报了。
	clickData:{},//点击事件上报的数据
	// referPageId      	 int                	来源页面id
	// pageId           	 int                	页面id
	setPageData:function(){
		var viewName = util.parseURL(window.location.href).file.replace('.html', '');
		var _p = getPageInfo(viewName);
		//读取老的
		var _referPageId = util.readCookie('_referPageId') || '';
		var _pId = _p.id || _p.notfound;
		//设置新的
		util.createCookie('_referPageId',_pId);
		this.data.referPageId   = _referPageId;
		this.data.pageId        = _pId;
		this.data.pageName      = "_";
	},
	// host             	 string             	urlhost(host、path、parameters三者构成url)
	// path             	 string             	urlpath(host、path、parameters三者构成url)
	// parameters       	 string             	urlparameters(host、path、parameters三者构成url)
	setUrlInfo:function(){
		var _url = util.parseURL(window.location.href);
		this.data.host = _url.host;
		this.data.path = _url.path;
		var parameters = JSON.stringify(_url.params);
		if(parameters!=='{}'){
			this.data.parameters = parameters ;
		}
	},
	// pageSearchWord   	 string             	页面搜索词(kewWords)
	seteSearchWord : function(){
		var keyword = document.getElementsByName('keywords');
		if(keyword.length){
			this.data.pageSearchWord = keyword[0].getAttribute('content') || '';
		}
	},
	// os               	 string             	访客操作系统
	setOs :function() {
		var os_type;
		var sUserAgent = navigator.userAgent
		windows = (sUserAgent.indexOf("Windows",0) != -1)?1:0;
		mac = (sUserAgent.indexOf("mac",0) != -1)?1:0;
		linux = (sUserAgent.indexOf("Linux",0) != -1)?1:0;
		unix = (sUserAgent.indexOf("X11",0) != -1)?1:0;

		if (windows) os_type = "MS Windows";
		else if (mac) os_type = "Apple mac";
		else if (linux) os_type = "Lunix";
		else if (unix) os_type = "Unix";

		//如果是window，返回具体哪个操作系统
		if(os_type == 'MS Windows'){
		    var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
		    if (isWinXP) {os_type ="WinXP" };
		    var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
		    if (isWin2003) {os_type ="Win2003" };
		    var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
		    if (isWinVista) {os_type ="WinVista"};
		    var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
		    if (isWin7) {os_type ="Win7" };
		    var isWin8 = sUserAgent.indexOf("Windows NT 6.3") > -1 ;
		    if (isWin8) {os_type ="Win8" };
		    var isWin10 = sUserAgent.indexOf("Windows NT 10.0") > -1 ;
		    if (isWin10) {os_type = "Win10"};
		}
		this.data.os = os_type || '';
	},
	// referer          	 string             	页面来源url
	// refererPageid    	 int                	refer页面的pageid
	// browser          	 string             	访客浏览器
	setOtherInfo:function(){
		this.data.referer = document.referrer || '';
		this.data.browser = JSON.stringify(util.env);
		//访客使用的语言环境
	 	this.data.language = navigator.language || '';
	 	//访客屏幕分辨率
	 	this.data.screen = window.screen.width + "x" + window.screen.height;

	 	//目前只是高德地图，写死
	 	this.data.gpsApiType = 1;


	},
	//开始上报数据
	push:function(type){
		//pShow字段说明：
		//用于类似product页面，更换颜色之后，也希望显示的是pageShow,为了与初次访问页面上报的“pageShow”区分开所以此处加上特定标识
		//使用的时候可以在setD({pShow:'productShow'})
		this.data.eventAction = type || this.data.pShow || '';
		delete this.data.pShow;//并不参与上报，所以这里删掉
		//this.data.requestId || this.setRequestId();
		this.data.pageId || this.setPageData();
		this.data.host || this.setUrlInfo();
		this.data.os || this.setOs();
		this.referer || this.setOtherInfo();
		this.data.pageSearchWord || this.seteSearchWord();

		//登录后的userkey
		var ymc_userkey = $.fn.cookie('ymc_userkey');
		if(ymc_userkey && YMC.register.loginStatus()){
			this.data.ymc_userkey = ymc_userkey;
		}

		var ubtParamsArr = [];//针对web埋点
		//var ubtParamsArrForApp = [];//针对app埋点
		var value;
		var hasPara = false;//是否有parameters字段
		var para={};
		try{
			for(var key in this.data){
				if(this.data.hasOwnProperty(key)){
					value = this.data[key];
					//先删除空白的属性
					if(!value){
						delete this.data[key];
					}
					//每次上报的时候带上title
					if(key=='parameters'){
						hasPara = true;
						para = JSON.parse(value);
						if(!para.title){
							para.title = document.title||'';
						}
						value = JSON.stringify(para);
					}
					ubtParamsArr.push( encodeURIComponent( key ) + "=" + encodeURIComponent( value ) );
					//ubtParamsArrForApp.push(   key + "=" +  value );
				}
			}
			//如果没有parameters字段,每次加上title
			if(!hasPara){
				if(!para.title){
					para.title = document.title||'';
				}
				ubtParamsArr.push( encodeURIComponent( 'parameters' ) + "=" + encodeURIComponent( JSON.stringify(para) ) );
			}

			var clickData = JSON.stringify(this.clickData);
			if(clickData !== '{}'){

				ubtParamsArr.push( encodeURIComponent( 'clickData' ) + "=" + encodeURIComponent(  clickData ) ) ;
				window._track.clickData = {};
				//ubtParamsArrForApp.push(  "clickData=" +  clickData );
			} else {
				if(type!=="pageShow" && !this.fromSetFn){
					window.YMC && YMC.log('no click data');
					return false;
				}
			}



			window.trackDebug && console.log(ubtParamsArr);


			var ua = window.navigator.userAgent.toLocaleLowerCase();
			//因为track每个页面会有，但是Prius.js并不是每个页面都会引用，所以在这里单独写判断是否在app中
			var isInsideApp = ua.indexOf("yuntubrowser", 0) != -1;
			var _img = document.createElement('img');
			//如果Prius没有准备好，直接启用web上传方式
			if(!window.Prius){
				_img.src = this.trackUrl + ubtParamsArr.join('&').replace( /%20/g, "+" ) + '&rd='+(+new Date);
			} else {
				if  (window.Prius.isYaomaiche    //app中
						&& (( Prius.isAndroid && Prius.clientVersion > '2.0.2') || (Prius.isIOS && Prius.clientVersion > '2.0.1'))
					){
					window.Prius.uploadUBTStatistic( JSON.stringify( this.data ) );
				} else {
					var __i = new Image();
					__i.src = this.trackUrl + ubtParamsArr.join('&').replace( /%20/g, "+" )+'&rd='+(+new Date);
				}
			}

			this.fromSetFn = false;
			//如果在app中，使用 app 上报的方式
			//app.push(  ubtParamsArr.join('&').replace( /%20/g, "+" )  )
			delete this.data.parameters;
			delete this.data.productId;
			delete this.data.orderId;
			delete this.data.orderNum;
		}catch(e){
			this.fromSetFn = false;
			console.log('ubtError:'+e.message);
			//_img.src = this.trackUrl + e.message;
		}
	},
	/**
	 * 添加埋点字段
	 * @param  {[type]} k [description]
	 * @param  {[type]} v [description]
	 * @return {[type]}   [description]
	 * 使用：
	 * _track.set('key','value')
	 * _track.set({key:'value',key1:'value1'})
	 *
	 */
	set:function(k,v){

/*
	this.data.parameters

 */
		if(!k){return;}
		var o = {};
		try{
			if(arguments.length==2){
				o[k] = v;
			}

			//只传一个的时候,此时k是一个对象
			var value;
			if(arguments.length == 1){
				o = k;
			}

			this.data.parameters = (JSON.stringify(o) == '{}') ? '' : JSON.stringify(o) ;
			this.fromSetFn = true; //是否是从set方法过来的
			this.push();

		}catch(e){
			document.createElement('img').src = this.trackUrl + e.message;
		}
	},
	setD:function(k,v){

		if(!k){return;}
		try{
			if(arguments.length==2){
				this.data[k] = v;
			}

			//只传一个的时候,此时k是一个对象
			var value;
			if(arguments.length == 1){
				for(var key in k){
					if(k.hasOwnProperty(key)){
						 this.data[key] = k[key];
					}
				}
			}
			this.fromSetFn = true; //是否是从set方法过来的
			this.push();

		}catch(e){
			document.createElement('img').src = this.trackUrl + e.message;
		}
	},
	/*
		{
			parameters:{}
			productId:'xxxxx'
		}

	 */
	setProduct:function(o){
		o = o || {};
		$.extend(this.data,{parameters:JSON.stringify(o.parameters)},{productId:o.productId},{pShow:o.pShow},{clickData: JSON.stringify(o.clickData||{}) });
		this.fromSetFn = true;
		this.push();
		delete this.data.clickData;
	}
};





/*

	sessionId		    拿不到  bigint	    	    该条日志隶属的session的id
	sessionStartTime 	拿不到  string             	该条日志隶属的session的开始时间，时间戳

    以下字段可以通过三种方式设置

    _track.data.k = v; // 设置
    —track.push();     // 上报
    _track.set(k,v);   // set一次上报一次
    _track.set({k1:v1,k2:v2})

	provinceId       	 int                	访客所在省
	cityId           	 int                	ip定位城市
	districtId       	 int                	访客所在区/县
	locateCityId     	 int                	gps定位城市id
	pageCityId       	 int                	页面所属城市
	lat              	 double             	经度
	lng              	 double             	纬度
	orderId          	 int                	订单id
	guid             	 后端给 bigint          访客id，主要用于网站
	productId        	 int                	产品id
	channel          	 int                	频道
	category         	 int                	类型
	regionId         	 int                	一级行政区或商区ID
	subRegionId      	 int                	二级行政区或商区ID
	userSource       	 string             	用户来源：Appstore
	deviceId         	 string             	机器唯一标识符
	color            	 string             	访客显示屏色深
	flash            	 string             	访客falsh版本
	appVersion       	 string             	app版本号
	phoneModel       	 string             	手机类型
	eventAction      	 string             	事件动作
	eventCategory    	 string             	事件类型
	eventLabel       	 string             	事件标签
	eventValue       	 bigint             	事件值
	deviceType       	 string             	pc,h5,app,weixin
	reserves         	 map<string,string> 	保留字段
	openId           	 微信
*/

	//计算上报数据
	function _countReport(k){
		var d = window._track.clickData;
		if(d[k]){
			d[k] += 1;
		} else {
			d[k] = 1;
		}
		window.YMC && YMC.log(d);
	}
	setTimeout(function(){
		var eventType = "ontouchstart" in window || "ontouchend" in window.document;
		//监听页面上所有带 upt 属性的字段
		eventType = eventType ? 'touchstart':'mousedown';
		var moved = false;
		$(document.body).on(eventType,'[ubt]',function(e){

			//左键 0 中键 1 右键 2
			var btnNum = e.button;
			//如果是在pc上，而且点击的不是左键，那么不记录
			if ( eventType=="mousedown" && btnNum!=0){
				return;
			}
			//移动端处理
			if(eventType == 'touchstart'){
				moved = false;
				$(this).one('touchmove',function(){
					moved = true;
				}).one('touchend',function(){
					//没有移动过
					if(moved==false){
						_countReport($(this).attr('ubt'));
					}
				});
				return;
			}

			//pc上报
			if(window._track){
				_countReport($(this).attr('ubt'));
			};
		});

		//在ios里面不支持beforeunload事件
		//var eventName = (util.env.browser.isWebview && util.env.browser.name === "iOS Webview" || util.env.browser.name==='Safari' ) ? "pagehide" : "beforeunload";
		//页面关闭后上报数据
		_track.isUpload = false;
		try{
			window.addEventListener('pagehide', function (event) {
				if(window._track){
					window._track.push();
				}
				//console.log('pagehide');
				// if(window._track && !_track.isUpload){
				// 	_track.isUpload = true;
				// 	//上报ubt
				// 	window._track.push();

				// }
			});
			// 去除befoeunload事件，比如在首页点击拨打电话的时候。会触发beforeunload
			// window.addEventListener('beforeunload', function (event) {
			// 	console.log('beforeunload');
			// 	if(window._track){
			// 		window._track.push();
			// 	}
			// 	// if(window._track && !_track.isUpload){
			// 	// 	_track.isUpload = true;
			// 	// 	//上报ubt
			// 	// 	window._track.push();
			// 	// }
			// });
		}catch(e){
			window.YMC && window.YMC.log(e);
		}
	},100);

})();

//是否在微信中
function isWeiXinTrack(){
    //是否在微信
    if((window.navigator.userAgent || "").toLocaleLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
		_track.data.deviceType = 'weixin';
		_track.data.appVersion = 'YMC:PC2.0';
		return true;
    }
    return false;
}

//来源以及版本号
(function() {
  try{
    var ua = (window.navigator.userAgent || "").toLocaleLowerCase();
    if (ua === "") return;

    _track.isYaomaiche = false; // 是否在要买车应用内
    _track.isCarMaster = false; // 是否在车达人应用内
    _track.clientVersion = null; // 获得当前终端的版本号

    if(window.navigator.userAgent){
    	var ua = window.navigator.userAgent.toLocaleLowerCase();
    	_track.isInsideApp = ua.indexOf("yuntubrowser", 0) != -1;
    	_track.isYaomaiche = ua.indexOf("yaomaiche", 0) != -1;
    	_track.isCarMaster = ua.indexOf("carmaster", 0) != -1;
    }

    //是否在app中
    if (_track.isInsideApp) {
      var reg = /([\s\S]*)yuntubrowser-(\S*)\/(\S*)(nettype[\S\s]*)/;
      _track.clientVersion = ua.replace(reg, "$3");
      _track.data.appVersion = 'YMC:' + _track.clientVersion;
      _track.data.deviceType = 'app';
      return;
    }
    //车达人上报地址

    if( document.domain=="carmaster.yaomaiche.com" ||
    	document.domain=="carmaster.test.yaomaiche.com" ||
    	~window.location.href.indexOf('fromCarMaster') ||  //url中带fromCarMaster参数，则上报车达人
    	_track.isCarMaster){
	    	_track.data.business  = 2;
	    	isWeiXinTrack();// set deviceType and appVersion
	    	return;
    	}

    if(isWeiXinTrack()){
    	return;
    }

    //都不是就是pc端
    _track.data.deviceType = 'pc';
    _track.data.appVersion = 'YMC:PC2.0';
    _track.data.business  = 1;

  }catch(e){}
})();

//_track.push('pageShow');




