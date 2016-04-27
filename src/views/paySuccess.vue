<template>
    <div class="vpay mainautow" style="padding-top:51px;height: 100%;">
        <div class="paySuccess">
            <p class="mt10">
                <b>恭喜您支付成功！</b>
                在未来24小时内，要买车线下交付中心客服经理，会主动与您联系。
            </p>
            <p class="mt20 fs14">如果查看订单后续进度，请点击<a ubt="orderTrack" v-link="{name:'orderTrack'}">订单跟踪</a><br/>
如有问题，您可致电<a href="tel:4009289099">400-928-9099</a>咨询</p>

        </div>
        <div style="display:none" v-show="showBottom" class="payAction abs_size clearfix">
            <a class="btn btn-primary" v-link="{name:'home'}">确定</a>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data:function(){
            return {
                timer :0,
                showBottom : false
            }
        },
       //props: ['父组建传的值'],
       //这里才是route的生存周期
        route:{
            data: function(transition) {
                var _this = this;
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
                // var imgLog = new Image();
                var userKeyStr = YMC.local( "__UserKey") || '';
                YMC.log("支付完成页-回调之前");
                YMC.wdLog(userKeyStr, _gridsumToken.orderId, "支付完成页-回调之前");
                // new Image().src="http://120.26.64.136:9001/api/gs/ClientLog?logstring=userKey:"+userKeyStr+";orderId:"+_gridsumToken.orderId+"state:支付完成页-回调之前";
                window._gsCallback = function() {
                    YMC.log("支付完成页-回调调用");
                    YMC.wdLog(userKeyStr, _gridsumToken.orderId, "支付完成页-回调调用");
                    if(_gridsumToken.orderId && _gridsumToken.orderId.length <= 32){
                        YMC.log("支付完成页-订单号存在-统计开始之前");
                        YMC.wdLog(userKeyStr, _gridsumToken.orderId, "支付完成页-订单号存在-统计开始之前");
                        if (window._gsTracker && (window.location.href.match('http(s)?:\/\/m.yaomaiche.com'))) {
                            YMC.log("支付完成页-统计开始");
                            YMC.wdLog(userKeyStr, _gridsumToken.orderId, "支付完成页-统计开始");
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
                            YMC.log("支付完成页-发送数据给后端");
                            YMC.wdLog(userKeyStr, _gridsumToken.orderId, "支付完成页-发送数据给后端");
                            var oimg = new Image();
                            oimg.src="http://120.26.64.136:9001/api/gs/YMCPaySuccess?orderId="+_gridsumToken.orderId;

                            // 支付定金成功统计，闪购（报名）的订单支付不统计
                            YMC.log("支付完成页-准备发送数据给国双");
                            YMC.wdLog(userKeyStr, _gridsumToken.orderId, "支付完成页-准备发送数据给国双");
                            if(_gridsumToken.orderId.search(/^q/i)==-1){
                                YMC.log("支付完成页-开始发送数据给国双");
                                YMC.wdLog(userKeyStr, _gridsumToken.orderId, "支付完成页-开始发送数据给国双");
                                _gsTracker.addOrder(_gridsumToken.orderId, _gridsumToken.deposit);
                                _gsTracker.trackECom();
                                YMC.log("支付完成页-完成发送数据给国双");
                                YMC.wdLog(userKeyStr, _gridsumToken.orderId, "支付完成页-完成发送数据给国双");
                            }
                            YMC.log("支付完成页-删除ls");
                            YMC.wdLog(userKeyStr, _gridsumToken.orderId, "支付完成页-删除ls");
                            // 支付完成统计完成后删除 gridsumToken
                            YMC.local( "gridsumToken", null );
                        }
                    }
                }

                _this.timer = setTimeout(function(){
                    _this.showBottom = true;
                },800);
                /*$.ajax({
                  url: "http://120.26.64.136:9001/api/gs/YMCPaySuccess?orderId="+_gridsumToken.orderId,
                  // data: _this.userFill,
                  type: 'GET',
                  success : function(res){

                  },
                  error : function(){

                  }
                })*/
                // 国双统计 -end

                // router.app.$emit('showVirtualLoading');
                transition.next();
            },
            deactivate:function(transition){
                var _this = this;
                _this.showBottom = false;
                clearTimeout(_this.timer);
                transition.next();
            }
        },
        detached: function(){
            window._gsCallback = function(){};
        }
    }
</script>

<style src="../css/paySuccess.css"></style>