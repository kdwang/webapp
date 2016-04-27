<template>
<div class="rushpay-success">
	<div id="main" class="mainautow mainhd">
        <div class="main_cnt">
            <div class="paySuccess">
                <p class="mt10">
                    <b>恭喜您支付成功！</b>
                    在未来24小时内，要买车线下交付中心客服经理，会主动与您联系。
                </p>
                <p class="mt20 fs14">如果查看订单后续进度，请点击<a v-link="{name: 'rushUsrCenter'}">我的闪购</a><br/>如有问题，您可致电<a href="tel:4009289099">400-928-9099</a>咨询</p>
            </div>
        </div>
    </div>
</div>
</template>
<script>
module.exports = {
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
    detached: function(){
        window._gsCallback = function(){};
    }
}
</script>
<style>
.rushpay-success .paySuccess{
    text-align: center;
    color:#757575;
    font-size: 12px;
    padding: 160px 5% 0;
    position: relative;
}
.rushpay-success .paySuccess b{
    font-size: 20px;
    font-weight: normal;
    color:#212121;
    display: block;
    margin-bottom: 5px;
}
.rushpay-success .paySuccess p a{
    color:#007aff;
}
.rushpay-success .paySuccess:before{
    position: absolute;
    content: "";
    display: block;
    width: 100px;
    height: 100px;
    left:50%;
    margin-left: -50px;
    top:50px;
    background: url("../imgs/ico_sprite2.png") no-repeat 0 0;
    background-size: 311px 100px;
}
.rushpay-success .payAction{
    bottom: 0;
    position: fixed;
    border-top: 1px solid #f8c623;
    background: rgba(255,255,255,.8);
    padding: 5px 0;
    width: 100%;
    background-size: 13px 50px;
    z-index: 2;
}
</style>