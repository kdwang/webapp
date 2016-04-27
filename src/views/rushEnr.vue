<template>
<div class="rushenroll">
	<div id="main" class="mainautow mainhd">
        <div class="main_cnt">
            <div class="car-box" v-if="enrCarInfo">
                <div class="clearfix">
                    <div class="img" v-sturl="enrCarInfo.picUrl"></div>
                    <!-- <img :src="enrCarInfo.picUrl | imgUrl" class="img"> -->
                    <div class="car-info">
                        <div class="title">{{enrCarInfo.carGoodsTitle}}</div>
                        <!-- <div class="price-bar">
                            <div class="price">&yen;{{enrCarInfo.panicBuyingPrice|priceW}}<span class="unit">万</span></div>
                        </div> -->
                    </div>
                </div>
                <div class="car-color">
                    <span class="cor_gray">外</span> {{enrCarInfo.externalColor}}
                    <span class="cor_gray ml10">内</span> {{enrCarInfo.internalColor}}
                </div>
            </div>
            <div class="notice">
                <div class="notice-ico"><i class="ia ia-1"></i></div>
                <div class="notice-info">
                    <p class="line-1">报名结束：<span class="countdown">{{{countdownTime | countdown 6}}}</span></p>
                </div>
            </div>
            <div class="enroll-info">
            	<div class="item">
            		<div class="item_left"><i class="ia ia-5 ia-5-3"></i>姓名</div>
            		<div class="item_right"><input v-model="enrollDat.CustomerName" type="text" placeholder="请输入姓名" /></div>
            	</div>
            	<div class="item">
            		<div class="item_left"><i class="ia ia-5 ia-5-2"></i>手机号</div>
            		<div class="item_right"><input v-model="enrollDat.Mobile" type="tel" placeholder="请输入手机号" maxlength="11" /></div>
            	</div>
            	<div class="item">
            		<div class="item_left"><i class="ia ia-5 ia-5-1"></i>提车城市</div>
            		<div class="item_right" @click.stop="cityChosen"><span v-el:cityname v-if="enrollDat.DeliverCityName">{{enrollDat.DeliverCityName}}</span><span v-el:cityname v-else>请选择提车城市</span><i class="ia ia-6"></i></div>
            	</div>
                <div class="item">
                    <div class="item_left"><i class="ia ia-5 ia-5-6"></i>购车方式</div>
                    <div class="item_right" @click.stop="selectOn=true"><span v-if="enrollDat.EnrollingBuyingMode">贷款</span><span v-else>全款</span><i class="ia ia-6"></i></div>
                </div>
            </div>
            <div class="enroll-sec enroll-sec-tlt">请选择支付方式</div>
            <div class="enroll-info">
            	<div class="item" :class="{'item-on': wxPayOn}" @click="payChosen(1)">
            		<div class="item_left"><i class="ia ia-5 ia-5-5"></i>微信支付</div>
            		<i class="ia ia-7"></i>
            	</div>
            	<div class="item" :class="{'item-on': aliPayOn}" @click="payChosen(2)">
            		<div class="item_left"><i class="ia ia-5 ia-5-4"></i>支付宝</div>
            		<i class="ia ia-7"></i>
            	</div>
            </div>
            <div class="enroll-sec enroll-sec-txt"><i class="enr-check" :class="{'ia':ruleRead,'ia-12':ruleRead}" @click="ruleRead=!ruleRead"></i>我已阅读并同意<a href="#/rush-enr-rule">《要买车闪购活动细则》</a></div>
            <div class="enroll-sec mb10"><div class="act-btn act-btn-4" @click.stop="enrCheck">立即支付{{enrFee}}元</div></div>
        </div>
    </div>
    <div class="act-markdiv" v-show="selectOn" @click.stop="selectOn=false"></div>
    <ul class="enr-select" :class="{'enr-select-on': selectOn}" @click.stop="selectOn=false">
        <li @click="enrollDat.EnrollingBuyingMode=0">全款</li>
        <li @click="enrollDat.EnrollingBuyingMode=1">贷款</li>
        <li>取消</li>
    </ul>
    <div class="act-markdiv" v-show="payNoticeEnable">
    	<div class="act-pop-wrap" @click="payNoticeEnable=false">
    		<div class="act-pop" @click.stop.prevent>
    			<div class="act-pop-list">
                    <h4 class="mb5">请确认您已了解闪购规则，活动期间，如果：</h4>
                    <p>&middot;&nbsp;您报名的车型被抢完，报名费全额退还</p>
                    <p>&middot;&nbsp;您没有抢车及下单，报名费不可退</p>
                    <p class="mt10">请谨慎检查报名车型（含内外饰颜色）的信息，报名后不可修改</p>
                    <!-- <h4 class="mb5">有且仅有以下两种情况退还闪购报名费：</h4>
                    <p>1、闪购成功，且完成提车；</p>
                    <p>2、闪购失败，报名车型已被抢购一空。</p>
                    <p class="mt10">如您主动放弃闪购机会（报名成功后没有购买报名型），闪购报名费本站不退还。</p> -->
                </div>
    			<div class="act-btn" ubt="enrSub" @click.stop="enrSubmit">我知道了</div>
    		</div>
    	</div>
	</div>
</div>
</template>
<script>
module.exports = {
	data: function(){
		return {
            enrFee: 499,
            countdownTime: 0,
            enrCarInfo: null,
            aliPayOn: false,
            wxPayOn: true,
            enrollDat:{
                CustomerName: '',
                Mobile: '',
                DeliverCityId: '',
                DeliverCityName: '',
                EnrollingBuyingMode: 0
            },
            orderNum: '',
            actSuccessInfo:{},
            // 国双统计
            gridsumToken: {
                orderId: '',
                carGoodsId: '',
                deposit: 0,
                payMethod: 0
            },
            selectOn: false,
            payNoticeEnable: false,
            ruleRead: false
        };
	},
	route: {
        data: function(){
            var _this = this;

            // 进入页面重置用于国双统计的参数
            _this.gridsumToken= {
                orderId: '',
                carGoodsId: '',
                deposit: 0,
                payMethod: 0
            }


            var url = _this.$route.query,
                rushInfo = JSON.parse(YMC.local('rushInfo')),
                usrCity = JSON.parse(YMC.local('userCity'));

            if(usrCity){
                _this.enrollDat.DeliverCityId = usrCity['cityId'] || router.app.cityId || '';
                _this.enrollDat.DeliverCityName = _this.enrollDat.DeliverCityId?((usrCity['storeCity'] || usrCity['cityIp']) || ''):'';
            }

            if(url&&url['activityId']&&url['panicBuyingCarGoodsId']){
                $.extend(_this.enrollDat, url);

                YMC.local('rushInfo', url);
            }else if(rushInfo&&rushInfo['activityId']&&rushInfo['panicBuyingCarGoodsId']){
                $.extend(_this.enrollDat, rushInfo);

            }else{
                setTimeout(function(){
                    VUI.alert("无法获取闪购车型信息，请重新选择",1000,function(){
                        router.go({
                            name: 'rush'
                        });
                    });
                }, 500);
                return;
            }

            // 国双统计
            _this.gridsumToken.carGoodsId = url['panicBuyingCarGoodsId'] || rushInfo['panicBuyingCarGoodsId'];

            YMC.ajax({
                // data: JSON.parse(YMC.local('rushInfo')),
                data: {
                    "activityId": JSON.parse(YMC.local('rushInfo')).activityId,
                    "carGoodsId": JSON.parse(YMC.local('rushInfo')).panicBuyingCarGoodsId
                },
                url:'Marketing/PanicBuyingActivity/GetPanicBuyingActivityCarGoodsBaseInfo',
                success: function(res){
                    if(res.success){
                        _this.enrCarInfo = res.result;
                    }
                }
            });

            YMC.ajax({
                data: {"id":_this.enrollDat.activityId},
                url:'Marketing/PanicBuyingActivity/GetActivityPanicBuyingDateTime',
                success:function(res){
                    if(res.success&&res.result){
                        var dat = res.result;
                        if(parseInt(dat.totalMilliseconds)>0){
                            _this.countdownTime = parseInt(dat.totalMilliseconds);
                        }

                        _this.enrFee = dat.registrationFee;

                        _this.ctdFlag = setInterval(_this.countdown, 1000);
                    }else{
                        VUI.alert(res.error.message,1500,function(){
                            router.go({
                                name: 'home'
                            });
                        });
                    }
                },
                showLoading: true
            });

            YMC.ajax({
                url: 'UserInfo/UserBaseInfo/GetSimpleInfo',
                success: function(res){
                    if(res.success){
                        var dat = res.result;

                        _this.enrollDat.CustomerName = (dat.name===dat.phone)?'':dat.name;
                        _this.enrollDat.Mobile = dat.phone;
                    }
                }
            });

        },
        deactivate: function(){
            var _this = this;

            _this.payNoticeEnable = false;
            _this.enrollDat.activityId = '';
            _this.enrollDat.panicBuyingCarGoodsId = '';
        }
	},
	ready: function(){
	},
	methods: {
	    countdown: function(){
	    	var _this = this;

	        if(_this.countdownTime>0){
	            _this.countdownTime -= 1;
            }else{
                VUI.alert("闪购报名时间截止，去首页看看吧", 2000, function(){
                    router.go({
                    	name: 'home'
                    });
                });
            }
	    },
	    payChosen: function(idNum){
	    	var _this = this;

	    	// 1 wxPay
	    	// 2 aliPay
	    	if(idNum==1){
	    		_this.wxPayOn = true;
	    		_this.aliPayOn = false;
	    	}else if(idNum==2){
	    		_this.wxPayOn = false;
	    		_this.aliPayOn = true;
	    	}
	    },
        thirdPartyPay: function(_this){
            if(_this.wxPayOn){
                //微信的支付
                YMC.pay.weixin(_this.orderNum);
            }else if(_this.aliPayOn){
                //支付宝
                YMC.pay.alipay(_this.orderNum);
            }
            return;
        },
        cityChosen: function(){
            var _this = this;
            router.go({
                name: 'list_store',
                query: {
                    from: 'rushEnr'
                }
            });
        },
        enrCheck: function(){
            var _this = this,
                _enrDat = _this.enrollDat;

            if(!_enrDat.CustomerName){
                VUI.alert("请输入姓名！", 1000);
                return false;
            }

            if(!_enrDat.Mobile||!YMC.register.validateMobile(_enrDat.Mobile)){
                VUI.alert("请输入正确的手机号！", 1000);
                return false;
            }

            if(!(_enrDat.DeliverCityName&&_enrDat.DeliverCityId)){
                VUI.alert("请选择提车城市!", 1000);
                return false;
            }

            if(!_this.ruleRead){
                VUI.alert("请勾选“我已阅读并同意《要买车闪购活动细则》”", 1000);
                return false;
            }

            _this.payNoticeEnable = true;
        },
	    enrSubmit: function(){
	    	var _this = this;
            _this.payNoticeEnable = false;
            YMC.ajax({
                data: _this.enrollDat,
                url: 'Marketing/Enrolling/CreateEnrollingAndCarGoods',
                success: function(res){
                    if(res.success&&res.result){
                        var dat = res.result;
                        if(dat.enrollingStatus == 1){
                            _this.orderNum = dat.enrollingCode;
                            _this.actSuccessInfo.orderNo = dat.enrollingCode;
                            _this.actSuccessInfo.enrollingId = dat.enrollingId;
                            YMC.local('rushEnrId',dat.enrollingId);

                            if(!_this.orderNum){
                                VUI.alert('订单号获取失败',1500,function(){
                                    router.go({
                                        name:'home'
                                    });
                                });

                                return;
                            }

                            // 国双统计
                            // 创建订单成功则将 localstorage 的国双统计数据删除
                            YMC.local( "gridsumToken", null );

                            _this.gridsumToken.orderId = _this.orderNum;
                            if(!_this.wxPayOn){
                                _this.gridsumToken.payMethod = "2";
                            }else{
                                _this.gridsumToken.payMethod = "1";
                            }
                            _this.gridsumToken.deposit = _this.enrFee;
                            if(window._gsTracker){
                                if(_this.wxPayOn){
                                    _gsTracker.trackEvent("click",'微信支付',_this.orderNum);
                                }else{
                                     _gsTracker.trackEvent("click",'支付宝支付',_this.orderNum);
                                }
                                _gsTracker.trackEvent("click",'报名费支付按钮',_this.orderNum);
                            }
                            YMC.local( "gridsumToken", JSON.stringify( _this.gridsumToken ) );

                            _this.thirdPartyPay(_this);
                        }else{
                            VUI.alert(dat.errorMessage);
                        }
                    }else{
                        VUI.alert(res.error.message);
                    }
                }
            });
	    }
	},
    detached: function(){
        clearInterval(this.ctdFlag);
        this.countdownTime = 0;
    }
}
</script>
<style src="../css/rush.css"></style>
<style>
.act-markdiv{
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: table;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
}
.act-markdiv .act-pop-wrap{display: table-cell;vertical-align: middle;}
.act-pop-wrap .act-pop{
    position: relative;
    width: 80%;
    min-height: 40px;
    margin: 0 auto;
    background-color: #fff;
    overflow: hidden;
}
.act-pop .act-pop-tlt{
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 40px;
    color: #999;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    background-color: #eee;
    font-weight: normal;
}
.act-pop .act-pop-tlt .act-pop-close{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: 40px;
    padding: 0 10px;
    font-size: 14px;
    line-height: 40px;
    background: #ffde00;
    color: #3c3c3c;
}
.act-pop .act-pop-cnt{
    height: 100%;
    padding: 46px 10px 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.rushenroll{background-color: #f0f0f0;}
.rushenroll .enr-select{z-index: 1001;position: fixed;left: 0;right: 0;bottom:0;width: 100%;opacity: 0;-webkit-transform:translate(0,100%);transform:translate(0,100%);-webkit-transition:-webkit-transform .3s ease-in,opacity .3s ease-in;transition:-webkit-transform .3s ease-in,transform .3s ease-in,opacity .3s ease-in;}
.rushenroll .enr-select.enr-select-on{-webkit-transform:translate(0,0);transform:translate(0,0);opacity: 1}
.rushenroll .enr-select li{height: 50px;line-height: 50px;font-size: 17px;text-align: center;background-color: #fff;}
.rushenroll .enr-select li + li{border-top:1px solid #e4e4e4;}
.rushenroll .enr-select li:last-child{border-width: 4px;}
.rushenroll .act-pop-wrap .act-pop{border-radius: 4px;}
.rushenroll .act-pop .act-pop-list{padding: 10px;color: #666;font-size: 12px;}
.rushenroll .act-pop .act-btn{border-top:1px solid #d3d3d3;color: #333;border-radius: 0;}
.rushenroll .enroll-sec-txt{padding-top: 10px;}
.rushenroll .enroll-sec-txt .enr-check{display: inline-block;width: 18px;height: 18px;border:1px solid #cbcbcb;margin-left: 4px;margin-right: 10px;vertical-align: -6px;border-radius: 12px;background-color:#fff;}
.rushenroll .enroll-sec-txt .enr-check.ia-12{border-color: #F7CF15;background-position: 0 -107px;}
.rushenroll .enroll-sec-txt a{color: #666;}

.rushenroll .car-box{margin-bottom:10px;padding:12px 12px 5px;background:#fff;}
.rushenroll .car-box .img{width:120px;height:90px;float:left;background-size:100% auto;background-position:left center;}
.rushenroll .car-box .car-info{margin-left:120px;padding-left:10px;}
.rushenroll .car-box .car-info .title{padding-top: 20px;}
.rushenroll .car-box .car-color{margin-top:5px;line-height:34px;border-top:1px solid #e4e4e4;}
.rushenroll .car-color .other-color{float:right;color:#999;}
.rushenroll .price-bar .price{display:inline-block;margin-top:5px;margin-right:10px;font-size:24px;line-height:1.2em;color:#f83d37;}
.rushenroll .price-bar .price .unit{color:#333;font-size:14px;}
</style>