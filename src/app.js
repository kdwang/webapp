require('./css/common2.0.css'); //加载公共样式
window.UA = require('./env');
window.$ = window.Zepto = require('webpack-zepto');
window.Vue = require('vue');

window.IScroll = require('iscroll');
//与原生应用交互
require('./Prius');
//ubt埋点
require('./track');

//打开全局调试
//Vue.config.debug = true;

var VueRouter = require('vue-router');
Vue.use(VueRouter);

var fastclick = require('fastclick');
fastclick.attach(document.body);

// register filters 自定义过滤器  金额格式化，
var filters = require('./filters');
Object.keys(filters).forEach(function(k) {
  Vue.filter(k, filters[k]);
});

// register directive 自定义图片地址 代替img的src属性
var directives = require('./directives');
Object.keys(directives).forEach(function(k) {
  Vue.directive(k, directives[k]);
});


var App = Vue.extend(require('./app.vue'));
var router = new VueRouter(
	{
	   hashbang: false,  //为true的时候 example.com/#!/foo/bar ， false的时候 example.com/#/foo/bar
	   //abstract:true,  //地址栏不会有变化
	   //以下设置需要服务端设置
	   //history: false,   //当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
	   //saveScrollPosition: false
	   linkActiveClass:'custom-active-class' //全局设置连接匹配时的类名 参考http://vuejs.github.io/vue-router/en/link.html
	}
);

require('./routers')(router);
window.router = router;
//位置不能换
window.YMC = require('./ymc');
window.YMCMap = require('./location');

router.start(App, '#app');



Vue.transition('next', {
  enter:function(){

  },
  beforeEnter: function (el) {
    router.app.hiddenPageY = true;
  },
  afterEnter: function (el) {
	  router.app.hiddenPageY = false;
  }
});

Vue.transition('prev', {
  enter:function(){

  },
  beforeEnter: function (el) {
    router.app.hiddenPageY = true;
  },
  afterEnter: function (el) {
    router.app.hiddenPageY = false;
  }
});

// hidden-page-y
// 		if(transition.to.forReady){
// 			router.app.loadingShow = true;
// 			setTimeout(function(){
// 				router.app.loadingShow = false;
// 			},400);// 400 页面切换时的延迟
// 		}

//  UA
var oUA = UA().browser;

// setTimeout(function(){
//   if(oUA.name=='Android' && Prius.isInsideApp) {
//     router.app.animateDisable = true;
//   }

//   if(oUA.name=='Android' && oUA.version<4.1 || oUA.isUC) {
//     router.app.animateDisable = true;
//   } else if(oUA.name=='Safari' || oUA.name=='iOS Webview') {
//     router.app.virtualLoading = false;
//   }
// },200);
setTimeout(function(){

  var ua = window.navigator.userAgent;

  //在安卓app中禁用
  if( ua.match(/Android/) && Prius.isInsideApp) {
    router.app.animateDisable = true;
  }

  //不在APP中的时候启用
  if(!Prius.isInsideApp){
    router.app.animateDisable = false;
  }

  if(oUA.name=='Android' && oUA.version<4.1 || oUA.isUC) {
    //安卓4.1以下版本禁用
    router.app.animateDisable = true;
  } else if(oUA.name=='Safari' || oUA.name=='iOS Webview' || ua.match(/iPhone|iPad|iPod/)) {
    //苹果系列启用
    router.app.virtualLoading = false;
  }

},200);
