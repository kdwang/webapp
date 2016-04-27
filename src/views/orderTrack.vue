<template>
    <div id="orderTrack" class="mainautow vordertrack vtuan" style="padding:51px 0 0;">
        <div class="vordertrackn" v-show="nodata">
            <div class="orderTrack">
                <p>您还没有任何订单哦！</p>
            </div>
        </div>
        <div class="orderTrack" v-show="!nodata">
            <div class="tab tab_styleB ">
                <div class="aff"></div>
                <div class="swiper-container" id="TAB">
                    <div class="swiper-wrapper">

                        <div v-for="item in navData" order-num="{{item.number}}" class="swiper-slide swiper-slideW">
                            <a :class="{'current':showTabIndex==$index}" href="javascript:;" @click.stop="renderInfo(item.number,$index)" >订单{{item.number}}</a>
                        </div>
                        <!-- <div class="swiper-slide swiper-slideW ">
                            <a :class="{'current':showTabIndex==-1}" href="javascript:;"  @click.stop="renderTuan()">我的团购订单</a>
                        </div> -->
                        <!-- <div class="swiper-slide swiper-slideW">
                            <a href="#" class="current">订单1213456788</a>
                        </div>
                        <div class="swiper-slide swiper-slideW ">
                            <a href="myTuanCar.html" class="">我的团购订单</a>
                        </div>
                        <div class="swiper-slide swiper-slideW">
                            <a href="#" class="">订单1213456788</a>
                        </div>
                        <div class="swiper-slide swiper-slideW">
                            <a href="#" class="">订单1213456788</a>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="orderF">
                <div class="order-normal" v-show="!showTuan">
                    <div class="dec-box">
                    <template v-for="item in navData">
                        <ul class="dec" v-show="$index==showTabIndex" >
                            <li>订单状态：<b>{{item.statusName}}</b>    </li>
                            <li ubt="orderDetail" class="item_arr-right" data-id="{{item.id}}"><a v-link="{name:'orderDetail',query:{id:item.id}}"  >{{item.carName}}</a></li>
                        </ul>
                    </template>
                        <!-- <ul class="dec">
                            <li>订单状态：<b>余款已支付</b></li>
                            <li class="item_arr-right"><a href="#">帕萨特 2014款1.8TSI DSG御尊版帕萨特 2014款1.8TSI DSG御尊版帕萨特 2014款1.8TSI DSG御尊版帕萨特 2014款1.8TSI DSG御尊版帕萨特 2014款1.8TSI DSG御尊版帕萨特 2014款1.8TSI DSG御尊版</a></li>
                        </ul> -->
                    </div>
                    <!-- start -->
                    <div class="stepTabs abs_size clearfix">
                        <a ubt="carOrder" href="javascript:;" class="active">车辆交付</a>
                        <a ubt="schemeLoanOrder" href="javascript:;">车贷申办</a>
                        <a ubt="insuranceOrder" href="javascript:;">车险申办</a>
                        <a href="javascript:;" style="display:none">精品处置</a>
                    </div>
                    <div id="orderTracktabs-container" class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="content-slide">
                                    <ul class="flow_list">
                                    <template v-if="tab1Error">{{tab1Error}}<a href="javascript:;" style="color:#fe9844" @click="renderQueryCarOrderStatus();">重试</a></template>
                                    <li v-for="item in tab1Data" :class="{'first':$index==0,'now':item.isCompplete}">
                                        {{item.statusName}}
                                    </li>
                                        <!-- <li class="first now">采购信息已发出</li>
                                        <li class="now">车辆已到店</li>
                                        <li>已清洁</li>
                                        <li>PDI已检测</li>
                                        <li>已入库</li>
                                        <li>验车准备已就绪</li>
                                        <li>验车已完成</li>
                                        <li>牌证办理已出库</li>
                                        <li>牌证办理完成入库</li>
                                        <li>精品安装已出库</li>
                                        <li>精品完成入库</li>
                                        <li>交车准备已完成</li>
                                        <li>交车已完成</li> -->
                                    </ul>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="content-slide">
                                    <ul class="flow_list">
                                    <template v-if="tab2Error">{{tab2Error}}<a href="javascript:;" style="color:#fe9844" @click="renderSchemeLoanOrderStatus();">重试</a></template>
                                    <li v-for="item in tab2Data" :class="{'first':$index==0,'now':item.isCompplete}">
                                        {{item.statusName}}
                                    </li>
                                      <!--   <li class="first now">采购信息已发出</li>
                                        <li class="now">车辆已到店</li>
                                        <li>已清洁</li>
                                        <li>PDI已检测</li>
                                        <li>已入库</li>
                                        <li>验车准备已就绪</li>
                                        <li>验车已完成</li>
                                        <li>牌证办理已出库</li>
                                        <li>牌证办理完成入库</li>
                                        <li>精品安装已出库</li>
                                        <li>精品完成入库</li>
                                        <li>交车准备已完成</li>
                                        <li>交车已完成</li> -->
                                    </ul>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="content-slide">
                                    <ul class="flow_list">
                                    <template v-if="tab3Error">{{tab1Error}}<a href="javascript:;" style="color:#fe9844" @click="renderQueryCarOrderStatus();">重试</a></template>
                                    <li v-for="item in tab3Data" :class="{'first':$index==0,'now':item.isCompplete}">
                                        {{item.statusName}}
                                    </li>
                                       <!--  <li class="first now">采购信息已发出</li>
                                        <li class="now">车辆已到店</li>
                                        <li>采购信息已发出</li>
                                        <li>车辆已到店</li> -->
                                    </ul>
                                </div>
                            </div>
                            <div class="swiper-slide" style="display:none">
                                <div class="content-slide">
                                    <ul class="flow_list">
                                    <template v-if="tab4Error">{{tab1Error}}<a href="javascript:;" style="color:#fe9844" @click="renderQueryCarOrderStatus();">重试</a></template>
                                    <li v-for="item in tab4Data" :class="{'first':$index==0,'now':item.isCompplete}">
                                        {{item.statusName}}
                                    </li>
                                       <!--  <li class="first now">采购信息已发出</li>
                                        <li class="now">车辆已到店</li>
                                        <li>采购信息已发出</li>
                                        <li>车辆已到店</li> -->
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end -->
                </div>
                <div ubt="groupOrder" id="ordertrack-order-tuan" class="order-tuan" v-show="showTuan">
                     <p v-if="noTuanData" class="tc mt10 f14">暂无团购订单，<a v-link="{name:'home'}">去要买车首页看看吧！</a></p>
                    <div class="car_list tuanCar">
                        <ul>
                            <li v-for="item in tuanData" class="tuan-bill" data-billid="{{item.groupOrderNo}}" data-removeid="{{item.id}}">
                                <div class="tuan-status-hd"><span>
                                <template v-if="item.orderStatus===0"> 预订成功</template>
                                <template v-if="item.orderStatus===1"> 订单已确定 </template>
                                <template v-if="item.orderStatus===2">订单已取消</template>
                                </span><a href="javascript:;" class="btm-hd-more">{{item.orderCreateTime}}</a></div>
                                <div class="tuan-prodinfo" data-id="{{item.carGoodsId}}">
                                    <div class="tuan-sec-left">
                                        <img class="tuan-prod-img" src="../imgs/touch-icon-iphone4.png" data-src="{{item.picURL}}" />
                                    </div>
                                    <div class="tuan-sec-main">
                                        <h2 class="tuan-cartitle ellips">{{item.carGoodsTitle}}</h2>
                                        <h2 class="tuan-cartitle ellips">外饰/内饰：{{item.externalColor}}/{{item.internalColor}}</h2>
                                        <p class="tuan-ison">
                                            <template v-if="item.orderCount<item.minBuyerCount">
                                                {{item.orderCount}}人已预订，满<i class="txt-tuan-quota cff4c66">{{d.minBuyerCount}}</i>人可享团购价！
                                            </template>
                                            <template v-else>
                                                {{item.orderCount}}人已预订，团购价<i class="txt-tuan-quota cff4c66">已激活</i>！
                                            </template>
                                        </p>
                                        <div class="tuan-price">
                                            团购价：<i class="txt-price cff4c66">&yen;<em data-format="price">{{item.groupPurchasePriceTxt}}</em></i>
                                            <label class="txt-tuan txt-tuan2">直降&yen;<span data-format="price">{{item.discountPriceTxt}}</span></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="tuan-btn-panel">
                                    <a v-if="item.orderStatus==1" href="javascript:;" @click.stop.prevent="billClick" class="btn btn2">订单追踪</a>
                                    <a v-if="item.orderStatus==0 && item.orderCount<item.minBuyerCount" @click.stop.prevent="billClick" href="javascript:;" class="btn">取消订单</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="vcheckout" style="display:none;" v-show="canPay">
                    <div class="checkout">
                        <h1 class="chosePayTypeTit">
                            请选择支付方式<span>定金：<em>¥</em><i> {{orderPrepayAmt|price}}</i></span>
                        </h1>
                        <div class="chosePayType">
                            <a class="btnAlipay" v-show="!inWeiXin" ubt="alipay" @click="submit('alipay')"   > </a>
                            <a class="btnWeixinpay" ubt="weixinpay"  @click="submit('weixin')" > </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

var Swiper = require('swiper');

	module.exports = {
		//props: ['父组建传的值'],
		data:function(){
			return {
                orderPrepayAmt:0,//待支付的时候的定金
                inWeiXin:false,
                waitPayArr:[],//待支付订单数组
                canPay:false,//待支付的时候允许继续支付
                nodata:false,
                showTabIndex         : 0,
                orderId              : '',//当前渲染的orderID
                //顶部列表
                OrderListUrl         : 'Products/order/QueryOrderList',
                //车辆交付
                OrderStatusUrl       : 'Products/order/QueryCarOrderStatus',
                //车贷申办
                LoanOrderStatus      : 'Products/order/QuerySchemeLoanOrderStatus',
                //车险申办
                InsuranceOrderStatus : 'Products/order/QueryInsuranceOrderStatus',
                //精品处置
                ProductOrderStatus   : 'Products/order/QueryProductOrderStatus',
                //团购
                TuanUrl              : 'Products/GroupPurchase/GetMyGroupPurchaseOrders',
                //检查订单是否可以支付
                checkOrderIdUrl      : 'Products/order/OrderIsWaitPay',
                navData              : [], //头部渲染的列表 //订单状态
                tab1Data             : [],//车辆交付
                tab1Error            : '',//车辆交付-错误提示
                cache1               : {},//数据缓存
                tab2Data             : [],//车贷申办
                tab2Error            : '',//车贷申办-错误提示
                cache2               : {},//数据缓存
                tab3Data             : [],//车险申办
                tab3Error            : '',//车险申办-错误提示
                cache3               : {},//数据缓存
                tab4Data             : [],//精品处置
                tab4Error            : '',//精品处置-错误提示
                cache4               : {},//数据缓存
                tuanData             : [],//团购的数据
                noTuanData           : false,//没有团购数据
                showTuan             : false //展示团购
			}
		},
		//这里才是route的生存周期
		route:{

			data: function(transition) {
                var _this = this;

                //如果是微信环境，那么隐藏支付宝，显示微信支付
                if(YMC.isWeiXin){
                    _this.inWeiXin = true;
                }

                //清除缓存
                _this.cache1 = {};
                _this.cache2 = {};
                _this.cache3 = {};
                _this.cache4 = {};
                _this.waitPayArr = [];  //待支付订单数组
                _this.canPay = false;//待支付的时候允许继续支付
                // //测试
                // _this.cache1={
                //     YMC150902151346208:[{"status":0,"statusName":"待支付","changeTime":"0001-01-01 00:00:00","isCompplete":false},{"status":10,"statusName":"定金已支付","changeTime":"0001-01-01 00:00:00","isCompplete":false},{"status":20,"statusName":"进行中","changeTime":"0001-01-01 00:00:00","isCompplete":false},{"status":50,"statusName":"订单完成","changeTime":"0001-01-01 00:00:00","isCompplete":false}]
                // }
                // _this.cache2={
                //     YMC150902151346208:[{"status":0,"statusName":"待支付","changeTime":"0001-01-01 00:00:00","isCompplete":false},{"status":10,"statusName":"定金已支付","changeTime":"0001-01-01 00:00:00","isCompplete":false},{"status":20,"statusName":"进行中","changeTime":"0001-01-01 00:00:00","isCompplete":false},{"status":50,"statusName":"订单完成","changeTime":"0001-01-01 00:00:00","isCompplete":false}]
                // }
                // _this.cache3={
                //     YMC150902151346208:[{"status":0,"statusName":"待支付","changeTime":"0001-01-01 00:00:00","isCompplete":false},{"status":10,"statusName":"定金已支付","changeTime":"0001-01-01 00:00:00","isCompplete":false},{"status":20,"statusName":"进行中","changeTime":"0001-01-01 00:00:00","isCompplete":false},{"status":50,"statusName":"订单完成","changeTime":"0001-01-01 00:00:00","isCompplete":false}]
                // }
                // _this.cache4={
                //     YMC150902151346208:[{"status":0,"statusName":"待支付","changeTime":"0001-01-01 00:00:00","isCompplete":false},{"status":10,"statusName":"定金已支付","changeTime":"0001-01-01 00:00:00","isCompplete":false},{"status":20,"statusName":"进行中","changeTime":"0001-01-01 00:00:00","isCompplete":false},{"status":50,"statusName":"订单完成","changeTime":"0001-01-01 00:00:00","isCompplete":false}]
                // }
                // _this.tuanData = [];
                //_this.renderQueryOrderList();
                //测试-end
                //先渲染头部列表
                //渲染第一个订单号的数据
                //点击订单号，渲染各自的数据
                this.renderQueryOrderList();
                transition.next();

			}
		},
        methods:{
            //检查订单号是否可以支付
            checkOrderId:function(cb){
                var _this = this;
                YMC.ajax({
                    url:_this.checkOrderIdUrl,
                    data:{
                        orderNum:_this.orderId
                    },
                    success:function(res){
                        if(!res.success){
                            VUI.alert(res.error.message);
                            return;
                        }
                        cb(res.result);
                    }
                });
            },
            submit:function(payType){
                var _this = this;

                _this.checkOrderId(function(cp){
                        _this.canPay = cp;
                        if(cp==false){
                            VUI.alert('订单已经作废，不能再支付。');
                            //并修改状态
                            for (var i = 0; i < _this.navData.length; i++) {
                                if(_this.navData[i]['number'] ==_this.orderId){
                                    Vue.set(_this.navData[i],'statusName','订单已作废');
                                }
                            };
                            return false;
                        }
                        if(payType === 'alipay'){
                            YMC.pay.alipay(_this.orderId);
                        }
                        if(payType === 'weixin'){
                            YMC.pay.weixin(_this.orderId);
                        }
                });


            },
            //是否在可以支付列表中
            inWaitPayArr:function(){
                var _this = this;
                if(_this.orderId==''){
                    _this.canPay = false;
                    return false;
                }
                for (var i = 0; i < _this.waitPayArr.length; i++) {
                    if(_this.waitPayArr[i]==_this.orderId){

                        //找到价格
                        for (var i = 0; i < _this.navData.length; i++) {
                            if(_this.navData[i]['number']==_this.orderId){
                                _this.orderPrepayAmt = _this.navData[i]['prepayAmt'];
                            }
                        }
                        return true;
                    }
                };
                return false;
            },
            //渲染头部
            renderQueryOrderList:function(){
                var _this = this;

                /*测试*/
                // router.app.loadingShow = true;
                // setTimeout(function(){

                //     YMC.log('渲染头部');
                //     _this.navData = [{"number": "YMC150902151346208", "status": "文字状态", "storeId": 1, "discountAmt": 0, "prepayAmt": 99, "amount": 234200, "carName": "奥迪A1 2014款 30 TFSI Sportback舒适型", "carPic": "/upload/image/original/201507/301056414541.jpg", "id": "dbd281f9-38d2-4ded-998d-a50700fafa5f"}, {"number": "YMC150902151346208", "status": "文字状态", "storeId": 1, "discountAmt": 0, "prepayAmt": 99, "amount": 234200, "carName": "奥迪A1 2014款 30 TFSI Sportback舒适型", "carPic": "/upload/image/original/201507/301056414541.jpg", "id": "dbd281f9-38d2-4ded-998d-a50700fafa5f"}, {"number": "YMC150902151346208", "status": "文字状态", "storeId": 1, "discountAmt": 0, "prepayAmt": 99, "amount": 234200, "carName": "奥迪A1 2014款 30 TFSI Sportback舒适型", "carPic": "/upload/image/original/201507/301056414541.jpg", "id": "dbd281f9-38d2-4ded-998d-a50700fafa5f"}, {"number": "YMC150902151346208", "status": "文字状态", "storeId": 1, "discountAmt": 0, "prepayAmt": 99, "amount": 234200, "carName": "奥迪A1 2014款 30 TFSI Sportback舒适型", "carPic": "/upload/image/original/201507/301056414541.jpg", "id": "dbd281f9-38d2-4ded-998d-a50700fafa5f"} ];

                //     _this.$nextTick(function(){

                //         var swiper = new Swiper('#TAB', {
                //             direction         : 'horizontal',
                //             slidesPerView     : 'auto',
                //             mousewheelControl : true,
                //             freeMode          : true
                //         });

                //         //渲染第一个为默认的
                //         //一个订单都木有则渲染团购订单
                //         if(_this.navData.length == 0){
                //             //我的团购订单
                //             _this.renderTuan();
                //         }else{
                //             _this.renderInfo(_this.navData[0].number);
                //         }
                //         router.app.loadingShow = false;
                //     });
                // },500);

                /*测试-end*/

                YMC.ajax({
                    url:_this.OrderListUrl,
                    showLoading:true,
                    success:function(res){
                        if(res.success){

                            var result = res.result;
                            // 如果没有数据直接订单跟踪失败
                            if(result.items.length == 0){
                                // routeList.splice(routeList.length-1,1);
                                // router.replace({name:'orderTrackN'});
                                _this.nodata = true;
                                return false;
                            }

                            _this.navData = result.items;

                            //待支付状态下，允许用户再次支付
                            for (var i = 0; i < result.items.length; i++) {
                                if(result.items[i].statusName=="待支付"){
                                    _this.waitPayArr.push(result.items[i].number);
                                }
                            };
                            Vue.nextTick(function(){

                                var swiper = new Swiper('#TAB', {
                                    direction         : 'horizontal',
                                    slidesPerView     : 'auto',
                                    mousewheelControl : true,
                                    freeMode          : true
                                });
                                var iScroLeft = null;
                                $("#TAB a").each(function(index,item){
                                    $(item).on('click',function(){
                                        iScroLeft = swiper.getWrapperTranslate('x');
                                        //window.location.reload();
                                    });
                                });
                                if(iScroLeft){
                                    swiper.setWrapperTranslate(iScroLeft);
                                }


                                //渲染第一个为默认的
                                //一个订单都木有则渲染团购订单
                                if(_this.navData.length == 0){
                                    //我的团购订单
                                    _this.renderTuan();
                                }else{
                                    _this.renderInfo(_this.navData[0].number);
                                }


                            });
                        } else {
                            if(~res.error.message.indexOf('请先登录')){
                                router.go({name:'_login',query:{source:'orderTrack'}});
                            }
                            VUI.alert(res.error.message, 1500);
                        }

                    }
                });
            },
            //渲染指定订单号
            renderInfo:function(id,index){
                var _this = this;
                this.showTabIndex = index || 0;

                this.orderId = id;
                YMC.log(this.orderId);
                //车辆交付
                this.renderQueryCarOrderStatus();
                //车贷申办
                this.renderSchemeLoanOrderStatus();
                //车险申办
                this.renderInsuranceOrderStatus();
                //精品处置
                //this.renderProductOrderStatus();

                //隐藏团购显示
                this.showTuan = false;

                //先隐藏按钮
                this.canPay = false;
                //如果在可支付列表中
                if(this.inWaitPayArr()){
                    //再去接口查询一下是否可以支付
                    this.checkOrderId(function(cp){
                        _this.canPay = cp;
                    });
                }else {
                    this.canPay = false;
                }
            },
            //车辆交付
            renderQueryCarOrderStatus:function(){
                var _this = this;
                _this.tab1Error = '';
                if(_this.cache1[_this.orderId]){
                    _this.tab1Data = _this.cache1[_this.orderId];
                    return;
                }
                YMC.ajax({
                    url: _this.OrderStatusUrl,
                    data: {
                        id:_this.orderId
                    },
                    success: function(res){
                        if(!res.success){
                            _this.tab1Error = res.error.message;
                            return;
                        }
                        YMC.log('车辆交付load');
                        _this.tab1Data = res.result;
                        _this.cache1[_this.orderId] = res.result;

                    },
                    error: function(){
                        // VUI.alert("提交失败，请稍后再试", 1500);
                    }
                });
            },
            //车贷申办
            renderSchemeLoanOrderStatus:function(){
                var _this = this;
                 _this.tab2Error = '';
                if(_this.cache2[_this.orderId]){
                    _this.tab2Data = _this.cache2[_this.orderId];
                    return;
                }
                YMC.ajax({
                    url: _this.LoanOrderStatus,
                    data: {
                        id:_this.orderId
                    },
                    success: function(res){
                        if(!res.success){
                             _this.tab2Error = res.error.message;
                            return;
                        }
                        YMC.log('车贷申办load');
                        _this.tab2Data = res.result;
                        _this.cache2[_this.orderId] = res.result;
                    },
                    error: function(){
                        // VUI.alert("提交失败，请稍后再试", 1500);
                    }
                });
            },
            //车险申办
            renderInsuranceOrderStatus:function (){
                var _this = this;
                _this.tab3Error = '';
                if(_this.cache3[_this.orderId]){
                    _this.tab3Data = _this.cache3[_this.orderId];
                    return;
                }
                YMC.ajax({
                    url: _this.InsuranceOrderStatus,
                    data: {
                        id:_this.orderId
                    },
                    success: function(res){
                        if(!res.success){
                            _this.tab3Error = res.error.message;
                            return;
                        }
                        YMC.log('车险申办load');
                        _this.tab3Data = res.result;
                        _this.cache3[_this.orderId] = res.result;
                    },
                    error: function(){
                        // VUI.alert("提交失败，请稍后再试", 1500);
                    }
                });
            },
            //精品处置
            renderProductOrderStatus:function(){
                var _this = this;
                _this.tab4Error = '';
                if(_this.cache4[_this.orderId]){
                    _this.tab4Data = _this.cache4[_this.orderId];
                    return;
                }
                YMC.ajax({
                    url: _this.ProductOrderStatus,
                    data: {
                        id:_this.orderId
                    },
                    success: function(res){
                        if(!res.success){
                             _this.tab4Error = res.error.message;
                            return;
                        }
                        YMC.log('精品处置load');
                        _this.tab4Data = res.result;
                        _this.cache4[_this.orderId] = res.result;
                    }
                });
            },
            //团购
            renderTuan:function(){
                var _this = this;
                _this.showTabIndex = -1;
                _this.noTuanData = false;

                if(_this.tuanData.length){
                    return;
                }
                YMC.ajax({
                    data: {},
                    url: _this.TuanUrl,
                    success: function(res){
                        if(res.success){
                            if(res.result&&res.result.length){
                                //金额格式化
                                for (var i = 0; i < res.result.length; i++) {
                                    if((res.result[i].discountPrice+'').length>4){
                                        res.result[i].discountPriceTxt = ((res.result[i].discountPrice*1)/10000).toFixed(2)+'万';
                                    }
                                    if((res.result[i].groupPurchasePrice+'').length>4){
                                        res.result[i].groupPurchasePriceTxt = ((res.result[i].groupPurchasePrice*1)/10000).toFixed(2)+'万';
                                    }
                                };
                                _this.tuanData = res.result;
                                _this.showTuan = true;
                                Vue.nextTick(function(){
                                    // 图片路径
                                    $('#orderTrack .tuan-prod-img').each(function(i){
                                        var imgSrc = $(this).data('src');
                                        if($(this).data('src')){
                                            var img = YMC.getResourceUrl(imgSrc);
                                            $(this).attr("src", img);
                                        }
                                    });
                                });
                            }else{
                                _this.showTuan = _this.noTuanData = true;

                            }
                        }else{
                            VUI.alert(res.error.message, 1500);
                        }
                    },
                    error: function(){
                        VUI.alert('网络连接失败', 1500);
                    }
                });
            },
            bindEvent:function(){
                var tabsSwiper = new Swiper('#orderTracktabs-container', {
                    speed: 500,
                    onSlideChangeStart: function() {
                        $(".stepTabs .active").removeClass('active');
                        $(".stepTabs a").eq(tabsSwiper.activeIndex).addClass('active');
                    }
                });
                $("#orderTrack .stepTabs a").on('touchstart mousedown', function(e) {
                    e.preventDefault();
                    $("#orderTrack .stepTabs .active").removeClass('active');
                    $(this).addClass('active');
                    tabsSwiper.slideTo($(this).index());
                });
            },
            billClick:function(){
                var that = $(this),
                    thatP = that.parents(".tuan-bill"),
                    billId = thatP.data("billid"),
                    removeId = thatP.data("removeid");

                if(!that.hasClass("btn2")){
                    if(removeId){
                        YMC.ajax({
                            data: {"id": removeId},
                            url: "Products/GroupPurchase/CancelOrder",
                            success: function(res){
                                if(res.success){
                                    that.remove();
                                    thatP.find(".tuan-status-hd span").text("订单已取消");

                                    VUI.alert("订单取消成功", 1500);
                                }else{
                                    VUI.alert(res.error.message, 1500);
                                }
                            },
                            error: function(){
                                VUI.alert("网络连接失败，请稍后再试！", 1500);
                            }
                        });
                    }else{
                        VUI.alert("获取不到有效的订单号",1500);
                    }
                }else{
                    if(billId){
                        var targTab = $("#TAB").find(".swiper-wrapper .swiper-slide[order-num='"+billId+"']");

                        $("#TAB").find(".swiper-wrapper a").removeClass("current");

                        if(targTab.length){
                            targTab.find("a").addClass("current");

                            var decChi = $('.dec-box').children();
                            var index = targTab.index();
                            decChi.hide();
                            decChi.eq(index).show();
                        }else{
                            var billHtml = '<div order-num="'+billId+'" class="swiper-slide swiper-slideW">'
                                +'<a href="javascript:;" class="current" >订单'+billId+'</a></div>';

                            $("#TAB").find(".swiper-wrapper").append(billHtml);
                        }
                        window.scrollTo(0,0);

                        targTab = $("#TAB").find(".swiper-wrapper .swiper-slide[order-num='"+billId+"']");
                        var parEle = targTab.parent(),
                            parEleWidth = parEle.width(),
                            targWidth = targTab.width(),
                            targOffLeft = targTab[0].offsetLeft,
                            transDelta = targWidth+targOffLeft-parEleWidth;

                        if(transDelta>0){
                            var cssStr = "translate3d("+(-transDelta)+"px, 0px, 0px)";
                            parEle.css({
                                "-webkit-transform": cssStr,
                                "-moz-transform": cssStr,
                                "-ms-transform": cssStr,
                                "transform": cssStr
                            });
                        }
                        renderInfo(billId);
                    }else{
                        VUI.alert("获取不到有效的订单号",1500);
                    }
                }
            }
        },
        ready:function(){

            this.bindEvent();
        }
	}
require('../../node_modules/swiper/dist/css/swiper.min.css');
</script>
<style src="../css/orderTrack.css"></style>
<style src="../css/tuan.css"></style>
<style>
    .vordertrack {
        background: #fff;
    }
    .vordertrack .swiper-slideW{width:auto;}
    .vordertrack .item_arr-right:before{
        right:10px;
    }
    .vordertrackn{
        background: #fff;
        height:100%;
    }
    .vordertrackn .orderTrack{
        background: url("../imgs/nodata.jpg") no-repeat center 20px;
        background-size:240px auto;
        text-align: center;
        padding:250px 0 0;
        font-size: 16px;
    }
</style>