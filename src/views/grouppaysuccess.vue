<template>
    <div class="vpay mainautow" style="padding-top:51px;">
        <div class="paySuccess">
            <div class="mt10">
                <b>恭喜您支付成功！</b>
                <p id="groupMsg">&nbsp;</p>
            </div>
            <p class="mt20 fs14">您的订单将于双11活动结束后，即2015.11.12日起开始交付。<br/>如果您有任何疑问，可拨打服务热线：<a href="tel:4009289099">400-928-9099</a>转3进行咨询！</p>
        </div>
    </div>
</template>

<script>
    module.exports = {
       //props: ['父组建传的值'],
       //这里才是route的生存周期
        data:function(){
            return {
                id : ''
            }
        },
        route:{
            data: function(transition) {
                var _this = this;
                _this.id = _this.$route.query.orderNo;
                YMC.ajax({
                    data: {"GroupOrderNo": _this.id},
                    url: 'Products/GroupPurchase/GetSmsForGroup',
                    success: function(res){
                        if(res.success&&res.result){
                            var groupMsg = "",
                                dat = res.result;

                            if(dat.groupSmsCode==40004){
                                groupMsg = "感谢您预订"+dat.groupCarGoodsTitle+"<br/>"
                                    + "当前已达到团购人数，团购价为"+dat.groupPrice+"<br/>"
                                    + "我们会在未来24小时内，致电与您确认订单信息。";
                            }else if(dat.groupSmsCode==40003){
                                groupMsg = "感谢您预订"+dat.groupCarGoodsTitle+"<br/>"
                                    + "您是第"+dat.reserveNum+"位团购该车用户，团购价为"+dat.groupPrice+"，满"+dat.groupUserNum+"人即可享受。<br/>"
                                    + "我们会在成团后24小时内，致电与您确认订单信息。";
                            }
                            $("#groupMsg").html(groupMsg);
                        }
                    },
                    error: function(){

                    }
                });

                transition.next();
            }
        }
    }
</script>

<style src="../css/paySuccess.css"></style>