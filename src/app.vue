<style>

.app{
	height: 100%;
	position: relative;
}

[v-cloak] {
	display: block;
}

.hidden-page-y{
	overflow-y:hidden;
}

.page_cont_scroll{
	height: 100%;
	overflow-y: auto;
}
.isCarmaster .ft-fix{
	display: none;
}
.ft-fix{
    z-index: 999;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    width: 100%;
    min-width: 320px;
    border-top: 1px solid #eee;
    background-color: #fff;
    overflow: hidden;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
}
.ift{display: inline-block;width: 24px;height: 24px;overflow: hidden;background-image:url(./imgs/ico-toolbar.png);background-repeat: no-repeat;background-size: 50px 124px;}
.ift-1{background-position: 0 0;}
.ift-2{background-position: 0 -25px;}
.ift-3{background-position: 0 -50px;}
.ift-4{background-position: 0 -75px;}
.ift-5{background-position: 0 -100px;}

.ft-fix .ft-sec{
    float: left;
    width: 20%;
    height: 100%;
    font-size: 12px;
    text-align: center;
    color: #999;
}
.ft-sec.custom-active-class{color: #ffba01;}
.ft-sec .ift{display: block;margin:6px auto 0;}
.custom-active-class .ift-1{background-position: -25px 0}
.custom-active-class .ift-2{background-position: -25px -25px;}
.custom-active-class .ift-3{background-position: -25px -50px;}
.custom-active-class .ift-4{background-position: -25px -75px;}
.custom-active-class .ift-5{background-position: -25px -100px;}

 /*正向离开样式*/
/*.view.next-transition.next-leave {
     opacity: 0;
       -webkit-transform: translate3d(-100%, 0, 0);
               transform: translate3d(-100%, 0, 0);
}*/
/*反向离开样式*/
/*.view.prev-transition.next-leave {
     opacity: 0;
       -webkit-transform: translate3d(100%, 0, 0);
               transform: translate3d(100%, 0, 0);
} */

/*  .slidebottom-leave {
    animation:next-enter .3s;
  }
  @keyframes next-enter {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }*/

/*下一页*/
.next-transition {
	-webkit-transition: all .4s ease;
	        transition: all .4s ease;
}
.next-enter{
	opacity: 0;
	-webkit-transform: translate3d(50%, 0, 0);
	        transform: translate3d(50%, 0, 0);
}
.next-leave {
	opacity: 0;
  	-webkit-transform: translate3d(0, 0, 0);
  	        transform: translate3d(0, 0, 0);
}
/*上一页*/
.prev-transition {
	-webkit-transition: all .4s ease;
	        transition: all .4s ease;
}
.prev-enter {
	opacity: 0;
  	-webkit-transform: translate3d(-50%, 0, 0);
  	        transform: translate3d(-50%, 0, 0);
}
.prev-leave{
	opacity: 0;
	-webkit-transform: translate3d(0, 0, 0);
	        transform: translate3d(0, 0, 0);
}
::-webkit-scrollbar {
  display: none;
}

.anim-disable .next-transition, .anim-disable .prev-transition {
	-webkit-transition: all 0s ease;
	        transition: all 0s ease;
}
.appw{max-width: 540px;margin:0 auto;}

</style>

<template>
	<div class="app appw" :class="{'hidden-page-y':hiddenPageY, 'anim-disable':animateDisable, 'isCarmaster':isCarmaster}">

		<!-- <div class="indexpage" v-if="pubTitle == 'home'">
			<header class="hd">
		        <h1 class="pagetitle">
		            <span @click="changeCity" ubt="citys" class="cName"><span>{{cityTit}}</span><i class="i3 i3-1"></i></span>
		            <a @click="showLeftAside = true" class="iclick iclick1 nav-left" ubt="menu" href="javascript:"></a>
		            <a class="iclick iclick2 nav-right" ubt="rightMyBuyCar" v-link="{ 'name': 'myBuyCar' }"></a>
		        </h1>
		    </header>
	    </div> -->
	    <header class="hd"   v-if="pubTitle == 'normal' && !isCarmaster">
	    	<h1 class="pagetitle" >
	            {{{header}}}
	            <a v-if="customTop.share" @click.stop.prevent="shareFn" ubt="share" class="ico1 ico_share nav-right">share</a>
	            <a v-if="customTop.reg" ubt="reg" class="nav_txt nav-right vlogin" v-link="{ name: '_reg'}">注册</a>
	            <a v-if="customTop.log" ubt="login" class="nav_txt nav-right vlogin" v-link="{ name: '_login'}">登录</a>
	            <a v-if="customTop.goback" v-show="!hideBack" @click.stop.prevent="normalGoBack" ubt="goback" class="ico1 ico_arrow-left nav-left"></a>
		     </h1>
	    </header>

	    <header class="hd"  v-if="pubTitle == 'choose' && !isCarmaster">
	       	<h1 class="pagetitle" >
	        	<span @click="showSubtit=!showSubtit" ubt="list">{{chooseTit}}<em></em></span>
	        	<a ubt="goback" v-show="!hideBack" class="ico1 ico_arrow-left nav-left" @click.stop.prevent="normalGoBack">back</a>
	    	</h1>
	    	<div v-if="showSubtit" @click="showSubtit=false" style="position:fixed;top:0;left:0;bottom:0;right:0;"></div>
	    	<div class="select-type" v-show="showSubtit" >
	        	<em></em>
	        	<ul>
	            	<li data_type="false" ubt="listall" :class="{'active':isAll}"  @click="chooseSubtit2.callBack.call(this)">{{chooseSubtit2.title}}</li>
	            	<li data_type="true" ubt="listnow" :class="{'active':!isAll}" @click="chooseSubtit1.callBack.call(this)">{{chooseSubtit1.title}}</li>
	          	</ul>
	      	</div>

	    </header>

		<router-view class="view" keep-alive v-bind:transition="effect" transition-mode="out-in"></router-view>

		<footer :class="{'ft-fix': true, 'clearfix': true,'isCarmaster':isCarmaster}" v-if="pubFootbar">
	        <a v-link="{ 'name': 'home', exact: true}" ubt="index" gsq="首页" class="ft-sec ft-sec-on"><i class="ift ift-1"></i>首页</a>
	        <a v-link="{ name: 'brandList', exact: true}" ubt="buyCar" gsq="买车" class="ft-sec"><i class="ift ift-2"></i>买车</a>
	        <a v-link="{ 'name': 'myBuyCar', exact: true}" ubt="sliderBuyCar" gsq="我的购车方案" class="ft-sec"><i class="ift ift-3"></i>购车方案</a>
	        <a v-link="{ 'name': 'orderTrack', exact: true}" ubt="sliderOrderTrack" gsq="我的订单" class="ft-sec"><i class="ift ift-4"></i>订单</a>
	        <a href="page/user-info.html" ubt="userInfo" gsq="个人中心" class="ft-sec"><i class="ift ift-5"></i>我</a>
	    </footer>

        <!--loading ajax loading-->
        <!-- <loading v-ref:loading :show.sync="loadingShow"></loading> -->
        <!-- loading 2.0 -->
        <vload v-ref:vload :show.sync="vLoadShow"></vload>

		<vload v-ref:virtualloading class="vui-mask-virtual" :show.sync="vVirtualLoadShow"></vload>
		<!-- <loading v-ref:virtualloading :show.sync="virtualLoadingShow"></loading> -->

	    <!-- toast  VUI.alert -->
        <toast v-ref:toast :toast.sync="toast">
	       <div class="msg" slot = "content" >{{{toast.content}}}</div>
        </toast>

        <!-- confirm VUI.confirm-->
        <confirm v-ref:confirm :confirm.sync="confirm">
	       <h3 slot="title"> {{confirm.title}} </h3>
	       <div class="confirmp" slot="content"> {{{confirm.content}}} </div>
	       <div slot="confirmTxt">{{{confirm.confirmTxt}}}</div>
	       <div slot="cancelTxt">{{{confirm.cancelTxt}}}</div>
        </confirm>

		<!--asidebar-->
        <asidebar v-ref:asideL v-bind:show.sync="showLeftAside" :islogin.sync="userState" :placement.sync="asideTowards"></asidebar>
        <!-- <cityaside v-ref:asideT v-bind:show.sync="showTopAside"  :placement.sync="asideTowardsY"></cityaside> -->

        <!-- VUI.share -->
        <share v-ref:share :share.sync="share"></share>
	</div>
</template>

<script>
module.exports = {
	data: function() {
		return {
			hideBack : false,
			userState : YMC.register.loginStatus(),
			cityId : (JSON.parse(YMC.local('userCity'))&&JSON.parse(YMC.local('userCity')).cityId) || '7d04e3a1-ee87-431c-9aa7-ac245014c51a',
			cardCity: (JSON.parse(YMC.local('userCity'))&&JSON.parse(YMC.local('userCity')).cardCity) || '上海',
			cityTit : (JSON.parse(YMC.local('userCity'))&&JSON.parse(YMC.local('userCity')).localCity) || '上海',
			storeInfo:{
				storeName:(JSON.parse(YMC.local('userCity'))&&JSON.parse(YMC.local('userCity')).storeName) || '上海博大店',
				storeAddress:(JSON.parse(YMC.local('userCity'))&&JSON.parse(YMC.local('userCity')).storeAddress) || '上海浦东新区国展路189号A-8(博大汽车公园)'
			},
			animateDisable : true,
			pubTitle    : '',
			pubFootbar : false,
			customTop : {
                goback : true,
                share  : false,
                reg    : false,
                log    : false
			},
            isHome      : true,
            loadingShow : false,
            vLoadShow : false,
            effect      : 'next',
            hiddenPageY : false,//转场时截断页面，提高性能
            header      : '要买车',
            isAll       : false,  //是否显示全部

			showSubtit  : false, //pubTitle == 'choose'
			chooseTit   : '',    //pubTitle == 'choose'
			chooseSubtit1 : {
				title:'',
				callBack: function(event){
					this.showSubtit = false;
					this.isAll = true;
					console.log(this);

				}
			},//pubTitle == 'choose'
			chooseSubtit2 : {
				title : '',
				callBack: function(){
					this.showSubtit = false;
					this.isAll = false;
				}
			},//pubTitle == 'choose'

            //是否启用虚拟loading，在某些页面中没有ajax，需要来个假的loading效果，来过场动画
            virtualLoading  : true,
            virtualLoadingShow:false,
            vVirtualLoad:true,
            vVirtualLoadShow:false,
			toast           : { content:'正在加载。。。' }, //用于 toast
            confirm         : {
                title           : '',        //弹出层头部
                content         : '',        //内容
                confirmTxt      : '',        //确认按钮的文字
                cancelTxt       : '',        //取消按钮的文字
                confirmClick : function(){}, //确认回调用
                cancelClick  : function(){}, //取消回调
                //timer         : 3000       //弹出显示时间
			},
            //分享
            share: {
                title   : '',
                content : '',
                imgUrl  : '',
                url     : ''
            },
            //进入页面时分享配置。
            //与 router.app.customTop.share = true; 配合使用
            //router.app.shareCfg = {
            //     title   : opt.title,
            //     content : opt.content,
            //     imgUrl  : opt.imgUrl,
            //     url     : opt.url
            // }
            //配置完后，点击头部的分享。
            shareCfg:{
                title : '',
                content : '',
                imgUrl : '',
                url : ''
            },
			showLeftAside : false,
			asideTowards : 'left',
			// ,
			// asideTowardsY : 'top',
			// showTopAside : false
			cityPara: {},
			isCarmaster: Prius.isCarMaster,
			isInsideApp: Prius.isInsideApp
		}
	},
	// watch: {
	// 	afterEnter: function(val) {
	// 		this.$broadcast('homeRenderEvents', val);
	// 	}
	// },
	components: {
    	modal     : require('./components/modal.vue'),	   // 弹窗
    	asidebar  : require('./components/aside.vue'),     // 首页侧边工具栏
    	//cityaside : require('./components/cityaside.vue'), // 首页顶部下拉
    	loading   : require('./components/loading.vue'),   // 加载中...
    	vload   : require('./components/vload.vue'),   // 加载中...2.0
    	toast     : require('./components/toast.vue'),     // 提示，ajax错误提示
        confirm   : require('./components/confirm.vue'),   // confirm弹出层
    	share     : require('./components/share.vue')      // 分享
    },
	methods: {
		normalGoBack: function() {
            //如果是从本站其他页面过来，则跳回去
            if( (~document.referrer.indexOf(location.host))&&(~document.referrer.indexOf('.html'))){
                if(window.outjumpUrl.viewname == window.currentView){
                    window.location.href = window.outjumpUrl.refer;
                    return;
                }
            }
            var rlist = JSON.parse(YMC.local('routeList')) || [];
            if (Prius.isYaomaiche) {
                //app中路径处理
                var currentUrl = window.location.href;
                YMC.log("current Url ####:" + currentUrl);
                if (currentUrl.indexOf('#') && currentUrl.indexOf('appfrom')) {
                    var urlQuerys = currentUrl.substring(currentUrl.lastIndexOf('?') + 1);
                    YMC.log("substring query ####:" + urlQuerys);
                    if (urlQuerys) {
                        var objects = urlQuerys.split('&');
                        if (objects) {
                            var params = {}, temp;
                            for (var i = 0; i < objects.length; i++) {
                                temp = objects[i].split('=');
                                params[temp[0]] = temp[1];
                            }
                            if (params['appfrom']) {
                                if(rlist && rlist.length > 1){
                                    rlist.splice(rlist.length-1, 1);
                                    YMC.local('routeList', JSON.stringify(rlist));
                                }
                                Prius.pageEnd();
                                return;
                            }
                        }
                    }
                }
            }


			if(rlist && rlist.length > 1) {
                var rt = rlist[rlist.length-2];
                var _route = {
                    name:rt.name
                }
                if(rt.query && (JSON.stringify(rt.query)!=="{}") ) {
                    _route.query = rt.query;
                }

				router.go(_route);
				return;
			}

			YMC.local('routeList',null);
			router.go({name:'home'});
		},
		changeCity: function() {
			if(this.cityPara) {
				router.go(this.cityPara);
			}
		},
        shareFn:function(){
            if(this.shareCfg.title==''){
                // YMC.log('app methods shareCfg.content empty');
                return;
            }
            //2015年12月23日 22:52:41
            this.$emit('share',this.shareCfg);
        }
	},
	events:{
		showLoading:function(){
			this.loadingShow = true;
		},
		hideLoading:function(){
			this.loadingShow = false;
		},
		vShowLoad:function(){
			this.vLoadShow = true;
		},
		vHideLoad:function(){
			// this.vLoadEndFlag = true;
			var _this = this;
			router.app.$broadcast('vLoadEndFn');
			setTimeout(function(){
				_this.vLoadShow = false;
				router.app.$broadcast('vLoadInit');
			}, 320);
		},
		updateTitle: function(args) {
			this.header = args;
		},
		alert:function(msg,timer,cb){
			if($.isFunction(timer)){
				//如果timer是个Function
				//说明是alert('内容',fn)
				cb = timer;
				timer = 0;
			}
			this.toast = {
				content : msg || '',
				timer : timer || 0,
				cb    : cb,
				rd    : Math.random()//增加时间戳，每次都不同
			}
		},
		confirm:function(content,title,fnArr,timer,cancelTxt,confirmTxt){
            if( !(fnArr && fnArr.length == 2) ){
                //没给fnArr时,防止fnArr[index]报错
                fnArr = [0,0];
            };
			this.confirm = {
				title:title,
				content:content,
				confirmTxt:confirmTxt || "确定",
				cancelTxt:cancelTxt || "取消",
				confirmClick: fnArr[1], //取消回调
				cancelClick:fnArr[0] ,  //确认回调用
				timer   : timer        //弹出显示时间
			}
		},
        share:function(opt){
            this.share = {
                title    : opt.title ,
                content  : opt.content || '【自控车源，自信车价，自营门店，自在体验】-要买车，让买车轻松一点' ,
                shareUrl : opt.url ,
                imgUrl   : opt.imgUrl
            }
        },
        showVirtualLoading:function(){
            var _this = this;
            if(this.virtualLoading){
                this.virtualLoadingShow = true;
                setTimeout(function(){
                    _this.virtualLoadingShow = false;
                }, 650);
            }
        },
        vShowVirtualLoad:function(){
            var _this = this;
            if(this.vVirtualLoad){
                this.vVirtualLoadShow = true;
                setTimeout(function(){
                    // _this.vVirtualLoadShow = false;
					router.app.$broadcast('vLoadEndFn');
					setTimeout(function(){
						_this.vVirtualLoadShow = false;
						router.app.$broadcast('vLoadInit');
					}, 320);
                }, 650);
            }
        }
	},
	created: function () {

	},
	ready: function() {


	}
};
</script>