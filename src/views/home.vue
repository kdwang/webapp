<template>
    <div class="homepage">
        <div id="main" class="mainautow mainhd mainbtm">
            <div class="home-topbar">
                <span @click="changeCity" ubt="citys" gsq="切换城市" class="home-change-city iho iho-7"></span>
                <h2>{{storeInfo.storeName}}</h2>
                <p>{{storeInfo.storeAddress}}</p>
            </div>
            <div class="main_cnt home_cnt">
                <div class="swiper-container" v-el:swper>
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide" v-for="item in data_banner" v-if="$index<4">
                            <a href="{{item.linkUrl}}"><img :src="item.picUrl | imgUrl" alt=""></a>
                        </li>

                    </ul>
                </div>

                <div class="home-sec home-hot" v-if="data_hotCar.length>0">
                    <div class="home-sec-tlt">
                         <a v-link="{ name: 'hotcar' }" class="home-more" gsq="更多热销车型">
                            <div class="home-sec-tlt-txt"><i class="iho iho-hotcart iho-1-6"></i>特价现车</div>
                            <a v-link="{ name: 'hotcar' }" class="home-sec-more" gsq="更多热销车型"></a>
                        </a>
                    </div>
                    <ul class="home-sec-main clearfix">
                        <li class="home-sec-prod" v-for="item in data_hotCar">
                            <a class="home-prod-link" v-link="{ name: 'product', query: { id: item.carGoodsId }}" ubt="carId_{{item.carGoodsId}}" gsq="{{item.carGoodsId}}" gsqName="{{item.title}}">
                                <div class="prod-img" v-sturl="item.picURL"></div>
                                <p class="home-prod-name">{{item.title}}</p>
                                <div class="price_wrap">
                                    <del>市场指导价：<em>{{item.officialPrice | priceW}}</em>万元</del>
                                    <p><span class="price-bg">{{item.ymcPrice | priceW}}</span>万元</p>
                                    <p class="txt-tag-wrap" v-if="item.priceGap > 0"><span class="txt-tag">直降<span>{{item.priceGap | priceW}}</span>万元<i class="iho iho-5"></i></span></span></p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="home-sec home-flash" v-if="flash_show">
                    <div class="home-sec-tlt">
                        <div class="home-sec-tlt-txt"><i class="iho iho-1 iho-1-2"></i>闪购专场</div>
                    </div>
                    <div class="flash_item" v-for="(index, item) in data_flash" v-if="item.activityList.length>0 && !item.st0">

                        	<div class="tit"><h3 :style="index==0?'padding-top:0':''"><i class="iho iho-l"></i><span>{{item.name}}</span><i class="iho iho-r"></i></h3></div>
	                        <div class="bd" gsq="{{item.id}}">
	                            <div class="flash_cont">
                                    <a v-link="{name: 'rush', query:{cateId: item.id}}">
                                    <!-- <a href="http://msite.tmp3.platform.ymc.com/#/rush?cateId={{item.id}}"> -->
                                        <img :src="item.backgroudImageUrl | imgUrl" alt="" />
                                    </a>
                                    <div class="iho iho-9">
                                        <div class="flash_tag">
                                            <p>{{item.beginDate}}</p>
                                            <p>闪购</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- <div class="flash_state" v-if="item.st0">
                                    <p>报名时间 {{item.enroll_time}}</p>
                                </div> -->
                                <div class="flash_state" v-if="item.st1"> <!-- 闪购报名 -->
                                    <a class="flash_btn" v-link="{name: 'rush', query:{cateId: item.id}}">立刻报名</a>
                                    <p>报名时间：{{item.enroll_time}}</p>
                                </div>
                                <div class="flash_state" v-if="item.st2"> <!-- 闪购倒计时 -->
                                    <div class="clock">{{{times[item.name] | countdown 2}}}</div>
                                    <p>闪购倒计时</p>
                                </div>
                                <div class="flash_state" v-if="item.st3"> <!-- 闪购进行中 -->
                                    <a class="flash_btn" v-link="{name: 'rush', query:{cateId: item.id}}">立刻闪购</a>
                                    <p>闪购进行中</p>
                                </div>
                            </div>

                    </div>

                </div>

                <div class="home-sec">
                    <div class="home-sec-tlt">
                        <div class="home-sec-tlt-txt"><i class="iho iho-1 iho-1-3"></i>购车笔记</div>
                        <!-- <a href="javascript:;" v-link="" class="home-sec-more"><i class="iho iho-8"></i></a> -->
                    </div>
                    <ul class="home-sec-main home-sec-diary clearfix">
                        <li class="home-sec-prod">
                            <a v-for="item in data_noteList_l" v-link="{ name: 'purchaseNote', query: { id: item.id }}" class="home-prod-link">
                                <div class="diary-img-wrap" v-sturl="item.coverImgUrl">
                                    <!-- <div class="diary-like"><i class="iho iho-4"></i>99+</div> -->
                                    <div class="price_wrap"><span class="price-bg">{{item.carPrice | priceW}}</span>万元</div>
                                    <img class="diary-author" :src="item.headImgUrl" alt="" />
                                </div>
                                <div class="diary-fe">
                                    <h3 class="diary-cap">{{item.title}}</h3>
                                    <div class="txt-tag-wrap">
                                        <span class="txt-tag" v-for="tag in item.driveExperienceLabels">{{tag}}<i class="iho iho-6"></i></span></span>
                                        <span class="txt-tag" v-for="tag in item.purchaseExperienceLabels">{{tag}}<i class="iho iho-6"></i></span></span>
                                    </div>
                                    <p class="buycar-time">{{item.orderDate}} 购车</p>
                                </div>
                            </a>
                        </li>
                        <li class="home-sec-prod">
                            <a v-for="item in data_noteList_r" v-link="{ name: 'purchaseNote', query: { id: item.id }}" class="home-prod-link">
                                <div class="diary-img-wrap" v-sturl="item.coverImgUrl">
                                    <!-- <div class="diary-like"><i class="iho iho-4"></i>99+</div> -->
                                    <div class="price_wrap"><span class="price-bg">{{item.carPrice | priceW}}</span>万元</div>
                                    <img class="diary-author" :src="item.headImgUrl" alt="" />
                                </div>
                                <div class="diary-fe">
                                    <h3 class="diary-cap">{{item.title}}</h3>
                                    <div class="txt-tag-wrap">
                                        <span class="txt-tag" v-for="tag in item.driveExperienceLabels">{{tag}}<i class="iho iho-6"></i></span></span>
                                        <span class="txt-tag" v-for="tag in item.purchaseExperienceLabels">{{tag}}<i class="iho iho-6"></i></span></span>
                                    </div>
                                    <p class="buycar-time">{{item.orderDate}} 购车</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- <div class="home-sec home-other-banner">
                    <a href="javascript:void(0)"><img src="../imgs/750x300.jpg" alt="" /></a>
                </div> -->

                <div class="home-sec">
                    <div class="home-sec-tlt">
                        <div class="home-sec-tlt-txt"><i class="iho iho-1 iho-1-4"></i>超简购车体验，最快7天提车</div>
                    </div>
                    <ul class="buycar-steps clearfix">
                        <li class="buycar-step-1">
                            <div class="buycar-step-ico"><i class="iho iho-2 iho-2-1"></i></div>
                            <p>线上选车付定金</p>
                        </li>
                        <li class="buycar-step-2"><i class="iho iho-3"></i></li>
                        <li class="buycar-step-1">
                            <div class="buycar-step-ico"><i class="iho iho-2 iho-2-2"></i></div>
                            <p>到店提车付余款</p>
                        </li>
                        <li class="buycar-step-2"><i class="iho iho-3"></i></li>
                        <li class="buycar-step-1">
                            <div class="buycar-step-ico"><i class="iho iho-2 iho-2-3"></i></div>
                            <p>开着汽车回家咯</p>
                        </li>
                    </ul>
                </div>
                <div class="home-sec">
                    <div class="home-sec-tlt">
                        <div class="home-sec-tlt-txt"><i class="iho iho-1 iho-1-5"></i>我们的承诺</div>
                    </div>
                    <div class="prom">
                        <div class="prom-sec">
                            <a v-link="{name:'refund-notice'}" class="promore">
                                <div class="prom-ico prom-ico-1">30</div>
                                <div class="promain">
                                    <h3 class="promain-tlt">30天无理由退车</h3>
                                    <p class="promain-dtl ellips_line2">提车30天内，可以享受30天无理由退车，消除您一切顾虑</p>
                                </div>
                                <i class="iho iho-8"></i>
                            </a>
                        </div>
                        <div class="prom-sec">
                            <a v-link="{name:'warranty-services'}" class="promore">
                                <div class="prom-ico prom-ico-2">3</div>
                                <div class="promain">
                                    <h3 class="promain-tlt">全国联保国家3包</h3>
                                    <p class="promain-dtl ellips_line2">消费者可凭“三包凭证”和购车发票依法享受国家《汽车三包规定》内的“3包”权益</p>
                                </div>
                                <i class="iho iho-8"></i>
                            </a>
                        </div>
                        <div class="prom-sec">
                            <div class="prom-ico prom-ico-3">6</div>
                            <div class="promain">
                                <h3 class="promain-tlt">出厂6个月内新车</h3>
                                <p class="promain-dtl ellips_line2">所售车辆全部是国内外正规汽车制造厂商生产、经检验合格、出厂日期在6个月内新车</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ymc-info-wrap">
                    <div class="ymc-info">
                    	<a class="phone" href="tel:400-928-9099">客服电话：400-928-9099</a>
                    </div>
                    <div v-show="showHelp" class="ymc-info">
                        <a v-link="{name: 'aboutUs'}">关于我们</a><a v-link="{name: 'helpIndex'}">帮助中心</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="freeFreight" v-show="freeMask"><span @click="maskControl"></span></div>
        <div class="freeMask" v-show="freeMask"></div>
    </div>
</template>

<script>
require('../../node_modules/swiper/dist/css/swiper.min.css');
var Swiper = require('swiper');
module.exports = {
    data: function(){
        return {
            header : 'home',
            freeMask : false,
            data_brandList : [], // 品牌列表
            data_banner : [], // 焦点图
            data_hotCar : [],  // 热销车型
            data_noteList_l : [], // 购车笔记
            data_noteList_r : [],
            data_flash : [],
            flash_show : false,
            flash_nodes : [],
            times : {},
            timeRun: false,
            isActivate  : false,//该城市是否激活融资租赁
            superLoan   : {},//超级贷
            storeInfo :{},//门店信息[name address];
            showHelp:true,
            homeSlide: null
        }
    },
    route: {
        data: function(transition) {
            var _this = this;
            _this.storeInfo = router.app.storeInfo;
            var appVer = Prius.clientVersion;
            if(appVer && (appVer=='2.0.0')){
                //app2.0下隐藏
                _this.showHelp = false;
            }
            // 渲染页面数据
            _this.renderAll();

            //如果是首页那么清空路由，避免路由过长
            if(transition.to.name == 'home'){
                window.routeList = [window.routeList[window.routeList.length-1]];
            }

            transition.next();
        },
        canActivate: function(transition) {

            transition.next();
        },
        canDeactivate: function(transition) {

            transition.next();
        }
    },
    events: {
        homeRenderEvents : 'renderAll'
    },
    methods: {
        changeCity: function() {
            var cityPara = router.app.cityPara;
            var userCity = JSON.parse(YMC.local('userCity')) || {};
            //解决在app中定位问题
            if(JSON.stringify(cityPara)=='{}' && userCity.cardCity) {
                router.go({name:'store'});
                return;
            }
            if(JSON.stringify(cityPara)=='{}' && !userCity.cardCity){
              router.go({name:'local_error'})
              return;
            }
            router.go(cityPara);
        },
        countDown: function() { // 倒计时
            var _this = this,
                reload = false,
                temp = _this.times;

            _this.times = {};

            for(var i in temp) {
                temp[i] -= 1;
                if(temp[i] < 0) {
                    reload = true;
                }
            }

            _this.times = temp;

            if(reload == true) {
                clearInterval(this.timer); // 重载数据前必须清除定时器

                // 页面reload时清空原有对象
                _this.data_flash = [];
                _this.flash_show = false;
                _this.times = {};
                _this.timeRun = false;
                _this.flash_nodes = [];

                // 重载
                _this.renderAll();
            }
        },
        renderAll: function() {
            var _this = this;
            if(!YMC.local('localVertion')){
                YMC.local('userCity', null);
                YMC.local('localV', null);
            }

            YMC.ajax({
                url: '../index/getIndex', // http://ecmobile.shgqc.ymc.com/api
                showLoading: true,
                data: {
                    CityId: router.app.cityId
                },
                success: function(res) {
                    if(!res.success){
                        VUI.alert(res.error.message);
                        return;
                    }

                    YMC.local('localVertion',1.1);

                    if(res.result.groupPurchaseHomePageList.length == 0  && res.result.homeAdvertise.length  == 0  && res.result.hotCarGoodsList.length == 0){
                        var userCity = JSON.parse(YMC.local('userCity'));

                        //var defaultId = "7d04e3a1-ee87-431c-9aa7-ac245014c51a"; // 上海
                        userCity.cityId = '7d04e3a1-ee87-431c-9aa7-ac245014c51a';
                        router.app.cityId  = userCity.cityId;
                        router.app.cityTit = '上海';
                        userCity.localCity = "上海";

                        /**
                         * Date:2016年1月28日17:35:43
                         * Writer:weijing
                         * For : 如果选择的交互中心首页没有数据,将所有的storeName和storeAddress还原,否则没有数据的交互中心对应的id为上海
                         */
                        userCity.storeName = "上海博大店";
                        userCity.storeAddress = "上海浦东新区国展路189号A-8(博大汽车公园)";
                        _this.storeInfo = router.app.storeInfo = {
                            storeName:'上海博大店',
                            storeAddress:'上海浦东新区国展路189号A-8(博大汽车公园)'
                        }
                        YMC.local('userCity',JSON.stringify(userCity));
                        // 目标位置没有门店则无数据，重新请求默认数据; 无门店fe74b0e9-ad83-4855-8583-c49193d04daa


                        _this.renderAll();

                    } else {
                        _this.data_banner = res.result.homeAdvertise;
                        _this.data_hotCar = res.result.hotCarGoodsList.slice(0,2);

                        // 闪购
                        _this.data_flash = res.result.panicBuyingCategoryList;

                        for(var i=0; i<_this.data_flash.length; i++) {

                            if( _this.data_flash[i].activityList[0] ) {
                                _this.flash_show = true; // 用来控制“闪购专场”标题的显示

                                // 取闪购tag标签上的时间
                                var flash_start = '';
                                for(var j=0; j<_this.data_flash[i].activityList[0].panicBuyingActivityNodeList.length; j++) {
                                    var flash_start_date = _this.data_flash[i].activityList[0].panicBuyingActivityNodeList;
                                    if(flash_start_date[j].activityNodeCodeType == 3) {
                                        //console.log(flash_start_date[j].beginDate);
                                        flash_start = flash_start_date[j].beginDate;
                                    }
                                }
                                _this.data_flash[i].beginDate = (new Date(flash_start.replace(/-/g, "/")).getMonth() + 1) + '-' + new Date(flash_start.replace(/-/g, "/")).getDate();

                                var curNode = _this.data_flash[i].activityList[0].currentActivityNode, // 每个活动的当前节点相关信息
                                    stage = curNode.activityNodeCodeType, // 当前节点编号
                                    enroll_time = '';

                                _this.flash_nodes.push(stage); // 储存所有活动的节点信息

                                switch(stage) {
                                    case 0 : // 预热
                                        _this.data_flash[i].st0 = true;
                                        break;
                                    case 1 : // 报名
                                        _this.data_flash[i].st1 = true;
                                        enroll_time
                                            = curNode.beginDate.replace(/\s[\x00-\xff]*/g, '') + ' ~ ' + curNode.endDate.replace(/\s[\x00-\xff]*/g, '');
                                        break;
                                    case 2 : // 倒计时阶段
                                        _this.data_flash[i].st2 = true;
                                        // 将倒计时传入可操控的对象内
                                        _this.times[_this.data_flash[i].name] = parseInt(curNode.remainingTime) + 2;
                                        _this.timeRun = true;
                                        break;
                                    case 3 : // 抢购
                                        _this.data_flash[i].st3 = true;
                                        break;
                                };

                            }

                            _this.data_flash[i].enroll_time = enroll_time;

                        }

                        // 检测是否所有活动都在预热阶段
                        var total = 0;
                        for(var i=0; i<_this.flash_nodes.length; i++){
                            total += _this.flash_nodes[i];
                        }
                        if(total == 0) _this.flash_show = false;

                        // 调用倒计时
                        if(_this.timeRun) {
                            _this.timer = setInterval(_this.countDown, 1000);
                        }

                        // slide
                        //if(!_this.homeSlide) {  // 处理返回该页面时的重复绑定问题
                            Vue.nextTick(function () {
                                _this.homeSlide = new Swiper(_this.$els.swper, {
                                    // effect : 'cube',
                                    // cube: {
                                    //     slideShadows: false,
                                    //     shadow: false
                                    // },
                                    //speed: 600,
                                    pagination: '.swiper-pagination',
                                    paginationClickable: true,
                                    autoplay: 3000,
                                    loop: true,
                                    autoplayDisableOnInteraction: false
                                });
                            });
                        //}
                        _this.slidePlayControl = setTimeout(function(){
                            _this.homeSlide.startAutoplay();
                        }, 1000);
                    }

                }
            });

            // note
            YMC.ajax({
                url: '../services/Content/Recommend/GetRecommendPurchaseNoteList',
                showLoading: true,
                data: {
                    cityId: router.app.cityId, // '7d04e3a1-ee87-431c-9aa7-ac245014c51a'
                    //推荐位置编号
                    recommendPositionCode: 'sy005',
                    pageSize: 20,
                    pageIndex: 1
                },
                success: function(res) {

                    var item_l = [], item_r = [];
                    for(var i=0; i<res.result.length; i++) {
                        if(res.result[i].orderDate !== null){ //新增判断 ZQJ 2016-02-03 12:02
                            res.result[i].orderDate = res.result[i].orderDate.replace(/\s[\x00-\xff]*/g, '');
                            if(i % 2 == 0) {
                                item_l.push(res.result[i]);
                            } else {
                                item_r.push(res.result[i]);
                            }
                        }
                    }
                    _this.data_noteList_l = item_l;
                    _this.data_noteList_r = item_r;
                }
            });

        },
        maskControl: function() {
            if(this.freeMask) {
                this.freeMask = false;
            } else {
                this.freeMask = true;
            }

        }
    },
    ready: function(){
        YMC.local('setBrandId',null);
        var that = router.app;
        var defaultCity = that.cityId;
        YMCMap.Location({
            success: function(data){
                if(data.cityId != ''){
                    if((data.cityId !== defaultCity) && (data.cityId !== '7d04e3a1-ee87-431c-9aa7-ac245014c51a')) {
                        that.cityId = data.cityId;

                        that.cityTit = data.localCity;
                        that.$broadcast('homeRenderEvents');
                    }

                    that.cityPara.name = 'store';
                }
                if(data.cityId == '7d04e3a1-ee87-431c-9aa7-ac245014c51a' || data.cityId == defaultCity){
                    return false;
                }

            },
            error: function(error){

                switch(error.code){
                    case error.TIMEOUT:
                        VUI.alert("定位超时,请稍后再试!", 2000);
                        break;
                    case error.POSITION_UNAVAILABLE:
                        VUI.alert('抱歉,我们无法定位你当前位置!',2000);
                        break;
                    case error.PERMISSION_DENIED:
                        VUI.alert('请开启定位功能', 2000);
                        break;
                    case error.UNKNOWN_ERROR:
                        VUI.alert('发生位置错误!', 2000);
                        break;
                    default:
                        VUI.alert('定位失败!', 2000);
                        break;
                }

                var userCity = JSON.parse(YMC.local('userCity')) || {};
                if(!userCity.cardCity){
                    that.cityPara.name = 'local_error';
                }else{
                    that.cityPara.name = 'store';
                }
            },
            notReLocation: function(data){
                    that.cityPara.name = 'store';
            }
        });




        /**
         * 地推活动统计
         * 根据url中的type和codeId,得出shareType
         */
        var type = this.$route.query.type;

        // 优惠券ID存入local
        var prom = this.$route.query.PromotionCode;
        if(!type){
            prom && YMC.local('PromotionCode',prom);
        }
        var codeId = prom;
        var ajaxUrl = 'Marketing/BasicStatistics/CreateBasicStatistics';
        var shareType = "";

        if(type){

            if(codeId == '6MTN9EY'){
              YMC.ajax({
                  url: ajaxUrl,
                  data: {
                      "StatisticsType": 'ErXiongDiYmcPage',
                      "Param1": codeId,
                      "Param2": type,
                  },
                  success:function(res){
                      //不作处理
                  }
              })
              return false;
            }

            if(type == 'MNYS'){
                shareType = 'MnysYmcPage';
            }else if(type == 'DTYX'){
                shareType = 'DtyxUserYmcPage';
            }else if(type = 'MassSmS'){
              shareType = 'MassSmS';
            }

            // 用户确认分享后执行的回调函数
            YMC.ajax({
                url: ajaxUrl,
                data: {
                    "StatisticsType": shareType,
                    "Param1": codeId
                },
                success:function(res){
                    //不作处理
                }
            })
        }

    },
    detached: function(){ // 离开页面时清除定时器

        this.homeSlide.stopAutoplay();

        clearInterval(this.slidePlayControl);

        clearInterval(this.timer);
        this.timeRun = false;

    }
};
</script>

<style>
/*.homepage{height: 100%;}*/
.homepage .mainhd{padding-top: 0;}
.iho{display: inline-block;overflow: hidden;background-image:url(../imgs/ico-index3.png);background-repeat: no-repeat;background-size: 120px 130px;}
.iho-1{width: 16px;height: 16px;}
.iho-hotcart{width: 17px;height:17px;}
.iho-1-1{background-position: 0 0;}
.iho-1-2{background-position: 0 -18px;}
.iho-1-3{background-position: 0 -36px;}
.iho-1-4{background-position: 0 -54px;}
.iho-1-5{background-position: 0 -72px;}
.iho-1-6{background-position: -49px -80px;}
.iho-2{height: 47px;}
.iho-2-1{width: 31px;background-position: -18px 0;}
.iho-2-2{width: 37px;background-position: -51px 0;}
.iho-2-3{width: 30px;background-position: -90px 0;}
.iho-3{width: 14px;height: 17px;background-position: -18px -49px;}
.iho-4{width: 11px;height: 11px;background-position: -34px -49px;}
.iho-5{width: 6px;height: 15px;background-position: -18px -68px;}
.iho-6{width: 5px;height: 20px;background-position: -26px -68px;}
.iho-7{width: 29px;height: 29px;background-position: -47px -47px;}
.iho-8{width: 6px;height: 10px;background-position: -34px -62px;}
.iho-9{ width: 30px; height: 80px; background-position: -90px -50px;}
.iho-l{ width: 6px; height: 9px; background-position: 0 -91px;}
.iho-r{ width: 6px; height: 9px; background-position: -7px -91px;}



.home_cnt{ margin-top: -50px;}
.homepage .swiper-container { min-height: 190px; margin: 0 auto; position: relative; overflow: hidden; z-index: 1; text-align: center;}
#main .swiper-container-3d{ perspective: none; -webkit-perspective: none;}
.homepage .swiper-container img { display: block; width: 100%; background-size: 100% 100%;}

.homepage .swiper-slide a { display: block; width: 100%; height: 100%;}

.home-topbar{ width: 100%; height: 50px; position: absolute; top: 0; left: 0; text-align: center; color: #fff; line-height: 18px; position: relative; z-index: 100; background: -webkit-linear-gradient(top , rgba(0,0,0,.5), rgba(0,0,0,0));}
.home-change-city{ position: absolute; top: 10px; left: 8px; z-index: 100;}
.home-topbar h2{ padding-top: 10px; font-weight: normal;}
.home-topbar p{ display: inline-block; width: 50%; height: 18px; overflow: hidden; font-size: 12px; text-overflow: ellipsis; white-space: nowrap;}
.home-sec{ background-color: #f4f4f4;}
.home-sec-tlt{position: relative;width: 80%;height: 16px;margin:0 auto;padding:14px 0;text-align: center;color: #666;font-size: 14px;line-height: 16px;background: -webkit-linear-gradient(bottom, rgba(0,0,0,0) 49%, #d4d4d4 49%, #d4d4d4 51%, rgba(0,0,0,0) 51%);}
.home-sec-tlt .home-sec-more{position: absolute;top:0;bottom: 0;right:-32px;height: 44px;width:32px;text-align: center;}
.home-sec-tlt .home-more {display:block;color: #666;}
.home-sec-tlt .home-sec-more::before{content:"";position: absolute;top: 50%;left: 50%;width: 8px;height: 8px;margin-top: -4px;margin-left: -4px;border-top: 2px solid #999;border-right: 2px solid #999;-webkit-transform: rotate(45deg);transform: rotate(45deg);}
.home-sec-tlt .home-sec-more:active::before{border-color: #656363;}
/*.home-sec-tlt .home-sec-more .iho-8{margin-top: 17px;}*/

.home-sec-tlt .home-sec-tlt-txt{display: inline-block;padding: 0 16px;background-color: #f4f4f4;}
.home-sec-tlt .iho-1,.home-sec-tlt .iho-hotcart{margin-right: 10px;vertical-align: -2px;}
.home-sec-main{background-color: #fff;}
.home-sec-main .home-sec-prod{float: left;width: 50%;box-sizing:border-box;}
.home-sec-main .home-sec-prod:nth-child(2n){border-left: 1px solid #f0f0f0;}
.home-sec-prod .home-prod-link{display: block;padding: 10px 0;text-align: center;}
.home-prod-link .prod-img{width: 100%;min-height: 120px;background-repeat: no-repeat;
background-position: center center;background-size: contain;}
.home-prod-link .home-prod-name{min-height: 63px;margin-bottom:4px;padding:0 6px;color: #444;}
.home-prod-link .price_wrap del{font-size: 12px;color: #ccc;}
.price_wrap .price-bg{margin-right: 4px;font-size: 18px;color:#f71e16;}

.price_wrap .txt-tag{position: relative;display: inline-block;margin-left:-3px;height: 15px;padding:0 8px;font-size: 12px;line-height: 16px;color:#fff;background-color: #fdd000;border-radius: 1px;}

.price_wrap .txt-tag .iho-5{position: absolute;right: -5px;top:0;bottom: 0;}

.flash_item .tit{ text-align: center; color: #999;}
.flash_item .tit h3{ height: 20px; line-height: 20px; padding: 10px 0; font-weight: normal; font-size: 12px;}
.flash_item .tit h3 span{ margin: 0 9px;}
.flash_item .bd{ padding: 0 4px; overflow: hidden; background-color: #fff;}
.flash_item .flash_cont{ position: relative; border-bottom: 1px solid #e5e5e5;}

.flash_item .flash_cont img{ display: block; width: 100%;min-height: 114px;}

.flash_item .flash_cont .iho-9{ position: absolute; top: 0; left: 8px;}
.flash_item .flash_cont .flash_tag{ width: 100%; padding-top: 44px; line-height: 16px; color: #fff; text-align: center;}
.flash_item .flash_cont .flash_tag p{ font-size: 12px; white-space: nowrap; -webkit-transform:scale(0.9,0.9);}
.flash_item .flash_state{ position: relative; padding: 10px 8px; line-height: 30px;}
.flash_item .flash_state p{ font-size: 14px; color: #333;}
.flash_item .flash_btn{ display: block; float: right; height: 30px; line-height: 30px; padding: 0 15px; text-align: center; color: #fff; background-color: #f65252; border-radius: 3px;}
.flash_state .clock{ float: right; height: 30px; line-height: 30px;}
.flash_state .clock i{ display: inline-block; width: 28px; height: 30px; margin: 0 5px; text-align: center; color: #ffa320; background: url(../imgs/ico-index3.png) no-repeat; background-size: 120px 130px; background-position: -16px -91px;}


.home-sec-diary .home-prod-link{padding: 15px 12px 5px;text-align: left;}
.home-sec-diary .diary-img-wrap{position: relative;width: 100%;height: 170px;margin-bottom: 18px;background-repeat: no-repeat;
background-position: center center;background-size: cover;background-color: #f4f4f4;}
.home-sec-diary .diary-img-wrap .diary-author{position: absolute;left:-2px;bottom: -15px;width: 40px;height: 40px;border-radius: 22px;border:2px solid #fff;background-color:#fff;}
.home-sec-diary .diary-like{position: absolute;top:4px;left: 4px;width: 40px;height: 20px;padding:0 4px;font-size: 12px;line-height: 20px;color: #fff;border-radius: 2px;background: rgba(0,0,0,.5);}
.home-sec-diary .diary-like .iho-4{margin-right: 4px;vertical-align: -1px;}
.home-sec-diary .price_wrap{position: absolute;left: 0;right: 0;bottom: 0;height: 24px;padding: 12px 8px 4px;/*width: 100%;*/font-size: 12px;color: #fff;text-align: right;background: -webkit-linear-gradient(top, rgba(0,0,0,0), rgba(0,0,0,.7));}
.home-sec-diary .price_wrap .price-bg{font-size: 16px; color: #fff;}
.home-sec-diary .diary-cap{font-weight: normal;}
.home-sec-diary .diary-fe{padding-left: 5px;}
.home-sec-diary .txt-tag-wrap{margin-top:10px;font-size: 0;}
.home-sec-diary .buycar-time{font-size: 12px;color: #999;}
.home-sec-diary .txt-tag{position: relative;display: inline-block;height: 20px;padding:0 8px;margin:0 10px 10px 0;font-size: 12px;line-height: 20px;color: #999;background-color: #eee;border-radius: 1px;}
.home-sec-diary .txt-tag .iho-6{position: absolute;top:0;bottom:0;right:-4px;}

.buycar-steps{padding:16px 0;font-size: 12px;color: #666;background-color: #fff;}
.buycar-steps li{float: left;text-align: center;}
.buycar-steps .buycar-step-1{width:30%;}
.buycar-steps .buycar-step-2{width: 5%;padding-top: 35px;}
.buycar-step-1 .buycar-step-ico{width: 68px;height: 68px;margin:0 auto 12px;border:6px solid #f0f0f0;border-radius: 40px;background-color:#fff;}
.buycar-step-1 .buycar-step-ico .iho-2{margin-top: 10px;}

.prom{background-color: #fff;}
.prom .prom-sec{position: relative;height: 90px;padding:0;}
.prom .prom-sec + .prom-sec{border-top:1px solid #f0f0f0;}
.prom-sec .promore{position: relative;display: block;width: 100%;height: 100%;}
.prom-sec .promore .iho-8{position: absolute;top:40px;right: 12px;}
.prom-sec .prom-ico{position: absolute;top:15px;left: 5%;height: 60px;width: 60px;text-align: center;font:bold 30px/60px arial,tahoma;color: #fff;border-radius: 10px;}
.prom-sec .prom-ico-1{background-color: #1bcfb8;}
.prom-sec .prom-ico-2{background-color: #52c2e7;}
.prom-sec .prom-ico-3{background-color: #ffb745;}
.prom-sec .promain{padding:15px 8% 15px 25%;}
.promain .promain-tlt{margin-bottom: 3px;color:#444;font-size: 14px;font-weight: normal;}
.promain .promain-dtl{height: 36px;color:#999;font-size: 12px;}

@media screen and (max-width: 340px){
    .home-sec-diary .txt-tag{padding: 0 4px;margin-right: 8px;}
    .prom-sec .prom-ico{left: 4%;}
}

.home-other-banner img{ display: block; width: 100%;}

.homepage .mainbtm{padding-bottom: 51px;}
.homepage .ymc-info-wrap{padding:15px 0;background-color: #f4f4f4;}
.homepage .ymc-info-wrap .ymc-info{height:44px;padding:0 12px;line-height: 44px;font-size: 14px;text-align: center;color: #999;background-color: #fff;}
.homepage .ymc-info-wrap .ymc-info + .ymc-info{border-top: 1px solid #F5F5F5;}
.homepage .ymc-info a{margin:0 10px;padding: 12px 10px;color: #333;}

.homepage a.phone:before {
	content:"";
    display:block;
    height:24px;
    width:24px;
    background:url("../imgs/helpCenter.png") no-repeat 0 0;
    background-size:175px 209px;
    position:absolute;
    left: 2px;
    top: 10px;
    background-position: -41px -59px;
}
.homepage a.phone{
    padding-left: 25px;
    color: #999;
    position: relative;
}
</style>
