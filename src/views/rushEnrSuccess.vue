<template>
<div class="rushenr-success">
	<div id="main" class="mainautow mainhd">
        <div class="main_cnt" v-if="success">
            <div class="act-success">
                <i class="ico-yes-bg"></i>支付成功
            </div>
            <div class="act-coupon">
                <h3>您的闪购码</h3>
                <div class="coupon-code-wrap">
                    <span id="qgm">{{regCode}}</span>
                    <i class="ia ia-8"></i>
                    <i class="ia ia-9"></i>
                </div>
                <p>您可以在“<a v-link="{name: 'rushUsrCenter'}">我的闪购</a>”中查看闪购信息</p>
            </div>
            <div class="tc">
                <p v-if="remainTime">离闪购开始还剩<span class="countdown">{{{remainTime | countdown 6}}}</span></p>
            </div>
        </div>
        <div class="act-coupon" v-else>您可以在“<a v-link="{name: 'rushUsrCenter'}">我的闪购</a>”中查看闪购信息</div>
    </div>
</div>
</template>
<script>
module.exports = {
	data: function(){
		return {
            success: false,
            remainTime:0,
            regCode: '----'
        };
	},
	route: {
        data: function(){
            // 国双统计
            var _gridsumToken = {
              orderId: '',
              deposit: 0,
              payMethod: 0
            };
            if(YMC.local( "gridsumToken") && YMC.local( "gridsumToken").indexOf('orderId') != -1){
                _gridsumToken = JSON.parse(YMC.local( "gridsumToken"));
            }else{
                _gridsumToken.orderId = '';
                _gridsumToken.carGoodsId = '';
                _gridsumToken.deposit = 0;
                _gridsumToken.payMethod = 0;
            }
            _gridsumToken.orderId = _gridsumToken.orderId || '';
            _gridsumToken.carGoodsId = _gridsumToken.carGoodsId || '';
            _gridsumToken.deposit = _gridsumToken.deposit || 0;
            _gridsumToken.payMethod = _gridsumToken.payMethod || 0;

            // YMC.log(JSON.stringify(_gridsumToken));

            window._gsCallback = function() {
                if(_gridsumToken.orderId){
                    if (window._gsTracker && (window.location.href.match('http(s)?:\/\/m.yaomaiche.com'))) {
                        // 支付成功模拟事件统计
                        if(_gridsumToken.payMethod && _gridsumToken.payMethod === '2'){
                            _gsTracker.trackEvent("click","支付宝支付成功",_gridsumToken.orderId);
                        }else{
                            _gsTracker.trackEvent("click","微信支付成功",_gridsumToken.orderId);
                        }

                        if(_gridsumToken.orderId.search(/^q/i)!=-1){
                            // 闪购支付统计
                            _gsTracker.trackEvent("click","报名费支付成功数",_gridsumToken.orderId);
                        }else{
                            _gsTracker.trackEvent("click","支付定金成功数_01",_gridsumToken.orderId);
                        }

                        var oimg = new Image();
                        oimg.src="http://120.26.64.136:9001/api/gs/YMCPaySuccess?orderId="+_gridsumToken.orderId;

                        // 支付定金成功统计，闪购（报名）的订单支付不统计
                        if(_gridsumToken.orderId.search(/^q/i)==-1){
                            _gsTracker.addOrder(_gridsumToken.orderId, _gridsumToken.deposit);
                            _gsTracker.trackECom();
                        }

                        // 支付完成统计完成后删除 gridsumToken
                        YMC.local( "gridsumToken", null );
                    }
                }
            }
            // 国双统计 -end
        }
	},
	ready: function(){
        var _this = this;

        var orderNo = _this.$route.query&&_this.$route.query.orderNo;
        if(orderNo){
            YMC.ajax({
                url: 'marketing/enrolling/getEnrollingResult',
                data: {
                    enrollingCode : orderNo,
                    enrollingId : _this.$route.query&&_this.$route.query.enrollingId,
                    activityId : JSON.parse(YMC.local("rushInfo"))&&JSON.parse(YMC.local("rushInfo")).activityId
                },
                success: function(res){
                    if(res.success){
                        _this.success = true;
                        _this.regCode = res.result.registrationCode;
                        _this.remainTime = parseInt(res.result.remainingTime) || 0;
                        _this.timeID = setInterval(_this.countdown,1000);
                    }else{
                        VUI.alert(res.error.message, 1500);
                    }
                },
                showLoading: true
            });
        } else {
            VUI.alert('订单号无效', 1500, function(){
                router.go({
                    name: 'home'
                });
            });
        }
	},
	methods: {
        countdown: function(){
            var _this = this;

            if(_this.remainTime>0){
                _this.remainTime -= 1;
            }else{
                clearInterval(_this.timeID);
            }
        }
	},
    detached: function(){
        window._gsCallback = function(){};
        clearInterval(this.timeID);
    }
}
</script>
<style src="../css/rush.css"></style>
<style>
.rushenr-success{height: 100%;background-color: #f0f0f0;}
.rushenr-success .act-success{font-size: 19px;color: #666;text-align: center;margin-bottom: 20px;}
.rushenr-success .act-success .ico-yes-bg{display: block;margin:45px auto 15px;}
.rushenr-success .act-coupon{margin: 30px 0;text-align: center;}
.rushenr-success .act-coupon h3{font-size: 18px;font-weight: normal;}
.rushenr-success .act-coupon p{font-size: 13px;color: #999;}
.rushenr-success .act-coupon a{color: #e1b900;}
.rushenr-success .coupon-code-wrap{position: relative;width: 240px;height: 103px;margin:10px auto;font: 45px/103px Consolas, monospace;color: #fff;background-color: #f6110a;-webkit-user-select:text;}
.rushenr-success .coupon-code-wrap .ia{position: absolute;top:0;bottom: 0;}
.rushenr-success .coupon-code-wrap .ia-8{left: 50%;margin-left: -127px;}
.rushenr-success .coupon-code-wrap .ia-9{right: 50%;margin-right: -127px;}
</style>